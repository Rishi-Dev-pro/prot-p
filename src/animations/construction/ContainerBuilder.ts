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
        p < 30
          ? 'DRAWING_BOUNDARIES_4_AXES'
          : p < 60
          ? 'PROGRESSIVE_SURFACE_FILL'
          : p < 85
          ? 'ASSEMBLING_DIVIDERS_CORNERS'
          : 'SOLIDIFYING_FRAME'
      );
    },
    onComplete: options.onComplete,
  });

  const el = document.querySelector<HTMLElement>(options.selector);
  if (!el) return tl;

  // 1. Initial State: Zero-size clip-path
  tl.set(el, {
    opacity: 1,
    visibility: 'visible',
    clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)',
  });

  // Stage 1 & 2: Draw top and right boundaries
  tl.to(el, {
    duration: 0.35,
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%)',
    outline: '1.5px solid rgba(0, 240, 255, 0.85)',
    outlineOffset: '2px',
    ease: 'power2.in',
  });

  // Stage 3 & 4: Draw bottom and left boundaries (full perimeter established)
  tl.to(el, {
    duration: 0.35,
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    outline: '1.5px solid rgba(255, 65, 77, 0.85)',
    ease: 'power2.out',
  });

  // Stage 5: Progressive background fill
  tl.to(
    el,
    {
      duration: 0.3,
      backgroundColor: 'rgba(16, 17, 22, 0.9)',
      boxShadow: '0 10px 35px rgba(0, 0, 0, 0.6)',
      ease: 'power1.out',
    },
    '>-0.1'
  );

  // Stage 6 & 7: Construct internal dividers & decorative markers
  const dividersAndMarkers = el.querySelectorAll('hr, [class*="border-b"], [class*="border-t"], [class*="text-white/20"]');
  if (dividersAndMarkers.length > 0) {
    tl.fromTo(
      dividersAndMarkers,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.25, stagger: 0.05, ease: 'power2.out' }
    );
  }

  // Stage 8: Finalize styling & clear temporary wireframe outline
  tl.to(
    el,
    {
      outline: 'none',
      clearProps: 'outline,outlineOffset,clipPath',
      duration: 0.2,
      ease: 'power1.out',
    },
    '>'
  );

  return tl;
}
