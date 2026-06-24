import React, { useState, useRef, useEffect } from 'react';
import { getAutocomplete } from '../../hooks/useTerminal';
import type { SecretProtocol } from '../../utils/protocolRegistry';

interface InputLineProps {
  onSubmit: (input: string) => void;
  onTabComplete: (input: string) => string | null;
  activeProtocol?: SecretProtocol | null;
}

/**
 * Custom console input line with custom cursor styling:
 * Solid blinking cursor when focused, hollow box outline when blurred.
 */
export const InputLine: React.FC<InputLineProps> = ({ onSubmit, onTabComplete, activeProtocol = null }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const ghostSuggestion = getAutocomplete(inputValue, !!activeProtocol).ghostSuffix;

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (window.getSelection()?.toString()) {
        return;
      }
      const target = e.target as HTMLElement;
      
      // If we clicked a button, link, or interactive command chip, restore focus to the input
      if (target.closest('button, a, [role="button"], .cursor-pointer')) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
        return;
      }
      
      if (target.closest('input, select, textarea')) {
        return;
      }
      
      inputRef.current?.focus();
    };

    const handleExecuteRefocus = () => {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    };

    document.addEventListener('click', handleGlobalClick);
    window.addEventListener('lnk-os-execute', handleExecuteRefocus);
    
    // Auto-focus on mount
    inputRef.current?.focus();

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('lnk-os-execute', handleExecuteRefocus);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const { completedValue } = getAutocomplete(inputValue, !!activeProtocol);
      if (completedValue) {
        setInputValue(completedValue);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = inputRef.current.selectionEnd = completedValue.length;
          }
        }, 0);
        return;
      }

      const completed = onTabComplete(inputValue);
      if (completed) {
        setInputValue(completed);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = inputRef.current.selectionEnd = completed.length;
          }
        }, 0);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setInputValue('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full font-mono text-terminal mt-1">
      <span className="text-accent mr-2 shrink-0">{activeProtocol ? activeProtocol.prompt : 'visitor@lnk-os:~$'}</span>
      <div className="relative flex-grow flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-hidden border-none text-terminal font-mono caret-transparent relative z-10"
          autoFocus
          autoCapitalize="none"
          autoComplete="off"
          spellCheck="false"
          aria-label="Terminal command input"
        />
        {/* Custom cursor overlay */}
        <div className="absolute left-0 top-0 bottom-0 pointer-events-none flex items-center z-0 font-mono text-sm leading-relaxed">
          <span className="relative flex items-center">
            <span className="text-terminal invisible whitespace-pre">{inputValue}</span>
            <span 
              className={`absolute top-1/2 -translate-y-1/2 w-[1ch] h-[1.2em] ${
                isFocused 
                  ? 'bg-terminal/90 animate-terminal-blink' 
                  : 'border border-terminal bg-transparent'
              }`}
              style={{ left: '100%' }}
            />
          </span>

          {ghostSuggestion && (
            <span className="text-terminal/35 font-mono select-none whitespace-pre">
              {ghostSuggestion}
            </span>
          )}
        </div>
      </div>
    </form>
  );
};
