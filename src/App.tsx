import { useEffect, useRef } from 'react';
import { useTerminal, ALIAS_MAP } from './hooks/useTerminal';
import { BootScreen } from './components/terminal/BootScreen';
import { InputLine } from './components/terminal/InputLine';
import { GothamBootScreen } from './components/terminal/GothamBootScreen';
import { GothamRainEffect } from './components/terminal/GothamRainEffect';

function App() {
  const { 
    history, 
    booting, 
    theme, 
    executeCommand, 
    finishBooting, 
    handleTabComplete,
    gothamMode,
    gothamBooting,
    finishGothamBoot
  } = useTerminal();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top of new reading-focused commands (resume, cv, projects, journey),
  // otherwise scroll to bottom of the viewport
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
        // Scroll the container so the top of this command block aligns to the top of the terminal viewport
        scrollContainerRef.current.scrollTo({
          top: element.offsetTop - 16,
          behavior: 'smooth'
        });
        return;
      }
    }

    // Default scroll to bottom
    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
  }, [history]);

  if (booting) {
    return <BootScreen onComplete={finishBooting} />;
  }

  if (gothamBooting) {
    return <GothamBootScreen onComplete={finishGothamBoot} />;
  }

  return (
    <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-0 sm:p-6 relative overflow-hidden select-none">
      {/* Ambient Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff6603_1px,transparent_1px),linear-gradient(to_bottom,#00ff6603_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00ff6602_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Gotham Atmospheric Rain Backdrop */}
      {gothamMode && <GothamRainEffect />}

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

          {/* Dynamic Console Input Prompt */}
          <InputLine onSubmit={executeCommand} onTabComplete={handleTabComplete} isGotham={gothamMode} />
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
