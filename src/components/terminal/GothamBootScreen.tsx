import React, { useEffect, useState } from 'react';
import type { SecretProtocol } from '../../utils/protocolRegistry';

interface GothamBootScreenProps {
  onComplete: () => void;
  protocol: SecretProtocol;
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

export const GothamBootScreen: React.FC<GothamBootScreenProps> = ({ onComplete, protocol }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'lightning' | 'boot' | 'startup'>('lightning');
  const [flash, setFlash] = useState(false);
  const [visibleStartupLines, setVisibleStartupLines] = useState<string[]>([]);

  // 1. Initial Lightning Flash
  useEffect(() => {
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
      if (logIdx < protocol.bootSequence.logs.length) {
        setLogs((prev) => [...prev, protocol.bootSequence.logs[logIdx]]);
        logIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 300);

    const ambientFlash = setTimeout(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 100);
    }, 1200);

    return () => {
      clearInterval(logInterval);
      clearTimeout(ambientFlash);
    };
  }, [phase, protocol.bootSequence.logs]);

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
            setPhase('startup');
          }, 300);
        }
      }, 30);

      return () => clearInterval(progressInterval);
    }, 1200);

    return () => clearTimeout(startDelay);
  }, [phase]);

  // 4. Startup Sequence Sequential Animation
  useEffect(() => {
    if (phase !== 'startup') return;

    let currentLine = 0;
    const lines = protocol.startupSequence;

    const showNextLine = () => {
      if (currentLine < lines.length) {
        setVisibleStartupLines((prev) => [...prev, lines[currentLine]]);
        currentLine++;
        setTimeout(showNextLine, 250); // Animate next line after 250ms
      } else {
        // All lines displayed, hold for 1.5s and trigger complete
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    };

    showNextLine();
  }, [phase, protocol.startupSequence, onComplete]);

  const renderProgressBar = () => {
    const totalBars = 20;
    const filled = Math.floor((progress / 100) * totalBars);
    const empty = totalBars - filled;
    return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${progress}%`;
  };

  return (
    <div className="fixed inset-0 bg-[#060a12] text-[#78909c] font-mono flex flex-col justify-center items-center p-6 z-50 select-none">
      {/* Glitch Overlay scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40 z-10" />

      {/* Lightning Flash Overlay */}
      <div 
        className={`fixed inset-0 bg-white pointer-events-none transition-opacity duration-75 z-55 ${
          flash ? 'opacity-85' : 'opacity-0'
        }`} 
      />

      <div className="w-full max-w-lg space-y-6 relative z-20">
        {phase === 'startup' ? (
          <div className="space-y-4 border border-[#c5a059]/30 bg-[#0c121e]/40 p-6 rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.1)]">
            <div className="text-[10px] text-accent/50 uppercase tracking-widest mb-2 font-semibold">
              // CLASSIFIED // LEVEL 7 CLEARANCE REQUIRED //
            </div>
            <div className="space-y-2 text-sm font-semibold">
              {visibleStartupLines.map((line, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center ${
                    idx === 0 ? 'text-[#c5a059] font-bold text-base border-b border-[#c5a059]/20 pb-1 mb-2' : 'text-[#78909c]'
                  }`}
                >
                  <span className="mr-2">&gt;</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Bat-Logo */}
            <pre className="text-xs sm:text-sm font-bold text-[#c5a059]/80 whitespace-pre leading-none drop-shadow-[0_0_8px_rgba(197,160,89,0.3)] mx-auto w-fit">
              {BAT_LOGO}
            </pre>

            {/* Diagnostic Logs */}
            <div className="h-40 flex flex-col justify-end space-y-1.5 text-xs text-[#78909c]/80 border-t border-b border-[#121d2d]/60 py-3 font-mono">
              <div className="text-[10px] text-accent/40 uppercase tracking-wider mb-1 font-bold">
                {protocol.bootSequence.title}
              </div>
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
                <div className="text-xs text-[#78909c]/60">Decryption & Uplink status:</div>
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
