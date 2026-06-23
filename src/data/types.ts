export interface ProjectItem {
  title: string;
  type: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  branch: string;
  university: string;
  duration: string;
  expectedGraduation?: string;
  location: string;
}

export interface LeadershipItem {
  role: string;
  organization: string;
  responsibilities: string;
}

export interface WorkExperienceItem {
  role: string;
  duration: string;
  highlights: string[];
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
}

export interface BioInfo {
  name: string;
  title: string;
  intro: string;
  fullText: string[];
}

export interface GothamMission {
  id: string;
  target: string;
  status: string;
  objective: string;
  priority: string;
  location: string;
  action: string;
  equipment: string[];
}
