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

export type ThemeType = 'mint' | 'ubuntu' | 'matrix' | 'amber' | 'gotham';

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

export function getAutocomplete(input: string, isGotham: boolean = false): AutocompleteResult {
  const trimmed = input.trim().toLowerCase();
  
  const activeCommands = isGotham
    ? [...PRIMARY_COMMANDS, 'mission', 'villains', 'gadgets', 'batcomputer', 'alfred']
    : PRIMARY_COMMANDS;

  if (!input) {
    return {
      completedValue: null,
      ghostSuffix: '',
      multipleMatches: activeCommands
    };
  }

  const spaceIdx = input.indexOf(' ');

  if (spaceIdx === -1) {
    // 1. Root command completion
    const matches = activeCommands.filter(cmd => cmd.startsWith(trimmed));
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

function getClosestMatches(input: string, isGotham: boolean = false): string[] {
  let minDistance = Infinity;
  let matches: string[] = [];

  const activeCommands = isGotham
    ? [...PRIMARY_COMMANDS, 'mission', 'villains', 'gadgets', 'batcomputer', 'alfred']
    : PRIMARY_COMMANDS;

  for (const cmd of activeCommands) {
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
  
  const [gothamMode, setGothamMode] = useState<boolean>(() => {
    return sessionStorage.getItem('lnk-os-gotham-active') === 'true';
  });
  const [gothamBooting, setGothamBooting] = useState<boolean>(false);

  const [activeTheme, setActiveTheme] = useState<ThemeType>(() => {
    const isGotham = sessionStorage.getItem('lnk-os-gotham-active') === 'true';
    if (isGotham) return 'gotham';

    const saved = localStorage.getItem('lnk-os-theme');
    if (saved === 'mint' || saved === 'ubuntu' || saved === 'matrix' || saved === 'amber' || saved === 'gotham') {
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

    // Gotham Protocol Decryption Trigger
    if (resolvedCommand === 'batman') {
      const isFirstTime = localStorage.getItem('lnk-os-secret-gotham-unlocked') !== 'true';
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          command: trimmedInput,
          output: (
            <div className="space-y-1.5 font-mono">
              <div className="text-[#c5a059]">Identity confirmed.</div>
              {isFirstTime && (
                <div className="text-accent font-bold text-xs animate-pulse border border-accent/20 px-2.5 py-1 bg-accent/5 rounded-xs inline-block">
                  Secret Discovered: Gotham Protocol Unlocked.
                </div>
              )}
            </div>
          )
        }
      ]);
      
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: '',
            output: <div className="text-[#c5a059] font-bold">Welcome back, Bruce.</div>
          }
        ]);
      }, 700);

      setTimeout(() => {
        setGothamBooting(true);
        localStorage.setItem('lnk-os-secret-gotham-unlocked', 'true');
      }, 1400);

      return;
    }

    // Gotham Protocol Exit Intercept
    if (resolvedCommand === 'exit') {
      if (gothamMode) {
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: trimmedInput,
            output: <div className="text-red-500 font-semibold font-mono">There is no exit.</div>
          }
        ]);
        return;
      }
    }

    // Gotham Protocol Alfred Exit
    if (resolvedCommand === 'alfred') {
      if (gothamMode) {
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: trimmedInput,
            output: <div className="text-[#c5a059]">Very good, sir. Returning to reality...</div>
          }
        ]);

        setTimeout(() => {
          setGothamMode(false);
          sessionStorage.removeItem('lnk-os-gotham-active');
          const normalTheme = localStorage.getItem('lnk-os-theme') || 'mint';
          setActiveTheme(normalTheme as ThemeType);
          setHistory([WELCOME_ITEM]); // Reset back to home screen
        }, 1200);

        return;
      }
    }

    // If Gotham Mode is NOT active, intercept and hide Gotham-only commands
    const GOTHAM_ONLY_COMMANDS = ['mission', 'villains', 'gadgets', 'batcomputer', 'alfred'];
    if (GOTHAM_ONLY_COMMANDS.includes(resolvedCommand) && !gothamMode) {
      const suggestions = getClosestMatches(command, false);
      let outputResult: React.ReactNode;
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

      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          command: trimmedInput,
          output: outputResult,
        },
      ]);
      return;
    }

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
      const suggestions = getClosestMatches(command, gothamMode);
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

    // Roll dynamic Gotham atmospheric events & quotes (rarity: 3% alerts, 1% quotes)
    let finalOutput = outputResult;
    if (gothamMode) {
      const rand = Math.random();
      if (rand < 0.03) {
        const ambientAlerts = [
          "[ Bat-Signal detected in sector 4-G ]",
          "[ Rain intensity increasing. Wind speed 22kt ]",
          "[ Arkham Asylum gate 3 status check... OK ]",
          "[ Surveillance sweeps show activity near Crime Alley ]",
          "[ Batmobile remote link active and parsing telemetry ]"
        ];
        const alert = ambientAlerts[Math.floor(Math.random() * ambientAlerts.length)];
        finalOutput = (
          <div className="space-y-1.5">
            <div className="text-[#c5a059]/40 text-xs italic font-semibold">{alert}</div>
            {outputResult}
          </div>
        );
      } else if (rand >= 0.03 && rand < 0.04) {
        const quotes = [
          "\"I am vengeance.\"",
          "\"A hero can be anyone.\"",
          "\"The night is darkest just before the dawn.\"",
          "\"Why do we fall? So we can learn to pick ourselves up.\"",
          "\"I am the night.\""
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        finalOutput = (
          <div className="space-y-1.5">
            <div className="text-[#c5a059]/35 text-xs italic font-semibold">{quote}</div>
            {outputResult}
          </div>
        );
      }
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        command: trimmedInput,
        output: finalOutput,
      },
    ]);
  }, [activeTheme, gothamMode]);

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

  const finishGothamBoot = useCallback(() => {
    setGothamBooting(false);
    setGothamMode(true);
    sessionStorage.setItem('lnk-os-gotham-active', 'true');
    setActiveTheme('gotham');
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
    const { completedValue, multipleMatches } = getAutocomplete(input, gothamMode);

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
  }, [gothamMode]);

  return {
    history,
    booting,
    theme: activeTheme,
    setTheme: setActiveTheme,
    executeCommand,
    finishBooting,
    handleTabComplete,
    gothamMode,
    gothamBooting,
    setGothamBooting,
    setGothamMode,
    finishGothamBoot,
  };
};
