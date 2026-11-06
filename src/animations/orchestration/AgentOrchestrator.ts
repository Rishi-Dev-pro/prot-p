import { gsap } from 'gsap';
import { AgentCursorData } from '../../types/agent';
import { CircularFormationEngine } from './CircularFormation';
import {
  RadialDeploymentController,
  RadialParticle,
  AGENT_DEPLOYMENT_ROLES,
} from './RadialDeployment';
import { TaskQueueManager, QueuedTask, ConstructionSectionId } from './TaskQueue';
import { SectionCoordinator } from './SectionCoordinator';
import { CameraController } from '../camera/CameraController';
import { ConstructionStrategies } from '../construction/ConstructionStrategies';
import { FreestyleAgentState } from '../construction/FreestyleAgentEngine';

export type OrchestratorStage =
  | 'blank'
  | 'arrival'
  | 'circular'
  | 'radial'
  | 'active'
  | 'complete';

export interface OrchestratorCallbacks {
  onStageChange: (stage: OrchestratorStage) => void;
  onBootMessage: (msg: string) => void;
  onSyncTelemetry: (telemetry: string) => void;
  onBannerNotification: (banner: string) => void;
  onOverallProgress: (pct: number) => void;
  onAgentsUpdate: (agents: FreestyleAgentState[]) => void;
  onParticlesUpdate: (particles: RadialParticle[]) => void;
  onComplete: () => void;
}

interface AgentLiveState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  angle: number;
  isWorking: boolean;
  activity: string;
  speed: number;
  agility: number;
  trail: { x: number; y: number }[];
  currentTask: QueuedTask | null;
  entryPos: { x: number; y: number };
}

export class AgentOrchestrator {
  private agentsData: AgentCursorData[];
  private callbacks: OrchestratorCallbacks;
  private currentStage: OrchestratorStage = 'blank';

  private circularEngine: CircularFormationEngine;
  private radialController: RadialDeploymentController;
  private taskQueue: TaskQueueManager;
  private sectionCoordinator: SectionCoordinator;
  private cameraController: CameraController;

  private agentStates: Map<string, AgentLiveState> = new Map();
  private width = 1440;
  private height = 900;
  private speedMultiplier = 1;
  private isDestroyed = false;
  private isCompleted = false;

  private masterTimeline: gsap.core.Timeline | null = null;
  private animFrameId: number | null = null;
  private startTime = 0;
  private stageStartTime = 0;

  constructor(agentsData: AgentCursorData[], callbacks: OrchestratorCallbacks) {
    this.agentsData = agentsData;
    this.callbacks = callbacks;

    if (typeof window !== 'undefined') {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }

    this.circularEngine = new CircularFormationEngine(this.width, this.height, this.agentsData.length);
    const center = this.circularEngine.getCenter();
    this.radialController = new RadialDeploymentController(center.x, center.y);
    this.taskQueue = new TaskQueueManager();
    this.cameraController = new CameraController();
    this.sectionCoordinator = new SectionCoordinator((banner) => {
      this.callbacks.onBannerNotification(banner);
    });

    this.initAgentStates();
  }

  private initAgentStates(): void {
    const edgePositions = [
      { x: -50, y: this.height * 0.2 },
      { x: -50, y: this.height * 0.5 },
      { x: -50, y: this.height * 0.8 },
      { x: this.width + 50, y: this.height * 0.2 },
      { x: this.width + 50, y: this.height * 0.5 },
      { x: this.width + 50, y: this.height * 0.8 },
      { x: this.width * 0.2, y: -50 },
      { x: this.width * 0.5, y: -50 },
      { x: this.width * 0.8, y: -50 },
      { x: this.width * 0.2, y: this.height + 50 },
      { x: this.width * 0.5, y: this.height + 50 },
      { x: this.width * 0.8, y: this.height + 50 },
      { x: -50, y: -50 },
      { x: this.width + 50, y: -50 },
      { x: -50, y: this.height + 50 },
      { x: this.width + 50, y: this.height + 50 },
      { x: -50, y: this.height * 0.35 },
      { x: this.width + 50, y: this.height * 0.65 },
      { x: this.width * 0.35, y: -50 },
      { x: this.width * 0.65, y: this.height + 50 },
    ];

    this.agentsData.forEach((agent, idx) => {
      const entryPos = edgePositions[idx % edgePositions.length];
      const speed = 3.0 + ((idx * 23) % 25) / 10;
      const agility = 0.05 + ((idx * 17) % 10) / 100;

      this.agentStates.set(agent.id, {
        x: entryPos.x,
        y: entryPos.y,
        vx: 0,
        vy: 0,
        targetX: this.width / 2,
        targetY: this.height / 2,
        angle: 0,
        isWorking: false,
        activity: '',
        speed,
        agility,
        trail: [],
        currentTask: null,
        entryPos: { ...entryPos },
      });
    });
  }

