export type ConstructionSectionId =
  | 'hero'
  | 'about'
  | 'projects'
  | 'architecture'
  | 'stack'
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
  preferredAgentId?: string;
  taskLabel: string;
  strategy: ConstructionStrategyType;
  durationMs: number;
  offsetPct?: { x: number; y: number };
  status: 'pending' | 'in_progress' | 'completed';
  assignedAgentId?: string;
}

export const INITIAL_CONSTRUCTION_TASKS: QueuedTask[] = [
  // ================= SECTION 1: HERO & NAVIGATION =================
  {
    id: 'hero-nav-bar',
    sectionId: 'hero',
    targetSelector: '[data-build-target="nav-bar"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'CONSTRUCT: NAV_FRAME',
    strategy: 'container',
    durationMs: 1200,
    offsetPct: { x: 0.1, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-nav-logo',
    sectionId: 'hero',
    targetSelector: '[data-build-target="nav-logo"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'ASSEMBLE: RS_MONOGRAM',
    strategy: 'button',
    durationMs: 1000,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-nav-links',
    sectionId: 'hero',
    targetSelector: '[data-build-target="nav-links"]',
    preferredAgentId: 'AGENT_20',
    taskLabel: 'TYPESET: NAV_CHIPS',
    strategy: 'typography',
    durationMs: 1100,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-tag',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-tag"]',
    preferredAgentId: 'AGENT_08',
    taskLabel: 'CALIBRATE: SYSTEM_TAG',
    strategy: 'button',
    durationMs: 800,
    offsetPct: { x: 0.2, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-line-1',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-line-1"]',
    preferredAgentId: 'AGENT_03',
    taskLabel: 'GLYPHS: "ENGINEERING"',
    strategy: 'typography',
    durationMs: 1500,
    offsetPct: { x: 0.35, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-line-2',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-line-2"]',
    preferredAgentId: 'AGENT_13',
    taskLabel: 'GLYPHS: "THE"',
    strategy: 'typography',
    durationMs: 1100,
    offsetPct: { x: 0.15, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-line-3',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-line-3"]',
    preferredAgentId: 'AGENT_17',
    taskLabel: 'GLYPHS: "UNEXPECTED."',
    strategy: 'typography',
    durationMs: 1600,
    offsetPct: { x: 0.45, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-subhead',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-subhead"]',
    preferredAgentId: 'AGENT_07',
    taskLabel: 'TYPESET: POSITIONING',
    strategy: 'typography',
    durationMs: 1000,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-bio',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-bio"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'TYPESET: PROFILE_BIO',
    strategy: 'typography',
    durationMs: 1200,
    offsetPct: { x: 0.4, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-actions',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-actions"]',
    preferredAgentId: 'AGENT_05',
    taskLabel: 'CONSTRUCT: CTA_GROUP',
    strategy: 'button',
    durationMs: 1100,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-avatar',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-avatar"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'RENDER: ORBITAL_CORE',
    strategy: 'architecture',
    durationMs: 1700,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-meta',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-meta"]',
    preferredAgentId: 'AGENT_18',
    taskLabel: 'FORMAT: TELEMETRY_MATRIX',
    strategy: 'card',
    durationMs: 1200,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },

  // ================= SECTION 2: ABOUT & PRINCIPLES =================
  {
    id: 'about-heading',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-heading"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'SECTION: "ABOUT_ENGINEERING"',
    strategy: 'typography',
    durationMs: 1200,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'about-bio',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-bio"]',
    preferredAgentId: 'AGENT_07',
    taskLabel: 'TYPESET: FOUNDATION_BIO',
    strategy: 'typography',
    durationMs: 1400,
    offsetPct: { x: 0.5, y: 0.4 },
    status: 'pending',
  },
  {
    id: 'about-principles',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-principles"]',
    preferredAgentId: 'AGENT_11',
    taskLabel: 'INDEX: 4_CORE_PRINCIPLES',
    strategy: 'card',
    durationMs: 1600,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },

  // ================= SECTION 3: FLAGSHIP PROJECTS (6) =================
  {
    id: 'projects-heading',
    sectionId: 'projects',
    targetSelector: '[data-build-target="projects-heading"]',
    preferredAgentId: 'AGENT_09',
    taskLabel: 'SECTION: "FEATURED_PROJECTS"',
    strategy: 'typography',
    durationMs: 1100,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'project-01',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-01"]',
    preferredAgentId: 'AGENT_03',
    taskLabel: 'SCAFFOLD: AHI_AGENT',
    strategy: 'card',
    durationMs: 1400,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'project-02',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-02"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'SCAFFOLD: AETHER_OS',
    strategy: 'card',
    durationMs: 1400,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'project-03',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-03"]',
    preferredAgentId: 'AGENT_12',
    taskLabel: 'SCAFFOLD: PIRATE_CIV (695 T)',
    strategy: 'card',
    durationMs: 1400,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'project-04',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-04"]',
    preferredAgentId: 'AGENT_15',
    taskLabel: 'SCAFFOLD: CAMPUS_RESOLVE',
    strategy: 'card',
    durationMs: 1400,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'project-05',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-05"]',
    preferredAgentId: 'AGENT_16',
    taskLabel: 'SCAFFOLD: CALLBUDDY_AI',
    strategy: 'card',
    durationMs: 1400,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'project-06',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-06"]',
    preferredAgentId: 'AGENT_17',
    taskLabel: 'SCAFFOLD: EDGE_AI_VISION',
    strategy: 'card',
    durationMs: 1400,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },

  // ================= SECTION 4: ARCHITECTURE =================
  {
    id: 'architecture-graph',
    sectionId: 'architecture',
    targetSelector: '[data-build-target="architecture-graph"]',
    preferredAgentId: 'AGENT_14',
    taskLabel: 'CONNECT: 6_NEURAL_NODES',
    strategy: 'architecture',
    durationMs: 1700,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'architecture-details',
    sectionId: 'architecture',
    targetSelector: '[data-build-target="architecture-details"]',
    preferredAgentId: 'AGENT_20',
    taskLabel: 'COMPILE: TOPOLOGY_SPECS',
    strategy: 'card',
    durationMs: 1400,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },

  // ================= SECTION 5: TECH STACK & EXPERIMENTS =================
  {
    id: 'tech-stack',
    sectionId: 'stack',
    targetSelector: '[data-build-target="tech-stack"]',
    preferredAgentId: 'AGENT_12',
    taskLabel: 'MAP: 28_CAPABILITIES',
    strategy: 'card',
    durationMs: 1600,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'experiments',
    sectionId: 'stack',
    targetSelector: '[data-build-target="experiments"]',
    preferredAgentId: 'AGENT_10',
    taskLabel: 'INDEX: ACTIVE_LABS',
    strategy: 'card',
    durationMs: 1400,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },

  // ================= SECTION 6: CONTACT =================
  {
    id: 'contact',
    sectionId: 'contact',
    targetSelector: '[data-build-target="contact"]',
    preferredAgentId: 'AGENT_16',
    taskLabel: 'SECURE: COMMS_INTERFACE',
    strategy: 'container',
    durationMs: 1500,
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
    // 1. Try to find a task specifically preferred for this agent in current section
    let candidate = this.tasks.find(
      (t) =>
        t.sectionId === currentSection &&
        t.status === 'pending' &&
        t.preferredAgentId === agentId
    );

    // 2. If not, find any pending task in current section
    if (!candidate) {
      candidate = this.tasks.find(
        (t) => t.sectionId === currentSection && t.status === 'pending'
      );
    }

    if (candidate) {
      candidate.status = 'in_progress';
      candidate.assignedAgentId = agentId;
      return candidate;
    }

    return null;
  }

  public markTaskComplete(taskId: string): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = 'completed';
    }
  }

  public isSectionComplete(sectionId: ConstructionSectionId, thresholdPct = 0.85): boolean {
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
