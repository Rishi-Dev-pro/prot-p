export interface PhaseInfo {
  phase: number;
  label: string;
  actionText: string;
  startMs: number;
  endMs: number;
  targetScrollYSelector?: string; // which section camera should ensure is visible
}

export const TOTAL_TIMELINE_DURATION_MS = 15000;

export const CONSTRUCTION_PHASES: PhaseInfo[] = [
  {
    phase: 1,
    label: 'ENVIRONMENT INITIALIZATION',
    actionText: 'COMPUTING_VIEWPORT_COORDINATES',
    startMs: 0,
    endMs: 1200,
    targetScrollYSelector: '#hero',
  },
  {
    phase: 2,
    label: 'AGENT SWARM ARRIVAL',
    actionText: 'DISPATCHING_20_SPECIALIZED_AGENTS',
    startMs: 1200,
    endMs: 2400,
    targetScrollYSelector: '#hero',
  },
  {
    phase: 3,
    label: 'NAVIGATION ASSEMBLY',
    actionText: 'STITCHING_NAVBAR_TOPOLOGY',
    startMs: 2400,
    endMs: 3800,
    targetScrollYSelector: '#hero',
  },
  {
    phase: 4,
    label: 'HERO & IDENTITY CONSTRUCTION',
    actionText: 'RASTERIZING_OUTLINE_TYPOGRAPHY',
    startMs: 3800,
    endMs: 6200,
    targetScrollYSelector: '#hero',
  },
  {
    phase: 5,
    label: 'ABOUT & PRINCIPLES SYNTHESIS',
    actionText: 'EXPANDING_PHILOSOPHY_NODES',
    startMs: 6200,
    endMs: 8000,
    targetScrollYSelector: '#about',
  },
  {
    phase: 6,
    label: 'FLAGSHIP PROJECTS COMPILATION',
    actionText: 'UNROLLING_SPEC_MANIFESTS',
    startMs: 8000,
    endMs: 10400,
    targetScrollYSelector: '#projects',
  },
  {
    phase: 7,
    label: 'ARCHITECTURE ECOSYSTEM',
    actionText: 'DRAWING_NEURAL_TOPOLOGY_VECTORS',
    startMs: 10400,
    endMs: 12000,
    targetScrollYSelector: '#architecture',
  },
  {
    phase: 8,
    label: 'TECHNOLOGY MATRIX & R&D',
    actionText: 'HYDRATING_TOOLCHAIN_CONTAINERS',
    startMs: 12000,
    endMs: 13200,
    targetScrollYSelector: '#stack',
  },
  {
    phase: 9,
    label: 'CONTACT CHANNELS & SYSTEM BUS',
    actionText: 'BINDING_DISPATCH_INTERFACES',
    startMs: 13200,
    endMs: 14200,
    targetScrollYSelector: '#contact',
  },
  {
    phase: 10,
    label: 'ASSEMBLY COMPLETE // SYSTEM ONLINE',
    actionText: 'RELEASING_INTERACTION_LOCKS',
    startMs: 14200,
    endMs: 15000,
    targetScrollYSelector: '#hero',
  },
];

