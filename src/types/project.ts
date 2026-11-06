export interface ProjectMetric {
  label: string;
  value: string;
}

export interface FlagshipProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  status: string;
  statusType: 'experimental' | 'active' | 'development' | 'concept' | 'prototype';
  concept: string;
  visionOrGoals?: string;
  engineeringFocus: string[];
  techStack: string[];
  metrics?: ProjectMetric[];
  githubUrl?: string;
  demoUrl?: string;
  accentColor: string;
  category: string;
}

