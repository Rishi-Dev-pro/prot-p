export type ConstructionSectionId =
  | 'hero'
  | 'about'
  | 'timeline'
  | 'projects'
  | 'architecture'
  | 'stack'
  | 'experiments'
  | 'contact';

export type ConstructionStrategyType =
  | 'typography'
  | 'container'
  | 'button'
  | 'card'
  | 'architecture';

export interface QueuedTask {
  id: string;
  sectionId: ConstructionSectionId;
  targetSelector: string;
  preferredAgentId: string; // One of AGENT_01 .. AGENT_06
  taskLabel: string;
  strategy: ConstructionStrategyType;
  durationMs: number;
  wave: number; // Reading order wave: 1 (top/left) -> 2 -> 3 (bottom/right)
  offsetPct?: { x: number; y: number };
  status: 'pending' | 'in_progress' | 'completed';
  assignedAgentId?: string;
}

export const INITIAL_CONSTRUCTION_TASKS: QueuedTask[] = [
  // ================= SECTION 1: HERO & NAVIGATION =================
  // Wave 1: Navigation framework, logo, links, actions, tag, avatar
  {
    id: 'hero-nav-bar',
    sectionId: 'hero',
    targetSelector: '[data-build-target="nav-bar"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'CONSTRUCT: NAV_FRAME',
    strategy: 'container',
    durationMs: 850,
    wave: 1,
    offsetPct: { x: 0.15, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-nav-logo',
    sectionId: 'hero',
    targetSelector: '[data-build-target="nav-logo"]',
    preferredAgentId: 'AGENT_05',
    taskLabel: 'ASSEMBLE: RS_MONOGRAM',
    strategy: 'button',
    durationMs: 700,
    wave: 1,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-nav-links',
    sectionId: 'hero',
    targetSelector: '[data-build-target="nav-links"]',
    preferredAgentId: 'AGENT_05',
    taskLabel: 'TYPESET: NAV_CHIPS',
    strategy: 'typography',
    durationMs: 800,
    wave: 1,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-nav-actions',
    sectionId: 'hero',
    targetSelector: '[data-build-target="nav-actions"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'BIND: NAV_ACTIONS',
    strategy: 'button',
    durationMs: 750,
    wave: 1,
    offsetPct: { x: 0.8, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-tag',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-tag"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'CALIBRATE: SYSTEM_TAG',
    strategy: 'button',
    durationMs: 700,
    wave: 1,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-avatar',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-avatar"]',
    preferredAgentId: 'AGENT_03',
    taskLabel: 'RENDER: ORBITAL_CORE',
    strategy: 'architecture',
    durationMs: 1200,
    wave: 1,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },

  // Wave 2: Main headline lines and subtitle
  {
    id: 'hero-line-1',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-line-1"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'GLYPHS: "ENGINEERING"',
    strategy: 'typography',
    durationMs: 1100,
    wave: 2,
    offsetPct: { x: 0.35, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-line-2',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-line-2"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'GLYPHS: "THE"',
    strategy: 'typography',
    durationMs: 850,
    wave: 2,
    offsetPct: { x: 0.2, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-line-3',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-line-3"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'GLYPHS: "UNEXPECTED."',
    strategy: 'typography',
    durationMs: 1200,
    wave: 2,
    offsetPct: { x: 0.45, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-subhead',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-subhead"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'TYPESET: POSITIONING',
    strategy: 'typography',
    durationMs: 850,
    wave: 2,
    offsetPct: { x: 0.35, y: 0.5 },
    status: 'pending',
  },

  // Wave 3: Bio, Stats, CTAs, Metadata
  {
    id: 'hero-bio',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-bio"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'TYPESET: PROFILE_BIO',
    strategy: 'typography',
    durationMs: 1050,
    wave: 3,
    offsetPct: { x: 0.4, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-stats',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-stats"]',
    preferredAgentId: 'AGENT_05',
    taskLabel: 'ASSEMBLE: SYSTEM_METRICS',
    strategy: 'container',
    durationMs: 850,
    wave: 3,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-actions',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-actions"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'INITIALIZE: ACTION_CTAS',
    strategy: 'button',
    durationMs: 850,
    wave: 3,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-meta',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-meta"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'FORMAT: TELEMETRY_MATRIX',
    strategy: 'card',
    durationMs: 950,
    wave: 3,
    offsetPct: { x: 0.35, y: 0.25 },
    status: 'pending',
  },

  // ================= SECTION 2: ABOUT & PRINCIPLES =================
  // Wave 1: Heading, Bio column, and Principles column header
  {
    id: 'about-heading',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-heading"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'SECTION: "ABOUT_ENGINEERING"',
    strategy: 'typography',
    durationMs: 950,
    wave: 1,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'about-bio',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-bio"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'CONSTRUCT: CORE_THESIS',
    strategy: 'card',
    durationMs: 1100,
    wave: 1,
    offsetPct: { x: 0.4, y: 0.25 },
    status: 'pending',
  },
  {
    id: 'about-principles-heading',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-principles-heading"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'TYPESET: AXIOM_INDEX',
    strategy: 'typography',
    durationMs: 750,
    wave: 1,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },

  // Wave 2: Principles Card 01 & Card 02 (Discrete Component Assembly)
  {
    id: 'about-principle-01',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-principle-01"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'BUILD: SYSTEM_THINKING',
    strategy: 'card',
    durationMs: 950,
    wave: 2,
    offsetPct: { x: 0.35, y: 0.25 },
    status: 'pending',
  },
  {
    id: 'about-principle-02',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-principle-02"]',
    preferredAgentId: 'AGENT_03',
    taskLabel: 'BUILD: EXPERIMENTATION',
    strategy: 'card',
    durationMs: 950,
    wave: 2,
    offsetPct: { x: 0.35, y: 0.25 },
    status: 'pending',
  },

  // Wave 3: Principles Card 03 & Card 04
  {
    id: 'about-principle-03',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-principle-03"]',
    preferredAgentId: 'AGENT_05',
    taskLabel: 'BUILD: ENGINEERING_AXIOM',
    strategy: 'card',
    durationMs: 950,
    wave: 3,
    offsetPct: { x: 0.35, y: 0.25 },
    status: 'pending',
  },
  {
    id: 'about-principle-04',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-principle-04"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'BUILD: CONTINUOUS_LEARNING',
    strategy: 'card',
    durationMs: 950,
    wave: 3,
    offsetPct: { x: 0.35, y: 0.25 },
    status: 'pending',
  },

  // ================= SECTION 3: ENGINEERING TIMELINE =================
  // Wave 1: Spine Frame & Header
  {
    id: 'engineering-timeline',
    sectionId: 'timeline',
    targetSelector: '[data-build-target="engineering-timeline"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'FRAME: TIMELINE_CANVAS',
    strategy: 'container',
    durationMs: 900,
    wave: 1,
    offsetPct: { x: 0.5, y: 0.15 },
    status: 'pending',
  },
  {
    id: 'timeline-heading',
    sectionId: 'timeline',
    targetSelector: '[data-build-target="timeline-heading"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'HEADER: CHRONOLOGY_INDEX',
    strategy: 'typography',
    durationMs: 850,
    wave: 1,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },

  // Wave 2: Milestones 01, 02, 03
  {
    id: 'timeline-brainware-bca',
    sectionId: 'timeline',
    targetSelector: '[data-build-target="timeline-brainware-bca"]',
    preferredAgentId: 'AGENT_03',
    taskLabel: 'MILESTONE: BRAINWARE_BCA',
    strategy: 'card',
    durationMs: 900,
    wave: 2,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },
  {
    id: 'timeline-ahi-prototype',
    sectionId: 'timeline',
    targetSelector: '[data-build-target="timeline-ahi-prototype"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'MILESTONE: AHI_PROTOTYPE',
    strategy: 'card',
    durationMs: 900,
    wave: 2,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },
  {
    id: 'timeline-aether-os-foundation',
    sectionId: 'timeline',
    targetSelector: '[data-build-target="timeline-aether-os-foundation"]',
    preferredAgentId: 'AGENT_05',
    taskLabel: 'MILESTONE: AETHER_OS',
    strategy: 'card',
    durationMs: 900,
    wave: 2,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },

  // Wave 3: Milestones 04, 05, 06
  {
    id: 'timeline-pirate-civ-marketplace',
    sectionId: 'timeline',
    targetSelector: '[data-build-target="timeline-pirate-civ-marketplace"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'MILESTONE: PIRATE_CIV',
    strategy: 'card',
    durationMs: 900,
    wave: 3,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },
  {
    id: 'timeline-edge-ai-detector',
    sectionId: 'timeline',
    targetSelector: '[data-build-target="timeline-edge-ai-detector"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'MILESTONE: EDGE_AI_VISION',
    strategy: 'card',
    durationMs: 900,
    wave: 3,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },
  {
    id: 'timeline-callbuddy-telephony',
    sectionId: 'timeline',
    targetSelector: '[data-build-target="timeline-callbuddy-telephony"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'MILESTONE: CALLBUDDY_AI',
    strategy: 'card',
    durationMs: 900,
    wave: 3,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },

  // ================= SECTION 4: FLAGSHIP PROJECTS (6) =================
  // Wave 1: Heading, Project 01 & Project 02
  {
    id: 'projects-heading',
    sectionId: 'projects',
    targetSelector: '[data-build-target="projects-heading"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'SECTION: "FEATURED_PROJECTS"',
    strategy: 'typography',
    durationMs: 900,
    wave: 1,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'project-01',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-01"]',
    preferredAgentId: 'AGENT_03',
    taskLabel: 'FLAGSHIP_01: "AHI"',
    strategy: 'card',
    durationMs: 1100,
    wave: 1,
    offsetPct: { x: 0.35, y: 0.12 },
    status: 'pending',
  },
  {
    id: 'project-02',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-02"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'FLAGSHIP_02: "AETHER_OS"',
    strategy: 'card',
    durationMs: 1100,
    wave: 1,
    offsetPct: { x: 0.35, y: 0.12 },
    status: 'pending',
  },
  // Wave 2: Project 03 & Project 04
  {
    id: 'project-03',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-03"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'FLAGSHIP_03: "PIRATE_CIV"',
    strategy: 'card',
    durationMs: 1100,
    wave: 2,
    offsetPct: { x: 0.35, y: 0.12 },
    status: 'pending',
  },
  {
    id: 'project-04',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-04"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'FLAGSHIP_04: "CAMPUS_RESOLVE"',
    strategy: 'card',
    durationMs: 1100,
    wave: 2,
    offsetPct: { x: 0.35, y: 0.12 },
    status: 'pending',
  },
  // Wave 3: Project 05 & Project 06
  {
    id: 'project-05',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-05"]',
    preferredAgentId: 'AGENT_05',
    taskLabel: 'FLAGSHIP_05: "CALLBUDDY_AI"',
    strategy: 'card',
    durationMs: 1100,
    wave: 3,
    offsetPct: { x: 0.35, y: 0.12 },
    status: 'pending',
  },
  {
    id: 'project-06',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-06"]',
    preferredAgentId: 'AGENT_03',
    taskLabel: 'FLAGSHIP_06: "EDGE_AI_VISION"',
    strategy: 'card',
    durationMs: 1100,
    wave: 3,
    offsetPct: { x: 0.35, y: 0.12 },
    status: 'pending',
  },

  // ================= SECTION 5: ARCHITECTURE =================
  // Wave 1: Heading & Graph
  {
    id: 'architecture-heading',
    sectionId: 'architecture',
    targetSelector: '[data-build-target="architecture-heading"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'SECTION: "SYSTEM_ARCHITECTURE"',
    strategy: 'typography',
    durationMs: 850,
    wave: 1,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'architecture-graph',
    sectionId: 'architecture',
    targetSelector: '[data-build-target="architecture-graph"]',
    preferredAgentId: 'AGENT_03',
    taskLabel: 'TOPOLOGY: ECOSYSTEM_GRAPH',
    strategy: 'architecture',
    durationMs: 1300,
    wave: 1,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  // Wave 2: Domain Details
  {
    id: 'architecture-details',
    sectionId: 'architecture',
    targetSelector: '[data-build-target="architecture-details"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'SPEC: DOMAIN_INSPECTOR',
    strategy: 'card',
    durationMs: 1100,
    wave: 2,
    offsetPct: { x: 0.5, y: 0.3 },
    status: 'pending',
  },

  // ================= SECTION 6: TECH STACK =================
  // Wave 1: Heading & Core + Frontend
  {
    id: 'stack-heading',
    sectionId: 'stack',
    targetSelector: '[data-build-target="stack-heading"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'SECTION: "CAPABILITIES"',
    strategy: 'typography',
    durationMs: 850,
    wave: 1,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'stack-core',
    sectionId: 'stack',
    targetSelector: '[data-build-target="stack-core"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'STACK: CORE_LANGUAGES',
    strategy: 'card',
    durationMs: 900,
    wave: 1,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },
  {
    id: 'stack-front',
    sectionId: 'stack',
    targetSelector: '[data-build-target="stack-front"]',
    preferredAgentId: 'AGENT_03',
    taskLabel: 'STACK: FRONTEND_ENGINE',
    strategy: 'card',
    durationMs: 900,
    wave: 1,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },
  // Wave 2: Backend + AI + DB + Systems
  {
    id: 'stack-back',
    sectionId: 'stack',
    targetSelector: '[data-build-target="stack-back"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'STACK: BACKEND_SERVICES',
    strategy: 'card',
    durationMs: 900,
    wave: 2,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },
  {
    id: 'stack-ai',
    sectionId: 'stack',
    targetSelector: '[data-build-target="stack-ai"]',
    preferredAgentId: 'AGENT_05',
    taskLabel: 'STACK: AI_MODELS',
    strategy: 'card',
    durationMs: 900,
    wave: 2,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },
  {
    id: 'stack-db',
    sectionId: 'stack',
    targetSelector: '[data-build-target="stack-db"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'STACK: STORAGE_SCHEMAS',
    strategy: 'card',
    durationMs: 900,
    wave: 2,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },
  {
    id: 'stack-sys',
    sectionId: 'stack',
    targetSelector: '[data-build-target="stack-sys"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'STACK: CLOUD_INFRA',
    strategy: 'card',
    durationMs: 900,
    wave: 2,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },

  // ================= SECTION 7: EXPERIMENTS =================
  // Wave 1: Heading & Exp 01
  {
    id: 'experiments-heading',
    sectionId: 'experiments',
    targetSelector: '[data-build-target="experiments-heading"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'SECTION: "R&D_LABS"',
    strategy: 'typography',
    durationMs: 850,
    wave: 1,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'experiment-01',
    sectionId: 'experiments',
    targetSelector: '[data-build-target="experiment-01"]',
    preferredAgentId: 'AGENT_03',
    taskLabel: 'LAB_01: AMBIENT_OS',
    strategy: 'card',
    durationMs: 1000,
    wave: 1,
    offsetPct: { x: 0.4, y: 0.25 },
    status: 'pending',
  },
  // Wave 2: Exp 02 & Exp 03
  {
    id: 'experiment-02',
    sectionId: 'experiments',
    targetSelector: '[data-build-target="experiment-02"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'LAB_02: AGENT_SYSTEMS',
    strategy: 'card',
    durationMs: 1000,
    wave: 2,
    offsetPct: { x: 0.4, y: 0.25 },
    status: 'pending',
  },
  {
    id: 'experiment-03',
    sectionId: 'experiments',
    targetSelector: '[data-build-target="experiment-03"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'LAB_03: EDGE_VISION',
    strategy: 'card',
    durationMs: 1000,
    wave: 2,
    offsetPct: { x: 0.4, y: 0.25 },
    status: 'pending',
  },

  // ================= SECTION 8: CONTACT =================
  // Wave 1: Heading & Direct Channels
  {
    id: 'contact-heading',
    sectionId: 'contact',
    targetSelector: '[data-build-target="contact-heading"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'SECTION: "INITIATE_CONTACT"',
    strategy: 'typography',
    durationMs: 850,
    wave: 1,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'contact-channels',
    sectionId: 'contact',
    targetSelector: '[data-build-target="contact-channels"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'INBOX: TRANSMISSION_GATEWAY',
    strategy: 'card',
    durationMs: 1000,
    wave: 1,
    offsetPct: { x: 0.4, y: 0.3 },
    status: 'pending',
  },
  // Wave 2: Interactive Form & Terminal Footer
  {
    id: 'contact-form',
    sectionId: 'contact',
    targetSelector: '[data-build-target="contact-form"]',
    preferredAgentId: 'AGENT_05',
    taskLabel: 'FORM: PACKET_DISPATCH',
    strategy: 'card',
    durationMs: 1100,
    wave: 2,
    offsetPct: { x: 0.5, y: 0.3 },
    status: 'pending',
  },
  {
    id: 'contact-footer',
    sectionId: 'contact',
    targetSelector: '[data-build-target="contact-footer"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'FOOTER: SYSTEM_SIGNATURE',
    strategy: 'container',
    durationMs: 800,
    wave: 2,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
];

export class TaskQueueManager {
  private tasks: QueuedTask[] = [];

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.tasks = INITIAL_CONSTRUCTION_TASKS.map((t) => ({ ...t, status: 'pending' }));
  }

  public getSectionTasks(sectionId: ConstructionSectionId): QueuedTask[] {
    return this.tasks.filter((t) => t.sectionId === sectionId);
  }

  public getNextTaskForAgent(
    agentId: string,
    currentSection: ConstructionSectionId
  ): QueuedTask | null {
    // 1. Prioritize preferred task for this agent in currentSection (lowest wave first)
    const preferredTasks = this.tasks
      .filter(
        (t) =>
          t.sectionId === currentSection &&
          t.status === 'pending' &&
          t.preferredAgentId === agentId
      )
      .sort((a, b) => a.wave - b.wave);

    if (preferredTasks.length > 0) {
      const task = preferredTasks[0];
      task.status = 'in_progress';
      task.assignedAgentId = agentId;
      return task;
    }

    // 2. Fallback: Any pending task in currentSection (lowest wave first)
    const pendingTasks = this.tasks
      .filter((t) => t.sectionId === currentSection && t.status === 'pending')
      .sort((a, b) => a.wave - b.wave);

    if (pendingTasks.length > 0) {
      const task = pendingTasks[0];
      task.status = 'in_progress';
      task.assignedAgentId = agentId;
      return task;
    }

    return null;
  }

  public markTaskComplete(taskId: string): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = 'completed';
    }
  }

  public isSectionComplete(sectionId: ConstructionSectionId, thresholdPct = 0.9): boolean {
    const sectionTasks = this.getSectionTasks(sectionId);
    if (sectionTasks.length === 0) return true;
    const completed = sectionTasks.filter((t) => t.status === 'completed').length;
    return completed / sectionTasks.length >= thresholdPct;
  }

  public getOverallProgressPct(): number {
    const completed = this.tasks.filter((t) => t.status === 'completed').length;
    return Math.round((completed / this.tasks.length) * 100);
  }
}
