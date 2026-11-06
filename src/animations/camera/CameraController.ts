import { ConstructionSectionId } from '../orchestration/TaskQueue';

export interface CameraTransitionOptions {
  duration?: number;
  offsetY?: number;
  behavior?: ScrollBehavior;
}

export class CameraController {
  private currentSection: ConstructionSectionId = 'hero';
  private sectionElementMap: Record<ConstructionSectionId, string> = {
    hero: '#hero',
    about: '#about',
    timeline: '[data-build-target="engineering-timeline"]',
    projects: '#projects',
    architecture: '#architecture',
    stack: '#stack',
    experiments: '#experiments',
    contact: '#contact',
  };

  /**
   * Smoothly pans the camera/viewport to the target section
   */
  public scrollToSection(
    sectionId: ConstructionSectionId,
    options: CameraTransitionOptions = {}
  ): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    this.currentSection = sectionId;
    const offsetY = options.offsetY ?? 70;

    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: options.behavior ?? 'smooth',
      });
      return;
    }

    const selector = this.sectionElementMap[sectionId];
    const el = document.querySelector<HTMLElement>(selector);

    if (el) {
      const rect = el.getBoundingClientRect();
      const targetY = Math.max(0, window.scrollY + rect.top - offsetY);
      window.scrollTo({
        top: targetY,
        behavior: options.behavior ?? 'smooth',
      });
    }
  }

  /**
   * Glides the camera smoothly back to the top Hero upon intro completion
   */
  public returnToTop(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      // Allow smooth scroll to settle
      window.setTimeout(() => {
        resolve();
      }, 700);
    });
  }

  public getCurrentSection(): ConstructionSectionId {
    return this.currentSection;
  }
}
