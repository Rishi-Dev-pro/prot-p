/**
 * Centralized Initialization Manager for Portfolio Orchestration
 * 
 * Startup Sequence:
 * APPLICATION_START
 * -> INITIAL_LOADING
 * -> DOM_READY
 * -> ASSETS_READY
 * -> FONTS_READY
 * -> ANIMATION_SYSTEM_READY
 * -> COMPONENT_REGISTRATION_COMPLETE
 * -> GEOMETRY_READY
 * -> CONSTRUCTION_QUEUE_READY
 * -> OPENING_CURSOR_MOVEMENT
 * -> CONSTRUCTION_START
 */

import { componentRegistry } from '../construction/ComponentRegistry';
import { prepareTextSpans } from '../construction/CharacterWriter';

export type InitStep =
  | 'APPLICATION_START'
  | 'INITIAL_LOADING'
  | 'DOM_READY'
  | 'ASSETS_READY'
  | 'FONTS_READY'
  | 'ANIMATION_SYSTEM_READY'
  | 'COMPONENT_REGISTRATION_COMPLETE'
  | 'GEOMETRY_READY'
  | 'CONSTRUCTION_QUEUE_READY'
  | 'OPENING_CURSOR_MOVEMENT'
  | 'CONSTRUCTION_START';

export interface ReadinessState {
  applicationInitialized: boolean;
  domReady: boolean;
  assetsReady: boolean;
  fontsReady: boolean;
  animationSystemReady: boolean;
  componentRegistryComplete: boolean;
  geometryReady: boolean;
  constructionQueueReady: boolean;
  threeReady: boolean;
  initialSectionReady: boolean;
  openingCursorMovementComplete: boolean;
}

export type ReadinessListener = (state: ReadinessState, step: InitStep) => void;

class InitializationManagerClass {
  private state: ReadinessState = {
    applicationInitialized: false,
    domReady: false,
    assetsReady: false,
    fontsReady: false,
    animationSystemReady: false,
    componentRegistryComplete: false,
    geometryReady: false,
    constructionQueueReady: false,
    threeReady: false,
    initialSectionReady: false,
    openingCursorMovementComplete: false,
  };

