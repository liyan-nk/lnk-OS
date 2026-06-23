import React, { useEffect, useState } from 'react';

interface GothamBootScreenProps {
  onComplete: () => void;
}

const BAT_LOGO = `
       .---.         .---.
      /     \\  _._  /     \\
     \\_.-._  \\(_._)/  _.-._/
          \\ \\  -.-  / /
           \\ \\     / /
            \\ '---' /
             \\     /
              '---'
`;

const BOOT_LOGS = [
  "WAYNE ENTERPRISES SECURE TERMINAL v8.12",
  "────────────────────────────────────────",
  "Initializing surveillance network... [ OK ]",
  "Connecting Batcomputer mainframe... [ OK ]",
  "Monitoring Gotham City sector grids... [ OK ]",
  "Scanning Arkham Asylum database... [ OK ]",
  "Threat assessment... CRITICAL",
];

export const GothamBootScreen: React.FC<GothamBootScreenProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'lightning' | 'boot' | 'splash'>('lightning');
  const [flash, setFlash] = useState(false);

  // 1. Initial Lightning Flash
  useEffect(() => {
    // Trigger double lightning flash on mount
    setFlash(true);
    const firstOff = setTimeout(() => setFlash(false), 150);
    const secondOn = setTimeout(() => setFlash(true), 250);
    const secondOff = setTimeout(() => {
      setFlash(false);
      setPhase('boot');
    }, 400);

    return () => {
      clearTimeout(firstOff);
      clearTimeout(secondOn);
      clearTimeout(secondOff);
    };
  }, []);

  // 2. Boot Logging Sequence
  useEffect(() => {
    if (phase !== 'boot') return;

    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[logIdx]]);
        logIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 350);

    // Subtle ambient flash during boot logs
    const ambientFlash = setTimeout(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 100);
    }, 1500);

    return () => {
      clearInterval(logInterval);
      clearTimeout(ambientFlash);
    };
  }, [phase]);

  // 3. Progress Bar Animation
  useEffect(() => {
    if (phase !== 'boot') return;

    const startDelay = setTimeout(() => {
      const startTime = Date.now();
      const duration = 1200; // 1.2s loading bar
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const computed = Math.min(Math.floor((elapsed / duration) * 100), 100);
        setProgress(computed);

        if (computed >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setPhase('splash');
          }, 400);
        }
      }, 30);

      return () => clearInterval(progressInterval);
    }, 1500); // Start loading bar after logs start showing

    return () => clearTimeout(startDelay);
  }, [phase]);

  // 4. Splash Timer Transition
  useEffect(() => {
    if (phase !== 'splash') return;

    const transitionTimer = setTimeout(() => {
      onComplete();
    }, 2200); // Show splash for 2.2 seconds

    return () => clearTimeout(transitionTimer);
  }, [phase, onComplete]);

  const renderProgressBar = () => {
    const totalBars = 20;
    const filled = Math.floor((progress / 100) * totalBars);
    const empty = totalBars - filled;
    return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${progress}%`;
  };

  return (
    <div className="fixed inset-0 bg-[#060a12] text-[#78909c] font-mono flex flex-col justify-center items-center p-6 z-50 select-none">
      {/* Lightning Flash Overlay */}
      <div 
        className={`fixed inset-0 bg-white pointer-events-none transition-opacity duration-75 z-55 ${
          flash ? 'opacity-90' : 'opacity-0'
        }`} 
      />

      <div className="w-full max-w-lg space-y-6">
        {phase === 'splash' ? (
          <div className="text-center space-y-5 animate-pulse">
            <h1 className="text-[#c5a059] font-bold text-2xl tracking-widest drop-shadow-[0_0_12px_rgba(197,160,89,0.4)]">
              GOTHAM PROTOCOL ACTIVE
            </h1>
            <div className="space-y-1 text-sm text-[#78909c]/90">
              <p>Crime doesn't sleep.</p>
              <p>Neither do you.</p>
            </div>
            <p className="text-xs text-[#c5a059]/75 pt-3">
              Type <span className="border border-[#c5a059]/30 px-1.5 py-0.5 rounded-xs font-semibold">[mission]</span> to receive your assignment.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Bat-Logo */}
            <pre className="text-xs sm:text-sm font-bold text-[#c5a059]/80 whitespace-pre leading-none drop-shadow-[0_0_8px_rgba(197,160,89,0.3)] mx-auto w-fit">
              {BAT_LOGO}
            </pre>

            {/* Diagnostic Logs */}
            <div className="h-40 flex flex-col justify-end space-y-1 text-xs text-[#78909c]/80 border-t border-b border-[#121d2d]/60 py-3">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="text-[#c5a059] mr-1.5">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            {progress > 0 && (
              <div className="space-y-1">
                <div className="text-xs text-[#78909c]/60">Batcomputer uplink status:</div>
                <div className="font-mono text-sm text-[#c5a059]/90">
                  {renderProgressBar()}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
