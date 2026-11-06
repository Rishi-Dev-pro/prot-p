import { gsap } from 'gsap';

export interface TypographyBuilderOptions {
  containerSelector: string;
  baselineGuide?: boolean;
  staggerDelay?: number;
  onProgress?: (progressPct: number, currentAction: string) => void;
  onComplete?: () => void;
}

export function buildTypography(options: TypographyBuilderOptions): gsap.core.Timeline {
  const tl = gsap.timeline({
    onUpdate: () => {
      const p = Math.round(tl.progress() * 100);
      options.onProgress?.(p, p < 30 ? 'PROJECTING_BASELINES' : p < 70 ? 'ASSEMBLING_GLYPHS' : 'KERNING_ALIGNMENT');
    },
    onComplete: options.onComplete,
  });

  const el = document.querySelector<HTMLElement>(options.containerSelector);
  if (!el) return tl;

  // 1. Initial State: wireframe outline with layout calibration
  tl.set(el, {
    opacity: 1,
    visibility: 'visible',
  });

  // Find all words/lines or child headings
  const headings = el.querySelectorAll('h1, h2, h3, p, span');

  headings.forEach((heading, hIdx) => {
    // Stage A: Baseline & measurement guide flash
    tl.to(
      heading,
      {
        duration: 0.4,
        outline: '1px dashed rgba(0, 240, 255, 0.7)',
        outlineOffset: '4px',
        ease: 'power1.out',
      },
      hIdx * 0.35
    );

    // Stage B: Glyphs placement (scale from 0.85 to 1.0 with letter-spacing snap)
    tl.fromTo(
      heading,
      {
        opacity: 0,
        y: 12,
        letterSpacing: '0.15em',
        filter: 'blur(4px)',
      },
      {
        opacity: 1,
        y: 0,
        letterSpacing: 'normal',
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power3.out',
      },
      `>-0.1`
    );

    // Stage C: Remove baseline guide and solidify font-weight/color
    tl.to(
      heading,
      {
        outline: 'none',
        duration: 0.3,
        ease: 'power1.in',
      },
      `>+0.1`
    );
  });

  return tl;
}
