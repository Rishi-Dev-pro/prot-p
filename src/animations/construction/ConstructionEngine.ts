import { gsap } from 'gsap';
import { SECTION_TIMELINES, TOTAL_CONSTRUCTION_DURATION_MS, SectionTimelineConfig } from './ConstructionConfig';
import { SCHEDULED_CONSTRUCTION_TASKS } from './ConstructionScheduler';
import { ConstructionStrategies } from './ConstructionStrategies';
import { AgentCursorData } from '../../types/agent';
import { FreestyleAgentEngine, FreestyleAgentState } from './FreestyleAgentEngine';

export interface ConstructionEngineCallbacks {
  onSectionChange: (section: SectionTimelineConfig) => void;
  onOverallProgress: (progressPct: number) => void;
  onAgentsUpdate: (agents: FreestyleAgentState[]) => void;
  onComplete: () => void;
}

export class ConstructionEngine {
  private masterTimeline: gsap.core.Timeline;
  private agents: AgentCursorData[];
  private callbacks: ConstructionEngineCallbacks;
  private freestyleEngine: FreestyleAgentEngine;
  private isDestroyed = false;
  private isCompleted = false;
  private currentSpeed = 1;

  constructor(agents: AgentCursorData[], callbacks: ConstructionEngineCallbacks) {
    this.agents = agents;
    this.callbacks = callbacks;

    // Instantiate freestyle physics engine for organic curved motion
    this.freestyleEngine = new FreestyleAgentEngine(this.agents, (agentStates) => {
      this.callbacks.onAgentsUpdate(agentStates);
    });

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

    this.buildMasterSequence();
    this.freestyleEngine.start();
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

      // Stage A: Assign agent to navigate with curved trajectory towards target
      this.masterTimeline.add(() => {
        if (this.isDestroyed || this.isCompleted) return;

        this.freestyleEngine.assignTask({
          agentId: task.agentId,
          targetSelector: task.targetSelector,
          actionText: task.taskLabel,
          startMs: task.startMs,
          durationMs: task.durationMs,
          offsetPct: task.offsetPct,
        });

        const targetEl = document.querySelector<HTMLElement>(task.targetSelector);
        if (targetEl) {
          targetEl.setAttribute('data-build-status', 'wireframe');
        }
      }, startTimeSec);

      // Stage B: Run physical construction strategy timeline
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
              });
              break;
            case 'container':
              ConstructionStrategies.container({
                selector: task.targetSelector,
              });
              break;
            case 'button':
              ConstructionStrategies.button({
                selector: task.targetSelector,
              });
              break;
            case 'card':
              ConstructionStrategies.card({
                cardSelector: task.targetSelector,
              });
              break;
            case 'architecture':
              ConstructionStrategies.architecture({
                svgContainerSelector: task.targetSelector,
              });
              break;
          }
        }
      }, startTimeSec + 0.15);

      // Stage C: Solidify into assembled component and release agent back into freestyle roaming
      this.masterTimeline.add(() => {
        if (this.isDestroyed || this.isCompleted) return;

        const targetEl = document.querySelector<HTMLElement>(task.targetSelector);
        if (targetEl) {
          targetEl.setAttribute('data-build-status', 'assembled');
        }

        // Release agent to freely roam or seek next target
        this.freestyleEngine.completeTask(task.agentId);
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
    this.freestyleEngine.setSpeed(multiplier);
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
    this.freestyleEngine.stop();

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
    this.freestyleEngine.stop();

    if (typeof document !== 'undefined') {
      document.body.classList.remove('construction-active');
      const allTargets = document.querySelectorAll<HTMLElement>('[data-build-target]');
      allTargets.forEach((el) => {
        el.setAttribute('data-build-status', 'assembled');
        gsap.set(el, { clearProps: 'all' });
      });
    }
  }
}
