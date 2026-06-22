import type { BioInfo, ProjectItem, SkillCategory, EducationItem, LeadershipItem, WorkExperienceItem, ContactInfo } from './types';

// ==========================================
// 1. Personal Information (Bio)
// ==========================================
export const bioInfo: BioInfo = {
  name: "Liyan Nechikaden",
  title: "B.Tech Computer Science & Engineering Student",
  intro: "I am a Computer Science Engineering student at KMCT CEETM with a strong interest in web development, software engineering, Linux, and building digital products.",
  fullText: [
    "I enjoy creating practical applications that solve real-world problems and improve user experiences. My work focuses on modern web technologies, interactive interfaces, and scalable software systems.",
    "Alongside academics, I actively explore AI tools, programming, and product development while continuously improving my technical and problem-solving skills."
  ]
};

// ==========================================
// 2. Projects
// ==========================================
export const projects: ProjectItem[] = [
  {
    title: "Campus Echo",
    type: "Anonymous Campus Communication Platform",
    description: "Built an anonymous campus discussion platform enabling real-time discussions, voting, moderation, and media sharing for campus communities.",
    technologies: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "NextAuth.js", "Tailwind CSS", "Pusher", "Cloudinary"],
    liveUrl: "https://campus-echo-v3.web.app"
  },
  {
    title: "SkillForge",
    type: "Personal Skill Tracking Application",
    description: "Built a productivity and skill-tracking application for monitoring streaks, sessions, and performance analytics.",
    technologies: ["Next.js", "React", "TypeScript", "Zustand", "Tailwind CSS", "Recharts", "Browser Persistence"],
    liveUrl: "https://skill-forge-puce.vercel.app"
  },
  {
    title: "Library Management System",
    type: "Web-based Library Management Application",
    description: "Built a role-based library management system supporting book issue and return workflows, user administration, and bulk data import.",
    technologies: ["Flask", "Python", "SQLite", "JavaScript", "Tailwind CSS", "Pandas"],
    liveUrl: "https://library-system-demo.onrender.com"
  }
];

// ==========================================
// 3. Skills
// ==========================================
export const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["Python", "TypeScript", "JavaScript", "C"]
  },
  {
    category: "Frameworks & Libraries",
    skills: ["React", "Next.js", "Flask"]
  },
  {
    category: "Databases & Backend",
    skills: ["PostgreSQL", "Prisma", "Firebase", "SQLite"]
  },
  {
    category: "Tools & Technologies",
    skills: ["Git", "Tailwind CSS"]
  }
];

// ==========================================
// 4. Education
// ==========================================
export const educationHistory: EducationItem[] = [
  {
    institution: "KMCT College of Engineering and Emerging Technology (KMCT CEETM)",
    degree: "Bachelor of Technology (B.Tech)",
    branch: "Computer Science & Engineering",
    university: "Kerala Technological University",
    duration: "2025 - Present",
    expectedGraduation: "2029",
    location: "Kerala, India"
  }
];

// ==========================================
// 5. Leadership
// ==========================================
export const leadershipExperience: LeadershipItem[] = [
  {
    role: "Union Chairperson",
    organization: "KMCT CEETM",
    responsibilities: "Coordinate student activities, technical events, and communication between students and administration."
  },
  {
    role: "Media Coordinator & General Secretary",
    organization: "Sciensters Science Club",
    responsibilities: "Managed digital outreach, poster design, and online engagement initiatives."
  }
];

// ==========================================
// 6. Work Experience
// ==========================================
export const workExperience: WorkExperienceItem[] = [
  {
    role: "Freelance Web Developer",
    duration: "Jan 2023 – Dec 2024",
    highlights: [
      "Developed and deployed multiple SEO-optimized business websites serving 1,500+ monthly visitors.",
      "Improved search engine discoverability for client websites.",
      "Delivered a custom business website contributing to an estimated 12% increase in client sales through improved online presence and lead generation.",
      "Engineered the official website for a Higher Secondary School using SCSS, Nunjucks, and JavaScript, serving 500+ weekly visitors."
    ]
  }
];

// ==========================================
// 7. Certifications
// ==========================================
export const certifications: string[] = [
  "Data Science and Artificial Intelligence — IIT Madras",
  "Google AI Fundamentals — Coursera"
];

// ==========================================
// 8. Contact Information
// ==========================================
export const contactInfo: ContactInfo = {
  email: "lnk.liyannk@gmail.com",
  github: "https://github.com/liyan-nk",
  linkedin: "https://linkedin.com/in/liyan-nechikaden"
};

// ==========================================
// 9. Interests
// ==========================================
export const interests: string[] = [
  "Programming",
  "Multimedia",
  "AI Tools",
  "Building Digital Products"
];
