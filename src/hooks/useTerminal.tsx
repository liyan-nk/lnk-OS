import React, { useState, useCallback, useEffect } from 'react';
import { parseCommand } from '../utils/commandParser';
import { commandRegistry } from './../utils/commandRegistry';
import { CommandLink } from '../components/common/CommandLink';

export interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const WELCOME_ITEM: HistoryItem = {
  id: 'welcome-log',
  command: '',
  output: (
    <div className="text-muted/65 space-y-1">
      <div className="text-accent font-bold text-base">LNK OS [Version 1.0.0]</div>
      <div>Tagline  : Forged in Silence</div>
      <div>License  : Open Source Portfolio Access Node</div>
      <div>------------------------------------------------</div>
      <div className="text-xs pt-1">
        Welcome visitor. Command loop interpreter initialized successfully.
        <br />
        Type <CommandLink command="help">help</CommandLink> to view the command dictionary interface.
      </div>
    </div>
  )
};

export type ThemeType = 'mint' | 'ubuntu' | 'matrix' | 'amber';

export const ALIAS_MAP: Record<string, string> = {
  project: 'projects',
  skill: 'skills',
  contacts: 'contact',
  portfolio: 'projects',
  mail: 'contact',
  education: 'journey',
  cv: 'resume'
};

export const PRIMARY_COMMANDS = [
  'about',
  'projects',
  'skills',
  'resume',
  'journey',
  'contact',
  'whoami',
  'help',
  'theme',
  'clear',
  'home',
  'neofetch'
];

export const COMMAND_ARGUMENTS: Record<string, string[]> = {
  theme: ['mint', 'ubuntu', 'matrix', 'amber']
};

export interface AutocompleteResult {
  completedValue: string | null;
  ghostSuffix: string;
  multipleMatches: string[];
}

export function getAutocomplete(input: string): AutocompleteResult {
  const trimmed = input.trim().toLowerCase();
  
  if (!input) {
    return {
      completedValue: null,
      ghostSuffix: '',
      multipleMatches: PRIMARY_COMMANDS
    };
  }

  const spaceIdx = input.indexOf(' ');

  if (spaceIdx === -1) {
    // 1. Root command completion
    const matches = PRIMARY_COMMANDS.filter(cmd => cmd.startsWith(trimmed));
    if (matches.length === 1) {
      return {
        completedValue: matches[0],
        ghostSuffix: matches[0].slice(input.length),
        multipleMatches: []
      };
    }
    return {
      completedValue: null,
      ghostSuffix: '',
      multipleMatches: matches.length > 1 ? matches : []
    };
  } else {
    // 2. Command argument completion
    const cmdToken = input.slice(0, spaceIdx).toLowerCase();
    const argInput = input.slice(spaceIdx + 1);
    const resolvedCmd = ALIAS_MAP[cmdToken] || cmdToken;

    if (resolvedCmd in COMMAND_ARGUMENTS) {
      const validArgs = COMMAND_ARGUMENTS[resolvedCmd];
      const matches = validArgs.filter(arg => arg.startsWith(argInput.toLowerCase()));
      
      const prefix = input.slice(0, spaceIdx + 1);

      if (matches.length === 1) {
        return {
          completedValue: prefix + matches[0],
          ghostSuffix: matches[0].slice(argInput.length),
          multipleMatches: []
        };
      }
      return {
        completedValue: null,
        ghostSuffix: '',
        multipleMatches: matches.length > 1 ? matches.map(arg => prefix + arg) : []
      };
    }
  }

  return {
    completedValue: null,
    ghostSuffix: '',
    multipleMatches: []
  };
}

function getLevenshteinDistance(a: string, b: string): number {
  const tmp: number[][] = [];
  let i, j;
  for (i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1, // deletion
        tmp[i][j - 1] + 1, // insertion
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1) // substitution
      );
    }
  }
  return tmp[a.length][b.length];
}

function getClosestMatches(input: string): string[] {
  let minDistance = Infinity;
  let matches: string[] = [];

  for (const cmd of PRIMARY_COMMANDS) {
    const dist = getLevenshteinDistance(input, cmd);
    if (dist < minDistance) {
      minDistance = dist;
      matches = [cmd];
    } else if (dist === minDistance) {
      matches.push(cmd);
    }
  }

  const threshold = Math.max(2, Math.floor(input.length / 2));
  if (minDistance <= threshold) {
    return matches;
  }
  return [];
}

/**
 * State hook containing terminal outputs, active input submissions,
 * system clearing/resetting functions, kernel booting states, and local theme configuration.
 */
