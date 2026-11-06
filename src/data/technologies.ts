export interface TechCategory {
  title: string;
  code: string;
  description: string;
  accent: string;
  skills: {
    name: string;
    tag: string;
    type: 'core' | 'framework' | 'library' | 'tool';
  }[];
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'FRONTEND',
    code: 'FE_STACK',
    description: 'Component architecture, responsive layouts, motion choreography, and high-frequency UI updates.',
    accent: '#FF414D',
    skills: [
      { name: 'React', tag: 'UI Library', type: 'core' },
      { name: 'TypeScript', tag: 'Language', type: 'core' },
      { name: 'JavaScript', tag: 'Language', type: 'core' },
      { name: 'Tailwind CSS', tag: 'Styling', type: 'framework' },
      { name: 'Vite', tag: 'Bundler', type: 'tool' },
      { name: 'Framer Motion', tag: 'Animation', type: 'library' },
      { name: 'GSAP', tag: 'Motion Engine', type: 'library' },
      { name: 'HTML5 / CSS3', tag: 'Foundations', type: 'core' },
    ],
  },
  {
    title: 'BACKEND',
    code: 'BE_RUNTIME',
    description: 'REST APIs, server-side business logic, session lifecycle, and modular service handlers.',
    accent: '#38BDF8',
    skills: [
      { name: 'Node.js', tag: 'Runtime', type: 'core' },
      { name: 'Express.js', tag: 'Framework', type: 'framework' },
      { name: 'PHP', tag: 'Language', type: 'core' },
      { name: 'Laravel', tag: 'Framework', type: 'framework' },
      { name: 'RESTful Architecture', tag: 'Design', type: 'core' },
      { name: 'Socket.IO', tag: 'Realtime Protocol', type: 'library' },
    ],
  },
  {
    title: 'DATABASE',
    code: 'DATA_PERSISTENCE',
    description: 'Document and relational storage, query structuring, and migration consistency.',
    accent: '#34D399',
    skills: [
      { name: 'MongoDB', tag: 'NoSQL Document Store', type: 'core' },
      { name: 'Mongoose', tag: 'ODM Modeling', type: 'library' },
      { name: 'SQLite', tag: 'Embedded Relational DB', type: 'core' },
      { name: 'Data Normalization', tag: 'Schema Design', type: 'core' },
    ],
  },
  {
    title: 'AI & COMPUTER VISION',
    code: 'AI_VISION_PERCEPTION',
    description: 'Real-time perception algorithms, spatial tracking, and inference on constrained hardware.',
    accent: '#B44CFF',
    skills: [
      { name: 'Python', tag: 'Core Language', type: 'core' },
      { name: 'OpenCV', tag: 'Computer Vision', type: 'library' },
      { name: 'MediaPipe', tag: 'Pose & Gesture Tracking', type: 'library' },
      { name: 'YOLOv8', tag: 'Realtime Detection', type: 'framework' },
      { name: 'Machine Learning', tag: 'Model Training & Tuning', type: 'core' },
    ],
  },
  {
    title: 'DEVELOPMENT & TOOLING',
    code: 'DEV_ENVIRONMENT',
    description: 'Modern development workflows, versioning, debugging, and API instrumentation.',
    accent: '#F59E0B',
    skills: [
      { name: 'Git', tag: 'Version Control', type: 'tool' },
      { name: 'GitHub', tag: 'Collaboration & CI', type: 'tool' },
      { name: 'Antigravity IDE / VS Code', tag: 'Editor Environment', type: 'tool' },
      { name: 'Postman', tag: 'API Prototyping', type: 'tool' },
    ],
  },
];

