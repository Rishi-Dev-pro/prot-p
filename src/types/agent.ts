export interface AgentCursorData {
  id: string; // e.g., "AGENT_01"
  name: string; // e.g., "ARCHITECT"
  role: string;
  color: string;
  initialPos: { x: number; y: number }; // percentage coords (0-100)
  targetKey: string; // which section or element this agent focuses on
  activity: string; // Current synthetic action text
}

export type ConstructionStep = 
  | 'BOOT' 
  | 'AGENT_DISPATCH' 
  | 'GRID_ASSEMBLY' 
  | 'HERO_ASSEMBLY' 
  | 'SECTIONS_ASSEMBLY' 
  | 'OPTIMIZING' 
  | 'COMPLETED';

export interface AgentActivityState {
  id: string;
  currentX: number;
  currentY: number;
  activity: string;
  isClicking: boolean;
  activePathIndex?: number;
}

