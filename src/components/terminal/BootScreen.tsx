import React, { useEffect, useState } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

const ASCII_LOGO = `
 _      _   _ _  __   ____   _____ 
| |    | \\ | | |/ /  / __ \\ / ____|
| |    |  \\| | ' /  | |  | | (___  
| |    | . \` |  <   | |  | |\\___ \\ 
| |____| |\\  | . \\  | |__| |____) |
|______|_| \\_|_|\\_\\  \\____/|_____/ 
`;

const SYSTEM_LOGS = [
  "LNK OS Kernel v1.0.0 init...",
  "Loading encryption modules... OK",
  "Connecting nodes... OK",
  "Mounting root directories... OK",
  "Executing security policies... OK",
];

/**
 * BootScreen component simulating a diagnostics startup.
 * Completes strictly within 1.0 to 1.2 seconds, featuring an ASCII logo,
 * "Forged in Silence" branding, and immediate ESC skip.
 */
export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'intro' | 'loading' | 'finishing'>('intro');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Staggered log printing (0 - 450ms)
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < SYSTEM_LOGS.length) {
        setLogs((prev) => [...prev, SYSTEM_LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        setPhase('loading');
      }
    }, 70);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  // Loading progress bar animation (450ms - 950ms)
  useEffect(() => {
    if (phase !== 'loading') return;

    const startTime = Date.now();
    const duration = 450; // 450ms progress animation

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const computedProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(computedProgress);

      if (computedProgress >= 100) {
        clearInterval(progressInterval);
        setPhase('finishing');
        // Finish diagnostic load
        setTimeout(onComplete, 80);
      }
    }, 25);

    return () => clearInterval(progressInterval);
  }, [phase, onComplete]);

  // Render visual progress bar string
  const renderProgressBar = () => {
    const totalBars = 20;
    const filledBars = Math.floor((progress / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return `[${'█'.repeat(filledBars)}${'░'.repeat(emptyBars)}] ${progress}%`;
  };

  return (
    <div 
      className="fixed inset-0 bg-bg text-terminal font-mono flex flex-col justify-center items-center p-6 z-50 select-none"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="Booting LNK OS"
    >
      <div className="w-full max-w-lg space-y-6">
        {/* Glowing ASCII Logo */}
        <pre className="text-xs sm:text-sm font-bold text-accent whitespace-pre leading-none drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
          {ASCII_LOGO}
        </pre>
        
        {/* Tagline */}
        <div className="text-center tracking-widest text-xs text-muted/80 uppercase">
          — Forged in Silence —
        </div>

        {/* Boot System Logs */}
        <div className="h-28 flex flex-col justify-end space-y-1 text-xs text-terminal/80 border-t border-b border-border/30 py-3">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-center">
              <span className="text-accent/60 mr-1.5">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>

        {/* Diagnostic Progress Bar */}
        <div className="space-y-1.5">
          <div className="text-xs text-muted flex justify-between">
            <span>Loading LNK OS modules...</span>
          </div>
          <div className="font-mono text-sm text-accent/90">
            {renderProgressBar()}
          </div>
        </div>
      </div>

      {/* Skip Button */}
      <div className="absolute bottom-6 right-6 text-xs text-muted/50 animate-pulse">
        [Press ESC to skip intro]
      </div>
    </div>
  );
};
