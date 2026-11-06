import { gsap } from 'gsap';
import { SECTION_TIMELINES, TOTAL_CONSTRUCTION_DURATION_MS, SectionTimelineConfig } from './ConstructionConfig';
import { SCHEDULED_CONSTRUCTION_TASKS, ScheduledTask } from './ConstructionScheduler';
import { ConstructionStrategies } from './ConstructionStrategies';
import { AgentCursorData } from '../../types/agent';
import { CursorDisplayState } from '../../components/intro/AgentCursorLayer';

export interface ConstructionEngineCallbacks {
  onSectionChange: (section: SectionTimelineConfig) => void;
  onOverallProgress: (progressPct: number) => void;
  onCursorsUpdate: (cursors: CursorDisplayState[]) => void;
  onComplete: () => void;
}

export class ConstructionEngine {
  private masterTimeline: gsap.core.Timeline;
  private agents: AgentCursorData[];
  private callbacks: ConstructionEngineCallbacks;
  private cursorsMap: Map<string, CursorDisplayState> = new Map();
  private isDestroyed = false;
  private isCompleted = false;
  private currentSpeed = 1;

  constructor(agents: AgentCursorData[], callbacks: ConstructionEngineCallbacks) {
    this.agents = agents;
    this.callbacks = callbacks;
    this.masterTimeline = gsap.timeline({
      paused: true,
      onUpdate: () => {
        const p = Math.round(this.masterTimeline.progress() * 100);
        this.callbacks.onOverallProgress(p);
      },
      onComplete: () => {
        this.finalize();
      },
    });

    // Initialize agent cursors at starting positions
    this.agents.forEach((agent) => {
      const initX = (agent.initialPos.x / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1200);
      const initY = (agent.initialPos.y / 100) * (typeof window !== 'undefined' ? window.innerHeight : 800);
      this.cursorsMap.set(agent.id, {
        agent,
        x: initX,
        y: initY,
        activity: agent.activity,
        isClicking: false,
      });
    });
  }

  public init(): void {
    if (typeof document === 'undefined') return;

    // Add active construction class to body
    document.body.classList.add('construction-active');

    // Initially hide all build targets
    const targets = document.querySelectorAll<HTMLElement>('[data-build-target]');
    targets.forEach((el) => {
      el.setAttribute('data-build-status', 'unbuilt');
    });

    this.emitCursors();
    this.buildMasterSequence();
  }

