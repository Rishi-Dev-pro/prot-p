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
        p < 40 ? 'ESTABLISHING_BOUNDS' : p < 75 ? 'INSCRIBING_LABEL' : 'ATTACHING_INTERACTION'
      );
    },
    onComplete: options.onComplete,
  });

  const el = document.querySelector<HTMLElement>(options.selector);
  if (!el) return tl;

  const buttons = el.querySelectorAll('button, a');

  buttons.forEach((btn, idx) => {
    // 1. Initial State
    tl.set(
      btn,
      {
        opacity: 0,
        scale: 0.9,
      },
      idx * 0.2
    );

    // 2. Wireframe caliper outline
    tl.to(btn, {
      opacity: 0.9,
      outline: '1px dashed #00F0FF',
      outlineOffset: '2px',
      duration: 0.25,
      ease: 'power1.out',
    });

    // 3. Fill and scale snap to full
    tl.to(btn, {
      opacity: 1,
      scale: 1,
      outline: 'none',
      duration: 0.35,
      ease: 'back.out(1.7)',
    });
  });

  return tl;
}
