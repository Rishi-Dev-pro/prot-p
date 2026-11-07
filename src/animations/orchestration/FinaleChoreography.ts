import { AgentCursorData } from '../../types/agent';
import { FreestyleAgentState } from '../construction/FreestyleAgentEngine';

export type FinaleStage =
  | 'ALL_SECTIONS_COMPLETED'
  | 'FINAL_SCROLL_STARTED'
  | 'FINAL_SCROLL_COMPLETED'
  | 'DANCE_STARTED'
  | 'CIRCLE_FORMATION'
  | 'CIRCLE_HOLD'
  | 'OUTWARD_DEPARTURE'
  | 'FINAL_RESTING_STATE';

export interface FinaleDestination {
  x: number;
  y: number;
  angle: number;
  radialAngle: number;
}

export interface FinaleAgentState {
  id: string;
  x: number;
  y: number;
  angle: number;
  trail: { x: number; y: number }[];
}

export class FinaleChoreographyController {
  private width: number;
  private height: number;
  private agents: AgentCursorData[];
  private currentStage: FinaleStage = 'ALL_SECTIONS_COMPLETED';
  private stageStartTime: number = 0;
  private isCompleted: boolean = false;
  private onStageChange?: (stage: FinaleStage) => void;

  // Stored state at transition boundaries
  private scrollStartPositions: Map<string, { x: number; y: number; angle: number }> = new Map();
  private danceEndPositions: Map<string, { x: number; y: number; angle: number }> = new Map();
  private circlePositions: Map<string, { x: number; y: number; angle: number }> = new Map();
  private destinations: FinaleDestination[] = [];

  constructor(
    width: number,
    height: number,
    agents: AgentCursorData[],
    onStageChange?: (stage: FinaleStage) => void
  ) {
    this.width = width;
    this.height = height;
    this.agents = agents;
    this.onStageChange = onStageChange;
    this.destinations = this.computeDestinations(width, height);
  }

  public updateViewport(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.destinations = this.computeDestinations(width, height);
  }

  public getStage(): FinaleStage {
    return this.currentStage;
  }

  public isResting(): boolean {
    return this.currentStage === 'FINAL_RESTING_STATE';
  }

  /**
   * Assigns the 6 unique destinations to the 6 agents around the screen edges:
   * 0: Top (12 o'clock)
   * 1: Upper-right (2 o'clock)
   * 2: Lower-right (4 o'clock)
   * 3: Bottom (6 o'clock)
   * 4: Lower-left (8 o'clock)
   * 5: Upper-left (10 o'clock)
   */
  public computeDestinations(width: number, height: number): FinaleDestination[] {
    const cx = width / 2;
    const padX = Math.max(65, Math.min(width * 0.065, 95));
    const padY = Math.max(75, Math.min(height * 0.09, 100));

    return [
      // 0: Top - below navbar, pointing down-right
      {
        x: cx,
        y: Math.max(80, padY),
        angle: 45,
        radialAngle: -Math.PI / 2,
      },
      // 1: Upper-right - safe margin from navbar and right edge
      {
        x: width - padX,
        y: Math.max(120, height * 0.22),
        angle: 45,
        radialAngle: -Math.PI / 6,
      },
      // 2: Lower-right - bottom-right perimeter
      {
        x: width - padX,
        y: height - padY - 25,
        angle: 45,
        radialAngle: Math.PI / 6,
      },
      // 3: Bottom - centered above screen bottom
      {
        x: cx,
        y: height - Math.max(50, padY - 25),
        angle: 45,
        radialAngle: Math.PI / 2,
      },
      // 4: Lower-left - bottom-left perimeter
      {
        x: padX,
        y: height - padY - 25,
        angle: 45,
        radialAngle: (5 * Math.PI) / 6,
      },
      // 5: Upper-left - top-left perimeter below navbar
      {
        x: padX,
        y: Math.max(120, height * 0.22),
        angle: 45,
        radialAngle: (-5 * Math.PI) / 6,
      },
    ];
  }

