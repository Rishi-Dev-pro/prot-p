import { gsap } from 'gsap';
import { createBlueprintOutline } from './BlueprintOutline';

export interface ContainerBuilderOptions {
  selector: string;
  borderColor?: string;
  durationSec?: number;
  onCursorPosition?: (x: number, y: number) => void;
  onProgress?: (progressPct: number, currentAction: string) => void;
  onComplete?: () => void;
}

/**
 * ContainerBuilder: Progressive geometric perimeter blueprint and surface construction.
 * Sequence:
 * 1. Blueprint outline traces the exact container shape and border-radius.
 * 2. Background surface fill floods in.
 * 3. Internal dividers and structural separators scale in.
 * 4. Blueprint outline smoothly dissolves leaving pristine V6 frame.
 */
export function buildContainer(options: ContainerBuilderOptions): gsap.core.Timeline {
  const accent = options.borderColor || '#B44CFF';
  const duration = options.durationSec || 0.95;

  const masterTl = gsap.timeline({
    onComplete: options.onComplete,
  });

  const el = document.querySelector<HTMLElement>(options.selector);
  if (!el) return masterTl;

  // Make element visible for construction
  el.style.opacity = '1';
  el.style.visibility = 'visible';
  el.style.clipPath = 'none';

  // 1. Stage: Blueprint Outline (~0.35s)
  const blueprint = createBlueprintOutline({
    targetElement: el,
    accentColor: accent,
    durationSec: 0.35,
    onPerimeterTrace: options.onCursorPosition,
  });

  masterTl.add(blueprint.timeline, 0);

  // 2. Stage: Surface Materialization
  masterTl.add(() => {
    options.onProgress?.(55, 'FLOODING_SURFACE_FILL');
  }, 0.35);

  masterTl.fromTo(
    el,
    { opacity: 0.4 },
    {
      opacity: 1,
      duration: duration * 0.25,
      ease: 'power1.out',
    },
    0.35
  );

  // 3. Internal Structural Dividers (exclude elements that are independent build targets)
  const dividers = Array.from(
    el.querySelectorAll<HTMLElement>(
      'hr, [data-divider="true"]'
    )
  ).filter((d) => !d.hasAttribute('data-build-target'));
  if (dividers.length > 0) {
    masterTl.fromTo(
      dividers,
      { opacity: 0, scaleX: 0 },
      {
        opacity: 1,
        scaleX: 1,
        duration: 0.25,
        stagger: 0.04,
        ease: 'power2.out',
      },
      '>-0.1'
    );
  }

  // 4. Blueprint Outline Dissolve Stage (~0.25s)
  masterTl.add(() => {
    options.onProgress?.(95, 'CONTAINER_SOLIDIFIED');
    blueprint.dissolve(0.25);
  }, `>${duration * 0.15}`);

  masterTl.to({}, { duration: 0.25 });

  return masterTl;
}
