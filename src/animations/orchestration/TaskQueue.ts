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
  // Wave 1: Navigation framework, logo, links, system tag, avatar framework
  {
    id: 'hero-nav-bar',
    sectionId: 'hero',
    targetSelector: '[data-build-target="nav-bar"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'CONSTRUCT: NAV_FRAME',
    strategy: 'container',
    durationMs: 900,
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
    durationMs: 800,
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
    durationMs: 900,
    wave: 1,
    offsetPct: { x: 0.65, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-nav-actions',
    sectionId: 'hero',
    targetSelector: '[data-build-target="nav-actions"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'CALIBRATE: HUD_TELEMETRY',
    strategy: 'button',
    durationMs: 800,
    wave: 1,
    offsetPct: { x: 0.85, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-tag',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-tag"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'CALIBRATE: SYSTEM_TAG',
    strategy: 'button',
    durationMs: 750,
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
    durationMs: 1400,
    wave: 1,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },

  // Wave 2: Main headline lines and subtitle (Left to right, top to bottom)
  {
    id: 'hero-line-1',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-line-1"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'GLYPHS: "ENGINEERING"',
    strategy: 'typography',
    durationMs: 1200,
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
    durationMs: 950,
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
    durationMs: 1300,
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
    durationMs: 900,
    wave: 2,
    offsetPct: { x: 0.35, y: 0.5 },
    status: 'pending',
  },

  // Wave 3: Bio paragraph, CTA action group, and metadata telemetry matrix
  {
    id: 'hero-bio',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-bio"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'TYPESET: PROFILE_BIO',
    strategy: 'typography',
    durationMs: 1100,
    wave: 3,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-stats',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-stats"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'SYNTH: SYSTEM_MATRIX',
    strategy: 'container',
    durationMs: 900,
    wave: 3,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-actions',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-actions"]',
    preferredAgentId: 'AGENT_05',
    taskLabel: 'CONSTRUCT: CTA_GROUP',
    strategy: 'button',
    durationMs: 1000,
    wave: 3,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'hero-meta',
    sectionId: 'hero',
    targetSelector: '[data-build-target="hero-meta"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'FORMAT: TELEMETRY_MATRIX',
    strategy: 'card',
    durationMs: 1100,
    wave: 3,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },

  // ================= SECTION 2: ABOUT & PRINCIPLES =================
  // Wave 1: About heading & foundational bio (Left column)
  {
    id: 'about-heading',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-heading"]',
    preferredAgentId: 'AGENT_02',
    taskLabel: 'SECTION: "ABOUT_ENGINEERING"',
    strategy: 'typography',
    durationMs: 1000,
    wave: 1,
    offsetPct: { x: 0.3, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'about-bio',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-bio"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'TYPESET: FOUNDATION_BIO',
    strategy: 'typography',
    durationMs: 1100,
    wave: 1,
    offsetPct: { x: 0.5, y: 0.4 },
    status: 'pending',
  },
  // Wave 2: 4 Core Principles Cards (Right column)
  {
    id: 'about-principles',
    sectionId: 'about',
    targetSelector: '[data-build-target="about-principles"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'INDEX: 4_CORE_PRINCIPLES',
    strategy: 'card',
    durationMs: 1300,
    wave: 2,
    offsetPct: { x: 0.35, y: 0.15 },
    status: 'pending',
  },

  // ================= SECTION 3: ENGINEERING TIMELINE =================
  {
    id: 'engineering-timeline',
    sectionId: 'timeline',
    targetSelector: '[data-build-target="engineering-timeline"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'CHRONOLOGY: PROGRESSION_SPINE',
    strategy: 'container',
    durationMs: 1400,
    wave: 1,
    offsetPct: { x: 0.5, y: 0.5 },
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
    durationMs: 950,
    wave: 1,
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
    durationMs: 1200,
    wave: 1,
    offsetPct: { x: 0.35, y: 0.12 },
    status: 'pending',
  },
  {
    id: 'project-02',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-02"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'SCAFFOLD: AETHER_OS',
    strategy: 'card',
    durationMs: 1200,
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
    taskLabel: 'SCAFFOLD: PIRATE_CIV (695 T)',
    strategy: 'card',
    durationMs: 1200,
    wave: 2,
    offsetPct: { x: 0.35, y: 0.12 },
    status: 'pending',
  },
  {
    id: 'project-04',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-04"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'SCAFFOLD: CAMPUS_RESOLVE',
    strategy: 'card',
    durationMs: 1200,
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
    taskLabel: 'SCAFFOLD: CALLBUDDY_AI',
    strategy: 'card',
    durationMs: 1200,
    wave: 3,
    offsetPct: { x: 0.35, y: 0.12 },
    status: 'pending',
  },
  {
    id: 'project-06',
    sectionId: 'projects',
    targetSelector: '[data-build-target="project-06"]',
    preferredAgentId: 'AGENT_03',
    taskLabel: 'SCAFFOLD: EDGE_AI_VISION',
    strategy: 'card',
    durationMs: 1200,
    wave: 3,
    offsetPct: { x: 0.35, y: 0.12 },
    status: 'pending',
  },

  // ================= SECTION 5: ARCHITECTURE =================
  {
    id: 'architecture-graph',
    sectionId: 'architecture',
    targetSelector: '[data-build-target="architecture-graph"]',
    preferredAgentId: 'AGENT_03',
    taskLabel: 'CONNECT: 6_NEURAL_NODES',
    strategy: 'architecture',
    durationMs: 1400,
    wave: 1,
    offsetPct: { x: 0.45, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'architecture-details',
    sectionId: 'architecture',
    targetSelector: '[data-build-target="architecture-details"]',
    preferredAgentId: 'AGENT_01',
    taskLabel: 'COMPILE: TOPOLOGY_SPECS',
    strategy: 'card',
    durationMs: 1200,
    wave: 1,
    offsetPct: { x: 0.55, y: 0.5 },
    status: 'pending',
  },

  // ================= SECTION 6: TECH STACK & EXPERIMENTS =================
  {
    id: 'tech-stack',
    sectionId: 'stack',
    targetSelector: '[data-build-target="tech-stack"]',
    preferredAgentId: 'AGENT_04',
    taskLabel: 'MAP: 28_CAPABILITIES',
    strategy: 'card',
    durationMs: 1300,
    wave: 1,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },
  {
    id: 'experiments',
    sectionId: 'experiments',
    targetSelector: '[data-build-target="experiments"]',
    preferredAgentId: 'AGENT_06',
    taskLabel: 'INDEX: ACTIVE_LABS',
    strategy: 'card',
    durationMs: 1200,
    wave: 1,
    offsetPct: { x: 0.5, y: 0.5 },
    status: 'pending',
  },

  // ================= SECTION 7: CONTACT =================
  {
    id: 'contact',
    sectionId: 'contact',
    targetSelector: '[data-build-target="contact"]',
    preferredAgentId: 'AGENT_05',
    taskLabel: 'SECURE: COMMS_INTERFACE',
    strategy: 'container',
    durationMs: 1300,
    wave: 1,
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
