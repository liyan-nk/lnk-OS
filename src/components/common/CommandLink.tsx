import React from 'react';

interface CommandLinkProps {
  command: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * CommandLink component: a terminal-native clickable command token.
 * Automatically wraps contents in [ brackets ] and styles it to look
 * like a retro keyboard keycap, matching the style of the bottom command bar.
 */
export const CommandLink: React.FC<CommandLinkProps> = ({ command, children, className = '' }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('lnk-os-execute', { detail: command }));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`text-accent font-mono text-xs bg-bg/40 border border-border/30 hover:border-accent hover:text-accent hover:bg-border/20 px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer inline-block shrink-0 select-none ${className}`}
    >
      [{children || command}]
    </button>
  );
};