  private currentStep: InitStep = 'APPLICATION_START';
  private listeners: Set<ReadinessListener> = new Set();
  private constructionStartCallbacks: Array<() => void> = [];
  private isConstructionAllowed = false;
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      (window as unknown as { __INIT_MANAGER__?: InitializationManagerClass }).__INIT_MANAGER__ = this;
    }
  }

  public subscribe(listener: ReadinessListener): () => void {
    this.listeners.add(listener);
    listener(this.state, this.currentStep);
    return () => this.listeners.delete(listener);
  }

  public onConstructionReady(callback: () => void): void {
    if (this.isConstructionAllowed) {
      callback();
    } else {
      this.constructionStartCallbacks.push(callback);
    }
  }

  public getState(): Readonly<ReadinessState> {
    return { ...this.state };
  }

  public getCurrentStep(): InitStep {
    return this.currentStep;
  }

  private notify(step: InitStep): void {
    this.currentStep = step;
    this.listeners.forEach((l) => l(this.state, step));
    this.checkConstructionReadiness();
  }

  /**
   * Begins parallel initialization pipeline.
   * Safe with timeouts: never freezes the UI even if fonts or WebGL are slow.
   */
  public async startPipeline(): Promise<void> {
    if (this.isInitialized) return;
    this.isInitialized = true;

    this.state.applicationInitialized = true;
    this.notify('INITIAL_LOADING');

    // 1. DOM Ready check
    if (typeof document !== 'undefined') {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        this.state.domReady = true;
      } else {
        await new Promise<void>((resolve) => {
          const onReady = () => {
            document.removeEventListener('DOMContentLoaded', onReady);
            resolve();
          };
          document.addEventListener('DOMContentLoaded', onReady);
        });
        this.state.domReady = true;
      }
    } else {
      this.state.domReady = true;
    }
    this.notify('DOM_READY');

    // 2. Parallel Assets & Fonts Loading with Timeout Safeguards
    const fontPromise = this.resolveFonts();
    const assetPromise = this.resolveAssets();
    const threePromise = this.resolveThreeWebGL();

    await Promise.all([fontPromise, assetPromise, threePromise]);

    // 3. Animation Engine Readiness (GSAP)
    this.state.animationSystemReady = true;
    this.notify('ANIMATION_SYSTEM_READY');

    // 4. Component Registration & Geometry Measurement
    this.resolveComponentRegistry();
    this.notify('COMPONENT_REGISTRATION_COMPLETE');

    this.resolveGeometry();
    this.notify('GEOMETRY_READY');

    // 5. Construction Queue Ready
    this.state.constructionQueueReady = true;
    this.notify('CONSTRUCTION_QUEUE_READY');
  }

  private async resolveFonts(): Promise<void> {
    try {
      if (typeof document !== 'undefined' && 'fonts' in document) {
        // Wait at most 1200ms for web fonts (Inter, Space Grotesk, JetBrains Mono)
        await Promise.race([
          document.fonts.ready,
          new Promise((r) => setTimeout(r, 1200)),
        ]);
      }
    } catch {
      // Font loading fallback
    }
    this.state.fontsReady = true;
    this.notify('FONTS_READY');
  }

  private async resolveAssets(): Promise<void> {
    try {
      // Decode critical images / SVGs with 1000ms timeout
      if (typeof document !== 'undefined') {
        const images = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
        const pendingImages = images.filter((img) => !img.complete);
        if (pendingImages.length > 0) {
          await Promise.race([
            Promise.all(
              pendingImages.map(
                (img) =>
                  new Promise<void>((res) => {
                    img.onload = () => res();
                    img.onerror = () => res();
                  })
              )
            ),
            new Promise((r) => setTimeout(r, 1000)),
          ]);
        }
      }
    } catch {
      // Asset fallback
    }
    this.state.assetsReady = true;
    this.notify('ASSETS_READY');
  }

  private async resolveThreeWebGL(): Promise<void> {
    try {
      if (typeof window !== 'undefined') {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        this.state.threeReady = !!gl;
      }
    } catch {
      this.state.threeReady = false;
    }
  }

  private resolveComponentRegistry(): void {
    if (typeof document === 'undefined') return;

    // Verify initial hero section exists
    const heroEl = document.getElementById('hero');
    const navEl = document.getElementById('navbar');
    this.state.initialSectionReady = !!(heroEl && navEl);
    this.state.componentRegistryComplete = true;
  }

  private resolveGeometry(): void {
    if (typeof document === 'undefined') {
      this.state.geometryReady = true;
      return;
    }

    try {
      // Pre-scan component registry
      componentRegistry.scanDOM();

      // Pre-prepare typography targets with character spans so layout and metrics are reserved
      const textTargets = document.querySelectorAll<HTMLElement>(
        '[data-build-target*="line"], [data-build-target*="unexpected"], [data-build-target*="heading"], [data-build-target*="bio"], [data-build-target*="subhead"]'
      );
      textTargets.forEach((el) => {
        try {
          prepareTextSpans(el);
        } catch {
          // Continue safely
        }
      });

      componentRegistry.refreshAllGeometries();
    } catch {
      // Safe fallback
    }

    this.state.geometryReady = true;
  }

  /**
   * Called by AgentOrchestrator when cursors finish opening entrance movement
   * and arrive at deployment active formation.
   */
  public markOpeningCursorMovementComplete(): void {
    this.state.openingCursorMovementComplete = true;
    this.notify('OPENING_CURSOR_MOVEMENT');
  }

  private checkConstructionReadiness(): void {
    if (this.isConstructionAllowed) return;

    const criticalSatisfied =
      this.state.domReady &&
      this.state.fontsReady &&
      this.state.assetsReady &&
      this.state.animationSystemReady &&
      this.state.componentRegistryComplete &&
      this.state.geometryReady &&
      this.state.constructionQueueReady &&
      this.state.openingCursorMovementComplete;

    if (criticalSatisfied) {
      this.isConstructionAllowed = true;
      this.currentStep = 'CONSTRUCTION_START';
      this.listeners.forEach((l) => l(this.state, 'CONSTRUCTION_START'));

      // Execute all waiting construction callbacks
      const callbacks = [...this.constructionStartCallbacks];
      this.constructionStartCallbacks = [];
      callbacks.forEach((cb) => {
        try {
          cb();
        } catch (err) {
          console.error('[InitializationManager] Callback error:', err);
        }
      });
    }
  }

  public reset(): void {
    this.state = {
      applicationInitialized: false,
      domReady: false,
      assetsReady: false,
      fontsReady: false,
      animationSystemReady: false,
      componentRegistryComplete: false,
      geometryReady: false,
      constructionQueueReady: false,
      threeReady: false,
      initialSectionReady: false,
      openingCursorMovementComplete: false,
    };
    this.isConstructionAllowed = false;
    this.isInitialized = false;
    this.currentStep = 'APPLICATION_START';
  }
}

export const initializationManager = new InitializationManagerClass();
