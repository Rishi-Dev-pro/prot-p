import { AGENT_CONSTRUCTION_TASKS } from './agentTasks';
import { CONSTRUCTION_PHASES, PhaseInfo } from './constructionConfig';
import { AgentCursorData } from '../types/agent';
import { CursorDisplayState } from '../components/intro/AgentCursorLayer';

export interface ConstructionTimelineCallbacks {
  onPhaseChange: (phase: PhaseInfo) => void;
  onProgress: (progressPct: number) => void;
  onCursorsUpdate: (cursors: CursorDisplayState[]) => void;
  onComplete: () => void;
}

export class ConstructionTimelineManager {
  private activeTimers: number[] = [];
  private isDestroyed = false;
  private isCompleted = false;
  private agents: AgentCursorData[];
  private callbacks: ConstructionTimelineCallbacks;
  private cursorsState: Map<string, CursorDisplayState> = new Map();

  constructor(agents: AgentCursorData[], callbacks: ConstructionTimelineCallbacks) {
    this.agents = agents;
    this.callbacks = callbacks;

    // Initialize all agents at their starting coordinates
    this.agents.forEach((agent) => {
      this.cursorsState.set(agent.id, {
        agent,
        x: (agent.initialPos.x / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: (agent.initialPos.y / 100) * (typeof window !== 'undefined' ? window.innerHeight : 800),
        activity: agent.activity,
        isClicking: false,
      });
    });
  }

  public start(): void {
    if (typeof document === 'undefined') return;

    // 1. Mark body as active construction
    document.body.classList.add('construction-active');

    // 2. Set all build targets to 'unbuilt'
    const allTargets = document.querySelectorAll<HTMLElement>('[data-build-target]');
    allTargets.forEach((el) => {
      el.setAttribute('data-build-status', 'unbuilt');
    });

    // 3. Emit initial agent cursors
    this.emitCursors();

    // 4. Schedule Phase Transitions & Camera Guidance
    CONSTRUCTION_PHASES.forEach((phase) => {
      this.scheduleTimer(() => {
        if (this.isDestroyed || this.isCompleted) return;

        this.callbacks.onPhaseChange(phase);
        const progress = Math.min(100, Math.round((phase.endMs / 15000) * 100));
        this.callbacks.onProgress(progress);

        // Smooth camera track to current section if specified
        if (phase.targetScrollYSelector) {
          const targetSection = document.querySelector<HTMLElement>(phase.targetScrollYSelector);
          if (targetSection) {
            const rect = targetSection.getBoundingClientRect();
            const absoluteTop = window.scrollY + rect.top - 80;
            window.scrollTo({
              top: Math.max(0, absoluteTop),
              behavior: 'smooth',
            });
          }
        }
      }, phase.startMs);
    });

    // 5. Schedule Individual Agent Tasks tied to real DOM elements
    AGENT_CONSTRUCTION_TASKS.forEach((task) => {
      // Step A: Agent approaches target element and puts it into wireframe
      this.scheduleTimer(() => {
        if (this.isDestroyed || this.isCompleted) return;

        const targetEl = document.querySelector<HTMLElement>(`[data-build-target="${task.targetKey}"]`);
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const targetX = rect.left + rect.width * (task.offset?.xPct ?? 0.5);
          const targetY = rect.top + rect.height * (task.offset?.yPct ?? 0.5);

          // Update agent cursor
          this.updateAgentCursor(task.agentId, {
            x: targetX,
            y: targetY,
            activity: task.actionText,
            isClicking: false,
          });

          // Transition element to wireframe
          targetEl.setAttribute('data-build-status', 'wireframe');
        }
      }, task.startDelayMs);

      // Step B: Agent begins drawing / synthesizing (laser spark + drawing status)
      this.scheduleTimer(() => {
        if (this.isDestroyed || this.isCompleted) return;

        const targetEl = document.querySelector<HTMLElement>(`[data-build-target="${task.targetKey}"]`);
        if (targetEl) {
          targetEl.setAttribute('data-build-status', 'drawing');
          this.updateAgentCursor(task.agentId, {
            isClicking: true,
          });
        }
      }, task.startDelayMs + Math.round(task.durationMs * 0.35));

      // Step C: Task complete -> element solidifies into assembled component
      this.scheduleTimer(() => {
        if (this.isDestroyed || this.isCompleted) return;

        const targetEl = document.querySelector<HTMLElement>(`[data-build-target="${task.targetKey}"]`);
        if (targetEl) {
          targetEl.setAttribute('data-build-status', 'assembled');
          this.updateAgentCursor(task.agentId, {
            isClicking: false,
          });
        }
      }, task.startDelayMs + task.durationMs);
    });

    // 6. Schedule Final Completion
    this.scheduleTimer(() => {
      this.complete();
    }, 15000);
  }

  public skip(): void {
    this.complete();
  }

  private complete(): void {
    if (this.isCompleted) return;
    this.isCompleted = true;

    // Clear all pending timers
    this.clearTimers();

    // Mark all elements as assembled immediately
    if (typeof document !== 'undefined') {
      document.body.classList.remove('construction-active');
      const allTargets = document.querySelectorAll<HTMLElement>('[data-build-target]');
      allTargets.forEach((el) => {
        el.setAttribute('data-build-status', 'assembled');
      });

      // Smooth scroll back to top hero
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.callbacks.onProgress(100);
    this.callbacks.onComplete();
  }

  public destroy(): void {
    this.isDestroyed = true;
    this.clearTimers();
    if (typeof document !== 'undefined') {
      document.body.classList.remove('construction-active');
      const allTargets = document.querySelectorAll<HTMLElement>('[data-build-target]');
      allTargets.forEach((el) => {
        el.setAttribute('data-build-status', 'assembled');
      });
    }
  }

  private updateAgentCursor(agentId: string, updates: Partial<CursorDisplayState>): void {
    const current = this.cursorsState.get(agentId);
    if (!current) return;

    this.cursorsState.set(agentId, {
      ...current,
      ...updates,
    });
    this.emitCursors();
  }

  private emitCursors(): void {
    this.callbacks.onCursorsUpdate(Array.from(this.cursorsState.values()));
  }

  private scheduleTimer(fn: () => void, delayMs: number): void {
    const id = window.setTimeout(fn, delayMs);
    this.activeTimers.push(id);
  }

  private clearTimers(): void {
    this.activeTimers.forEach((id) => clearTimeout(id));
    this.activeTimers = [];
  }
}

