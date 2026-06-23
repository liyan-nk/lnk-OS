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
  interests,
  GOTHAM_MISSIONS
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
        <div className="text-red-500 font-mono text-sm leading-relaxed border border-red-500/20 bg-red-500/5 p-3 rounded-xs my-1 select-text">
          <p className="font-bold uppercase tracking-wider">// SYSTEM WARNING //</p>
          <p className="text-xs mt-1 text-[#78909c]/90">
            HELP MODULE DEPRECATED. Use <CommandLink command="intel">intel</CommandLink> for classified protocol access.
          </p>
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
  about: () => {
    const isGotham = document.documentElement.getAttribute('data-theme') === 'gotham';
    if (isGotham) {
      return (
        <div className="space-y-3 font-mono text-sm text-[#78909c] max-w-2xl select-text">
          <div className="border border-[#c5a059]/40 bg-[#0c121e]/50 p-4 rounded-sm shadow-[0_0_15px_rgba(197,160,89,0.1)]">
            <div className="border-b border-[#c5a059]/20 pb-2 mb-3">
              <span className="text-[#c5a059] font-bold tracking-widest text-xs">WAYNE ENTERPRISES SECURE DOSSIER: SUBJECT PROFILE</span>
            </div>
            <div className="space-y-2.5">
              <p><span className="text-[#c5a059] font-semibold">ASSET PROFILE :</span> LIYAN NECHIKADEN</p>
              <p><span className="text-[#c5a059] font-semibold">ASSET ROLE    :</span> B.Tech CSE / Software Developer Asset</p>
              <p><span className="text-[#c5a059] font-semibold">STATUS        :</span> ACTIVE</p>
              <p className="text-sm leading-relaxed border-l-2 border-[#c5a059]/40 pl-3 py-0.5 leading-relaxed text-[#78909c]/95 bg-[#c5a059]/5 rounded-r-xs">
                "{bioInfo.intro}"
              </p>
              <div className="space-y-1.5 text-xs text-[#78909c]/90 leading-relaxed">
                {bioInfo.fullText.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
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
    );
  },
  projects: () => {
    const isGotham = document.documentElement.getAttribute('data-theme') === 'gotham';
    if (isGotham) {
      return (
        <div className="space-y-4 text-[#78909c] max-w-2xl select-text">
          <p className="text-[#c5a059]/80 font-bold mb-1">// CLASSIFIED OPERATIONS DOSSIER</p>
          {projects.map((proj, idx) => {
            let opName = `OPERATION: ${proj.title.toUpperCase()}`;
            let opTarget = proj.type;
            let opStatus = "STABLE";
            if (proj.title.toLowerCase().includes("echo")) {
              opStatus = "IN DEVELOPMENT";
            } else if (proj.title.toLowerCase().includes("forge")) {
              opStatus = "ACTIVE";
            }
            return (
              <div key={idx} className="border border-[#121d2d]/65 bg-[#080d14]/40 p-4 rounded-sm shadow-sm space-y-2.5">
                <div className="border-b border-[#c5a059]/20 pb-1.5 flex justify-between items-center">
                  <h4 className="text-[#c5a059] font-bold text-sm tracking-widest">{opName}</h4>
                  <span className="text-[10px] font-mono border border-amber-500/40 text-amber-500 px-2 py-0.5 rounded-sm uppercase tracking-wider">{opStatus}</span>
                </div>
                <div className="space-y-1.5 text-xs text-[#78909c]/90 leading-relaxed">
                  <p><span className="text-[#c5a059] font-semibold">TARGET NODE :</span> {opTarget}</p>
                  <p><span className="text-[#c5a059] font-semibold">INTEL LOG   :</span> {proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-mono px-2 py-0.5 bg-[#121d2d]/60 border border-[#121d2d]/80 text-[#78909c] rounded-sm font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {proj.liveUrl && (
                    <p className="pt-1">
                      <span className="text-[#c5a059] font-semibold">UPLINK CHANNEL :</span>{" "}
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#c5a059] underline hover:text-white">
                        {proj.liveUrl.replace("https://", "")} ↗
                      </a>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return (
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
    );
  },
  skills: () => {
    const isGotham = document.documentElement.getAttribute('data-theme') === 'gotham';
    if (isGotham) {
      return (
        <div className="space-y-4 text-[#78909c] max-w-xl select-text">
          <p className="text-[#c5a059]/80 font-bold mb-1">// WEAPONRY & CAPABILITY AUDIT REPORT</p>
          {skills.map((cat, idx) => (
            <div key={idx} className="space-y-1.5">
              <h5 className="text-[#c5a059] font-semibold text-xs uppercase tracking-wider border-b border-[#c5a059]/10 pb-0.5">{cat.category}</h5>
              <div className="grid grid-cols-2 gap-2">
                {cat.skills.map((skill, sIdx) => {
                  let status = "READY";
                  let statusColor = "text-emerald-500 border-emerald-500/20 bg-emerald-500/5";
                  if (skill === "Python" || skill === "TypeScript") {
                    status = "ARMED";
                    statusColor = "text-red-500 border-red-500/20 bg-red-500/5 animate-pulse font-bold";
                  } else if (skill === "Linux" || skill === "Next.js") {
                    status = "ACTIVE";
                    statusColor = "text-amber-500 border-amber-500/20 bg-amber-500/5";
                  }
                  return (
                    <div key={sIdx} className="text-xs border border-[#121d2d]/60 bg-[#080d14]/30 px-3 py-1.5 rounded-sm flex justify-between items-center">
                      <span className="truncate text-white/90">{skill}</span>
                      <span className={`text-[9px] font-mono border px-1.5 py-0.5 rounded-sm ${statusColor}`}>{status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
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
    );
  },
  resume: () => {
    const isGotham = document.documentElement.getAttribute('data-theme') === 'gotham';
    if (isGotham) {
      return (
        <div className="space-y-5 text-[#78909c] max-w-2xl select-text">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 border-b border-[#c5a059]/20 pb-2">
            <div>
              <h3 className="text-[#c5a059] font-bold text-base uppercase tracking-wider">PERSONNEL FILE / DOSSIER SUMMARY</h3>
              <p className="text-xs text-[#78909c]/60 font-mono">ASSET CODENAME: LNK — {bioInfo.title}</p>
            </div>
            <a 
              href="/resume.pdf"
              download="Liyan_Nechikaden_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-bg px-2.5 py-1 rounded-sm transition-all font-bold uppercase tracking-wider inline-flex items-center space-x-1 shrink-0 self-start sm:self-center cursor-pointer select-none"
            >
              <span>[ Download Personnel File PDF ]</span>
              <span className="text-[9px]">▼</span>
            </a>
          </div>
          
          {/* Education block */}
          <div className="space-y-2">
            <h4 className="text-[#c5a059] font-semibold text-xs uppercase tracking-wider">// 01. Academic Credentials</h4>
            {educationHistory.map((edu, idx) => (
              <div key={idx} className="border-l border-[#c5a059]/30 pl-3.5 space-y-0.5 text-xs text-[#78909c]">
                <p className="font-semibold text-white/95">{edu.degree} in {edu.branch}</p>
                <p className="text-xs text-[#c5a059]/80 font-medium">{edu.institution}</p>
                <p className="text-xs text-muted/80">{edu.university} | Expected Graduation: {edu.expectedGraduation}</p>
                <p className="text-xs text-muted/60">{edu.location}</p>
              </div>
            ))}
          </div>

          {/* Certifications block */}
          <div className="space-y-2">
            <h4 className="text-[#c5a059] font-semibold text-xs uppercase tracking-wider">// 02. Certification Log</h4>
            <ul className="list-none space-y-1.5 pl-3.5 border-l border-[#c5a059]/30 text-xs text-[#78909c]">
              {certifications.map((cert, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="text-[#c5a059]/60 mr-2">-</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Leadership block */}
          <div className="space-y-2.5">
            <h4 className="text-[#c5a059] font-semibold text-xs uppercase tracking-wider">// 03. Leadership Posting Record</h4>
            {leadershipExperience.map((lead, idx) => (
              <div key={idx} className="border-l border-[#c5a059]/30 pl-3.5 space-y-0.5 text-xs text-[#78909c]">
                <p className="font-semibold text-white/90">{lead.role}</p>
                <p className="text-xs text-[#c5a059]/80 font-medium">{lead.organization}</p>
                <p className="text-xs text-muted/80">{lead.responsibilities}</p>
              </div>
            ))}
          </div>

          {/* Experience block */}
          <div className="space-y-2.5">
            <h4 className="text-[#c5a059] font-semibold text-xs uppercase tracking-wider">// 04. Tactical Operational Deployments</h4>
            {workExperience.map((work, idx) => (
              <div key={idx} className="border-l border-[#c5a059]/30 pl-3.5 space-y-1.5 text-xs text-[#78909c]">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white/95">{work.role}</p>
                  <span className="text-xs text-muted/70">{work.duration}</span>
                </div>
                <ul className="list-none space-y-1 text-xs text-[#78909c]/85">
                  {work.highlights.map((high, hIdx) => (
                    <li key={hIdx} className="flex items-start">
                      <span className="text-[#c5a059]/60 mr-2 shrink-0">-</span>
                      <span>{high}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
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
    );
  },
  journey: () => {
    const isGotham = document.documentElement.getAttribute('data-theme') === 'gotham';
    if (isGotham) {
      return (
        <div className="space-y-4 text-[#78909c] font-mono max-w-xl select-text">
          <p className="text-[#c5a059]/80 font-bold mb-1">// CHRONOLOGICAL MISSION TIMELINE LOG</p>
          <div className="relative border-l border-[#c5a059]/30 pl-4 space-y-6 ml-2.5">
            <div className="relative">
              <div className="absolute -left-[21.5px] top-1.5 w-2 h-2 bg-[#c5a059] border border-[#04070c] rounded-full"></div>
              <span className="text-xs text-[#c5a059] font-bold">2025 - PRESENT</span>
              <h5 className="font-semibold text-sm text-white/95">B.Tech Computer Science Engineering</h5>
              <p className="text-xs text-[#78909c]">KMCT College of Engineering and Emerging Technology (KMCT CEETM)</p>
              <p className="text-[10px] text-[#78909c]/60">Kerala Technological University</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[21.5px] top-1.5 w-2 h-2 bg-[#121d2d] border border-[#04070c] rounded-full"></div>
              <span className="text-xs text-[#78909c]/60">LEADERSHIP CO-ORDINATION</span>
              <h5 className="font-semibold text-sm text-white/95">Union Chairperson Post</h5>
              <p className="text-xs text-[#78909c]">KMCT CEETM (Coordinate student activities and technical events)</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[21.5px] top-1.5 w-2 h-2 bg-[#121d2d] border border-[#04070c] rounded-full"></div>
              <span className="text-xs text-[#78909c]/60">CLUB COORDINATION</span>
              <h5 className="font-semibold text-sm text-white/95">Media Coordinator & General Secretary</h5>
              <p className="text-xs text-[#78909c]">Sciensters Science Club (Managed digital outreach and engagement)</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[21.5px] top-1.5 w-2 h-2 bg-[#121d2d] border border-[#04070c] rounded-full"></div>
              <span className="text-xs text-[#78909c]/60">JAN 2023 - DEC 2024</span>
              <h5 className="font-semibold text-sm text-white/95">Freelance Web Developer Assignee</h5>
              <ul className="list-none space-y-1 text-xs text-[#78909c]/80 mt-1">
                <li className="flex items-start">
                  <span className="text-[#c5a059]/60 mr-1.5">-</span>
                  <span>Built SEO-optimized business websites (1,500+ monthly visitors).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c5a059]/60 mr-1.5">-</span>
                  <span>Delivered school portal and lead-generation tools.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return (
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
    );
  },
  whoami: () => {
    const isGotham = document.documentElement.getAttribute('data-theme') === 'gotham';
    if (isGotham) {
      return (
        <div className="space-y-2.5 text-[#78909c] font-mono max-w-xl select-text">
          <h4 className="text-[#c5a059] font-bold text-base">OPERATOR IDENTIFICATION CARD</h4>
          <div className="border-t border-[#c5a059]/20 pt-2 space-y-1 text-sm">
            <p><span className="text-[#c5a059]/70">OPERATOR ID :</span> LNK</p>
            <p><span className="text-[#c5a059]/70">CLEARANCE   :</span> LEVEL 7</p>
            <p><span className="text-[#c5a059]/70">ASSIGNMENT  :</span> SOFTWARE ARCHITECT / DEVELOPER ASSET</p>
            <p><span className="text-[#c5a059]/70">DEPLOY ZONE :</span> KMCT CEETM GRID</p>
            <p><span className="text-[#c5a059]/70">CAPABILITIES:</span> {interests.join(', ')}</p>
            <p><span className="text-[#c5a059]/70">MOTTO       :</span> Forged in Silence</p>
          </div>
          <p className="text-xs text-[#78909c]/60 pt-1">
            Type <CommandLink command="resume">resume</CommandLink> to print personnel dossier or <CommandLink command="projects">projects</CommandLink> to view operational logs.
          </p>
        </div>
      );
    }
    return (
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
    );
  },
  contact: () => {
    const isGotham = document.documentElement.getAttribute('data-theme') === 'gotham';
    if (isGotham) {
      return (
        <div className="space-y-3 font-mono text-sm text-[#78909c] max-w-xl select-text my-1">
          <p className="text-[#c5a059]/80 font-bold">// SECURE TRANSMISSION CHANNELS</p>
          <div className="border border-[#121d2d]/60 bg-[#080d14]/40 p-4 rounded-sm space-y-2">
            <p><span className="text-[#c5a059] font-semibold">UPLINK ADDR   :</span> <a href={`mailto:${contactInfo.email}`} className="underline hover:text-white">{contactInfo.email}</a></p>
            <p><span className="text-[#c5a059] font-semibold">CODE REPO     :</span> <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">{contactInfo.github.replace("https://", "")}</a></p>
            <p><span className="text-[#c5a059] font-semibold">PROFESSIONAL  :</span> <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">{contactInfo.linkedin.replace("https://", "")}</a></p>
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-2 text-terminal">
        <p className="text-muted/65 mb-1.5">// Connect Details</p>
        <div className="space-y-1.5 font-mono text-sm">
          <p>Email    : <a href={`mailto:${contactInfo.email}`} className="underline hover:text-accent">{contactInfo.email}</a></p>
          <p>GitHub   : <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">{contactInfo.github}</a></p>
          <p>LinkedIn : <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">{contactInfo.linkedin}</a></p>
        </div>
      </div>
    );
  },
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
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="text-[#c5a059] font-bold text-base mb-1.5">operator@gotham</p>
            <p className="text-[#c5a059]/30">----------------------</p>
            <p><span className="text-[#c5a059] font-semibold">OPERATOR ID      :</span> LNK</p>
            <p><span className="text-[#c5a059] font-semibold">STATUS           :</span> ACTIVE</p>
            <p><span className="text-[#c5a059] font-semibold">CLEARANCE        :</span> LEVEL 7</p>
            <p><span className="text-[#c5a059] font-semibold">CURRENT MISSION  :</span> BUILD</p>
            <p><span className="text-[#c5a059] font-semibold">PRIMARY DOMAIN   :</span> SOFTWARE</p>
            <p><span className="text-[#c5a059] font-semibold">ORIGIN           :</span> KMCT CEETM</p>
            <p><span className="text-[#c5a059] font-semibold">NETWORK STATUS   :</span> ONLINE</p>
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
    const mission = GOTHAM_MISSIONS[Math.floor(Math.random() * GOTHAM_MISSIONS.length)];
    
    return (
      <div className="space-y-3 font-mono text-sm text-[#78909c] max-w-xl select-text">
        <div className="border border-[#c5a059]/40 bg-[#0c121e]/50 p-4 rounded-sm shadow-[0_0_15px_rgba(197,160,89,0.1)]">
          <div className="flex justify-between items-center border-b border-[#c5a059]/20 pb-2 mb-3">
            <span className="text-[#c5a059] font-bold tracking-widest text-xs">WAYNE ENTERPRISES SECURE DOSSIER</span>
            <span className="text-[10px] font-semibold border border-[#c5a059]/40 px-2 py-0.5 rounded-sm text-[#c5a059]/80 uppercase">{mission.id}</span>
          </div>
          <div className="space-y-2">
            <p><span className="text-[#c5a059] font-semibold">OPERATION:</span> {mission.target}</p>
            <p><span className="text-[#c5a059] font-semibold">STATUS:</span> <span className="text-amber-500 font-semibold">{mission.status}</span></p>
            <p><span className="text-[#c5a059] font-semibold">OBJECTIVE:</span></p>
            <p className="text-sm leading-relaxed border-l-2 border-[#c5a059]/40 pl-3 py-0.5 italic text-[#78909c]/90 bg-[#c5a059]/5 rounded-r-xs">
              "{mission.objective}"
            </p>
            {mission.priority && (
              <p><span className="text-[#c5a059] font-semibold">PRIORITY:</span> <span className="text-red-500 font-bold animate-pulse">{mission.priority}</span></p>
            )}
            <p className="pt-1"><span className="text-[#c5a059] font-semibold">TACTICAL DEPLOY:</span> {mission.action}</p>
          </div>
        </div>
        <p className="text-[10px] text-[#78909c]/50 text-center italic">// Telemetry updated via remote uplink //</p>
      </div>
    );
  },
  opposition: () => {
    const list = [
      { name: "Procrastination", desc: "Tendency to delay operations. High risk during complex builds.", status: "ACTIVE", color: "text-red-500 font-bold border-red-500 animate-pulse" },
      { name: "Distractions", desc: "Digital chatter and context switching. Actively managed via focus locks.", status: "MONITORED", color: "text-amber-500 border-amber-500" },
      { name: "Comfort Zone", desc: "Resistance to novel frameworks and systems. Barrier breached successfully.", status: "BREACHED", color: "text-emerald-500 border-emerald-500" },
      { name: "Inconsistency", desc: "Irregular commitment sweeps. Constantly tracked and debugged.", status: "TRACKED", color: "text-emerald-500 border-emerald-500" }
    ];

    return (
      <div className="space-y-4 font-mono text-sm text-[#78909c] max-w-2xl select-text">
        <p className="text-[#c5a059]/80 font-bold mb-1">// SYSTEM STATUS: OPPOSITION MATRIX //</p>
        <div className="space-y-2.5">
          {list.map((o, idx) => (
            <div key={idx} className="border border-[#121d2d]/65 bg-[#080d14]/40 p-3 rounded-sm flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2.5 shadow-sm">
              <div className="space-y-0.5">
                <span className="text-[#c5a059] font-bold text-base tracking-wide">{o.name}</span>
                <p className="text-xs text-[#78909c]/80 leading-relaxed">{o.desc}</p>
              </div>
              <span className={`text-xs font-mono border px-2.5 py-0.5 rounded-sm uppercase tracking-wider shrink-0 self-start sm:self-center ${o.color}`}>
                [ {o.status} ]
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
  arsenal: () => {
    const arsenal = [
      { name: "Python", type: "Core scripting / backend scripting", status: "READY", color: "text-emerald-500" },
      { name: "TypeScript", type: "Type-safe interface operations", status: "READY", color: "text-emerald-500" },
      { name: "Linux", type: "Secure server terminal scripting", status: "ACTIVE", color: "text-amber-500" },
      { name: "Next.js", type: "App framework & server-side operations", status: "ONLINE", color: "text-emerald-500" },
      { name: "Problem Solving", type: "Logical trace & debugger architecture", status: "ARMED", color: "text-red-500 font-bold animate-pulse" },
      { name: "Discipline", type: "Consistent operational momentum", status: "CHARGING", color: "text-amber-500" }
    ];

    return (
      <div className="space-y-4 font-mono text-sm text-[#78909c] max-w-2xl select-text">
        <p className="text-[#c5a059]/80 font-bold mb-1">// OPERATOR SKILLS & ACTIVE ARSENAL //</p>
        <div className="overflow-x-auto border border-[#121d2d]/60 rounded-sm">
          <table className="min-w-full divide-y divide-[#121d2d]/60 text-left">
            <thead className="bg-[#0c121e]/80 text-[#c5a059] font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Tool Name</th>
                <th className="px-4 py-3">Operational Purpose</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#121d2d]/40 text-xs">
              {arsenal.map((a, idx) => (
                <tr key={idx} className="hover:bg-[#080d14]/40 transition-colors">
                  <td className="px-4 py-3 font-bold text-white/90">{a.name}</td>
                  <td className="px-4 py-3 text-[#78909c]/90">{a.type}</td>
                  <td className={`px-4 py-3 text-right font-semibold ${a.color}`}>{a.status}</td>
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
            <p><span className="text-[#c5a059]/80 font-medium">Remote Uplink:</span> ORACLE [SECURE]</p>
            <p><span className="text-[#c5a059]/80 font-medium">LNK OS Mainframe:</span> ONLINE</p>
            <p><span className="text-[#c5a059]/80 font-medium">Network Encryption:</span> Quantum 2048-bit</p>
            <p><span className="text-[#c5a059]/80 font-medium">Intrusion Attempts:</span> 0 (Last 24h)</p>
          </div>
        </div>
      </div>
    );
  },
  intel: () => {
    return (
      <div className="space-y-1.5 text-terminal select-text text-sm">
        <p className="text-[#c5a059]/80 mb-2 font-bold">// CLASSIFIED MAIN UNIT INTERNAL PROTOCOLS</p>
        <div className="space-y-3.5 border border-[#121d2d]/60 p-4 bg-[#080d14]/40 rounded-sm max-w-md">
          <div>
            <span className="text-[#c5a059] font-bold block mb-1.5 uppercase tracking-wider text-[10px] border-b border-[#c5a059]/20 pb-0.5">// Special Protocols</span>
            <div className="space-y-1 pl-2">
              <p>  <CommandLink command="mission">mission</CommandLink>     - Retrieve active operator operations</p>
              <p>  <CommandLink command="opposition">opposition</CommandLink>  - Status of active capability blockers</p>
              <p>  <CommandLink command="resistance">resistance</CommandLink>  - Secure alias for opposition</p>
              <p>  <CommandLink command="arsenal">arsenal</CommandLink>     - Capability & tooling readiness audit</p>
              <p>  <CommandLink command="batcomputer">batcomputer</CommandLink> - Systems telemetry & grid performance</p>
              <p>  <CommandLink command="oracle">oracle</CommandLink>      - Query system guidance assistant</p>
              <p>  <CommandLink command="status">status</CommandLink>      - Diagnostics overview report</p>
            </div>
          </div>
          <div>
            <span className="text-[#c5a059] font-bold block mb-1.5 uppercase tracking-wider text-[10px] border-b border-[#c5a059]/20 pb-0.5">// Classified Dossiers</span>
            <div className="space-y-1 pl-2">
              <p>  <CommandLink command="about">about</CommandLink>       - Psychological & technical asset dossier</p>
              <p>  <CommandLink command="projects">projects</CommandLink>    - Operational logs database</p>
              <p>  <CommandLink command="skills">skills</CommandLink>      - Capability analysis reports</p>
              <p>  <CommandLink command="resume">resume</CommandLink>      - Personnel resume credentials file</p>
              <p>  <CommandLink command="journey">journey</CommandLink>     - Temporal mission trace log</p>
              <p>  <CommandLink command="contact">contact</CommandLink>     - Secure communication channels</p>
            </div>
          </div>
          <div>
            <span className="text-[#c5a059] font-bold block mb-1.5 uppercase tracking-wider text-[10px] border-b border-[#c5a059]/20 pb-0.5">// System</span>
            <div className="space-y-1 pl-2">
              <p>  <CommandLink command="neofetch">neofetch</CommandLink>   - Operator identity & grid diagnostics</p>
              <p>  <CommandLink command="alfred">alfred</CommandLink>     - Secure connection teardown & exit</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
  oracle: () => {
    const quotes = [
      "ORACLE: Discipline compounds faster than motivation.",
      "ORACLE: Comfort is the enemy of growth.",
      "ORACLE: Progress detected. Continue.",
      "ORACLE: Operator focus level rising.",
      "ORACLE: Mission continuity maintained.",
      "ORACLE: Forged in Silence."
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return (
      <div className="font-mono text-sm text-[#c5a059] border-l border-[#c5a059]/40 pl-3 py-1.5 bg-[#c5a059]/5 italic my-1 select-text">
        "{quote}"
      </div>
    );
  },
  status: () => {
    return (
      <div className="space-y-3 font-mono text-sm text-[#78909c] max-w-lg select-text my-1">
        <p className="text-[#c5a059]/80 font-bold">// SYSTEM REPORT: DIAGNOSTICS OVERVIEW</p>
        <div className="border border-[#121d2d]/60 bg-[#080d14]/40 p-4 rounded-sm space-y-2">
          <p><span className="text-[#c5a059] font-semibold">MAINFRAME CORES :</span> 8x Quantum-Array [100% ONLINE]</p>
          <p><span className="text-[#c5a059] font-semibold">OPERATOR LOCK   :</span> ENABLED (Operator: LNK)</p>
          <p><span className="text-[#c5a059] font-semibold">LNK NETWORK     :</span> ONLINE (Nodes: KMCT, Github, LinkedIn)</p>
          <p><span className="text-[#c5a059] font-semibold">UPLINK ENCRYPT  :</span> 2048-bit AES [ACTIVE]</p>
          <p><span className="text-[#c5a059] font-semibold">AUXILIARY GRID  :</span> STABLE (Thermal-Link: ONLINE)</p>
          <p><span className="text-[#c5a059] font-semibold">ORACLE FEED     :</span> SYNCHRONIZED</p>
        </div>
      </div>
    );
  }
};
export default commandRegistry;
