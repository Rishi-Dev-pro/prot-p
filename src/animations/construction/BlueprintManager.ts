/**
 * BlueprintManager — Centralized Registry & Lifecycle Controller for Temporary Construction Outlines
 *
 * Enforces the strict lifecycle:
 * OUTLINE_HIDDEN -> OUTLINE_DRAWING -> OUTLINE_ACTIVE -> OUTLINE_DISSOLVING -> OUTLINE_REMOVED
 *
 * Guarantees that:
 * 1. Every outline is explicitly tracked and owned by a target element / task.
 * 2. When a component or section completes, is skipped, or is interrupted, its outline is cleanly destroyed.
 * 3. No stray SVG elements or guides can ever persist as unintended design borders.
 */

export interface TrackedOutline {
  id: string;
  element: HTMLElement;
  svgElement: SVGSVGElement | HTMLElement;
  dissolve: (durationSec?: number) => Promise<void>;
  destroy: () => void;
  status: 'OUTLINE_DRAWING' | 'OUTLINE_ACTIVE' | 'OUTLINE_DISSOLVING' | 'OUTLINE_REMOVED';
  registeredAt: number;
}

class BlueprintManagerService {
  private outlines = new Map<string, TrackedOutline>();

  /**
   * Register a temporary construction outline with its target element.
   */
  public register(
    id: string,
    element: HTMLElement,
    svgElement: SVGSVGElement | HTMLElement,
    dissolve: (durationSec?: number) => Promise<void>,
    destroy: () => void
  ): void {
    // If an outline already exists for this id, destroy the previous one first
    if (this.outlines.has(id)) {
      this.destroy(id);
    }

    element.setAttribute('data-blueprint-active', 'true');

    const tracked: TrackedOutline = {
      id,
      element,
      svgElement,
      dissolve,
      destroy,
      status: 'OUTLINE_DRAWING',
      registeredAt: performance.now(),
    };

    this.outlines.set(id, tracked);

    // Hard fallback safety: Outlines must never exist longer than 3.5 seconds under any circumstance
    window.setTimeout(() => {
      if (this.outlines.has(id)) {
        this.destroy(id);
      }
    }, 3500);
  }

  public setStatus(id: string, status: TrackedOutline['status']): void {
    const item = this.outlines.get(id);
    if (item) {
      item.status = status;
      if (status === 'OUTLINE_REMOVED') {
        item.element.removeAttribute('data-blueprint-active');
        this.outlines.delete(id);
      }
    }
  }

  /**
   * Smoothly dissolve an outline and remove it from the DOM.
   */
  public async dissolve(id: string, durationSec = 0.25): Promise<void> {
    const item = this.outlines.get(id);
    if (!item) return;

    item.status = 'OUTLINE_DISSOLVING';
    try {
      await item.dissolve(durationSec);
    } catch {
      item.destroy();
    } finally {
      item.element.removeAttribute('data-blueprint-active');
      this.outlines.delete(id);
    }
  }

  /**
   * Immediately destroy and synchronously remove an outline from the DOM.
   */
  public destroy(id: string): void {
    const item = this.outlines.get(id);
    if (!item) return;

    item.status = 'OUTLINE_REMOVED';
    item.element.removeAttribute('data-blueprint-active');
    try {
      item.destroy();
    } catch {
      if (item.svgElement && item.svgElement.parentNode) {
        item.svgElement.parentNode.removeChild(item.svgElement);
      }
    }
    this.outlines.delete(id);
  }

  /**
   * Clean up any outline targeting a specific element.
   */
  public cleanupElement(element: HTMLElement): void {
    element.removeAttribute('data-blueprint-active');
    for (const [id, item] of this.outlines.entries()) {
      if (item.element === element) {
        this.destroy(id);
      }
    }
  }

  /**
   * Clean up all outlines currently in flight.
   */
  public cleanupAll(): void {
    for (const id of Array.from(this.outlines.keys())) {
      this.destroy(id);
    }
    this.outlines.clear();

    // Direct DOM sweeping for any unparented / orphaned construction overlays
    if (typeof document !== 'undefined') {
      document.querySelectorAll('.blueprint-outline-svg, .char-baseline-guide').forEach((el) => {
        el.remove();
      });
      document.querySelectorAll('[data-blueprint-active]').forEach((el) => {
        el.removeAttribute('data-blueprint-active');
      });
    }
  }
}

export const BlueprintManager = new BlueprintManagerService();

