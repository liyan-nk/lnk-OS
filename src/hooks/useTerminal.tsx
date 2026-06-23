import React, { useState, useCallback, useEffect } from 'react';
import { parseCommand } from '../utils/commandParser';
import { commandRegistry } from './../utils/commandRegistry';
import { CommandLink } from '../components/common/CommandLink';
import type { SecretProtocol } from '../utils/protocolRegistry';
import { GOTHAM_PROTOCOL, findProtocolByTrigger } from '../utils/protocolRegistry';
import { GOTHAM_MISSIONS } from '../data/portfolio';

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

export const GOTHAM_WELCOME_ITEM: HistoryItem = {
  id: 'gotham-welcome-log',
  command: '',
  output: (
    <div className="space-y-1 text-[#78909c]">
      <div className="text-[#c5a059] font-bold text-base">WAYNE ENTERPRISES SECURE PORTAL v8.12</div>
      <div className="text-[10px] text-[#c5a059]/40 uppercase tracking-widest font-semibold">// CLASSIFIED // WAYNE ENTERPRISES INTERNAL USE ONLY //</div>
      <div>Uplink   : ORACLE Mainframe Satellite Link (Secure)</div>
      <div>------------------------------------------------</div>
      <div className="text-xs pt-1 select-text">
        Gotham Protocol session established successfully.
        <br />
        Type <CommandLink command="intel">intel</CommandLink> to view classified protocol access.
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
  cv: 'resume',
  resistance: 'opposition',
  wayne: 'alfred',
  archives: 'projects'
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
    ? [...PRIMARY_COMMANDS, 'intel', 'mission', 'opposition', 'resistance', 'arsenal', 'batcomputer', 'oracle', 'status', 'alfred', 'wayne', 'archives']
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
    ? [...PRIMARY_COMMANDS, 'intel', 'mission', 'opposition', 'resistance', 'arsenal', 'batcomputer', 'oracle', 'status', 'alfred', 'wayne', 'archives']
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

// GOTHAM_MISSIONS imported from portfolio data to avoid circular references

export const useTerminal = () => {
  const [normalHistory, setNormalHistory] = useState<HistoryItem[]>([WELCOME_ITEM]);
  const [gothamHistory, setGothamHistory] = useState<HistoryItem[]>([GOTHAM_WELCOME_ITEM]);
  const [booting, setBooting] = useState<boolean>(true);
  
  const [activeProtocol, setActiveProtocol] = useState<SecretProtocol | null>(() => {
    const isGothamActive = sessionStorage.getItem('lnk-os-gotham-active') === 'true';
    return isGothamActive ? GOTHAM_PROTOCOL : null;
  });

  const [takeoverGlitch, setTakeoverGlitch] = useState<boolean>(false);
  const [protocolBooting, setProtocolBooting] = useState<boolean>(false);
  const [activeMissionIndex, setActiveMissionIndex] = useState<number>(0);

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

  // Rotate missions dynamically every 10 seconds in Gotham Mode
  useEffect(() => {
    if (!activeProtocol || activeProtocol.id !== 'gotham') return;
    const interval = setInterval(() => {
      setActiveMissionIndex((prev) => (prev + 1) % GOTHAM_MISSIONS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [activeProtocol]);

  const executeCommand = useCallback((input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const { command, args } = parseCommand(trimmedInput);
    const resolvedCommand = ALIAS_MAP[command] || command;

    const historySetter = activeProtocol ? setGothamHistory : setNormalHistory;

    // Generic Secret Protocol Decryption Trigger (takeover sequence)
    if (!activeProtocol) {
      const triggeredProtocol = findProtocolByTrigger(resolvedCommand);
      if (triggeredProtocol) {
        const isMobile = typeof window !== 'undefined' && (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches);
        if (isMobile) {
          // Mobile: Skip cinematic sequences, audio triggers, diagnostics, and go straight to restricted screen
          setActiveProtocol(triggeredProtocol);
          localStorage.setItem('lnk-os-secret-gotham-unlocked', 'true');
          return;
        }

        setTakeoverGlitch(true);

        try {
          // NOTE: Temporary audio asset. To be replaced with cinematic vocal confirmation.
          const audio = new Audio('/audio/oracle_activation.mp3');
          audio.play().catch((err) => {
            console.warn('Audio play failed or blocked:', err);
          });
        } catch (err) {
          console.warn('Audio failed to initialize:', err);
        }

        setTimeout(() => {
          setTakeoverGlitch(false);
          setProtocolBooting(true);
          setActiveProtocol(triggeredProtocol);
          localStorage.setItem('lnk-os-secret-gotham-unlocked', 'true');
        }, 1200);

        return;
      }
    }

    // Lockdown Intercepts in Gotham mode
    if (activeProtocol) {
      if (activeProtocol.lockedCommands.includes(resolvedCommand)) {
        const output = (
          <div className="text-red-500 font-mono text-sm leading-relaxed border border-red-500/20 bg-red-500/5 p-3 rounded-xs my-1 select-text">
            <p className="font-bold uppercase tracking-wider">// CLASSIFIED // WAYNE ENTERPRISES SECURITY OVERRIDE //</p>
            <p className="text-xs mt-1 text-[#78909c]/90">
              Wayne Enterprises security lockdown active. Theme controls unavailable during secure sessions.
            </p>
          </div>
        );
        setGothamHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: trimmedInput,
            output: output
          }
        ]);
        return;
      }
    }

    // exit override
    if (resolvedCommand === 'exit') {
      if (activeProtocol?.id === 'gotham') {
        setGothamHistory((prev) => [
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

    // Alfred exit flow (cinematic shutdown)
    if (resolvedCommand === 'alfred' && activeProtocol?.id === 'gotham') {
      setGothamHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          command: trimmedInput,
          output: <div className="text-[#c5a059] font-bold">Very good, sir.</div>
        }
      ]);

      setTimeout(() => {
        setGothamHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: '',
            output: <div className="text-[#c5a059]/80 font-mono">Terminating Gotham Protocol...</div>
          }
        ]);
      }, 400);

      setTimeout(() => {
        setGothamHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: '',
            output: <div className="text-[#c5a059]/60 font-mono">Disconnecting Batcomputer...</div>
          }
        ]);
      }, 800);

      setTimeout(() => {
        setGothamHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: '',
            output: <div className="text-[#c5a059]/40 font-mono">Restoring civilian interface...</div>
          }
        ]);
      }, 1200);

      setTimeout(() => {
        setActiveProtocol(null);
        sessionStorage.removeItem('lnk-os-gotham-active');
        const normalTheme = localStorage.getItem('lnk-os-theme') || 'mint';
        setActiveTheme(normalTheme as ThemeType);
        setGothamHistory([GOTHAM_WELCOME_ITEM]); // reset
      }, 1800);

      return;
    }

    // Hide Gotham-only commands if normal mode
    const GOTHAM_ONLY_COMMANDS = ['intel', 'mission', 'opposition', 'resistance', 'arsenal', 'batcomputer', 'oracle', 'status', 'alfred', 'wayne', 'archives'];
    if (GOTHAM_ONLY_COMMANDS.includes(resolvedCommand) && !activeProtocol) {
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
          </div>
        );
      } else {
        outputResult = (
          <div className="text-red-500">Command not found: '{trimmedInput}'.</div>
        );
      }
      setNormalHistory((prev) => [
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
      historySetter([]);
      return;
    }

    if (resolvedCommand === 'home') {
      historySetter(activeProtocol ? [GOTHAM_WELCOME_ITEM] : [WELCOME_ITEM]);
      return;
    }

    // intercept theme command (normal mode)
    if (resolvedCommand === 'theme' && !activeProtocol) {
      const targetTheme = args[0]?.toLowerCase();
      if (!targetTheme) {
        setNormalHistory((prev) => [
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
        setNormalHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: trimmedInput,
            output: <div className="text-accent">System theme updated to '{themeCast}'.</div>
          }
        ]);
      } else {
        setNormalHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: trimmedInput,
            output: <div className="text-red-500">Unknown theme: '{targetTheme}'.</div>
          }
        ]);
      }
      return;
    }

    // Intercept mission rotation command
    if (resolvedCommand === 'mission' && activeProtocol?.id === 'gotham') {
      // Pick a random mission and update the index state
      const newIndex = Math.floor(Math.random() * GOTHAM_MISSIONS.length);
      setActiveMissionIndex(newIndex);
      
      const mission = GOTHAM_MISSIONS[newIndex];
      const outputResult = (
        <div className="space-y-3 font-mono text-sm text-[#78909c] max-w-xl select-text my-1 animate-pulse">
          <div className="border border-[#c5a059]/40 bg-[#0c121e]/50 p-4 rounded-sm shadow-[0_0_15px_rgba(197,160,89,0.1)]">
            <div className="flex justify-between items-center border-b border-[#c5a059]/20 pb-2 mb-3">
              <span className="text-[#c5a059] font-bold tracking-widest text-xs">WAYNE ENTERPRISES SECURE DOSSIER</span>
              <span className="text-[10px] font-semibold border border-[#c5a059]/40 px-2 py-0.5 rounded-sm text-[#c5a059]/80 uppercase">{mission.id}</span>
            </div>
            <div className="space-y-2">
              <p><span className="text-[#c5a059] font-semibold">OPERATION:</span> {mission.target}</p>
              <p><span className="text-[#c5a059] font-semibold">STATUS:</span> <span className="text-amber-500 font-semibold">{mission.status}</span></p>
              <p><span className="text-[#c5a059] font-semibold">OBJECTIVE:</span></p>
              <p className="text-sm leading-relaxed border-l-2 border-[#c5a059]/40 pl-3 py-0.5 italic text-[#78909c]/90 bg-[#c5a059]/5 rounded-r-xs">
                "{mission.objective}"
              </p>
              {mission.priority && (
                <p><span className="text-[#c5a059] font-semibold">PRIORITY:</span> <span className="text-red-500 font-bold animate-pulse">{mission.priority}</span></p>
              )}
              <p className="pt-1"><span className="text-[#c5a059] font-semibold">TACTICAL DEPLOY:</span> {mission.action}</p>
            </div>
          </div>
          <p className="text-[10px] text-[#78909c]/50 text-center italic">// Telemetry updated via remote uplink //</p>
        </div>
      );

      setGothamHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          command: trimmedInput,
          output: outputResult,
        },
      ]);
      return;
    }

    let outputResult: React.ReactNode;

    if (resolvedCommand in commandRegistry) {
      outputResult = commandRegistry[resolvedCommand]();
    } else {
      const suggestions = getClosestMatches(command, !!activeProtocol);
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
          </div>
        );
      } else {
        outputResult = (
          <div className="text-red-500">Command not found: '{trimmedInput}'.</div>
        );
      }
    }

    let finalOutput = outputResult;
    if (activeProtocol?.id === 'gotham') {
      const rand = Math.random();
      if (rand < 0.03) {
        const ambientAlerts = [
          "[ LNK Network Sweep... 100% OK ]",
          "[ Github Webhook activity logged ]",
          "[ Local workspace buffer synced ]",
          "[ Scanning learning system metrics... ]"
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
          "ORACLE: Discipline compounds faster than motivation.",
          "ORACLE: Comfort is the enemy of growth.",
          "ORACLE: Progress detected. Continue.",
          "ORACLE: Operator focus level rising.",
          "ORACLE: Mission continuity maintained.",
          "ORACLE: Forged in Silence."
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

    historySetter((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        command: trimmedInput,
        output: finalOutput,
      },
    ]);
  }, [activeTheme, activeProtocol]);

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
    setProtocolBooting(false);
    sessionStorage.setItem('lnk-os-gotham-active', 'true');
    setActiveTheme('gotham');
  }, []);

  const handleTabComplete = useCallback((input: string): string | null => {
    const trimmed = input.trim().toLowerCase();
    const historySetter = activeProtocol ? setGothamHistory : setNormalHistory;
    
    if (!trimmed) {
      if (activeProtocol?.id === 'gotham') {
        historySetter((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            command: '',
            output: (
              <div className="space-y-2.5 my-1 text-terminal select-text text-sm">
                <p className="text-[#c5a059]/50">// Intel System Catalog (Press Tab or type command):</p>
                <div className="border border-[#121d2d]/60 p-3 bg-[#080d14]/40 rounded-sm space-y-2.5 max-w-md text-xs">
                  <div>
                    <span className="text-[#c5a059] font-bold block mb-1 uppercase tracking-wider text-[10px]">// Special Protocols</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      <CommandLink command="mission">mission</CommandLink>
                      <CommandLink command="opposition">opposition</CommandLink>
                      <CommandLink command="resistance">resistance</CommandLink>
                      <CommandLink command="arsenal">arsenal</CommandLink>
                      <CommandLink command="batcomputer">batcomputer</CommandLink>
                      <CommandLink command="oracle">oracle</CommandLink>
                      <CommandLink command="status">status</CommandLink>
                    </div>
                  </div>
                  <div>
                    <span className="text-[#c5a059] font-bold block mb-1 uppercase tracking-wider text-[10px]">// Classified Dossiers</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      <CommandLink command="about">about</CommandLink>
                      <CommandLink command="projects">projects</CommandLink>
                      <CommandLink command="archives">archives</CommandLink>
                      <CommandLink command="skills">skills</CommandLink>
                      <CommandLink command="resume">resume</CommandLink>
                      <CommandLink command="journey">journey</CommandLink>
                      <CommandLink command="contact">contact</CommandLink>
                    </div>
                  </div>
                  <div>
                    <span className="text-[#c5a059] font-bold block mb-1 uppercase tracking-wider text-[10px]">// System</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      <CommandLink command="neofetch">neofetch</CommandLink>
                      <CommandLink command="alfred">alfred</CommandLink>
                      <CommandLink command="wayne">wayne</CommandLink>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        ]);
        return null;
      }

      historySetter((prev) => [
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

    const { completedValue, multipleMatches } = getAutocomplete(input, !!activeProtocol);

    if (completedValue) {
      return completedValue;
    }

    if (multipleMatches.length > 0) {
      historySetter((prev) => [
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
  }, [activeProtocol]);

  return {
    history: activeProtocol ? gothamHistory : normalHistory,
    booting,
    theme: activeTheme,
    setTheme: setActiveTheme,
    executeCommand,
    finishBooting,
    handleTabComplete,
    activeProtocol,
    takeoverGlitch,
    protocolBooting,
    finishGothamBoot,
    activeMissionIndex
  };
};
