
export interface SecretProtocol {
  id: string;
  triggerCommand: string;
  exitCommand: string;
  prompt: string;
  themeClass: string;
  bootSequence: {
    title: string;
    logs: string[];
  };
  startupSequence: string[];
  lockedCommands: string[];
}

export const GOTHAM_PROTOCOL: SecretProtocol = {
  id: 'gotham',
  triggerCommand: 'batman',
  exitCommand: 'alfred',
  prompt: 'batman@gotham:~$',
  themeClass: 'gotham',
  bootSequence: {
    title: 'WAYNE ENTERPRISES SECURE CHANNEL DETECTED',
    logs: [
      "Initializing LNK Network sweep... [ OK ]",
      "Establishing secure Batcomputer mainframe uplink... [ OK ]",
      "Syncing KMCT CEETM node protocols... [ OK ]",
      "Verifying GitHub & LinkedIn integration... [ OK ]",
      "Opposition threat assessment... CRITICAL"
    ]
  },
  startupSequence: [
    "BATCOMPUTER ONLINE",
    "RESISTANCE MAP ...... ONLINE",
    "NETWORK MONITOR ..... ONLINE",
    "MISSION CONTROL ..... ONLINE",
    "ARSENAL ............. ONLINE",
    "ENCRYPTION .......... ACTIVE"
  ],
  lockedCommands: ['theme']
};

export const PROTOCOLS: SecretProtocol[] = [GOTHAM_PROTOCOL];

export function findProtocolByTrigger(command: string): SecretProtocol | undefined {
  const normalized = command.trim().toLowerCase();
  return PROTOCOLS.find(p => p.triggerCommand === normalized);
}
