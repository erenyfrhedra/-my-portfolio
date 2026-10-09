export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface ProjectMetrics {
  accuracy: string;
  precision: string;
  recall: string;
  f1Score: string;
}

export interface Project {
  id: string;
  title: string;
  technologies: string[];
  description: string;
  details?: string[];
  results?: {
    accuracy?: string;
    precision?: string;
    recall?: string;
    f1Score?: string;
  };
  metrics?: ProjectMetrics;
  features?: string[];
  comparison?: string[];
  featured?: boolean;
  github?: string;
  githubUrl?: string;
}

export interface EducationItem {
  degree: string;
  major: string;
  university: string;
  date: string;
  location: string;
  coursework: string[];
}

export interface TrainingProgram {
  organization: string;
  program: string;
  date: string;
  format: string;
  description: string;
  topics: string[];
}
