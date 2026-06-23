import React, { useEffect, useRef, useState } from 'react';
import type { SecretProtocol } from '../../utils/protocolRegistry';

interface CustomCursorProps {
  activeProtocol: SecretProtocol | null;
  protocolBooting: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ activeProtocol, protocolBooting }) => {
  const [isTouch, setIsTouch] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isInput, setIsInput] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);
  const currentX = useRef<number>(0);
  const currentY = useRef<number>(0);

  // Check if touch device on mount
  useEffect(() => {
    const checkTouch = () => {
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const touchAvailable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouch(coarsePointer || touchAvailable);
    };

    checkTouch();
    setIsVisible(true);
  }, []);

  // Track mouse coordinates & check hover states
  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, [role="button"], .cursor-pointer, select');
        setIsHovering(!!clickable);

        const inputField = target.closest('input, textarea');
        setIsInput(!!inputField);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouch, isVisible]);

  // requestAnimationFrame interpolation loop
  useEffect(() => {
    if (isTouch) return;

    let animationFrameId: number;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lerpFactor = prefersReducedMotion ? 1.0 : 0.18;

    const updatePosition = () => {
      // Interpolate current position towards target mouse position
      currentX.current += (mouseX.current - currentX.current) * lerpFactor;
      currentY.current += (mouseY.current - currentY.current) * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const showGotham = activeProtocol?.id === 'gotham' && !protocolBooting;

  return (
    <div
      ref={cursorRef}
      role="presentation"
      className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-normal transition-opacity duration-300"
      style={{
        opacity: isVisible ? (isInput ? 0.35 : 1) : 0,
        width: 0,
        height: 0
      }}
    >
      {/* Container to handle centering relative to coordinates */}
      <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        
        {/* Standard LNK OS Cursor (Hollow Square) */}
        <div
          className={`absolute transition-all duration-300 ease-out border-2 border-accent rounded-xs w-4 h-4 bg-accent/5 ${
            showGotham ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
          } ${isHovering ? 'scale-150 bg-accent/15 border-accent' : ''}`}
        />

        {/* Gotham Protocol Tactical Cursor (Minimalist Concentric Target Reticle) */}
        <div
          className={`absolute transition-all duration-400 ease-out ${
            showGotham ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            {/* Center target dot */}
            <div className="w-1 h-1 bg-[#c5a059] rounded-full shadow-[0_0_4px_#c5a059]" />
            
            {/* Minimalist target ring */}
            <div 
              className={`absolute inset-0 border border-[#c5a059]/40 rounded-full transition-transform duration-300 ease-out ${
                isHovering ? 'scale-135 border-[#c5a059]' : 'animate-pulse'
              }`} 
            />

            {/* Tactical hairline ticks */}
            <div 
              className={`absolute border-t border-b border-[#c5a059]/20 w-[1px] h-[calc(100%+10px)] left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
                isHovering ? 'opacity-40' : 'opacity-20'
              }`} 
            />
            <div 
              className={`absolute border-l border-r border-[#c5a059]/20 h-[1px] w-[calc(100%+10px)] top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                isHovering ? 'opacity-40' : 'opacity-20'
              }`} 
            />
          </div>
        </div>

      </div>
    </div>
  );
};
export default CustomCursor;
