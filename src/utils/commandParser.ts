export interface ParsedCommand {
  command: string;
  args: string[];
}

/**
 * Parses user input by trimming whitespace, splitting by space tokens,
 * and converting the primary command keyword to lowercase.
 */
export const parseCommand = (input: string): ParsedCommand => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { command: '', args: [] };
  }
  const parts = trimmed.split(/\s+/);
  return {
    command: parts[0].toLowerCase(),
    args: parts.slice(1)
  };
};