export const useTerminal = () => {
  const [history, setHistory] = useState<HistoryItem[]>([WELCOME_ITEM]);
  const [booting, setBooting] = useState<boolean>(true);
  const [activeTheme, setActiveTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('lnk-os-theme');
    if (saved === 'mint' || saved === 'ubuntu' || saved === 'matrix' || saved === 'amber') {
      return saved as ThemeType;
    }
    return 'mint';
  });

  // Inject active theme attribute on HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  const executeCommand = useCallback((input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const { command, args } = parseCommand(trimmedInput);
    const resolvedCommand = ALIAS_MAP[command] || command;

    if (resolvedCommand === 'clear') {
      setHistory([]);
      return;
    }

    if (resolvedCommand === 'home') {
      setHistory([WELCOME_ITEM]);
      return;
    }

    // Intercept theme command
    if (resolvedCommand === 'theme') {
      const targetTheme = args[0]?.toLowerCase();
      
      if (!targetTheme) {
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: trimmedInput,
            output: (
              <div className="space-y-1">
                <p>Available themes:</p>
                <p>  <CommandLink command="theme mint">theme mint</CommandLink>   - Clean Linux Mint theme (Default)</p>
                <p>  <CommandLink command="theme ubuntu">theme ubuntu</CommandLink> - Warm purple and orange theme</p>
                <p>  <CommandLink command="theme matrix">theme matrix</CommandLink> - Glowing neon green console</p>
                <p>  <CommandLink command="theme amber">theme amber</CommandLink>  - Warm retro CRT amber console</p>
                <p className="mt-1 text-xs text-muted">Usage: theme &lt;theme-name&gt;</p>
              </div>
            )
          }
        ]);
        return;
      }

      if (targetTheme === 'mint' || targetTheme === 'ubuntu' || targetTheme === 'matrix' || targetTheme === 'amber') {
        const themeCast = targetTheme as ThemeType;
        setActiveTheme(themeCast);
        localStorage.setItem('lnk-os-theme', themeCast);
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: trimmedInput,
            output: <div className="text-accent">System theme updated to '{themeCast}'.</div>
          }
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: trimmedInput,
            output: (
              <div className="text-red-500">
                Unknown theme: '{targetTheme}'. Type <CommandLink command="theme">theme</CommandLink> to see options.
              </div>
            )
          }
        ]);
      }
      return;
    }

    let outputResult: React.ReactNode;

    if (resolvedCommand in commandRegistry) {
      outputResult = commandRegistry[resolvedCommand]();
    } else {
      const suggestions = getClosestMatches(command);
      if (suggestions.length > 0) {
        outputResult = (
          <div className="text-red-500 space-y-2">
            <p>Command not found: '{trimmedInput}'</p>
            <div className="text-terminal">
              <p>Did you mean:</p>
              <div className="pl-4 mt-1 flex flex-col gap-1 items-start">
                {suggestions.map((s) => (
                  <CommandLink key={s} command={s}>{s}</CommandLink>
                ))}
              </div>
            </div>
            <p className="text-muted text-xs">
              Type <CommandLink command="help">help</CommandLink> to view available commands.
            </p>
          </div>
        );
      } else {
        outputResult = (
          <div className="text-red-500">
            Command not found: '{trimmedInput}'. Type <CommandLink command="help">help</CommandLink> for available commands.
          </div>
        );
      }
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        command: trimmedInput,
        output: outputResult,
      },
    ]);
  }, [activeTheme]);

  // Listen for global execution event dispatches
  useEffect(() => {
    const handleExecuteEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        executeCommand(customEvent.detail);
      }
    };
    window.addEventListener('lnk-os-execute', handleExecuteEvent);
    return () => {
      window.removeEventListener('lnk-os-execute', handleExecuteEvent);
    };
  }, [executeCommand]);

  const finishBooting = useCallback(() => {
    setBooting(false);
  }, []);

  const handleTabComplete = useCallback((input: string): string | null => {
    const trimmed = input.trim().toLowerCase();
    
    // 1. Empty Prompt case: show grouped commands
    if (!trimmed) {
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          command: '',
          output: (
            <div className="space-y-2.5 my-1 text-terminal select-text">
              <p className="text-muted/65">// Available Commands:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg border border-border/20 p-3 bg-bg/40 rounded-sm">
                <div>
                  <span className="text-[10px] text-accent/70 uppercase font-bold tracking-wider block mb-1">Navigation</span>
                  <div className="flex flex-col gap-1 items-start">
                    <CommandLink command="about">about</CommandLink>
                    <CommandLink command="projects">projects</CommandLink>
                    <CommandLink command="skills">skills</CommandLink>
                    <CommandLink command="contact">contact</CommandLink>
                  </div>
                </div>
                
                <div>
                  <span className="text-[10px] text-accent/70 uppercase font-bold tracking-wider block mb-1">Profile</span>
                  <div className="flex flex-col gap-1 items-start">
                    <CommandLink command="whoami">whoami</CommandLink>
                    <CommandLink command="journey">journey</CommandLink>
                    <CommandLink command="resume">resume</CommandLink>
                    <CommandLink command="neofetch">neofetch</CommandLink>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-accent/70 uppercase font-bold tracking-wider block mb-1">System</span>
                  <div className="flex flex-col gap-1 items-start">
                    <CommandLink command="theme">theme</CommandLink>
                    <CommandLink command="home">home</CommandLink>
                    <CommandLink command="clear">clear</CommandLink>
                    <CommandLink command="help">help</CommandLink>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]);
      return null;
    }

    // 2. Fetch matches using getAutocomplete
    const { completedValue, multipleMatches } = getAutocomplete(input);

    if (completedValue) {
      return completedValue;
    }

    if (multipleMatches.length > 0) {
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          command: input,
          output: (
            <div className="space-y-1.5 my-1 text-terminal select-text">
              <p className="text-muted/65">// Matching options:</p>
              <div className="flex flex-wrap gap-2">
                {multipleMatches.map((m) => (
                  <CommandLink key={m} command={m}>{m}</CommandLink>
                ))}
              </div>
            </div>
          )
        }
      ]);
    }

    return null;
  }, []);

  return {
    history,
    booting,
    theme: activeTheme,
    setTheme: setActiveTheme,
    executeCommand,
    finishBooting,
    handleTabComplete,
  };
};
