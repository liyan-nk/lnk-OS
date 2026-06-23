import React, { useEffect, useRef } from 'react';

export const GothamRainEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Rain drop model
    const maxDrops = 75;
    const drops: Array<{ x: number; y: number; length: number; speed: number; opacity: number }> = [];

    for (let i = 0; i < maxDrops; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 15 + 10,
        speed: Math.random() * 6 + 4,
        opacity: Math.random() * 0.12 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Rain
      ctx.strokeStyle = '#78909c';
      ctx.lineWidth = 1;
      for (let i = 0; i < maxDrops; i++) {
        const drop = drops[i];
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.globalAlpha = drop.opacity;
        ctx.stroke();

        // Update position
        drop.y += drop.speed;
        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Rain Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Muted Gotham Skyline SVG Outline */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-[0.04] text-[#78909c] pointer-events-none select-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,120 L0,80 L20,80 L20,90 L40,90 L40,60 L60,60 L60,100 L90,100 L90,50 L110,50 L110,105 L140,105 L140,40 L165,40 L165,65 L180,65 L180,95 L220,95 L220,30 L250,30 L250,110 L280,110 L280,75 L310,75 L310,55 L330,55 L330,100 L370,100 L370,25 L400,25 L400,85 L420,85 L420,60 L450,60 L450,90 L480,90 L480,45 L510,45 L510,105 L550,105 L550,35 L590,35 L590,95 L620,95 L620,70 L650,70 L650,50 L680,50 L680,105 L720,105 L720,20 L750,20 L750,90 L780,90 L780,60 L810,60 L810,100 L840,100 L840,40 L870,40 L870,110 L910,110 L910,80 L940,80 L940,55 L965,55 L965,95 L1000,95 L1000,30 L1030,30 L1030,105 L1060,105 L1060,65 L1100,65 L1100,85 L1130,85 L1130,45 L1170,45 L1170,100 L1200,100 L1200,120 Z" />
        </svg>
      </div>
    </div>
  );
};
