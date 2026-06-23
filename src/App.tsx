import { useEffect, useRef, useState } from 'react';
import { useTerminal, ALIAS_MAP } from './hooks/useTerminal';
import { GOTHAM_MISSIONS } from './data/portfolio';
import { BootScreen } from './components/terminal/BootScreen';
import { InputLine } from './components/terminal/InputLine';
import { GothamBootScreen } from './components/terminal/GothamBootScreen';
import { GothamRainEffect } from './components/terminal/GothamRainEffect';

function ResistanceMapPanel() {
  const [threats, setThreats] = useState([
    { name: 'PROCRASTINATION', status: 'ACTIVE', color: 'text-red-500 font-bold animate-pulse' },
    { name: 'DISTRACTIONS', status: 'MONITORED', color: 'text-amber-500' },
    { name: 'COMFORT ZONE', status: 'BREACH', color: 'text-emerald-500' },
    { name: 'INCONSISTENCY', status: 'TRACKED', color: 'text-[#78909c]/60' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreats(prev => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        if (next[idx].name === 'PROCRASTINATION') {
          next[idx] = next[idx].status === 'ACTIVE'
            ? { name: 'PROCRASTINATION', status: 'MONITORED', color: 'text-amber-500' }
            : { name: 'PROCRASTINATION', status: 'ACTIVE', color: 'text-red-500 font-bold animate-pulse' };
        } else if (next[idx].name === 'DISTRACTIONS') {
          next[idx] = next[idx].status === 'MONITORED'
            ? { name: 'DISTRACTIONS', status: 'TRACKED', color: 'text-emerald-500' }
            : { name: 'DISTRACTIONS', status: 'MONITORED', color: 'text-amber-500' };
        } else if (next[idx].name === 'COMFORT ZONE') {
          next[idx] = next[idx].status === 'BREACH'
            ? { name: 'COMFORT ZONE', status: 'ACTIVE', color: 'text-red-500 font-bold animate-pulse' }
            : { name: 'COMFORT ZONE', status: 'BREACH', color: 'text-emerald-500' };
        }
        return next;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-[#121d2d] bg-[#080d14]/75 p-3 sm:p-4 rounded-sm space-y-2 flex-grow shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
      <div className="text-[10px] text-accent/60 uppercase tracking-widest font-bold border-b border-[#121d2d] pb-1.5 flex justify-between items-center select-none">
        <span>// RESISTANCE MAP //</span>
        <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-ping" />
      </div>
      <div className="space-y-1.5 text-xs font-mono select-none">
        {threats.map(t => (
          <div key={t.name} className="flex justify-between items-center">
            <span className="font-semibold text-white/90">{t.name}</span>
            <span className={t.color}>[{t.status}]</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NetworkMonitoringPanel() {
  const [logs, setLogs] = useState([
    'KMCT CEETM ............ ONLINE',
    'GITHUB NODE ........... CONNECTED',
    'LINKEDIN NODE ......... CONNECTED',
    'DEPLOYMENT GRID ....... ACTIVE',
    'LEARNING SYSTEM ....... MONITORING'
  ]);
  const [sweep, setSweep] = useState('Sweeping LNK Network... [ OK ]');

  useEffect(() => {
    const sweeps = [
      'Sweeping LNK Network... [ OK ]',
      'Github webhook listener: active',
      'Vercel deploy check: 100% stable',
      'Scanning academic records... [ OK ]',
      'Workspace buffer: synchronized'
    ];
    const interval = setInterval(() => {
      setSweep(sweeps[Math.floor(Math.random() * sweeps.length)]);
      setLogs(prev => {
        const next = [...prev];
        const first = next.shift()!;
        next.push(first);
        return next;
      });
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-[#121d2d] bg-[#080d14]/75 p-3 sm:p-4 rounded-sm space-y-2 flex-grow shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
      <div className="text-[10px] text-accent/60 uppercase tracking-widest font-bold border-b border-[#121d2d] pb-1.5 select-none">
        // NETWORK MONITORING //
      </div>
      <div className="space-y-1.5 text-[11px] font-mono text-[#78909c]/80 select-none">
        {logs.slice(0, 4).map((l, idx) => (
          <div key={idx} className="flex items-center space-x-1.5">
            <span className="w-1 h-1 bg-[#c5a059] rounded-full shrink-0 animate-pulse" />
            <span className="truncate">{l}</span>
          </div>
        ))}
        <div className="text-[10px] text-accent/50 font-bold border-t border-[#121d2d]/30 pt-1.5 animate-pulse truncate mt-1">
          {sweep}
        </div>
      </div>
    </div>
  );
}

function MissionControlPanel({ activeIndex }: { activeIndex: number }) {
  const mission = GOTHAM_MISSIONS[activeIndex];
  return (
    <div className="border border-[#121d2d] bg-[#080d14]/75 p-3 sm:p-4 rounded-sm space-y-2 flex-grow flex flex-col min-h-[140px] shadow-[0_4px_15px_rgba(0,0,0,0.5)] select-text">
      <div className="text-[10px] text-accent/60 uppercase tracking-widest font-bold border-b border-[#121d2d] pb-1.5 select-none">
        // MISSION CONTROL //
      </div>
      <div className="space-y-2.5 text-xs font-mono flex-grow overflow-y-auto pr-1">
        <div className="space-y-2 text-[#78909c]/90">
          <div>
            <span className="text-accent font-bold block text-[10px] tracking-wider select-none">OPERATION:</span>
            <span className="text-white font-bold">{mission.target}</span>
          </div>
          <div>
            <span className="text-accent font-bold block text-[10px] tracking-wider select-none">STATUS:</span>
            <span className="text-amber-500 font-semibold">{mission.status}</span>
          </div>
          <div>
            <span className="text-accent font-bold block text-[10px] tracking-wider select-none">OBJECTIVE:</span>
            <span className="text-white/95 leading-relaxed">{mission.objective}</span>
          </div>
          {mission.priority && (
            <div>
              <span className="text-accent font-bold block text-[10px] tracking-wider select-none">PRIORITY:</span>
              <span className="text-red-500 font-bold tracking-wider animate-pulse">{mission.priority}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ArsenalPanel() {
  const items = [
    { name: 'Python', status: 'READY', color: 'text-emerald-500' },
    { name: 'TypeScript', status: 'READY', color: 'text-emerald-500' },
    { name: 'Linux', status: 'ACTIVE', color: 'text-amber-500' },
    { name: 'Next.js', status: 'ONLINE', color: 'text-emerald-500' },
    { name: 'Problem Solving', status: 'ARMED', color: 'text-red-500 font-bold animate-pulse' },
    { name: 'Discipline', status: 'CHARGING', color: 'text-amber-500' }
  ];
  return (
    <div className="border border-[#121d2d] bg-[#080d14]/75 p-3 sm:p-4 rounded-sm space-y-2 flex-grow shadow-[0_4px_15px_rgba(0,0,0,0.5)] select-none">
      <div className="text-[10px] text-accent/60 uppercase tracking-widest font-bold border-b border-[#121d2d] pb-1.5">
        // ARSENAL //
      </div>
      <div className="space-y-1.5 text-xs font-mono">
        {items.map(i => (
          <div key={i.name} className="flex justify-between items-center text-[#78909c]/90">
            <span className="font-semibold text-white/90">{i.name}</span>
            <span className={`text-[10px] font-bold ${i.color}`}>[{i.status}]</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const { 
    history, 
    booting, 
    theme, 
    executeCommand, 
    finishBooting, 
    handleTabComplete,
    activeProtocol,
    takeoverGlitch,
    protocolBooting,
    finishGothamBoot,
    activeMissionIndex
  } = useTerminal();
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll logic targeting the top of reading-heavy layouts
  useEffect(() => {
    if (history.length === 0 || !scrollContainerRef.current) return;
    
    const lastItem = history[history.length - 1];
    const rawCmd = lastItem.command ? lastItem.command.trim().split(/\s+/)[0].toLowerCase() : '';
    const resolvedCmd = ALIAS_MAP[rawCmd] || rawCmd;

    const isReadingCommand = (
      resolvedCmd === 'resume' ||
      resolvedCmd === 'projects' ||
      resolvedCmd === 'journey'
    );

    if (isReadingCommand) {
      const element = document.getElementById(`log-${lastItem.id}`);
      if (element) {
        scrollContainerRef.current.scrollTo({
          top: element.offsetTop - 16,
          behavior: 'smooth'
        });
        return;
      }
    }

    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
  }, [history]);

  useEffect(() => {
    if (activeProtocol && !protocolBooting && !isMobileViewport) {
      if (!ambientAudioRef.current) {
        try {
          // NOTE: Temporary audio asset. To be replaced with cinematic ambient score.
          const audio = new Audio('/audio/gotham_ambient.mp3');
          audio.loop = true;
          audio.volume = isMuted ? 0 : 0.12;
          ambientAudioRef.current = audio;
          audio.play().catch(err => {
            console.warn('Ambient audio play blocked or missing:', err);
          });
        } catch (e) {
          console.warn('Ambient audio failed to initialize:', e);
        }
      } else {
        ambientAudioRef.current.volume = isMuted ? 0 : 0.12;
      }
    } else {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
        ambientAudioRef.current = null;
      }
    }

    return () => {
      if (!activeProtocol && ambientAudioRef.current) {
        ambientAudioRef.current.pause();
        ambientAudioRef.current = null;
      }
    };
  }, [activeProtocol, protocolBooting, isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => {
      const newMute = !prev;
      if (ambientAudioRef.current) {
        ambientAudioRef.current.volume = newMute ? 0 : 0.12;
        if (!newMute) {
          ambientAudioRef.current.play().catch(e => console.warn(e));
        }
      }
      return newMute;
    });
  };

  if (booting) {
    return <BootScreen onComplete={finishBooting} />;
  }

  // 1. Full Screen Takeover Glitch overlay
  if (takeoverGlitch) {
    return (
      <div className="fixed inset-0 bg-[#060a12] text-red-500 font-mono flex flex-col justify-center items-center p-6 z-55 select-none takeover-glitch-active">
        <div className="takeover-glitch-noise" />
        <div className="border border-red-500/30 bg-red-500/5 p-8 rounded-sm shadow-[0_0_40px_rgba(239,68,68,0.15)] text-center space-y-4 max-w-md relative z-20">
          <div className="text-xl font-bold uppercase tracking-widest animate-pulse flex items-center justify-center gap-2">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <span>WARNING: DECRYPTION IN PROGRESS</span>
          </div>
          <p className="text-xs text-[#78909c] leading-relaxed">
            Wayne Enterprises proxy signature detected. Handshake established. Relaying secure channel.
          </p>
          <div className="text-[10px] text-red-500/60 pt-3 border-t border-red-500/10 italic">
            // ORACLE: SIGNAL DEVIATION STABLE //
          </div>
        </div>
      </div>
    );
  }

  // 2. Full Screen Diagnostic Boot Sequence
  if (protocolBooting && activeProtocol) {
    return <GothamBootScreen onComplete={finishGothamBoot} protocol={activeProtocol} />;
  }
  // 2B. Mobile Viewport Restriction Notice
  if (activeProtocol && isMobileViewport) {
    return (
      <div className="fixed inset-0 bg-[#04070c] text-[#78909c] font-mono flex flex-col justify-center items-center p-6 z-55 select-none text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#c5a05901_1px,transparent_1px),linear-gradient(to_bottom,#c5a05901_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#04070c_80%)] pointer-events-none z-0" />
        
        <div className="border border-red-500/30 bg-[#0c121e]/85 p-8 rounded-sm shadow-[0_0_40px_rgba(239,68,68,0.15)] max-w-md relative z-20 space-y-5">
          <div className="text-xl font-bold uppercase tracking-widest text-red-500 flex items-center justify-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            <span>BATCOMPUTER ACCESS RESTRICTED</span>
          </div>
          
          <div className="space-y-3 text-sm text-[#78909c]/90">
            <p>
              Gotham Protocol is only available on desktop and laptop devices.
            </p>
            <p className="text-xs text-[#78909c]/70">
              Your current device does not support the Batcomputer interface.
            </p>
            <p className="text-xs text-[#78909c]/70">
              Please open LNK OS on a desktop or laptop to access Gotham Protocol.
            </p>
          </div>
          
          <div className="text-xs border-t border-b border-[#121d2d] py-3 space-y-1 text-left px-2">
            <p><span className="text-[#c5a059] font-bold">Current Device:</span> Mobile</p>
            <p><span className="text-[#c5a059] font-bold">Required Device:</span> Desktop / Laptop</p>
          </div>
          
          <button 
            type="button"
            onClick={() => executeCommand('alfred')}
            className="text-xs font-mono px-4 py-2.5 border border-[#121d2d] hover:border-accent hover:text-accent bg-[#060a12] text-[#78909c] transition-all rounded-sm cursor-pointer select-none font-semibold w-full"
          >
            [ Return to LNK OS ]
          </button>
          
          <div className="text-[9px] text-[#78909c]/30 uppercase tracking-widest pt-1">
            // Wayne Enterprises Security Division //
          </div>
        </div>
      </div>
    );
  }
  // 3. Batcomputer Fullscreen Mainframe Dashboard
  if (activeProtocol) {
    return (
      <div className="min-h-screen h-screen bg-[#04070c] text-[#78909c] font-mono flex flex-col p-4 sm:p-5 relative overflow-hidden select-none">
        {/* Fullscreen low-intensity canvas rain backdrop */}
        <GothamRainEffect />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#c5a05902_1px,transparent_1px),linear-gradient(to_bottom,#c5a05902_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#04070c_80%)] pointer-events-none z-0" />

        {/* Global Tactical Header */}
        <div className="h-10 border border-[#121d2d] bg-[#080d14]/90 rounded-sm flex items-center justify-between px-4 shrink-0 select-none z-10 shadow-lg relative mb-4">
          <div className="text-[9px] sm:text-xs text-accent font-bold tracking-widest flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-ping" />
            <span className="truncate">CLASSIFIED // LEVEL 7 CLEARANCE REQUIRED // WAYNE ENTERPRISES INTERNAL</span>
          </div>
          <div className="text-[9px] sm:text-xs text-[#78909c]/60 font-semibold tracking-widest hidden md:block">
            GRID: SECTOR 4-G (EAST END)
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[9px] sm:text-xs text-[#c5a059]/80 font-bold uppercase tracking-wider">
              ORACLE FEED: ACTIVE
            </span>
            <button 
              onClick={toggleMute}
              className="text-[9px] text-[#c5a059] hover:text-white font-bold border border-[#121d2d] bg-[#0c121e] px-2 py-0.5 rounded-sm transition-all cursor-pointer inline-flex items-center"
            >
              <span>{isMuted ? '🔇 MUTED' : '🔊 ACTIVE'}</span>
            </button>
          </div>
        </div>

        {/* Tactical Panels Grid */}
        <div className="flex-grow flex flex-col lg:flex-row gap-4 min-h-0 z-10 relative">
          
          {/* Left Sidebar: Resistance Map & Network Monitoring */}
          <div className="w-full lg:w-64 shrink-0 flex flex-row lg:flex-col gap-4">
            <ResistanceMapPanel />
            <NetworkMonitoringPanel />
          </div>

          {/* Center Column: Interactive Command Terminal Console */}
          <div className="flex-grow flex flex-col min-h-0 border border-[#121d2d] bg-[#060a12]/80 backdrop-blur-sm rounded-sm shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
            {/* Console Pane Header Chrome */}
            <div className="h-9 border-b border-[#121d2d] bg-[#0c121e]/70 flex items-center justify-between px-4 shrink-0 select-none">
              <span className="text-[10px] font-bold text-accent tracking-wider">// COMMAND CONSOLE // INTEL FEED</span>
              <span className="text-[9px] font-semibold text-[#78909c]/50">LINK TYPE: SECURE</span>
            </div>

            {/* Scrollable Terminal Output Buffer */}
            <div 
              ref={scrollContainerRef}
              className="flex-grow p-4 sm:p-5 overflow-y-auto text-sm leading-relaxed space-y-4 select-text"
            >
              <div 
                className="space-y-4"
                role="log"
                aria-live="polite"
                aria-relevant="additions text"
                aria-atomic="false"
              >
                {history.map((item) => (
                  <div key={item.id} id={`log-${item.id}`} className="space-y-2">
                    {item.command && (
                      <div className="flex items-center text-[#c5a059]/90 font-semibold">
                        <span className="mr-2 text-accent">&gt;</span>
                        <span>{item.command}</span>
                      </div>
                    )}
                    <div className="pl-4 border-l border-[#121d2d]/40 py-0.5">{item.output}</div>
                  </div>
                ))}
              </div>

              {/* Console Input prompt */}
              <InputLine onSubmit={executeCommand} onTabComplete={handleTabComplete} activeProtocol={activeProtocol} />
            </div>
          </div>

          {/* Right Sidebar: Arsenal & Mission Control */}
          <div className="w-full lg:w-64 shrink-0 flex flex-row lg:flex-col gap-4">
            <ArsenalPanel />
            <MissionControlPanel activeIndex={activeMissionIndex} />
          </div>

        </div>

        {/* Global Batcomputer Footer Macro Click Command Bar */}
        <div className="border border-[#121d2d] bg-[#080d14]/95 px-4 py-3 sm:px-5 mt-4 flex flex-wrap gap-2 shrink-0 select-none justify-center sm:justify-start rounded-sm z-10 shadow-md">
          <span className="text-[10px] text-[#78909c]/40 font-bold self-center mr-2 tracking-wider select-none uppercase hidden sm:inline">
            INTEL PROTOCOLS:
          </span>
          <button 
            type="button"
            onClick={() => executeCommand('intel')}
            className="text-xs font-mono px-3 py-1.5 border border-[#121d2d] hover:border-accent hover:text-accent bg-[#060a12] text-[#78909c] transition-colors rounded-sm cursor-pointer select-none font-semibold"
          >
            [ Intel ]
          </button>
          <button 
            type="button"
            onClick={() => executeCommand('mission')}
            className="text-xs font-mono px-3 py-1.5 border border-[#121d2d] hover:border-accent hover:text-accent bg-[#060a12] text-[#78909c] transition-colors rounded-sm cursor-pointer select-none"
          >
            [ Mission ]
          </button>
          <button 
            type="button"
            onClick={() => executeCommand('arsenal')}
            className="text-xs font-mono px-3 py-1.5 border border-[#121d2d] hover:border-accent hover:text-accent bg-[#060a12] text-[#78909c] transition-colors rounded-sm cursor-pointer select-none"
          >
            [ Arsenal ]
          </button>
          <button 
            type="button"
            onClick={() => executeCommand('status')}
            className="text-xs font-mono px-3 py-1.5 border border-[#121d2d] hover:border-accent hover:text-accent bg-[#060a12] text-[#78909c] transition-colors rounded-sm cursor-pointer select-none"
          >
            [ Status ]
          </button>
          <button 
            type="button"
            onClick={() => executeCommand('batcomputer')}
            className="text-xs font-mono px-3 py-1.5 border border-[#121d2d] hover:border-accent hover:text-accent bg-[#060a12] text-[#78909c] transition-colors rounded-sm cursor-pointer select-none"
          >
            [ Batcomputer ]
          </button>
          <div className="flex-grow" />
          <button 
            type="button"
            onClick={() => executeCommand('alfred')}
            className="text-xs font-mono px-3 py-1.5 border border-red-500/30 hover:border-red-500 hover:text-red-500 bg-[#060a12] text-red-500/70 transition-colors rounded-sm cursor-pointer select-none font-semibold"
          >
            [ Alfred ]
          </button>
        </div>
      </div>
    );
  }

  // 4. Default Standard LNK OS Desktop Layout
  return (
    <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-0 sm:p-6 relative overflow-hidden select-none">
      {/* Ambient Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff6603_1px,transparent_1px),linear-gradient(to_bottom,#00ff6603_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00ff6602_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Floating OS Terminal Chassis */}
      <div className="w-full h-screen sm:h-[82vh] sm:max-w-4xl bg-bg/85 backdrop-blur-md border-0 sm:border border-border/40 sm:rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col z-10 overflow-hidden relative">
        {/* Terminal Chrome Window Header */}
        <div className="h-10 border-b border-border/30 bg-bg/95 flex items-center justify-between px-4 shrink-0 select-none">
          {/* OS Window Dot Controls */}
          <div className="flex items-center space-x-2 w-1/4">
            <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:brightness-95 transition-all" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer hover:brightness-95 transition-all" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer hover:brightness-95 transition-all" />
          </div>

          {/* Window Title */}
          <div className="text-[11px] font-semibold text-muted/70 tracking-widest text-center truncate w-2/4">
            LNK OS v1.0.0 — bash
          </div>

          {/* Theme Display indicator */}
          <div className="text-[10px] text-accent/70 font-mono text-right w-1/4 truncate hidden sm:block uppercase tracking-wider">
            theme: {theme}
          </div>
        </div>

        {/* Scrollable Terminal Output Buffer */}
        <div 
          ref={scrollContainerRef}
          className="relative flex-grow p-4 sm:p-6 overflow-y-auto font-mono text-sm leading-relaxed space-y-5 scroll-smooth select-text"
        >
          {/* Command Logs History */}
          <div 
            className="space-y-5"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-atomic="false"
          >
            {history.map((item) => (
              <div key={item.id} id={`log-${item.id}`} className="space-y-2.5">
                {item.command && (
                  <div className="flex items-center text-accent/80">
                    <span className="mr-2 text-accent">&gt;</span>
                    <span className="font-semibold text-terminal">{item.command}</span>
                  </div>
                )}
                <div className="pl-4 border-l border-border/10 py-0.5">{item.output}</div>
              </div>
            ))}
          </div>

          {/* Console Input Prompt */}
          <InputLine onSubmit={executeCommand} onTabComplete={handleTabComplete} activeProtocol={activeProtocol} />
        </div>

        {/* Persistent Touch/Click Command Bar */}
        <div className="border-t border-border/20 bg-bg/95 px-4 py-3 sm:px-6 flex flex-wrap gap-2 shrink-0 select-none justify-center sm:justify-start">
          <button 
            type="button"
            onClick={() => executeCommand('home')}
            className="text-xs font-mono px-2.5 py-1 border border-border/30 hover:border-accent hover:text-accent bg-bg/50 transition-colors rounded-sm cursor-pointer"
          >
            [ Home ]
          </button>
          <button 
            type="button"
            onClick={() => executeCommand('help')}
            className="text-xs font-mono px-2.5 py-1 border border-border/30 hover:border-accent hover:text-accent bg-bg/50 transition-colors rounded-sm cursor-pointer"
          >
            [ Help ]
          </button>
          <button 
            type="button"
            onClick={() => executeCommand('projects')}
            className="text-xs font-mono px-2.5 py-1 border border-border/30 hover:border-accent hover:text-accent bg-bg/50 transition-colors rounded-sm cursor-pointer"
          >
            [ Projects ]
          </button>
          <button 
            type="button"
            onClick={() => executeCommand('skills')}
            className="text-xs font-mono px-2.5 py-1 border border-border/30 hover:border-accent hover:text-accent bg-bg/50 transition-colors rounded-sm cursor-pointer"
          >
            [ Skills ]
          </button>
          <button 
            type="button"
            onClick={() => executeCommand('journey')}
            className="text-xs font-mono px-2.5 py-1 border border-border/30 hover:border-accent hover:text-accent bg-bg/50 transition-colors rounded-sm cursor-pointer"
          >
            [ Journey ]
          </button>
          <button 
            type="button"
            onClick={() => executeCommand('contact')}
            className="text-xs font-mono px-2.5 py-1 border border-border/30 hover:border-accent hover:text-accent bg-bg/50 transition-colors rounded-sm cursor-pointer"
          >
            [ Contact ]
          </button>
          <button 
            type="button"
            onClick={() => executeCommand('clear')}
            className="text-xs font-mono px-2.5 py-1 border border-border/30 hover:border-accent hover:text-accent bg-bg/50 transition-colors rounded-sm cursor-pointer"
          >
            [ Clear ]
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
