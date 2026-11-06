import { gsap } from 'gsap';

export interface ContainerBuilderOptions {
  selector: string;
  borderColor?: string;
  onProgress?: (progressPct: number, currentAction: string) => void;
  onComplete?: () => void;
}

export function buildContainer(options: ContainerBuilderOptions): gsap.core.Timeline {
  const tl = gsap.timeline({
    onUpdate: () => {
      const p = Math.round(tl.progress() * 100);
      options.onProgress?.(
        p,
        p < 30 ? 'DRAWING_BOUNDARIES' : p < 70 ? 'SYNTHESIZING_PANEL_FILL' : 'SOLIDIFYING_FRAME'
      );
    },
    onComplete: options.onComplete,
  });

  const el = document.querySelector<HTMLElement>(options.selector);
  if (!el) return tl;

  // 1. Initial State: Frame unrolls via directional clip-path
  tl.set(el, {
    opacity: 1,
    visibility: 'visible',
    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    boxShadow: 'none',
  });

  // Stage A: Border & Chassis path wipe (Left to right)
  tl.to(el, {
    duration: 0.65,
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    outline: '1.5px solid rgba(255, 65, 77, 0.9)',
    outlineOffset: '2px',
    ease: 'power2.inOut',
  });

  // Stage B: Internal background color & backdrop blur hydration
  tl.to(
    el,
    {
      duration: 0.45,
      backgroundColor: 'rgba(16, 17, 22, 0.85)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      outline: '1px solid rgba(255, 255, 255, 0.1)',
      outlineOffset: '0px',
      ease: 'power2.out',
    },
    '>-0.1'
  );

  return tl;
}

