import React from 'react';
import { 
  bioInfo, 
  projects, 
  skills, 
  educationHistory, 
  leadershipExperience, 
  workExperience, 
  certifications, 
  contactInfo,
  interests
} from '../data/portfolio';
import { CommandLink } from '../components/common/CommandLink';

/**
 * Registry mapping valid command strings to React elements displaying portfolio copy.
 * Uses Liyan's real resume and LinkedIn data.
 */
export const commandRegistry: Record<string, () => React.ReactNode> = {
  help: () => {
    const isGotham = document.documentElement.getAttribute('data-theme') === 'gotham';
    if (isGotham) {
      return (
        <div className="space-y-1.5 text-terminal select-text">
          <p className="text-[#c5a059]/80 mb-1.5 font-bold">// GOTHAM PROTOCOL OVERLAY ACTIVE (Click to execute)</p>
          <div className="space-y-1">
            <p className="text-[#c5a059]/60 font-semibold font-mono border-b border-[#c5a059]/20 pb-0.5 mb-1">Standard Commands:</p>
            <p>  <CommandLink command="about">about</CommandLink>    - Profile summary and background</p>
            <p>  <CommandLink command="projects">projects</CommandLink> - View developed software projects</p>
            <p>  <CommandLink command="skills">skills</CommandLink>   - List core language and framework proficiencies</p>
            <p>  <CommandLink command="resume">resume</CommandLink>   - View complete curriculum vitae summary</p>
            <p>  <CommandLink command="journey">journey</CommandLink>  - View chronological career and learning timeline</p>
            <p>  <CommandLink command="contact">contact</CommandLink>  - View email and communication links</p>
            <p>  <CommandLink command="whoami">whoami</CommandLink>   - Print current user identity card</p>
            <p>  <CommandLink command="neofetch">neofetch</CommandLink> - Display stylized developer system details summary</p>
            <p>  <CommandLink command="theme">theme</CommandLink>    - List available themes and switch variants</p>
            <p>  <CommandLink command="home">home</CommandLink>     - Return terminal to the original welcome logs</p>
            <p>  <CommandLink command="clear">clear</CommandLink>    - Clear console display buffer</p>
            
            <p className="text-[#c5a059]/60 font-semibold font-mono border-b border-[#c5a059]/20 pb-0.5 mt-3.5 mb-1">Gotham Protocol Commands:</p>
            <p>  <CommandLink command="mission">mission</CommandLink>  - Retrieve tactical assignment parameters</p>
            <p>  <CommandLink command="villains">villains</CommandLink> - Threat assessment of active criminal targets</p>
            <p>  <CommandLink command="gadgets">gadgets</CommandLink>  - Technical specifications of active tactical gear</p>
            <p>  <CommandLink command="batcomputer">batcomputer</CommandLink> - Batcave mainframe diagnostics and telemetry</p>
            <p>  <CommandLink command="alfred">alfred</CommandLink>   - Terminate connection and restore original state</p>
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-1.5 text-terminal">
        <p className="text-muted/65 mb-1.5">// LNK OS Command Dictionary (Click any command to execute)</p>
        <div className="space-y-1">
          <p>  <CommandLink command="about">about</CommandLink>    - Profile summary and background</p>
          <p>  <CommandLink command="projects">projects</CommandLink> - View developed software projects</p>
          <p>  <CommandLink command="skills">skills</CommandLink>   - List core language and framework proficiencies</p>
          <p>  <CommandLink command="resume">resume</CommandLink> / <CommandLink command="cv">cv</CommandLink>     - View complete curriculum vitae summary</p>
          <p>  <CommandLink command="journey">journey</CommandLink>  - View chronological career and learning timeline</p>
          <p>  <CommandLink command="contact">contact</CommandLink>  - View email and communication links</p>
          <p>  <CommandLink command="whoami">whoami</CommandLink>   - Print current user identity card</p>
          <p>  <CommandLink command="neofetch">neofetch</CommandLink> - Display stylized developer system details summary</p>
          <p>  <CommandLink command="theme">theme</CommandLink>    - List available themes and switch variants</p>
          <p>  <CommandLink command="home">home</CommandLink>     - Return terminal to the original welcome logs</p>
          <p>  <CommandLink command="clear">clear</CommandLink>    - Clear console display buffer</p>
        </div>
      </div>
    );
  },
  about: () => (
    <div className="space-y-2.5 text-terminal max-w-2xl">
      <div className="flex items-center space-x-2">
        <h3 className="text-accent font-bold text-lg">{bioInfo.name}</h3>
        <span className="text-[10px] font-mono px-2 py-0.5 border border-border/40 text-muted rounded-full uppercase tracking-wider">{bioInfo.title}</span>
      </div>
      <p className="text-sm font-medium border-l-2 border-accent/40 pl-3 py-0.5 leading-relaxed text-terminal/95">{bioInfo.intro}</p>
      {bioInfo.fullText.map((para, idx) => (
        <p key={idx} className="text-sm leading-relaxed text-terminal/90">{para}</p>
      ))}
      <p className="text-xs text-muted pt-1">
        Explore my timelines via <CommandLink command="journey">journey</CommandLink> or view specific tech under <CommandLink command="skills">skills</CommandLink>.
      </p>
    </div>
  ),
  projects: () => (
    <div className="space-y-5 text-terminal max-w-2xl">
      {projects.map((proj, idx) => (
        <div key={idx} className="border border-border/40 rounded-xs overflow-hidden bg-bg/40 shadow-lg">
          {/* Header row / tab */}
          <div className="border-b border-border/30 bg-border/10 px-4 py-2.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div>
              <h4 className="text-accent font-bold text-base tracking-wide">{proj.title}</h4>
              <span className="text-[10px] text-muted font-mono uppercase tracking-wider">{proj.type}</span>
            </div>
            {proj.liveUrl && (
              <a 
                href={proj.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] font-mono border border-accent text-accent hover:bg-accent hover:text-bg px-2.5 py-1 rounded-sm transition-all font-bold uppercase tracking-wider shrink-0 self-start sm:self-center cursor-pointer inline-flex items-center space-x-1"
              >
                <span>[ Live Demo ]</span>
                <span className="text-[9px]">↗</span>
              </a>
            )}
          </div>
          
          {/* Content Pane details */}
          <div className="p-4 space-y-3.5">
            <p className="text-sm leading-relaxed text-terminal/90 font-medium">
              {proj.description}
            </p>
            
            {/* Tech tag list */}
            <div className="border-t border-border/20 pt-3.5 space-y-1.5">
              <span className="text-[10px] font-mono text-muted uppercase font-bold tracking-wider">Stack Details:</span>
              <div className="flex flex-wrap gap-1.5">
                {proj.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 bg-border/20 border border-border/30 text-terminal/70 rounded-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  skills: () => (
    <div className="space-y-4 text-terminal max-w-xl">
      {skills.map((cat, idx) => (
        <div key={idx} className="space-y-1.5">
          <h5 className="text-accent font-semibold text-xs uppercase tracking-wider">{cat.category}</h5>
          <div className="grid grid-cols-2 gap-2">
            {cat.skills.map((skill, sIdx) => (
              <div key={sIdx} className="text-sm border border-border/20 bg-bg/25 px-3 py-1.5 rounded-sm flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 bg-accent/60 rounded-full shrink-0 animate-pulse"></span>
                <span className="truncate">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  resume: () => (
    <div className="space-y-5 text-terminal max-w-2xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 border-b border-border/20 pb-2">
        <div>
          <h3 className="text-accent font-bold text-base uppercase tracking-wider">Curriculum Vitae</h3>
          <p className="text-xs text-muted font-mono">{bioInfo.name} — {bioInfo.title}</p>
        </div>
        <a 
          href="/resume.pdf"
          download="Liyan_Nechikaden_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-mono border border-accent text-accent hover:bg-accent hover:text-bg px-2.5 py-1 rounded-sm transition-all font-bold uppercase tracking-wider inline-flex items-center space-x-1 shrink-0 self-start sm:self-center cursor-pointer select-none"
        >
          <span>[ Download Resume PDF ]</span>
          <span className="text-[9px]">▼</span>
        </a>
      </div>
      
      {/* Education block */}
      <div className="space-y-2">
        <h4 className="text-accent font-semibold text-xs uppercase tracking-wider">01. Education</h4>
        {educationHistory.map((edu, idx) => (
          <div key={idx} className="border-l border-border/30 pl-3.5 space-y-0.5 text-sm">
            <p className="font-semibold">{edu.degree} in {edu.branch}</p>
            <p className="text-xs text-accent/80 font-medium">{edu.institution}</p>
            <p className="text-xs text-muted">{edu.university} | Expected Graduation: {edu.expectedGraduation}</p>
            <p className="text-xs text-muted">{edu.location}</p>
          </div>
        ))}
      </div>

      {/* Certifications block */}
      <div className="space-y-2">
        <h4 className="text-accent font-semibold text-xs uppercase tracking-wider">02. Certifications</h4>
        <ul className="list-none space-y-1.5 pl-3.5 border-l border-border/30 text-sm">
          {certifications.map((cert, idx) => (
            <li key={idx} className="flex items-center">
              <span className="text-accent/60 mr-2">-</span>
              <span>{cert}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Leadership block */}
      <div className="space-y-2.5">
        <h4 className="text-accent font-semibold text-xs uppercase tracking-wider">03. Leadership Positions</h4>
        {leadershipExperience.map((lead, idx) => (
          <div key={idx} className="border-l border-border/30 pl-3.5 space-y-0.5 text-sm">
            <p className="font-semibold text-terminal">{lead.role}</p>
            <p className="text-xs text-accent/80 font-medium">{lead.organization}</p>
            <p className="text-xs text-muted">{lead.responsibilities}</p>
          </div>
        ))}
      </div>

      {/* Experience block */}
      <div className="space-y-2.5">
        <h4 className="text-accent font-semibold text-xs uppercase tracking-wider">04. Experience Summary</h4>
        {workExperience.map((work, idx) => (
          <div key={idx} className="border-l border-border/30 pl-3.5 space-y-1.5 text-sm">
            <div className="flex justify-between items-center">
              <p className="font-semibold">{work.role}</p>
              <span className="text-xs text-muted">{work.duration}</span>
            </div>
            <ul className="list-none space-y-1 text-sm text-terminal/80">
              {work.highlights.map((high, hIdx) => (
                <li key={hIdx} className="flex items-start">
                  <span className="text-accent/60 mr-2 shrink-0">-</span>
                  <span>{high}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  ),
  journey: () => (
    <div className="space-y-4 text-terminal font-mono max-w-xl">
      <p className="text-muted/65 mb-1.5">// Chronological Timeline</p>
      <div className="relative border-l border-border/30 pl-4 space-y-6 ml-2.5">
        {/* Present block */}
        <div className="relative">
          <div className="absolute -left-[21.5px] top-1.5 w-2 h-2 bg-accent border border-bg rounded-full"></div>
          <span className="text-xs text-accent/80 font-bold">2025 - PRESENT</span>
          <h5 className="font-semibold text-sm">B.Tech Computer Science Engineering</h5>
          <p className="text-xs text-muted/90">KMCT College of Engineering and Emerging Technology (KMCT CEETM)</p>
          <p className="text-[10px] text-muted/70">Kerala Technological University</p>
        </div>

        {/* Leadership block */}
        <div className="relative">
          <div className="absolute -left-[21.5px] top-1.5 w-2 h-2 bg-border border border-bg rounded-full"></div>
          <span className="text-xs text-muted">LEADERSHIP CO-ORDINATION</span>
          <h5 className="font-semibold text-sm">Union Chairperson</h5>
          <p className="text-xs text-muted/90">KMCT CEETM (Coordinate student activities and technical events)</p>
        </div>

        {/* Sciensters Science Club */}
        <div className="relative">
          <div className="absolute -left-[21.5px] top-1.5 w-2 h-2 bg-border border border-bg rounded-full"></div>
          <span className="text-xs text-muted">CLUB COORDINATION</span>
          <h5 className="font-semibold text-sm">Media Coordinator & General Secretary</h5>
          <p className="text-xs text-muted/90">Sciensters Science Club (Managed digital outreach and engagement)</p>
        </div>

        {/* Freelance block */}
        <div className="relative">
          <div className="absolute -left-[21.5px] top-1.5 w-2 h-2 bg-border border border-bg rounded-full"></div>
          <span className="text-xs text-muted">JAN 2023 - DEC 2024</span>
          <h5 className="font-semibold text-sm">Freelance Web Developer</h5>
          <ul className="list-none space-y-1 text-xs text-muted/90 mt-1">
            <li className="flex items-start">
              <span className="text-accent/60 mr-1.5">-</span>
              <span>Built SEO-optimized business websites (1,500+ monthly visitors).</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent/60 mr-1.5">-</span>
              <span>Delivered school portal and lead-generation tools.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
  whoami: () => (
    <div className="space-y-2.5 text-terminal font-mono max-w-xl">
      <h4 className="text-accent font-bold text-base">Liyan Nechikaden</h4>
      <div className="border-t border-border/20 pt-2 space-y-1 text-sm">
        <p><span className="text-muted">Role       :</span> B.Tech Computer Science & Engineering Student</p>
        <p><span className="text-muted">Institution:</span> KMCT CEETM</p>
        <p><span className="text-muted">University :</span> Kerala Technological University</p>
        <p><span className="text-muted">Location   :</span> Kerala, India</p>
        <p><span className="text-muted">Interests  :</span> {interests.join(', ')}</p>
        <p><span className="text-muted">Motto      :</span> Forged in Silence</p>
      </div>
      <p className="text-xs text-muted pt-1">
        Type <CommandLink command="resume">resume</CommandLink> to print a full academic CV or <CommandLink command="projects">projects</CommandLink> to view developments.
      </p>
    </div>
  ),
  contact: () => (
    <div className="space-y-2 text-terminal">
      <p className="text-muted/65 mb-1.5">// Connect Details</p>
      <div className="space-y-1.5 font-mono text-sm">
        <p>Email    : <a href={`mailto:${contactInfo.email}`} className="underline hover:text-accent">{contactInfo.email}</a></p>
        <p>GitHub   : <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">{contactInfo.github}</a></p>
        <p>LinkedIn : <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">{contactInfo.linkedin}</a></p>
      </div>
    </div>
  ),
  neofetch: () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'mint';
    const isGotham = activeTheme === 'gotham';
    const isUnlocked = localStorage.getItem('lnk-os-secret-gotham-unlocked') === 'true';

    if (isGotham) {
      const batcomputerAscii = `
       .---.         .---.
      /     \\  _._  /     \\
     \\_.-._  \\(_._)/  _.-._/
          \\ \\  -.-  / /
           \\ \\     / /
            \\ '---' /
             \\     /
              '---'
`;
      return (
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 font-mono text-sm text-[#78909c] leading-relaxed">
          <pre className="text-[#c5a059] text-xs font-bold select-none leading-none drop-shadow-[0_0_8px_rgba(197,160,89,0.4)] mx-auto sm:mx-0">
            {batcomputerAscii}
          </pre>
          <div className="space-y-1">
            <p className="text-[#c5a059] font-bold text-base mb-1.5">batman@batcave</p>
            <p className="text-[#c5a059]/30">----------------------</p>
            <p><span className="text-[#c5a059] font-semibold">User:</span> Bruce Wayne</p>
            <p><span className="text-[#c5a059] font-semibold">Uplink:</span> Batcomputer Mainframe</p>
            <p><span className="text-[#c5a059] font-semibold">OS:</span> Wayne Secure OS v8.12</p>
            <p><span className="text-[#c5a059] font-semibold">Location:</span> Batcave, Gotham City</p>
            <p><span className="text-[#c5a059] font-semibold">Grid Sector:</span> 4-G (Downtown / East End)</p>
            <p><span className="text-[#c5a059] font-semibold">Status:</span> Operational</p>
            <p><span className="text-[#c5a059] font-semibold">Satellites:</span> Brother Eye Uplink (Active)</p>
            <p><span className="text-[#c5a059] font-semibold">Theme:</span> GOTHAM PROTOCOL (OVERLAY)</p>
            <p><span className="text-[#c5a059] font-semibold">Secrets Unlocked:</span> 1 / 1 (100%)</p>
          </div>
        </div>
      );
    }

    const asciiArt = `
   .---------.
  /         /|
 /  LNK OS / |
.---------.  |
| ======= |  |
| | >_  | |  |
| ======= | /
|         |/
'---------'
   ||   ||
  [_______]
`;

    return (
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 font-mono text-sm text-terminal leading-relaxed">
        <pre className="text-accent text-xs sm:text-sm font-bold select-none leading-tight drop-shadow-[0_0_4px_rgba(57,255,20,0.3)]">
          {asciiArt}
        </pre>
        <div className="space-y-1">
          <p className="text-accent font-bold text-base mb-1.5">visitor@lnk-os</p>
          <p className="text-muted">----------------------</p>
          <p><span className="text-accent font-semibold">User:</span> visitor</p>
          <p><span className="text-accent font-semibold">Host:</span> lnk-os-node-1</p>
          <p><span className="text-accent font-semibold">OS:</span> LNK OS v1.0.0 (Browser Environment)</p>
          <p><span className="text-accent font-semibold">Owner:</span> Liyan Nechikaden</p>
          <p><span className="text-accent font-semibold">Role:</span> B.Tech CSE Student</p>
          <p><span className="text-accent font-semibold">School:</span> KMCT CEETM (KTU University)</p>
          <p><span className="text-accent font-semibold">Location:</span> Kerala, India</p>
          <p><span className="text-accent font-semibold">Projects:</span> {projects.length} featured ({projects.map(p => p.title).join(', ')})</p>
          <p><span className="text-accent font-semibold">Theme:</span> <span className="uppercase">{activeTheme}</span></p>
          <p><span className="text-accent font-semibold">GitHub:</span> <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-accent/90">{contactInfo.github.replace('https://', '')} ↗</a></p>
          <p><span className="text-accent font-semibold">LinkedIn:</span> <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-accent/90">{contactInfo.linkedin.replace('https://', '')} ↗</a></p>
          {isUnlocked && (
            <p><span className="text-accent font-semibold">Secrets Discovered:</span> 1 / 1</p>
          )}
        </div>
      </div>
    );
  },
  mission: () => {
    const missions = [
      {
        id: "OP-NIGHTFALL",
        target: "Joker",
        danger: "EXTREME",
        location: "Gotham Amusement Mile",
        details: "Surveillance reports joker gas canisters hidden under the warehouse docks. Secure the perimeter immediately.",
        action: "Deploy batmobile and disable ventilation systems."
      },
      {
        id: "OP-FEARLESS",
        target: "Scarecrow",
        danger: "CRITICAL",
        location: "Arkham Asylum Sewer Outlets",
        details: "Anomalous fear toxin dispersion detected in water supply grid 3-B. Pinpoint the distribution node.",
        action: "Equip rebreather and trace chemical residue."
      },
      {
        id: "OP-ENIGMA",
        target: "Riddler",
        danger: "MODERATE",
        location: "Gotham City Cathedral Tower",
        details: "Cryptographic relay intercepting police communications. Decrypt puzzle sequence on frequencies 88.4 / 92.1.",
        action: "Establish remote mainframe tap to counter-hack."
      },
      {
        id: "OP-ICEBOX",
        target: "Mr. Freeze",
        danger: "HIGH",
        location: "GothCorp Cryo-Gen Labs",
        details: "Sub-zero energy surge threatening the city grid. Internal temperature dropped to -50C.",
        action: "Activate thermal shielding armor modules."
      }
    ];

    const mission = missions[Math.floor(Math.random() * missions.length)];
    
    return (
      <div className="space-y-3 font-mono text-sm text-[#78909c] max-w-xl select-text">
        <div className="border border-[#c5a059]/40 bg-[#0c121e]/50 p-4 rounded-sm shadow-[0_0_15px_rgba(197,160,89,0.1)]">
          <div className="flex justify-between items-center border-b border-[#c5a059]/20 pb-2 mb-3">
            <span className="text-[#c5a059] font-bold tracking-widest text-xs">WAYNE ENTERPRISES SECURE DOSSIER</span>
            <span className="text-[10px] font-semibold border border-[#c5a059]/40 px-2 py-0.5 rounded-sm text-[#c5a059]/80 uppercase">{mission.id}</span>
          </div>
          <div className="space-y-2">
            <p><span className="text-[#c5a059] font-semibold">TARGET:</span> {mission.target}</p>
            <p><span className="text-[#c5a059] font-semibold">DANGER LEVEL:</span> <span className="text-red-500 font-bold animate-pulse">{mission.danger}</span></p>
            <p><span className="text-[#c5a059] font-semibold">LAST KNOWN LOC:</span> {mission.location}</p>
            <p className="text-sm leading-relaxed border-l-2 border-[#c5a059]/40 pl-3 py-0.5 italic text-[#78909c]/90 bg-[#c5a059]/5 rounded-r-xs">
              "{mission.details}"
            </p>
            <p className="pt-1"><span className="text-[#c5a059] font-semibold">TACTICAL DEPLOY:</span> {mission.action}</p>
          </div>
        </div>
        <p className="text-[10px] text-[#78909c]/50 text-center italic">// Telemetry updated via remote uplink //</p>
      </div>
    );
  },
  villains: () => {
    const villainList = [
      { name: "Joker", description: "Clown Prince of Crime. Unpredictable, chaotic, highly dangerous.", status: "CONTAINED", statusColor: "text-emerald-500/70 border-emerald-500/30" },
      { name: "Scarecrow", description: "Master of Fear. Weaponizes fear toxins to induce mass panic.", status: "CONTAINED", statusColor: "text-emerald-500/70 border-emerald-500/30" },
      { name: "Riddler", description: "Obsessively leaves puzzles, riddles, and traps. Criminal genius.", status: "CONTAINED", statusColor: "text-emerald-500/70 border-emerald-500/30" },
      { name: "Penguin", description: "Underworld mob boss operating out of the Iceberg Lounge.", status: "MONITORING", statusColor: "text-amber-500/70 border-amber-500/30" },
      { name: "Two-Face", description: "Former DA obsessed with duality. Decisions decided by a coin flip.", status: "CONTAINED", statusColor: "text-emerald-500/70 border-emerald-500/30" },
      { name: "Bane", description: "Highly intelligent mercenary powered by strength-enhancing Venom.", status: "MONITORING", statusColor: "text-amber-500/70 border-amber-500/30" }
    ];

    const activeIndex = Math.floor(Math.random() * villainList.length);
    villainList[activeIndex].status = "ACTIVE";
    villainList[activeIndex].statusColor = "text-red-500 font-bold border-red-500 animate-pulse drop-shadow-[0_0_3px_rgba(239,68,68,0.5)]";

    return (
      <div className="space-y-4 font-mono text-sm text-[#78909c] max-w-2xl select-text">
        <p className="text-[#c5a059]/80 font-bold mb-1">// SYSTEM ALERT: ACTIVE THREAT DATABASE //</p>
        <div className="space-y-2.5">
          {villainList.map((v, idx) => (
            <div key={idx} className="border border-[#121d2d]/65 bg-[#080d14]/40 p-3 rounded-sm flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2.5 shadow-sm">
              <div className="space-y-0.5">
                <span className="text-[#c5a059] font-bold text-base tracking-wide">{v.name}</span>
                <p className="text-xs text-[#78909c]/80 leading-relaxed">{v.description}</p>
              </div>
              <span className={`text-xs font-mono border px-2.5 py-0.5 rounded-sm uppercase tracking-wider shrink-0 self-start sm:self-center ${v.statusColor}`}>
                [ {v.status} ]
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
  gadgets: () => {
    const gadgets = [
      { name: "Batarang", type: "Ranged Weapon / Tactical tool", quantity: "6", battery: "N/A", status: "READY", desc: "Carbon fiber folding shuriken designed for non-lethal takedowns and trigger activation." },
      { name: "Grapple Gun", type: "Ascent / Mobility Device", quantity: "1", battery: "94%", status: "READY", desc: "High-tensile steel wire launcher with pneumatic anchor hook. Max load: 350kg." },
      { name: "Explosive Gel", type: "Demolition / Tactical", quantity: "3 charges", battery: "N/A", status: "READY", desc: "Liquid aerosol compound triggered remotely by wireless frequency signal." },
      { name: "Smoke Pellets", type: "Concealment / Escape", quantity: "4", battery: "N/A", status: "READY", desc: "Condenses into high-density fog block on hard impact. Masks infrared signatures." },
      { name: "Cryptographic Sequencer", type: "Decryption / Wiretap", quantity: "1", battery: "81%", status: "READY", desc: "Wayne Ent. mainframe link capable of brute-forcing secure wireless grids." }
    ];

    return (
      <div className="space-y-4 font-mono text-sm text-[#78909c] max-w-2xl select-text">
        <p className="text-[#c5a059]/80 font-bold mb-1">// WEAPONRY & UTILITY BELT INVENTORY //</p>
        <div className="overflow-x-auto border border-[#121d2d]/60 rounded-sm">
          <table className="min-w-full divide-y divide-[#121d2d]/60 text-left">
            <thead className="bg-[#0c121e]/80 text-[#c5a059] font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Gadget Name</th>
                <th className="px-4 py-3">Tactical Type</th>
                <th className="px-4 py-3 text-center">Qty / Cell</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#121d2d]/40 text-xs">
              {gadgets.map((g, idx) => (
                <tr key={idx} className="hover:bg-[#080d14]/40 transition-colors">
                  <td className="px-4 py-3 font-bold text-white/90">{g.name}</td>
                  <td className="px-4 py-3 text-[#78909c]/90">{g.type}</td>
                  <td className="px-4 py-3 text-center">{g.quantity} {g.battery !== 'N/A' && `(${g.battery})`}</td>
                  <td className="px-4 py-3 text-right text-emerald-500 font-semibold">{g.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
  batcomputer: () => {
    return (
      <div className="space-y-4 font-mono text-sm text-[#78909c] max-w-xl select-text">
        <p className="text-[#c5a059]/80 font-bold">// BATCOMPUTER DIAGNOSTICS & TELEMETRY //</p>
        
        <div className="space-y-3.5 border border-[#121d2d]/60 bg-[#080d14]/30 p-4 rounded-sm">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-[#78909c]/70">
              <span>Mainframe CPU Load:</span>
              <span className="text-[#c5a059] font-semibold">12.4%</span>
            </div>
            <div className="w-full bg-[#121d2d]/60 h-2 rounded-xs overflow-hidden">
              <div className="bg-[#c5a059] h-full" style={{ width: '12.4%' }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-[#78909c]/70">
              <span>Memory Utilization (Buffer Cache):</span>
              <span className="text-[#c5a059] font-semibold">41.8 GB / 128 GB</span>
            </div>
            <div className="w-full bg-[#121d2d]/60 h-2 rounded-xs overflow-hidden">
              <div className="bg-[#c5a059] h-full" style={{ width: '32.6%' }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-[#78909c]/70">
              <span>Batcave Auxiliary Power (Thermal + Hydro):</span>
              <span className="text-[#c5a059] font-semibold">98.2%</span>
            </div>
            <div className="w-full bg-[#121d2d]/60 h-2 rounded-xs overflow-hidden">
              <div className="bg-[#c5a059] h-full" style={{ width: '98.2%' }} />
            </div>
          </div>
          
          <div className="pt-2 grid grid-cols-2 gap-y-1.5 text-xs border-t border-[#121d2d]/30 text-[#78909c]/80">
            <p><span className="text-[#c5a059]/80 font-medium">Remote Uplink:</span> BROTHER EYE [SECURE]</p>
            <p><span className="text-[#c5a059]/80 font-medium">Batmobile Link:</span> ONLINE</p>
            <p><span className="text-[#c5a059]/80 font-medium">Network Encryption:</span> Quantum 2048-bit</p>
            <p><span className="text-[#c5a059]/80 font-medium">Intrusion Attempts:</span> 0 (Last 24h)</p>
          </div>
        </div>
      </div>
    );
  }
};
export default commandRegistry;