  public init(): void {
    if (typeof document === 'undefined') return;

    // Apply active construction class to isolate DOM and hide unfinished targets
    document.body.classList.add('construction-active');
    const allTargets = document.querySelectorAll<HTMLElement>('[data-build-target]');
    allTargets.forEach((el) => {
      el.setAttribute('data-build-status', 'unbuilt');
    });

    this.buildMasterTimeline();
    this.startLoop();
  }

  private buildMasterTimeline(): void {
    this.masterTimeline = gsap.timeline({
      paused: true,
      onUpdate: () => {
        const progress = Math.round(this.masterTimeline?.progress() ?? 0 * 100);
        this.callbacks.onOverallProgress(progress);
      },
      onComplete: () => {
        this.finalize();
      },
    });

    // ---------------- STAGE 0: BLANK CANVAS (0s -> 1.5s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('blank');
      this.callbacks.onBootMessage('INITIALIZING CREATIVE ENVIRONMENT');
    }, 0.0);

    this.masterTimeline.add(() => {
      this.callbacks.onBootMessage('ESTABLISHING SHARED CANVAS');
    }, 0.5);

    this.masterTimeline.add(() => {
      this.callbacks.onBootMessage('SYNCHRONIZING AGENT CLUSTER');
    }, 1.0);

    // ---------------- STAGE 1: AGENT ARRIVAL (1.5s -> 3.2s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('arrival');
    }, 1.5);

    // ---------------- STAGE 2: CIRCULAR FORMATION (3.2s -> 6.0s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('circular');
      this.callbacks.onSyncTelemetry('ORBIT_R: 220PX | ANGULAR_V: 1.4 RAD/S | COHESION: 100%');
    }, 3.2);

    // ---------------- STAGE 3: RADIAL DEPLOYMENT (6.0s -> 7.4s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('radial');
      const center = this.circularEngine.getCenter();
      this.radialController.updateCenter(center.x, center.y);
      this.radialController.triggerBurst(
        this.agentsData.map((a) => a.color),
        48
      );
    }, 6.0);

    // ---------------- STAGE 4: ACTUAL CONSTRUCTION - SECTION 1 HERO (7.4s -> 12.0s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('active');
      this.dispatchSectionTasks('hero');
    }, 7.4);

    // ---------------- STAGE 5: SECTION COMPLETION & SCROLLING ----------------
    // SECTION 2: ABOUT (12.0s)
    this.masterTimeline.add(() => {
      this.sectionCoordinator.notifySectionCompletion('hero');
      this.cameraController.scrollToSection('about');
      this.dispatchSectionTasks('about');
    }, 12.0);

    // SECTION 3: PROJECTS (15.5s)
    this.masterTimeline.add(() => {
      this.sectionCoordinator.notifySectionCompletion('about');
      this.cameraController.scrollToSection('projects');
      this.dispatchSectionTasks('projects');
    }, 15.5);

    // SECTION 4: ARCHITECTURE (19.0s)
    this.masterTimeline.add(() => {
      this.sectionCoordinator.notifySectionCompletion('projects');
      this.cameraController.scrollToSection('architecture');
      this.dispatchSectionTasks('architecture');
    }, 19.0);

    // SECTION 5: TECH STACK & EXPERIMENTS (22.5s)
    this.masterTimeline.add(() => {
      this.sectionCoordinator.notifySectionCompletion('architecture');
      this.cameraController.scrollToSection('stack');
      this.dispatchSectionTasks('stack');
    }, 22.5);

    // SECTION 6: CONTACT & RETURNING TO APEX (25.5s)
    this.masterTimeline.add(() => {
      this.sectionCoordinator.notifySectionCompletion('stack');
      this.cameraController.scrollToSection('contact');
      this.dispatchSectionTasks('contact');
    }, 25.5);

    // RETURN CAMERA TO TOP & FINALIZE (28.0s)
    this.masterTimeline.add(() => {
      this.sectionCoordinator.notifySectionCompletion('contact');
      this.cameraController.returnToTop();
    }, 28.0);

    // End timeline padding
    this.masterTimeline.to({}, { duration: 0.8 }, 29.0);
  }

  private setStage(stage: OrchestratorStage): void {
    this.currentStage = stage;
    this.stageStartTime = performance.now();
    this.callbacks.onStageChange(stage);
  }

  private dispatchSectionTasks(sectionId: ConstructionSectionId): void {
    this.sectionCoordinator.advanceToSection(sectionId);
    const sectionTasks = this.taskQueue.getSectionTasks(sectionId);

    sectionTasks.forEach((task, index) => {
      // Find suitable agent
      const agentId = task.preferredAgentId || this.agentsData[index % this.agentsData.length].id;
      const state = this.agentStates.get(agentId);
      if (!state) return;

      state.currentTask = task;
      state.isWorking = true;
      state.activity = task.taskLabel;

      const el = document.querySelector<HTMLElement>(task.targetSelector);
      if (el) {
        const rect = el.getBoundingClientRect();
        const offsetX = task.offsetPct?.x ?? 0.5;
        const offsetY = task.offsetPct?.y ?? 0.5;
        state.targetX = rect.left + rect.width * offsetX;
        state.targetY = rect.top + rect.height * offsetY;

        // Apply progressive physical construction stages
        el.setAttribute('data-build-status', 'wireframe');

        window.setTimeout(() => {
          if (this.isDestroyed || this.isCompleted) return;
          el.setAttribute('data-build-status', 'drawing');

          // Trigger physical construction strategy
          switch (task.strategy) {
            case 'typography':
              ConstructionStrategies.typography({ containerSelector: task.targetSelector });
              break;
            case 'container':
              ConstructionStrategies.container({ selector: task.targetSelector });
              break;
            case 'button':
              ConstructionStrategies.button({ selector: task.targetSelector });
              break;
            case 'card':
              ConstructionStrategies.card({ cardSelector: task.targetSelector });
              break;
            case 'architecture':
              ConstructionStrategies.architecture({ svgContainerSelector: task.targetSelector });
              break;
          }
        }, 150 / this.speedMultiplier);

        window.setTimeout(() => {
          if (this.isDestroyed || this.isCompleted) return;
          el.setAttribute('data-build-status', 'assembled');
          this.taskQueue.markTaskComplete(task.id);
          state.isWorking = false;

          // Agent immediately picks up next pending task if any
          this.assignNextAvailableTask(agentId, sectionId);
        }, task.durationMs / this.speedMultiplier);
      }
    });
  }

  private assignNextAvailableTask(agentId: string, currentSection: ConstructionSectionId): void {
    const nextTask = this.taskQueue.getNextTaskForAgent(agentId, currentSection);
    const state = this.agentStates.get(agentId);
    if (!state) return;

    if (nextTask) {
      state.currentTask = nextTask;
      state.isWorking = true;
      state.activity = nextTask.taskLabel;

      const el = document.querySelector<HTMLElement>(nextTask.targetSelector);
      if (el) {
        const rect = el.getBoundingClientRect();
        state.targetX = rect.left + rect.width * 0.5;
        state.targetY = rect.top + rect.height * 0.5;
        el.setAttribute('data-build-status', 'wireframe');

        window.setTimeout(() => {
          if (this.isDestroyed || this.isCompleted) return;
          el.setAttribute('data-build-status', 'assembled');
          this.taskQueue.markTaskComplete(nextTask.id);
          state.isWorking = false;
        }, nextTask.durationMs / this.speedMultiplier);
      }
    } else {
      // Roam naturally nearby active viewport center
      state.activity = '';
      state.targetX = this.width * 0.15 + Math.random() * this.width * 0.7;
      state.targetY = this.height * 0.15 + Math.random() * this.height * 0.7;
    }
  }

  private startLoop(): void {
    this.startTime = performance.now();
    this.stageStartTime = this.startTime;

    const tick = (now: number) => {
      if (this.isDestroyed) return;

      const elapsedSec = (now - this.startTime) / 1000;
      const stageElapsedSec = (now - this.stageStartTime) / 1000;

      // Update Burst Particles
      const particles = this.radialController.updateParticles();
      if (particles.length > 0) {
        this.callbacks.onParticlesUpdate(particles);
      }

      // Compute agent positions based on current stage
      const renderedStates: FreestyleAgentState[] = [];

      this.agentsData.forEach((agent, idx) => {
        const state = this.agentStates.get(agent.id);
        if (!state) return;

        if (this.currentStage === 'blank') {
          // Agents remain just offscreen during blank canvas stage
          state.x = state.entryPos.x;
          state.y = state.entryPos.y;
          state.angle = 0;
          state.trail = [];
        } else if (this.currentStage === 'arrival' || this.currentStage === 'circular') {
          // Circular orbit convergence and rotation
          const formationProgress =
            this.currentStage === 'arrival'
              ? Math.min(1, stageElapsedSec / 1.7)
              : 1;

          const orbitTarget = this.circularEngine.getAgentPosition(
            idx,
            elapsedSec,
            formationProgress,
            state.entryPos
          );

          state.x = orbitTarget.x;
          state.y = orbitTarget.y;
          state.angle = orbitTarget.angle;

          // Record trail
          state.trail.unshift({ x: state.x, y: state.y });
          if (state.trail.length > 5) state.trail.pop();
        } else if (this.currentStage === 'radial') {
          // Expanding outward rapidly
          const role = AGENT_DEPLOYMENT_ROLES[idx % AGENT_DEPLOYMENT_ROLES.length];
          state.activity = role.roleTitle;

          // Push towards assignment targets
          const angle = (idx / this.agentsData.length) * (Math.PI * 2);
          const expansionSpeed = 12 * this.speedMultiplier;
          state.x += Math.cos(angle) * expansionSpeed;
          state.y += Math.sin(angle) * expansionSpeed;
          state.angle = (angle * 180) / Math.PI;

          state.trail.unshift({ x: state.x, y: state.y });
          if (state.trail.length > 6) state.trail.pop();
        } else {
          // Active Construction: Natural curved physics towards target
          const dx = state.targetX - state.x;
          const dy = state.targetY - state.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 4) {
            const steerX = (dx / dist) * state.speed * this.speedMultiplier;
            const steerY = (dy / dist) * state.speed * this.speedMultiplier;

            state.vx += (steerX - state.vx) * state.agility;
            state.vy += (steerY - state.vy) * state.agility;

            state.x += state.vx;
            state.y += state.vy;

            state.angle = (Math.atan2(state.vy, state.vx) * 180) / Math.PI;
          } else {
            // Slight jitter at work location
            state.x += (Math.random() - 0.5) * 0.8;
            state.y += (Math.random() - 0.5) * 0.8;
          }

          state.trail.unshift({ x: state.x, y: state.y });
          if (state.trail.length > 4) state.trail.pop();
        }

        renderedStates.push({
          id: agent.id,
          name: agent.name,
          color: agent.color,
          x: state.x,
          y: state.y,
          angle: state.angle,
          isWorking: state.isWorking,
          activity: state.activity,
          trail: state.trail,
        });
      });

      this.callbacks.onAgentsUpdate(renderedStates);

      this.animFrameId = requestAnimationFrame(tick);
    };

    this.animFrameId = requestAnimationFrame(tick);
  }

  public play(): void {
    if (this.masterTimeline) {
      this.masterTimeline.play();
    }
  }

  public pause(): void {
    if (this.masterTimeline) {
      this.masterTimeline.pause();
    }
  }

  public setSpeed(multiplier: number): void {
    this.speedMultiplier = multiplier;
    if (this.masterTimeline) {
      this.masterTimeline.timeScale(multiplier);
    }
  }

  public skip(): void {
    this.finalize();
  }

  private finalize(): void {
    if (this.isCompleted) return;
    this.isCompleted = true;

    if (this.masterTimeline) {
      this.masterTimeline.pause();
    }

    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (typeof document !== 'undefined') {
      document.body.classList.remove('construction-active');
      const allTargets = document.querySelectorAll<HTMLElement>('[data-build-target]');
      allTargets.forEach((el) => {
        el.setAttribute('data-build-status', 'assembled');
        gsap.set(el, { clearProps: 'all' });
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.callbacks.onOverallProgress(100);
    this.callbacks.onStageChange('complete');
    this.callbacks.onComplete();
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.masterTimeline) {
      this.masterTimeline.kill();
    }
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
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
