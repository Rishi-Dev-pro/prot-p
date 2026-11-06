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
  | 'BOOTING'
  | 'CANVAS_INITIALIZED'
  | 'AGENTS_ENTERING'
  | 'FORMATION_ACTIVE'
  | 'DEPLOYMENT_ACTIVE'
  | 'CONSTRUCTION_ACTIVE'
  | 'SECTION_TRANSITION'
  | 'FINAL_REVEAL'
  | 'INTERACTIVE';

export type AgentMode =
  | 'IDLE'
  | 'TASK_ASSIGNED'
  | 'TRAVELLING'
  | 'AGENT_ARRIVED'
  | 'WORKING'
  | 'COMPLETED'
  | 'REASSIGNING';

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
  mode: AgentMode;
  pauseTimer: number; // Pre-interaction lock-on pause (ms)
  trail: { x: number; y: number }[];
  currentTask: QueuedTask | null;
  entryPos: { x: number; y: number };
  activeTimeline: gsap.core.Timeline | null;
}

export class AgentOrchestrator {
  private agentsData: AgentCursorData[];
  private callbacks: OrchestratorCallbacks;
  private currentStage: OrchestratorStage = 'BOOTING';

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
  private lastTickTime = 0;
  private activeSection: ConstructionSectionId = 'hero';

