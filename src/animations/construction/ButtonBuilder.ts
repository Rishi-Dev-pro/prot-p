import { gsap } from 'gsap';
import { createBlueprintOutline } from './BlueprintOutline';

export interface ButtonBuilderOptions {
  selector: string;
  accentColor?: string;
  durationSec?: number;
  onCursorPosition?: (x: number, y: number) => void;
  onProgress?: (progressPct: number, currentAction: string) => void;
  onComplete?: () => void;
}

/**
 * ButtonBuilder: Progressive button and interactive control construction.
 * 1. Blueprint outline traces the button perimeter.
 * 2. Background surface fill.
 * 3. Icon and text label progressive reveal.
 * 4. Blueprint outline dissolves, restoring full interactive state.
 */
export function buildButton(options: ButtonBuilderOptions): gsap.core.Timeline {
  const accent = options.accentColor || '#E2E8F0';
  const duration = options.durationSec || 0.8;

  const masterTl = gsap.timeline({
    onComplete: options.onComplete,
  });

  const el = document.querySelector<HTMLElement>(options.selector);
  if (!el) return masterTl;

  // Make element visible for construction
  el.style.opacity = '1';
  el.style.visibility = 'visible';
  el.style.clipPath = 'none';

  // 1. Stage: Blueprint Outline (~0.3s)
  const blueprint = createBlueprintOutline({
    targetElement: el,
    accentColor: accent,
    durationSec: 0.3,
    onPerimeterTrace: options.onCursorPosition,
  });

  masterTl.add(blueprint.timeline, 0);

  // 2. Stage: Surface & Button Body
  const buttons = el.matches('button, a')
    ? [el]
    : Array.from(el.querySelectorAll<HTMLElement>('button, a'));

  const targets = buttons.length > 0 ? buttons : [el];

  targets.forEach((btn, idx) => {
    masterTl.fromTo(
      btn,
      { opacity: 0, scale: 0.94 },
      {
        opacity: 1,
        scale: 1,
        duration: duration * 0.25,
        ease: 'back.out(1.8)',
      },
      0.3 + idx * 0.08
    );

    // 3. Stage: Icon and Label reveal
    const labelAndIcon = btn.querySelectorAll('span, svg');
    if (labelAndIcon.length > 0) {
      masterTl.fromTo(
        labelAndIcon,
        { opacity: 0, y: 3 },
        {
          opacity: 1,
          y: 0,
          duration: 0.18,
          stagger: 0.03,
          ease: 'power2.out',
        },
        '>-0.08'
      );
    }
  });

  // 4. Stage: Blueprint Dissolve
  masterTl.add(() => {
    options.onProgress?.(95, 'BUTTON_INTERACTIVE');
    blueprint.dissolve(0.25);
  }, `>${duration * 0.1}`);

  masterTl.to({}, { duration: 0.25 });

  return masterTl;
}
