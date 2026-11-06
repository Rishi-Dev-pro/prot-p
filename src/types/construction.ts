export type ElementBuildStatus = 'unbuilt' | 'wireframe' | 'drawing' | 'assembled';

export interface BuildTargetDef {
  id: string; // e.g. "hero-line-1"
  selector: string; // e.g. '[data-build-target="hero-line-1"]'
  assignedAgentId: string; // e.g. "AGENT_03"
  phase: number; // 1 to 10
  actionName: string; // e.g. "RASTERIZE_TYPOGRAPHY"
  duration: number; // seconds
}

export interface AgentTask {
  id: string;
  agentId: string;
  targetKey: string;
  actionText: string;
  phase: number;
  startDelayMs: number;
  durationMs: number;
  offset?: { xPct: number; yPct: number }; // relative to target element rect
}

export interface TargetElementRect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
}

