export interface TechSkill {
  name: string;
  tag: string;
  type: 'core' | 'framework' | 'library' | 'tool';
}

export interface TechCategory {
  title: string;
  code: string;
  badge?: string;
  description: string;
  accent: string;
  skills: TechSkill[];
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'CORE DOMAIN STACK',
    code: 'CORE',
    badge: 'PRIMARY FOCUS',
    description: 'Core engineering foundation and primary technical focus spanning full-stack web and intelligent systems.',
    accent: '#FF414D',
    skills: [
      { name: 'MERN Stack', tag: 'Full Stack', type: 'core' },
      { name: 'Python', tag: 'AI / Backend', type: 'core' },
      { name: 'Artificial Intelligence', tag: 'Domain', type: 'core' },
      { name: 'Machine Learning', tag: 'Domain', type: 'core' },
      { name: 'Computer Vision', tag: 'Perception', type: 'core' },
    ],
  },
  {
    title: 'FRONTEND & 3D',
    code: 'FRONT',
    badge: 'INTERACTIVE UI',
    description: 'Component architecture, real-time WebGL graphics, and responsive engineering interfaces.',
    accent: '#38BDF8',
    skills: [
      { name: 'React', tag: 'UI Library', type: 'core' },
      { name: 'Three.js', tag: '3D Graphics', type: 'library' },
      { name: 'React Three Fiber', tag: 'Declarative 3D', type: 'framework' },
      { name: 'TypeScript', tag: 'Language', type: 'core' },
      { name: 'JavaScript', tag: 'Foundations', type: 'core' },
      { name: 'Tailwind CSS', tag: 'Styling', type: 'framework' },
    ],
  },
  {
    title: 'BACKEND SERVICES',
    code: 'BACK',
    badge: 'SERVER ARCHITECTURE',
    description: 'Server runtimes, RESTful endpoint development, real-time sockets, and business logic.',
    accent: '#818CF8',
    skills: [
      { name: 'Node.js', tag: 'Runtime', type: 'core' },
      { name: 'Express.js', tag: 'Server Framework', type: 'framework' },
      { name: 'RESTful Architecture', tag: 'API Design', type: 'core' },
      { name: 'WebSockets', tag: 'Realtime Protocol', type: 'library' },
    ],
  },
  {
    title: 'DATABASES & PERSISTENCE',
    code: 'DB',
    badge: 'STORAGE & SCHEMAS',
    description: 'NoSQL document collections and structured relational persistence with query integrity.',
    accent: '#34D399',
    skills: [
      { name: 'MongoDB', tag: 'NoSQL Document Store', type: 'core' },
      { name: 'PostgreSQL', tag: 'Relational DB', type: 'core' },
      { name: 'MySQL', tag: 'Relational DB', type: 'core' },
      { name: 'Schema Design', tag: 'Data Modeling', type: 'core' },
    ],
  },
  {
    title: 'AI & DEVELOPMENT LABS',
    code: 'AI',
    badge: 'MODELS & LABS',
    description: 'Accelerated machine learning experiments, computer vision models, and cloud notebook workflows.',
    accent: '#B44CFF',
    skills: [
      { name: 'Python', tag: 'Core Language', type: 'core' },
      { name: 'Google Colab', tag: 'Cloud Notebooks', type: 'tool' },
      { name: 'Kaggle', tag: 'Data & Benchmarks', type: 'tool' },
      { name: 'OpenCV', tag: 'Vision Library', type: 'library' },
      { name: 'YOLOv8', tag: 'Object Detection', type: 'framework' },
    ],
  },
  {
    title: 'DEVELOPMENT TOOLING',
    code: 'SYS',
    badge: 'DEV ENVIRONMENT',
    description: 'Version control, collaborative workflows, and API prototyping pipelines.',
    accent: '#F59E0B',
    skills: [
      { name: 'Git', tag: 'Version Control', type: 'tool' },
      { name: 'GitHub', tag: 'Collaboration', type: 'tool' },
      { name: 'VS Code / IDE', tag: 'Editor Environment', type: 'tool' },
      { name: 'Postman', tag: 'API Testing', type: 'tool' },
    ],
  },
];

export const FUTURE_EXPLORATIONS = [
  {
    domain: 'Quantum Computing',
    tag: 'FUTURE INTEREST',
    description: 'Investigating quantum algorithms, qubit simulation frameworks, and quantum circuit models.',
    accent: '#B44CFF',
  },
  {
    domain: 'Advanced Machine Learning',
    tag: 'EXPLORING NEXT',
    description: 'Deepening neural network architectures, attention mechanisms, and multi-modal representation learning.',
    accent: '#38BDF8',
  },
  {
    domain: 'Advanced Computer Vision',
    tag: 'EXPLORING NEXT',
    description: 'Spatial computing, 3D point cloud segmentation, and real-time vision-language fusion.',
    accent: '#00F0FF',
  },
  {
    domain: 'Emerging Computing Paradigms',
    tag: 'LONG-TERM HORIZON',
    description: 'Neuromorphic computing concepts, edge-native micro-runtimes, and autonomous agent loops.',
    accent: '#34D399',
  },
];
