export interface ArchitectureDomain {
  id: string;
  number: string;
  title: string;
  shortLabel: string;
  description: string;
  architecturalPhilosophy: string;
  technologies: string[];
  relatedProjects: string[];
  accentColor: string;
  iconName: string;
  coordinates: {
    angleDeg: number;
    distancePct: number;
  };
}

