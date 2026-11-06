import { AgentCursorData } from '../types/agent';

/**
 * Exactly 6 Active Virtual Engineering Agents for Phase C
 * Palette: V6 Restrained Violet / Lavender / Cyan / Blue-Violet / Silver / Electric Cyan
 * Symmetrical Hexagon Formation, Distinct Responsibilities, Zero Rainbow Clutter.
 */
export const AGENT_REGISTRY: AgentCursorData[] = [
  {
    id: 'AGENT_01',
    name: 'ARCHITECT',
    role: 'Layout & Structural Elements',
    color: '#B44CFF', // Muted Electric Violet
    initialPos: { x: 15, y: 15 },
    targetKey: 'hero',
    activity: 'COORDINATING_GRID_BOUNDS',
  },
  {
    id: 'AGENT_02',
    name: 'TYPESETTER',
    role: 'Typography & Text Elements',
    color: '#C4B5FD', // Soft Lavender
    initialPos: { x: 85, y: 18 },
    targetKey: 'hero-title',
    activity: 'RASTERIZING_GLYPH_VECTORS',
  },
  {
    id: 'AGENT_03',
    name: 'SHADER_CORE',
    role: 'Visual Graphics & SVG Elements',
    color: '#38BDF8', // Desaturated Cyan
    initialPos: { x: 88, y: 65 },
    targetKey: 'hero-orbital-graphic',
    activity: 'BLENDING_CHROMATIC_BUFFERS',
  },
  {
    id: 'AGENT_04',
    name: 'CONTAINER_SYNTH',
    role: 'Containers, Cards & Panels',
    color: '#818CF8', // Subtle Blue-Violet
    initialPos: { x: 75, y: 85 },
    targetKey: 'about',
    activity: 'ASSEMBLING_ATOMIC_ELEMENTS',
  },
  {
    id: 'AGENT_05',
    name: 'NAV_ROUTER',
    role: 'Buttons, Navigation & Interactions',
    color: '#E2E8F0', // Cool Silver-White
    initialPos: { x: 25, y: 85 },
    targetKey: 'nav',
    activity: 'BINDING_ANCHOR_DISPATCHERS',
  },
  {
    id: 'AGENT_06',
    name: 'SYSTEM_VERIFIER',
    role: 'Content Verification & Components',
    color: '#00F0FF', // Precision Electric Cyan Accent
    initialPos: { x: 12, y: 55 },
    targetKey: 'architecture',
    activity: 'ASSERTING_DOM_CONSTRAINTS',
  },
];

/**
 * Mobile-curated 4 active agents (fits smaller viewports smoothly at 60 FPS)
 */
export const MOBILE_AGENT_REGISTRY: AgentCursorData[] = AGENT_REGISTRY.slice(0, 4);
