import { gsap } from 'gsap';

export interface ButtonBuilderOptions {
  selector: string;
  onProgress?: (progressPct: number, currentAction: string) => void;
  onComplete?: () => void;
}

export function buildButton(options: ButtonBuilderOptions): gsap.core.Timeline {
  const tl = gsap.timeline({
    onUpdate: () => {
      const p = Math.round(tl.progress() * 100);
      options.onProgress?.(
        p,
        p < 20
          ? 'ESTABLISHING_DIMENSIONS'
          : p < 45
          ? 'DRAWING_OUTLINE'
          : p < 65
          ? 'FILLING_BACKGROUND'
          : p < 85
          ? 'CONSTRUCTING_LABEL_ICON'
          : 'ATTACHING_ACCENT'
      );
    },
    onComplete: options.onComplete,
  });

  const el = document.querySelector<HTMLElement>(options.selector);
  if (!el) return tl;

  const buttons = el.matches('button, a') ? [el] : Array.from(el.querySelectorAll<HTMLElement>('button, a'));
  if (buttons.length === 0) {
    buttons.push(el);
  }

  buttons.forEach((btn, idx) => {
    // 1. Establish dimensions & wireframe bounds
    tl.set(
      btn,
      {
        opacity: 0,
        scale: 0.92,
        outline: '1.5px dashed rgba(0, 240, 255, 0.7)',
        outlineOffset: '3px',
      },
      idx * 0.15
    );

    // 2. Draw outline & show bounds
    tl.to(btn, {
      opacity: 0.9,
      duration: 0.25,
      ease: 'power1.out',
    });

    // 3. Fill background & snap shape
    tl.to(btn, {
      scale: 1,
      backgroundColor: 'rgba(255, 65, 77, 0.12)',
      duration: 0.25,
      ease: 'power2.out',
    });

    // 4. Reveal label & icon
    const labelAndIcon = btn.querySelectorAll('span, svg');
    if (labelAndIcon.length > 0) {
      tl.fromTo(
        labelAndIcon,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.25, ease: 'back.out(2)' }
      );
    }

    // 5. Final accent highlight & remove wireframe outline
    tl.to(btn, {
      outline: 'none',
      clearProps: 'outline,outlineOffset',
      duration: 0.2,
      ease: 'power1.in',
    });
  });

  return tl;
}
