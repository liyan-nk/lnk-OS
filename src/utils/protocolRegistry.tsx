
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
      "Initializing surveillance network... [ OK ]",
      "Connecting Batcomputer mainframe... [ OK ]",
      "Scanning Gotham sector grid... [ OK ]",
      "Monitoring Arkham Asylum... [ OK ]",
      "Threat assessment... CRITICAL"
    ]
  },
  startupSequence: [
    "BATCOMPUTER ONLINE",
    "THREAT FEED ........ ONLINE",
    "SURVEILLANCE ........ ONLINE",
    "MISSION CONTROL ..... ONLINE",
    "UTILITY BELT ........ ONLINE",
    "ENCRYPTION .......... ACTIVE"
  ],
  lockedCommands: ['theme']
};

export const PROTOCOLS: SecretProtocol[] = [GOTHAM_PROTOCOL];

export function findProtocolByTrigger(command: string): SecretProtocol | undefined {
  const normalized = command.trim().toLowerCase();
  return PROTOCOLS.find(p => p.triggerCommand === normalized);
}