  constructor(agentsData: AgentCursorData[], callbacks: OrchestratorCallbacks) {
    this.agentsData = agentsData;
    this.callbacks = callbacks;

    if (typeof window !== 'undefined') {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      (window as unknown as { __ORCHESTRATOR_ACTIVE__?: boolean }).__ORCHESTRATOR_ACTIVE__ = true;
    }

    // Exactly 6-agent symmetrical hexagonal circular formation
    this.circularEngine = new CircularFormationEngine(
      this.width,
      this.height,
      this.agentsData.length
    );
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
    // 6 Symmetrical perimeter entry coordinates around the viewport
    const entryPositions = [
      { x: this.width * 0.5, y: -70 }, // Top Apex (12 o'clock)
      { x: this.width + 70, y: this.height * 0.25 }, // Upper Right (2 o'clock)
      { x: this.width + 70, y: this.height * 0.75 }, // Lower Right (4 o'clock)
      { x: this.width * 0.5, y: this.height + 70 }, // Bottom Center (6 o'clock)
      { x: -70, y: this.height * 0.75 }, // Lower Left (8 o'clock)
      { x: -70, y: this.height * 0.25 }, // Upper Left (10 o'clock)
    ];

    this.agentsData.forEach((agent, idx) => {
      const entryPos = entryPositions[idx % entryPositions.length];
      const speed = 10.5 + (idx % 3) * 1.5;
      const agility = 0.16 + (idx % 2) * 0.04;

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
        mode: 'IDLE',
        pauseTimer: 0,
        trail: [],
        currentTask: null,
        entryPos: { ...entryPos },
        activeTimeline: null,
      });
    });
  }

  public init(): void {
    if (typeof document === 'undefined') return;

    // Isolate DOM: Entire portfolio UI strictly hidden from first paint
    document.documentElement.classList.add('is-booting');
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
        const progress = Math.round((this.masterTimeline?.progress() ?? 0) * 100);
        this.callbacks.onOverallProgress(progress);
      },
      onComplete: () => {
        this.finalize();
      },
    });

    // ---------------- 1. BOOTING (0.0s -> 0.6s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('BOOTING');
      this.callbacks.onBootMessage('INITIALIZING CREATIVE ENVIRONMENT');
    }, 0.0);

    // ---------------- 2. CANVAS_INITIALIZED (0.6s -> 1.5s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('CANVAS_INITIALIZED');
      this.callbacks.onBootMessage('ESTABLISHING SHARED CANVAS');
    }, 0.6);

    this.masterTimeline.add(() => {
      this.callbacks.onBootMessage('SYNCHRONIZING 6 ACTIVE NODES');
    }, 1.1);

    // ---------------- 3. AGENTS_ENTERING (1.5s -> 3.2s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('AGENTS_ENTERING');
    }, 1.5);

    // ---------------- 4. FORMATION_ACTIVE (3.2s -> 6.0s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('FORMATION_ACTIVE');
      this.callbacks.onSyncTelemetry('ORBIT_R: 290PX | ANGULAR_V: 0.55 RAD/S | COHESION: 100%');
    }, 3.2);

    // ---------------- 5. DEPLOYMENT_ACTIVE (6.0s -> 7.4s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('DEPLOYMENT_ACTIVE');
      const center = this.circularEngine.getCenter();
      this.radialController.updateCenter(center.x, center.y);
      this.radialController.triggerBurst(
        this.agentsData.map((a) => a.color),
        24
      );
    }, 6.0);

    // ---------------- 6. SECTION 1: HERO & NAVIGATION (7.4s -> 13.5s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('CONSTRUCTION_ACTIVE');
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('is-booting');
      }
      this.activeSection = 'hero';
      this.dispatchSectionTasks('hero');
    }, 7.4);

    // ---------------- 7. SECTION 2: ABOUT & PRINCIPLES (13.5s -> 18.0s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('SECTION_TRANSITION');
      this.completeRemainingSectionTasks('hero');
      this.sectionCoordinator.notifySectionCompletion('hero');
      this.cameraController.scrollToSection('about');
      this.activeSection = 'about';

      // Ensure About components remain strictly unbuilt until camera finishes scrolling
      window.setTimeout(() => {
        if (this.isDestroyed || this.isCompleted) return;
        this.dispatchSectionTasks('about');
      }, 750 / this.speedMultiplier);
    }, 13.5);

    // ---------------- 8. SECTION 3: ENGINEERING TIMELINE (18.0s -> 22.0s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('SECTION_TRANSITION');
      this.completeRemainingSectionTasks('about');
      this.sectionCoordinator.notifySectionCompletion('about');
      this.cameraController.scrollToSection('timeline');
      this.activeSection = 'timeline';

      window.setTimeout(() => {
        if (this.isDestroyed || this.isCompleted) return;
        this.dispatchSectionTasks('timeline');
      }, 750 / this.speedMultiplier);
    }, 18.0);

    // ---------------- 9. SECTION 4: FLAGSHIP PROJECTS (22.0s -> 29.5s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('SECTION_TRANSITION');
      this.completeRemainingSectionTasks('timeline');
      this.sectionCoordinator.notifySectionCompletion('timeline');
      this.cameraController.scrollToSection('projects');
      this.activeSection = 'projects';

      window.setTimeout(() => {
        if (this.isDestroyed || this.isCompleted) return;
        this.dispatchSectionTasks('projects');
      }, 750 / this.speedMultiplier);
    }, 22.0);

    // ---------------- 10. SECTION 5: ARCHITECTURE TOPOLOGY (29.5s -> 34.0s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('SECTION_TRANSITION');
      this.completeRemainingSectionTasks('projects');
      this.sectionCoordinator.notifySectionCompletion('projects');
      this.cameraController.scrollToSection('architecture');
      this.activeSection = 'architecture';

      window.setTimeout(() => {
        if (this.isDestroyed || this.isCompleted) return;
        this.dispatchSectionTasks('architecture');
      }, 750 / this.speedMultiplier);
    }, 29.5);

    // ---------------- 11. SECTION 6: TECH STACK & EXPERIMENTS (34.0s -> 38.0s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('SECTION_TRANSITION');
      this.completeRemainingSectionTasks('architecture');
      this.sectionCoordinator.notifySectionCompletion('architecture');
      this.cameraController.scrollToSection('stack');
      this.activeSection = 'stack';

      window.setTimeout(() => {
        if (this.isDestroyed || this.isCompleted) return;
        this.dispatchSectionTasks('stack');
        this.dispatchSectionTasks('experiments');
      }, 750 / this.speedMultiplier);
    }, 34.0);

    // ---------------- 12. SECTION 7: COMMS & CONTACT (38.0s -> 41.0s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('SECTION_TRANSITION');
      this.completeRemainingSectionTasks('stack');
      this.completeRemainingSectionTasks('experiments');
      this.sectionCoordinator.notifySectionCompletion('stack');
      this.cameraController.scrollToSection('contact');
      this.activeSection = 'contact';

      window.setTimeout(() => {
        if (this.isDestroyed || this.isCompleted) return;
        this.dispatchSectionTasks('contact');
      }, 750 / this.speedMultiplier);
    }, 38.0);

    // ---------------- 13. FINAL_REVEAL: RETURN TO APEX (41.0s -> 43.5s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('FINAL_REVEAL');
      this.completeRemainingSectionTasks('contact');
      this.sectionCoordinator.notifySectionCompletion('contact');
      this.cameraController.returnToTop();
    }, 41.0);

    // ---------------- 14. INTERACTIVE STATE (43.5s) ----------------
    this.masterTimeline.add(() => {
      this.setStage('INTERACTIVE');
    }, 43.5);

    this.masterTimeline.to({}, { duration: 0.5 }, 44.0);
  }

  private completeRemainingSectionTasks(sectionId: ConstructionSectionId): void {
    const sectionTasks = this.taskQueue.getSectionTasks(sectionId);
    sectionTasks.forEach((t) => {
      if (t.status !== 'completed') {
        t.status = 'completed';
        const el = document.querySelector<HTMLElement>(t.targetSelector);
        if (el) {
          el.setAttribute('data-build-status', 'assembled');
          gsap.set(el, { clearProps: 'all' });
          el.querySelectorAll<HTMLElement>('.build-char-span').forEach((span) => {
            span.style.opacity = '1';
            span.style.visibility = 'visible';
          });
        }
      }
    });

    this.agentsData.forEach((agent) => {
      const state = this.agentStates.get(agent.id);
      if (state && state.currentTask && state.currentTask.sectionId === sectionId) {
        if (state.activeTimeline) {
          state.activeTimeline.kill();
          state.activeTimeline = null;
        }
        state.isWorking = false;
        state.mode = 'IDLE';
        state.currentTask = null;
      }
    });
  }

  private setStage(stage: OrchestratorStage): void {
    this.currentStage = stage;
    this.stageStartTime = performance.now();
    this.callbacks.onStageChange(stage);
  }

  /**
   * Dispatches tasks to available agents for a section.
   * Target elements remain strictly UNBUILT (invisible) until the cursor arrives!
   */
  private dispatchSectionTasks(sectionId: ConstructionSectionId): void {
    this.sectionCoordinator.advanceToSection(sectionId);
    this.activeSection = sectionId;

    this.agentsData.forEach((agent) => {
      const state = this.agentStates.get(agent.id);
      if (!state) return;

      // If agent is available, immediately assign the next pending task
      if (state.mode === 'IDLE' || state.mode === 'COMPLETED' || !state.currentTask) {
        const nextTask = this.taskQueue.getNextTaskForAgent(agent.id, sectionId);
        if (nextTask) {
          this.assignTaskToAgent(agent.id, nextTask);
        }
      }
    });
  }

  /**
   * Assigns task to agent:
   * Sets target coordinates, puts agent into TRAVELLING mode.
   * The target element remains 100% UNBUILT (invisible) until physical arrival!
   */
  private assignTaskToAgent(agentId: string, task: QueuedTask): void {
    const state = this.agentStates.get(agentId);
    if (!state) return;

    task.status = 'in_progress';
    task.assignedAgentId = agentId;

    state.currentTask = task;
    state.mode = 'TRAVELLING';
    state.isWorking = false;
    state.pauseTimer = 0;
    state.activity = task.taskLabel;

    const el = document.querySelector<HTMLElement>(task.targetSelector);
    if (el) {
      // Element is guaranteed 100% invisible
      el.setAttribute('data-build-status', 'unbuilt');

      const rect = el.getBoundingClientRect();
      const offsetX = task.offsetPct?.x ?? 0.5;
      const offsetY = task.offsetPct?.y ?? 0.5;
      const rawTargetX = rect.left + rect.width * offsetX;
      const rawTargetY = rect.top + rect.height * offsetY;
      state.targetX = Math.max(25, Math.min(this.width - 25, rawTargetX));
      state.targetY = Math.max(25, Math.min(this.height - 35, rawTargetY));
    }
  }

  /**
   * Invoked ONLY when cursor physically arrives within proximity threshold (<20px)
   * and completes pre-interaction pause.
   */
  private startComponentConstruction(agentId: string, task: QueuedTask): void {
    const state = this.agentStates.get(agentId);
    const el = document.querySelector<HTMLElement>(task.targetSelector);
    if (!el || !state) return;

    // 1. Reveal element for progressive builder execution
    el.setAttribute('data-build-status', 'drawing');

    const durationSec = task.durationMs / 1000 / this.speedMultiplier;

    const onCursorPosition = (cx: number, cy: number) => {
      state.x = cx;
      state.y = cy;
      state.targetX = cx;
      state.targetY = cy;
      state.vx = 0;
      state.vy = 0;
    };

    const onComplete = () => {
      if (this.isDestroyed || this.isCompleted) return;

      // Component successfully assembled
      el.setAttribute('data-build-status', 'assembled');
      this.taskQueue.markTaskComplete(task.id);
      state.isWorking = false;
      state.mode = 'COMPLETED';
      state.currentTask = null;
      state.activeTimeline = null;

      // Immediately pull next pending task in the active section!
      const nextTask = this.taskQueue.getNextTaskForAgent(agentId, this.activeSection);
      if (nextTask) {
        this.assignTaskToAgent(agentId, nextTask);
      } else {
        // No more pending tasks in this section: hold stable position
        state.mode = 'IDLE';
        state.activity = '';
        state.targetX = state.x;
        state.targetY = state.y;
      }
    };

    switch (task.strategy) {
      case 'typography':
        state.activeTimeline = ConstructionStrategies.typography({
          containerSelector: task.targetSelector,
          durationSec,
          onCursorPosition,
          onComplete,
        });
        break;
      case 'container':
        state.activeTimeline = ConstructionStrategies.container({
          selector: task.targetSelector,
          durationSec,
          onCursorPosition,
          onComplete,
        });
        break;
      case 'button':
        state.activeTimeline = ConstructionStrategies.button({
          selector: task.targetSelector,
          durationSec,
          onCursorPosition,
          onComplete,
        });
        break;
      case 'card':
        state.activeTimeline = ConstructionStrategies.card({
          cardSelector: task.targetSelector,
          durationSec,
          onCursorPosition,
          onComplete,
        });
        break;
      case 'architecture':
        state.activeTimeline = ConstructionStrategies.architecture({
          svgContainerSelector: task.targetSelector,
          durationSec,
          onCursorPosition,
          onComplete,
        });
        break;
    }
  }

  private startLoop(): void {
    this.startTime = performance.now();
    this.stageStartTime = this.startTime;
    this.lastTickTime = this.startTime;

    const tick = (now: number) => {
      if (this.isDestroyed) return;

      const dt = Math.min(0.05, (now - this.lastTickTime) / 1000);
      this.lastTickTime = now;

      const elapsedSec = (now - this.startTime) / 1000;
      const stageElapsedSec = (now - this.stageStartTime) / 1000;

      // Update Burst Particles
      const particles = this.radialController.updateParticles();
      if (particles.length > 0) {
        this.callbacks.onParticlesUpdate(particles);
      }

      // ---------------- Physics & Inter-Agent Collision Resolution ----------------
      const isFormation =
        this.currentStage === 'BOOTING' ||
        this.currentStage === 'CANVAS_INITIALIZED' ||
        this.currentStage === 'AGENTS_ENTERING' ||
        this.currentStage === 'FORMATION_ACTIVE';

      if (!isFormation && this.currentStage !== 'DEPLOYMENT_ACTIVE') {
        const agentIds = Array.from(this.agentStates.keys());
        for (let i = 0; i < agentIds.length; i++) {
          for (let j = i + 1; j < agentIds.length; j++) {
            const s1 = this.agentStates.get(agentIds[i])!;
            const s2 = this.agentStates.get(agentIds[j])!;

            // Never disturb agents that are actively working or locked on target
            if (
              s1.isWorking ||
              s1.mode === 'AGENT_ARRIVED' ||
              s2.isWorking ||
              s2.mode === 'AGENT_ARRIVED'
            ) {
              continue;
            }

            // Only apply gentle separation between actively travelling agents
            if (s1.mode === 'TRAVELLING' && s2.mode === 'TRAVELLING') {
              const sepDx = s1.x - s2.x;
              const sepDy = s1.y - s2.y;
              const sepDist = Math.hypot(sepDx, sepDy);
              const minDistance = 60; // 60px soft separation buffer

              if (sepDist > 0 && sepDist < minDistance) {
                const overlap = (minDistance - sepDist) / minDistance;
                const force = overlap * 0.8 * this.speedMultiplier;
                const nx = sepDx / sepDist;
                const ny = sepDy / sepDist;

                s1.vx += nx * force;
                s1.vy += ny * force;
                s2.vx -= nx * force;
                s2.vy -= ny * force;
              }
            }
          }
        }
      }

      const renderedStates: FreestyleAgentState[] = [];

      this.agentsData.forEach((agent, idx) => {
        const state = this.agentStates.get(agent.id);
        if (!state) return;

        if (
          this.currentStage === 'BOOTING' ||
          this.currentStage === 'CANVAS_INITIALIZED'
        ) {
          state.x = state.entryPos.x;
          state.y = state.entryPos.y;
          state.angle = 0;
          state.trail = [];
        } else if (
          this.currentStage === 'AGENTS_ENTERING' ||
          this.currentStage === 'FORMATION_ACTIVE'
        ) {
          const formationProgress =
            this.currentStage === 'AGENTS_ENTERING'
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

          state.trail.unshift({ x: state.x, y: state.y });
          if (state.trail.length > 4) state.trail.pop();
        } else if (this.currentStage === 'DEPLOYMENT_ACTIVE') {
          const role = AGENT_DEPLOYMENT_ROLES[idx % AGENT_DEPLOYMENT_ROLES.length];
          state.activity = role.roleTitle;

          const progress = Math.min(1, stageElapsedSec / 1.4);
          const easeOut = 1 - Math.pow(1 - progress, 2);
          const center = this.circularEngine.getCenter();
          const baseRadius = Math.max(160, Math.min(this.width, this.height) * 0.32);
          const currentRadius = baseRadius + easeOut * 85;
          const angle =
            -Math.PI / 2 +
            (idx / this.agentsData.length) * (Math.PI * 2) +
            stageElapsedSec * 0.15;

          state.x = center.x + Math.cos(angle) * currentRadius;
          state.y = center.y + Math.sin(angle) * currentRadius;
          state.angle = (angle * 180) / Math.PI;

          state.trail.unshift({ x: state.x, y: state.y });
          if (state.trail.length > 5) state.trail.pop();
        } else {
          // Dynamic Target Sync with live DOM bounding box during active transitions
          if (
            state.currentTask &&
            (state.mode === 'TRAVELLING' || this.currentStage === 'SECTION_TRANSITION')
          ) {
            const el = document.querySelector<HTMLElement>(state.currentTask.targetSelector);
            if (el) {
              const rect = el.getBoundingClientRect();
              const offsetX = state.currentTask.offsetPct?.x ?? 0.5;
              const offsetY = state.currentTask.offsetPct?.y ?? 0.5;
              const rawTargetX = rect.left + rect.width * offsetX;
              const rawTargetY = rect.top + rect.height * offsetY;
              state.targetX = Math.max(25, Math.min(this.width - 25, rawTargetX));
              state.targetY = Math.max(25, Math.min(this.height - 35, rawTargetY));
            }
          }

          // Distance to target
          const dx = state.targetX - state.x;
          const dy = state.targetY - state.y;
          const dist = Math.hypot(dx, dy);

          // State Machine: Travelling -> Arrival -> Building -> Completed
          if (state.mode === 'TRAVELLING') {
            if (dist <= 18) {
              // Cursor physically arrived at component! Lock onto exact position
              state.mode = 'AGENT_ARRIVED';
              state.x = state.targetX;
              state.y = state.targetY;
              state.vx = 0;
              state.vy = 0;
              state.pauseTimer = Math.round(220 / this.speedMultiplier); // Pre-interaction lock-on
            } else {
              // Decelerate smoothly on approach
              const arrivalFactor = Math.min(1, Math.max(0.2, dist / 85));
              const targetSpeed = state.speed * arrivalFactor * this.speedMultiplier;

              const steerX = (dx / dist) * targetSpeed;
              const steerY = (dy / dist) * targetSpeed;

              state.vx += (steerX - state.vx) * state.agility;
              state.vy += (steerY - state.vy) * state.agility;

              state.x += state.vx;
              state.y += state.vy;

              if (dist > 4) {
                state.angle = (Math.atan2(state.vy, state.vx) * 180) / Math.PI;
              }
            }
          } else if (state.mode === 'AGENT_ARRIVED') {
            // Firmly hold position during inspection pause
            state.x = state.targetX;
            state.y = state.targetY;
            state.vx = 0;
            state.vy = 0;

            state.pauseTimer -= dt * 1000;
            if (state.pauseTimer <= 0) {
              // Begin physical progressive component construction!
              state.mode = 'WORKING';
              state.isWorking = true;
              if (state.currentTask) {
                this.startComponentConstruction(agent.id, state.currentTask);
              }
            }
          } else if (state.mode === 'WORKING') {
            // Position is directly managed by active builder (e.g. character writing, perimeter tracing)
            state.vx = 0;
            state.vy = 0;
          } else {
            // IDLE / COMPLETED: Hold stable position with zero drift
            state.vx = 0;
            state.vy = 0;
          }

          // Viewport boundary clamping
          state.x = Math.max(10, Math.min(this.width - 10, state.x));
          state.y = Math.max(10, Math.min(this.height - 10, state.y));
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
    // Scale active builder timelines
    for (const state of this.agentStates.values()) {
      if (state.activeTimeline) {
        state.activeTimeline.timeScale(multiplier);
      }
    }
  }

  public getStage(): OrchestratorStage {
    return this.currentStage;
  }

  public getTime(): number {
    return this.masterTimeline ? this.masterTimeline.time() : 0;
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

    // Kill any active component builder timelines
    for (const state of this.agentStates.values()) {
      if (state.activeTimeline) {
        state.activeTimeline.kill();
        state.activeTimeline = null;
      }
    }

    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('is-booting');
      document.body.classList.remove('is-booting');
      document.body.classList.remove('construction-active');

      const allTargets = document.querySelectorAll<HTMLElement>('[data-build-target]');
      allTargets.forEach((el) => {
        el.setAttribute('data-build-status', 'assembled');
        gsap.set(el, { clearProps: 'all' });
      });

      // Clean up any temporary blueprint overlays & guides
      document.querySelectorAll('.blueprint-outline-svg, .char-baseline-guide').forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
      document.querySelectorAll<HTMLElement>('.build-char-span').forEach((span) => {
        span.style.opacity = '1';
        span.style.visibility = 'visible';
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.callbacks.onOverallProgress(100);
    this.callbacks.onStageChange('INTERACTIVE');
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
    for (const state of this.agentStates.values()) {
      if (state.activeTimeline) {
        state.activeTimeline.kill();
        state.activeTimeline = null;
      }
    }
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('is-booting');
      document.body.classList.remove('is-booting');
      document.body.classList.remove('construction-active');

      const allTargets = document.querySelectorAll<HTMLElement>('[data-build-target]');
      allTargets.forEach((el) => {
        el.setAttribute('data-build-status', 'assembled');
        gsap.set(el, { clearProps: 'all' });
      });

      // Clean up any temporary blueprint overlays & guides
      document.querySelectorAll('.blueprint-outline-svg, .char-baseline-guide').forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
      document.querySelectorAll<HTMLElement>('.build-char-span').forEach((span) => {
        span.style.opacity = '1';
        span.style.visibility = 'visible';
      });
    }
  }
}
