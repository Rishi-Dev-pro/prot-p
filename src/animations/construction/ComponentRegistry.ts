import { ConstructionSectionId, ConstructionStrategyType } from '../orchestration/TaskQueue';

export interface RegisteredComponent {
  id: string;
  parentId?: string;
  sectionId: ConstructionSectionId;
  strategy: ConstructionStrategyType;
  targetSelector: string;
  element: HTMLElement | null;
  geometry: {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  priority: number;
  preferredAgentId: string;
  status: 'unbuilt' | 'drawing' | 'assembled' | 'skipped_responsive';
  isResponsiveHidden: boolean;
}

export interface InventoryCheckResult {
  totalExpected: number;
  totalRegistered: number;
  totalVisible: number;
  totalResponsiveHidden: number;
  missingTargets: string[];
}

class ComponentRegistryClass {
  private registry: Map<string, RegisteredComponent> = new Map();
  private isScanning = false;

  constructor() {
    if (typeof window !== 'undefined') {
      (window as unknown as { __COMPONENT_REGISTRY__?: ComponentRegistryClass }).__COMPONENT_REGISTRY__ = this;
      window.addEventListener('resize', () => this.refreshAllGeometries());
      window.addEventListener('orientationchange', () => this.refreshAllGeometries());
    }
  }

  public register(item: RegisteredComponent): void {
    this.registry.set(item.id, item);
  }

  public get(id: string): RegisteredComponent | undefined {
    return this.registry.get(id);
  }

  public getAll(): RegisteredComponent[] {
    return Array.from(this.registry.values());
  }

  public getBySection(sectionId: ConstructionSectionId): RegisteredComponent[] {
    return this.getAll().filter((item) => item.sectionId === sectionId);
  }

  public updateStatus(id: string, status: RegisteredComponent['status']): void {
    const item = this.registry.get(id);
    if (item) {
      item.status = status;
      if (item.element) {
        if (status === 'drawing') {
          item.element.setAttribute('data-build-status', 'drawing');
        } else if (status === 'assembled') {
          item.element.setAttribute('data-build-status', 'assembled');
        } else if (status === 'unbuilt') {
          item.element.setAttribute('data-build-status', 'unbuilt');
        }
      }
    }
  }

  /**
   * Scans and measures all [data-build-target] DOM elements.
   * Responsive aware: accurately detects display: none elements on mobile vs desktop.
   */
  public scanDOM(): InventoryCheckResult {
    if (typeof document === 'undefined') {
      return { totalExpected: 0, totalRegistered: 0, totalVisible: 0, totalResponsiveHidden: 0, missingTargets: [] };
    }

    this.isScanning = true;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-build-target]'));

    elements.forEach((el) => {
      const targetId = el.getAttribute('data-build-target');
      if (!targetId) return;

      const style = window.getComputedStyle(el);
      const isDisplayNone = style.display === 'none';
      const rect = el.getBoundingClientRect();
      const isResponsiveHidden = isDisplayNone || (rect.width === 0 && rect.height === 0 && el.offsetParent === null);

      const sectionId = this.inferSectionId(targetId, el);
      const strategy = this.inferStrategy(targetId, el);
      const parentTarget = el.parentElement?.closest('[data-build-target]');
      const parentId = parentTarget ? parentTarget.getAttribute('data-build-target') || undefined : undefined;

      const existing = this.registry.get(targetId);
      const currentStatus = existing?.status || 'unbuilt';

      const component: RegisteredComponent = {
        id: targetId,
        parentId,
        sectionId,
        strategy,
        targetSelector: `[data-build-target="${targetId}"]`,
        element: el,
        geometry: {
          x: Math.round(rect.left + rect.width / 2),
          y: Math.round(rect.top + rect.height / 2),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          bottom: Math.round(rect.bottom),
        },
        priority: existing?.priority || 1,
        preferredAgentId: existing?.preferredAgentId || 'AGENT_01',
        status: isResponsiveHidden ? 'skipped_responsive' : currentStatus,
        isResponsiveHidden,
      };

      this.registry.set(targetId, component);
    });

    this.isScanning = false;

    const all = this.getAll();
    const visibleCount = all.filter((c) => !c.isResponsiveHidden).length;
    const responsiveHiddenCount = all.filter((c) => c.isResponsiveHidden).length;

    return {
      totalExpected: elements.length,
      totalRegistered: all.length,
      totalVisible: visibleCount,
      totalResponsiveHidden: responsiveHiddenCount,
      missingTargets: [],
    };
  }

  public refreshAllGeometries(): void {
    if (typeof document === 'undefined') return;

    this.registry.forEach((comp) => {
      const el = comp.element || document.querySelector<HTMLElement>(comp.targetSelector);
      if (!el) return;

      comp.element = el;
      const style = window.getComputedStyle(el);
      const isDisplayNone = style.display === 'none';
      const rect = el.getBoundingClientRect();
      comp.isResponsiveHidden = isDisplayNone || (rect.width === 0 && rect.height === 0 && el.offsetParent === null);

      comp.geometry = {
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        bottom: Math.round(rect.bottom),
      };
    });
  }

  private inferSectionId(targetId: string, el: HTMLElement): ConstructionSectionId {
    const sectionEl = el.closest('section, footer');
    if (sectionEl?.id) {
      const id = sectionEl.id as ConstructionSectionId;
      if (['hero', 'about', 'timeline', 'projects', 'architecture', 'stack', 'experiments', 'contact'].includes(id)) {
        return id;
      }
    }

    if (targetId.startsWith('nav-') || targetId.startsWith('hero-')) return 'hero';
    if (targetId.startsWith('about-')) return 'about';
    if (targetId.startsWith('timeline-') || targetId === 'engineering-timeline') return 'timeline';
    if (targetId.startsWith('project-') || targetId.startsWith('projects-')) return 'projects';
    if (targetId.startsWith('architecture-')) return 'architecture';
    if (targetId.startsWith('stack-')) return 'stack';
    if (targetId.startsWith('experiment-') || targetId.startsWith('experiments-')) return 'experiments';
    if (targetId.startsWith('contact-')) return 'contact';

    return 'hero';
  }

  private inferStrategy(targetId: string, el: HTMLElement): ConstructionStrategyType {
    if (el.tagName === 'BUTTON' || el.tagName === 'A' || targetId.includes('btn') || targetId.includes('action')) {
      return 'button';
    }
    if (targetId.includes('line') || targetId.includes('unexpected') || targetId.includes('heading') || targetId.includes('bio') || targetId.includes('subhead')) {
      return 'typography';
    }
    if (targetId.includes('card') || targetId.includes('principle') || targetId.includes('project-') || targetId.includes('experiment-')) {
      return 'card';
    }
    if (targetId.includes('graph') || targetId.includes('avatar') || targetId.includes('schematic')) {
      return 'architecture';
    }
    return 'container';
  }

  public reset(): void {
    this.registry.clear();
  }
}

export const componentRegistry = new ComponentRegistryClass();

