import { AgentCursorData } from '../../types/agent';

export interface FreestyleAgentState {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  angle: number; // in degrees for pointer orientation
  isWorking: boolean;
  activity: string;
  trail: { x: number; y: number }[];
}

export interface AgentTaskAssignment {
  agentId: string;
  targetSelector: string;
  actionText: string;
  startMs: number;
  durationMs: number;
  offsetPct?: { x: number; y: number };
}

interface AgentPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  speed: number;
  agility: number;
  angle: number;
  pauseTimer: number;
  isWorking: boolean;
  activity: string;
  trail: { x: number; y: number }[];
  assignedTask: AgentTaskAssignment | null;
}

export class FreestyleAgentEngine {
  private agentsPhysics: Map<string, AgentPhysics> = new Map();
  private agentsData: AgentCursorData[];
  private animFrameId: number | null = null;
  private onUpdate: (states: FreestyleAgentState[]) => void;
  private isRunning = false;
  private width = 1440;
  private height = 900;
  private speedMultiplier = 1;

  constructor(
    agentsData: AgentCursorData[],
    onUpdate: (states: FreestyleAgentState[]) => void
  ) {
    this.agentsData = agentsData;
    this.onUpdate = onUpdate;

    if (typeof window !== 'undefined') {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }

    this.initAgents();
  }

  private initAgents(): void {
    this.agentsData.forEach((agent, idx) => {
      // Distinct personality per agent
      // Speed variation between 2.2 and 5.5 px/frame
      const speed = 2.2 + ((idx * 37) % 35) / 10;
      // Agility determines how fast they turn toward target (0.04 to 0.12)
      const agility = 0.04 + ((idx * 19) % 8) / 100;

      // Start position distributed around viewport edges or hero
      const startX = (agent.initialPos.x / 100) * this.width;
      const startY = (agent.initialPos.y / 100) * this.height;

      // Initial random roaming target in viewport
      const targetX = Math.random() * this.width * 0.9 + this.width * 0.05;
      const targetY = Math.random() * this.height * 0.9 + this.height * 0.05;

      this.agentsPhysics.set(agent.id, {
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        targetX,
        targetY,
        speed,
        agility,
        angle: 0,
        pauseTimer: 0,
        isWorking: false,
        activity: '',
        trail: [],
        assignedTask: null,
      });
    });
  }

  public setSpeed(multiplier: number): void {
    this.speedMultiplier = multiplier;
  }

  public assignTask(assignment: AgentTaskAssignment): void {
    const physics = this.agentsPhysics.get(assignment.agentId);
    if (!physics) return;

    physics.assignedTask = assignment;
    physics.isWorking = true;
    physics.activity = assignment.actionText;

    // Resolve target element physical coordinates
    const el = document.querySelector<HTMLElement>(assignment.targetSelector);
    if (el) {
      const rect = el.getBoundingClientRect();
      const offsetX = assignment.offsetPct?.x ?? 0.5;
      const offsetY = assignment.offsetPct?.y ?? 0.5;
      physics.targetX = rect.left + rect.width * offsetX;
      physics.targetY = rect.top + rect.height * offsetY;
    }
  }

  public completeTask(agentId: string): void {
    const physics = this.agentsPhysics.get(agentId);
    if (!physics) return;

    physics.assignedTask = null;
    physics.isWorking = false;
    physics.activity = '';

    // Pick new organic roaming destination across viewport
    physics.targetX = Math.random() * this.width * 0.85 + this.width * 0.075;
    physics.targetY = Math.random() * this.height * 0.85 + this.height * 0.075;
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;

    const tick = () => {
      if (!this.isRunning) return;
      this.updatePhysics();
      this.animFrameId = requestAnimationFrame(tick);
    };

    this.animFrameId = requestAnimationFrame(tick);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private updatePhysics(): void {
    if (typeof window !== 'undefined') {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }

    const states: FreestyleAgentState[] = [];

    this.agentsData.forEach((agent) => {
      const p = this.agentsPhysics.get(agent.id);
      if (!p) return;

      // Check if paused
      if (p.pauseTimer > 0) {
        p.pauseTimer -= 1 * this.speedMultiplier;
        states.push(this.createAgentState(agent, p));
        return;
      }

      // If assigned to a live DOM element, keep target updated with scroll/resize
      if (p.assignedTask) {
        const el = document.querySelector<HTMLElement>(p.assignedTask.targetSelector);
        if (el) {
          const rect = el.getBoundingClientRect();
          const offsetX = p.assignedTask.offsetPct?.x ?? 0.5;
          const offsetY = p.assignedTask.offsetPct?.y ?? 0.5;
          p.targetX = rect.left + rect.width * offsetX;
          p.targetY = rect.top + rect.height * offsetY;
        }
      }

      // Distance to target
      const dx = p.targetX - p.x;
      const dy = p.targetY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Desired velocity vector towards target
      if (dist > 8) {
        // Smooth deceleration near target, acceleration in transit
        const arrivalEasing = Math.min(1, dist / 90);
        const targetSpeed = p.speed * arrivalEasing * this.speedMultiplier;

        const desiredVx = (dx / dist) * targetSpeed;
        const desiredVy = (dy / dist) * targetSpeed;

        // Steer with agility (Bézier-like curved approach)
        p.vx += (desiredVx - p.vx) * p.agility;
        p.vy += (desiredVy - p.vy) * p.agility;

        // Position integration
        p.x += p.vx;
        p.y += p.vy;

        // Compute orientation angle for pointer
        p.angle = Math.atan2(p.vy, p.vx) * (180 / Math.PI);
      } else {
        // Reached target
        if (p.assignedTask) {
          // Micro-movement while working on target (laser sketching)
          p.x += (Math.random() - 0.5) * 1.5;
          p.y += (Math.random() - 0.5) * 1.5;
        } else {
          // If roaming and reached destination: occasionally pause or pick new curved waypoint
          if (Math.random() < 0.08) {
            p.pauseTimer = 25 + Math.random() * 40; // brief pause to "inspect"
          }
          // Pick new curved waypoint across viewport
          p.targetX = Math.random() * this.width * 0.9 + this.width * 0.05;
          p.targetY = Math.random() * this.height * 0.85 + this.height * 0.08;
        }
      }

      // Soft viewport boundary deflection
      const margin = 20;
      if (p.x < margin) p.vx += 0.5;
      if (p.x > this.width - margin) p.vx -= 0.5;
      if (p.y < margin) p.vy += 0.5;
      if (p.y > this.height - margin) p.vy -= 0.5;

      // Update motion trail (last 3 positions)
      p.trail.unshift({ x: p.x, y: p.y });
      if (p.trail.length > 3) p.trail.pop();

      states.push(this.createAgentState(agent, p));
    });

    this.onUpdate(states);
  }

  private createAgentState(agent: AgentCursorData, p: AgentPhysics): FreestyleAgentState {
    return {
      id: agent.id,
      name: agent.name,
      color: agent.color,
      x: p.x,
      y: p.y,
      angle: p.angle,
      isWorking: p.isWorking,
      activity: p.activity,
      trail: [...p.trail],
    };
  }
}
