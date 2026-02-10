// TypeScript interfaces for Project and Resume data models

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[]; // e.g., ["Next.js", "TypeScript", "Tailwind CSS"]
  imageUrl: string;
  githubLink?: string;
  liveLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string; // e.g., "Jan 2022 - Present"
  responsibilities: string[];
  achievements?: string[];
}

export interface Skill {
  category: string; // e.g., "Frontend", "Backend", "Tools"
  items: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  year: string; // e.g., "2018 - 2022"
  gpa?: string;
}

export interface Resume {
  id: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  skills: Skill[];
  education: Education[];
  certifications?: string[];
  languages?: string[];
  updatedAt: Date;
}