  private buildMasterSequence(): void {
    // 1. Schedule Sections and Camera Moves
    SECTION_TIMELINES.forEach((section) => {
      const timeSec = section.startMs / 1000;

      this.masterTimeline.add(() => {
        if (this.isDestroyed || this.isCompleted) return;
        this.callbacks.onSectionChange(section);

        // Smooth camera track to current section
        if (section.cameraScrollYSelector) {
          const targetSection = document.querySelector<HTMLElement>(section.cameraScrollYSelector);
          if (targetSection) {
            const rect = targetSection.getBoundingClientRect();
            const absoluteTop = window.scrollY + rect.top - 70;
            window.scrollTo({
              top: Math.max(0, absoluteTop),
              behavior: 'smooth',
            });
          }
        }
      }, timeSec);
    });

    // 2. Schedule Component Tasks & Physical Builders
    SCHEDULED_CONSTRUCTION_TASKS.forEach((task) => {
      const startTimeSec = task.startMs / 1000;
      const durationSec = task.durationMs / 1000;

      // Stage A: Agent navigates to target DOM bounding box and engages wireframe
      this.masterTimeline.add(() => {
        if (this.isDestroyed || this.isCompleted) return;

        const targetEl = document.querySelector<HTMLElement>(task.targetSelector);
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const targetX = rect.left + rect.width * (task.offsetPct?.x ?? 0.5);
          const targetY = rect.top + rect.height * (task.offsetPct?.y ?? 0.5);

          this.updateCursor(task.agentId, {
            x: targetX,
            y: targetY,
            activity: task.taskLabel,
            isClicking: true,
          });

          targetEl.setAttribute('data-build-status', 'wireframe');
        }
      }, startTimeSec);

      // Stage B: Run specific construction strategy timeline
      this.masterTimeline.add(() => {
        if (this.isDestroyed || this.isCompleted) return;

        const targetEl = document.querySelector<HTMLElement>(task.targetSelector);
        if (targetEl) {
          targetEl.setAttribute('data-build-status', 'drawing');

          // Delegate to strategy builder
          switch (task.strategy) {
            case 'typography':
              ConstructionStrategies.typography({
                containerSelector: task.targetSelector,
                onProgress: (p, action) => {
                  this.updateCursor(task.agentId, {
                    activity: `${action} [${p}%]`,
                  });
                },
              });
              break;
            case 'container':
              ConstructionStrategies.container({
                selector: task.targetSelector,
                onProgress: (p, action) => {
                  this.updateCursor(task.agentId, {
                    activity: `${action} [${p}%]`,
                  });
                },
              });
              break;
            case 'button':
              ConstructionStrategies.button({
                selector: task.targetSelector,
                onProgress: (p, action) => {
                  this.updateCursor(task.agentId, {
                    activity: `${action} [${p}%]`,
                  });
                },
              });
              break;
            case 'card':
              ConstructionStrategies.card({
                cardSelector: task.targetSelector,
                onProgress: (p, action) => {
                  this.updateCursor(task.agentId, {
                    activity: `${action} [${p}%]`,
                  });
                },
              });
              break;
            case 'architecture':
              ConstructionStrategies.architecture({
                svgContainerSelector: task.targetSelector,
                onProgress: (p, action) => {
                  this.updateCursor(task.agentId, {
                    activity: `${action} [${p}%]`,
                  });
                },
              });
              break;
          }
        }
      }, startTimeSec + 0.15);

      // Stage C: Solidify into assembled component
      this.masterTimeline.add(() => {
        if (this.isDestroyed || this.isCompleted) return;

        const targetEl = document.querySelector<HTMLElement>(task.targetSelector);
        if (targetEl) {
          targetEl.setAttribute('data-build-status', 'assembled');
          this.updateCursor(task.agentId, {
            isClicking: false,
            activity: 'COMPONENT_COMPILED',
          });
        }
      }, startTimeSec + durationSec);
    });

    // Pad end of timeline to match total duration
    this.masterTimeline.to({}, { duration: 0.1 }, TOTAL_CONSTRUCTION_DURATION_MS / 1000);
  }

  public play(): void {
    this.masterTimeline.play();
  }

  public pause(): void {
    this.masterTimeline.pause();
  }

  public setSpeed(multiplier: number): void {
    this.currentSpeed = multiplier;
    this.masterTimeline.timeScale(multiplier);
  }

  public getSpeed(): number {
    return this.currentSpeed;
  }

  public skip(): void {
    this.finalize();
  }

  private finalize(): void {
    if (this.isCompleted) return;
    this.isCompleted = true;

    this.masterTimeline.pause();

    if (typeof document !== 'undefined') {
      document.body.classList.remove('construction-active');
      const allTargets = document.querySelectorAll<HTMLElement>('[data-build-target]');
      allTargets.forEach((el) => {
        el.setAttribute('data-build-status', 'assembled');
        gsap.set(el, { clearProps: 'all' });
      });

      // Smooth scroll back to top hero
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.callbacks.onOverallProgress(100);
    this.callbacks.onComplete();
  }

  public destroy(): void {
    this.isDestroyed = true;
    this.masterTimeline.kill();

    if (typeof document !== 'undefined') {
      document.body.classList.remove('construction-active');
      const allTargets = document.querySelectorAll<HTMLElement>('[data-build-target]');
      allTargets.forEach((el) => {
        el.setAttribute('data-build-status', 'assembled');
        gsap.set(el, { clearProps: 'all' });
      });
    }
  }

  private updateCursor(agentId: string, updates: Partial<CursorDisplayState>): void {
    const current = this.cursorsMap.get(agentId);
    if (!current) return;

    this.cursorsMap.set(agentId, {
      ...current,
      ...updates,
    });
    this.emitCursors();
  }

  private emitCursors(): void {
    this.callbacks.onCursorsUpdate(Array.from(this.cursorsMap.values()));
  }
}