  /**
   * Initializes the finale from active agent coordinates
   */
  public start(currentAgentPositions: Map<string, { x: number; y: number; angle: number }>): void {
    this.stageStartTime = performance.now();
    this.currentStage = 'ALL_SECTIONS_COMPLETED';
    this.onStageChange?.(this.currentStage);

    currentAgentPositions.forEach((pos, id) => {
      this.scrollStartPositions.set(id, { ...pos });
    });
  }

  /**
   * Fast-forwards directly to the final resting state (e.g. on Skip)
   */
  public skipToResting(): FinaleAgentState[] {
    this.currentStage = 'FINAL_RESTING_STATE';
    this.isCompleted = true;
    this.onStageChange?.(this.currentStage);

    return this.agents.map((agent, idx) => {
      const dest = this.destinations[idx % this.destinations.length];
      return {
        id: agent.id,
        x: dest.x,
        y: dest.y,
        angle: dest.angle,
        trail: [],
      };
    });
  }

  /**
   * Advances the choreography clock and returns the updated 6-agent coordinates
   */
  public tick(
    now: number,
    scrollY: number,
    currentPositions: Map<string, { x: number; y: number; angle: number }>
  ): FinaleAgentState[] {
    const elapsedSec = (now - this.stageStartTime) / 1000;
    const cx = this.width / 2;
    const cy = this.height / 2;
    const baseRadius = Math.max(130, Math.min(this.width, this.height) * 0.22);

    // ================= 1. ALL_SECTIONS_COMPLETED =================
    if (this.currentStage === 'ALL_SECTIONS_COMPLETED') {
      if (elapsedSec >= 0.4) {
        this.currentStage = 'FINAL_SCROLL_STARTED';
        this.stageStartTime = now;
        this.onStageChange?.(this.currentStage);

        // Store positions as scroll starts
        currentPositions.forEach((pos, id) => {
          this.scrollStartPositions.set(id, { ...pos });
        });

        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }

      return this.agents.map((agent) => {
        const p = currentPositions.get(agent.id) || { x: cx, y: cy, angle: 45 };
        return {
          id: agent.id,
          x: p.x,
          y: p.y,
          angle: p.angle,
          trail: [],
        };
      });
    }

    // ================= 2. FINAL_SCROLL_STARTED =================
    if (this.currentStage === 'FINAL_SCROLL_STARTED') {
      // Check if page scroll has settled at top (scrollY near 0) or timeout fallback (1.4s)
      const isScrollSettled = scrollY <= 3;
      const isTimeout = elapsedSec >= 1.4;

      if ((isScrollSettled && elapsedSec >= 0.6) || isTimeout) {
        this.currentStage = 'FINAL_SCROLL_COMPLETED';
        this.stageStartTime = now;
        this.onStageChange?.(this.currentStage);
      }

      // During scroll, cursors gently drift toward initial gathering radius
      const scrollProgress = Math.min(1, elapsedSec / 1.0);
      const ease = this.easeInOutCubic(scrollProgress);

      return this.agents.map((agent, idx) => {
        const startPos = this.scrollStartPositions.get(agent.id) || { x: cx, y: cy, angle: 45 };
        const angle = (-Math.PI / 2) + (idx / this.agents.length) * (Math.PI * 2);
        const targetX = cx + Math.cos(angle) * (baseRadius + 60);
        const targetY = cy + Math.sin(angle) * (baseRadius + 60);

        const x = startPos.x + (targetX - startPos.x) * ease;
        const y = startPos.y + (targetY - startPos.y) * ease;

        return {
          id: agent.id,
          x,
          y,
          angle: (angle * 180) / Math.PI + 45,
          trail: [],
        };
      });
    }

    // ================= 3. FINAL_SCROLL_COMPLETED =================
    if (this.currentStage === 'FINAL_SCROLL_COMPLETED') {
      if (elapsedSec >= 0.35) {
        this.currentStage = 'DANCE_STARTED';
        this.stageStartTime = now;
        this.onStageChange?.(this.currentStage);

        // Record positions before dance begins
        currentPositions.forEach((pos, id) => {
          this.scrollStartPositions.set(id, { ...pos });
        });
      }

      return this.agents.map((agent, idx) => {
        const angle = (-Math.PI / 2) + (idx / this.agents.length) * (Math.PI * 2);
        return {
          id: agent.id,
          x: cx + Math.cos(angle) * (baseRadius + 60),
          y: cy + Math.sin(angle) * (baseRadius + 60),
          angle: (angle * 180) / Math.PI + 45,
          trail: [],
        };
      });
    }

    // ================= 4. DANCE_STARTED (Six-Cursor Coordinated Dance) =================
    if (this.currentStage === 'DANCE_STARTED') {
      const danceDuration = 3.6;

      if (elapsedSec >= danceDuration) {
        // Transition to circle formation
        this.currentStage = 'CIRCLE_FORMATION';
        this.stageStartTime = now;
        this.onStageChange?.(this.currentStage);

        currentPositions.forEach((pos, id) => {
          this.danceEndPositions.set(id, { ...pos });
        });
      }

      const tNorm = Math.min(1, elapsedSec / danceDuration);

      return this.agents.map((agent, idx) => {
        const startPos = this.scrollStartPositions.get(agent.id) || { x: cx, y: cy, angle: 45 };

        // Base 6-point angular offset
        const baseAngle = (-Math.PI / 2) + (idx / 6) * (Math.PI * 2);

        // Smooth 360-degree rotation curve (starts at 0 rad/s, peaks mid-dance, gently halts at 2*PI)
        const rotationAngle = 2 * Math.PI * (tNorm - (Math.sin(2 * Math.PI * tNorm) / (2 * Math.PI)));

        // Distinct phase offset per cursor so they don't look mechanical
        const phaseMod = 0.16 * Math.sin(2 * Math.PI * tNorm) * Math.sin((idx * Math.PI) / 3);
        const currentAngle = baseAngle + rotationAngle + phaseMod;

        // Radial breathing: expands and contracts organically
        const radiusWave = 22 * Math.sin(Math.PI * tNorm) * Math.cos(baseAngle + rotationAngle);
        const currentRadius = baseRadius + radiusWave;

        // Orbital coordinates
        const orbitX = cx + Math.cos(currentAngle) * currentRadius;
        const orbitY = cy + Math.sin(currentAngle) * (currentRadius * 0.9) + 12 * Math.sin(2 * currentAngle);

        // Blend from start positions during the first 0.8s
        const blend = this.easeInOutCubic(Math.min(1, elapsedSec / 0.8));
        const x = startPos.x + (orbitX - startPos.x) * blend;
        const y = startPos.y + (orbitY - startPos.y) * blend;

        // Tangent heading angle
        const tangentDeg = (currentAngle * 180) / Math.PI + 90;

        return {
          id: agent.id,
          x,
          y,
          angle: tangentDeg,
          trail: [{ x, y }],
        };
      });
    }

    // ================= 5. CIRCLE_FORMATION =================
    if (this.currentStage === 'CIRCLE_FORMATION') {
      const formationDuration = 1.3;

      if (elapsedSec >= formationDuration) {
        this.currentStage = 'CIRCLE_HOLD';
        this.stageStartTime = now;
        this.onStageChange?.(this.currentStage);

        this.agents.forEach((agent, idx) => {
          const angle = (-Math.PI / 2) + (idx / 6) * (Math.PI * 2);
          this.circlePositions.set(agent.id, {
            x: cx + Math.cos(angle) * baseRadius,
            y: cy + Math.sin(angle) * baseRadius,
            angle: (angle * 180) / Math.PI + 45,
          });
        });
      }

      const p = Math.min(1, elapsedSec / formationDuration);
      const ease = 1 - Math.pow(1 - p, 3); // Cubic ease out

      return this.agents.map((agent, idx) => {
        const startPos = this.danceEndPositions.get(agent.id) || { x: cx, y: cy, angle: 45 };
        const angle = (-Math.PI / 2) + (idx / 6) * (Math.PI * 2);

        const targetX = cx + Math.cos(angle) * baseRadius;
        const targetY = cy + Math.sin(angle) * baseRadius;
        const targetAngle = (angle * 180) / Math.PI + 45;

        const x = startPos.x + (targetX - startPos.x) * ease;
        const y = startPos.y + (targetY - startPos.y) * ease;
        const curAngle = this.lerpAngle(startPos.angle, targetAngle, ease);

        return {
          id: agent.id,
          x,
          y,
          angle: curAngle,
          trail: [],
        };
      });
    }

    // ================= 6. CIRCLE_HOLD =================
    if (this.currentStage === 'CIRCLE_HOLD') {
      const holdDuration = 1.1;

      if (elapsedSec >= holdDuration) {
        this.currentStage = 'OUTWARD_DEPARTURE';
        this.stageStartTime = now;
        this.onStageChange?.(this.currentStage);
      }

      // Subtle resting breath in circle
      const breath = Math.sin(elapsedSec * 3.0) * 2.5;
      const currentRadius = baseRadius + breath;

      return this.agents.map((agent, idx) => {
        const angle = (-Math.PI / 2) + (idx / 6) * (Math.PI * 2);
        const x = cx + Math.cos(angle) * currentRadius;
        const y = cy + Math.sin(angle) * currentRadius;

        return {
          id: agent.id,
          x,
          y,
          angle: (angle * 180) / Math.PI + 45,
          trail: [],
        };
      });
    }

    // ================= 7. OUTWARD_DEPARTURE =================
    if (this.currentStage === 'OUTWARD_DEPARTURE') {
      const departureDuration = 1.65;

      if (elapsedSec >= departureDuration) {
        this.currentStage = 'FINAL_RESTING_STATE';
        this.isCompleted = true;
        this.stageStartTime = now;
        this.onStageChange?.(this.currentStage);
      }

      // Symmetrical departure stagger:
      // Indices 0 & 3 (vertical axis): delay 0.00s
      // Indices 1 & 5 (upper corners): delay 0.10s
      // Indices 2 & 4 (lower corners): delay 0.20s
      const delays = [0.0, 0.1, 0.2, 0.0, 0.2, 0.1];

      return this.agents.map((agent, idx) => {
        const dest = this.destinations[idx % this.destinations.length];
        const angle = (-Math.PI / 2) + (idx / 6) * (Math.PI * 2);

        const circleX = cx + Math.cos(angle) * baseRadius;
        const circleY = cy + Math.sin(angle) * baseRadius;

        const delay = delays[idx % delays.length];
        const tActive = Math.max(0, elapsedSec - delay);
        const travelDuration = 1.35;
        const progress = Math.min(1, tActive / travelDuration);
        const ease = 1 - Math.pow(1 - progress, 4); // Quintic ease-out

        const x = circleX + (dest.x - circleX) * ease;
        const y = circleY + (dest.y - circleY) * ease;

        // Angle transitions smoothly from radial spoke to resting angle
        const startAngle = (angle * 180) / Math.PI + 45;
        const curAngle = this.lerpAngle(startAngle, dest.angle, ease);

        return {
          id: agent.id,
          x,
          y,
          angle: curAngle,
          trail: progress > 0.05 && progress < 0.95 ? [{ x, y }] : [],
        };
      });
    }

    // ================= 8. FINAL_RESTING_STATE =================
    // Settled at their designated sides, perfectly visible, subtle peaceful breath
    return this.agents.map((agent, idx) => {
      const dest = this.destinations[idx % this.destinations.length];
      const breathTime = (now - this.stageStartTime) / 1000;

      // Extremely subtle 1.2px breath (zero jitter, pure stability)
      const breathX = Math.cos(dest.radialAngle) * Math.sin(breathTime * 0.75 + idx * 1.1) * 1.2;
      const breathY = Math.sin(dest.radialAngle) * Math.sin(breathTime * 0.75 + idx * 1.1) * 1.2;

      return {
        id: agent.id,
        x: dest.x + breathX,
        y: dest.y + breathY,
        angle: dest.angle,
        trail: [],
      };
    });
  }

  private easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  private lerpAngle(a: number, b: number, t: number): number {
    let diff = (b - a) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return a + diff * t;
  }
}
