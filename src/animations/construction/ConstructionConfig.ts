export type ComponentBuildStage =
  | 'unbuilt'
  | 'layout'
  | 'wireframe'
  | 'container'
  | 'internals'
  | 'typography'
  | 'styling'
  | 'assembled';

export interface StageDefinition {
  stage: ComponentBuildStage;
  label: string;
  durationMs: number;
}

export interface SectionTimelineConfig {
  id: string;
  title: string;
  selector: string;
  assignedAgents: string[];
  startMs: number;
  durationMs: number;
  cameraScrollYSelector?: string;
  description: string;
}

export const TOTAL_CONSTRUCTION_DURATION_MS = 28000; // 28 seconds cinematic sweet spot

export const SECTION_TIMELINES: SectionTimelineConfig[] = [
  {
    id: 'sec-env',
    title: 'CANVAS CALIBRATION & COORDINATE GRID',
    selector: '#hero',
    assignedAgents: ['AGENT_01', 'AGENT_20'],
    startMs: 0,
    durationMs: 2500,
    cameraScrollYSelector: '#hero',
    description: 'Calibrating 12-column isometric responsive grid and viewport anchors',
  },
  {
    id: 'sec-nav',
    title: 'NAVIGATION CHASSIS & ROUTING BUS',
    selector: '#navbar',
    assignedAgents: ['AGENT_01', 'AGENT_02', 'AGENT_08', 'AGENT_16'],
    startMs: 2200,
    durationMs: 3800,
    cameraScrollYSelector: '#hero',
    description: 'Drawing navigation boundary, laser-engraving brand logo, positioning routes',
  },
  {
    id: 'sec-hero-type',
    title: 'HERO TYPOGRAPHY & GLYPH MATRIX',
    selector: '#hero-title',
    assignedAgents: ['AGENT_03', 'AGENT_04', 'AGENT_10'],
    startMs: 5500,
    durationMs: 5000,
    cameraScrollYSelector: '#hero',
    description: 'Projecting baselines, assembling solid glyphs and outlined letterforms',
  },
  {
    id: 'sec-hero-identity',
    title: 'ENGINEERING IDENTITY & CTAS',
    selector: '#hero',
    assignedAgents: ['AGENT_05', 'AGENT_06', 'AGENT_07', 'AGENT_18', 'AGENT_20'],
    startMs: 9800,
    durationMs: 4200,
    cameraScrollYSelector: '#hero',
    description: 'Synthesizing interactive CTA buttons, telemetry bars, and geometric avatar',
  },
  {
    id: 'sec-about',
    title: 'ABOUT ARCHITECTURE & 4 AXIOMS',
    selector: '#about',
    assignedAgents: ['AGENT_07', 'AGENT_11', 'AGENT_18'],
    startMs: 13500,
    durationMs: 3800,
    cameraScrollYSelector: '#about',
    description: 'Dividing two-column layout, framing thesis, constructing principle cards',
  },
  {
    id: 'sec-projects',
    title: 'FLAGSHIP PROJECT SPECIFICATIONS',
    selector: '#projects',
    assignedAgents: ['AGENT_01', 'AGENT_02', 'AGENT_09', 'AGENT_13', 'AGENT_17'],
    startMs: 16800,
    durationMs: 4800,
    cameraScrollYSelector: '#projects',
    description: 'Drawing 6 editorial project containers, mounting tags, typing verified metrics',
  },
  {
    id: 'sec-architecture',
    title: 'INTERACTIVE SYSTEM TOPOLOGY GRAPH',
    selector: '#architecture',
    assignedAgents: ['AGENT_06', 'AGENT_14', 'AGENT_15'],
    startMs: 21000,
    durationMs: 3800,
    cameraScrollYSelector: '#architecture',
    description: 'Drawing central RISHI core, extending 6 radial connector rays, mounting nodes',
  },
  {
    id: 'sec-stack-contact',
    title: 'TECH MATRIX, R&D & DISPATCH CHANNELS',
    selector: '#contact',
    assignedAgents: ['AGENT_12', 'AGENT_16', 'AGENT_19', 'AGENT_20'],
    startMs: 24200,
    durationMs: 3000,
    cameraScrollYSelector: '#contact',
    description: 'Hydrating capability pills, binding dispatch socket, final system lock',
  },
  {
    id: 'sec-finalize',
    title: 'HANDSHAKE VERIFICATION & SYSTEM ONLINE',
    selector: '#hero',
    assignedAgents: ['AGENT_20'],
    startMs: 27200,
    durationMs: 800,
    cameraScrollYSelector: '#hero',
    description: 'Releasing construction guides, returning camera to top, unlocking interaction',
  },
];

