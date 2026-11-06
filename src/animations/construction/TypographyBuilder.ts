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
      options.onProgress?.(
        p,
        p < 20
          ? 'DRAWING_BASELINES'
          : p < 45
          ? 'REVEALING_ALIGNMENT_GUIDES'
          : p < 70
          ? 'ASSEMBLING_GLYPH_GROUPS'
          : p < 90
          ? 'OUTLINE_TO_SOLID_TRANSFORM'
          : 'TYPOGRAPHY_COMPILED'
      );
    },
    onComplete: options.onComplete,
  });

  const el = document.querySelector<HTMLElement>(options.containerSelector);
  if (!el) return tl;

  tl.set(el, {
    opacity: 1,
    visibility: 'visible',
  });

  const textNodes = el.matches('h1, h2, h3, p, span') ? [el] : Array.from(el.querySelectorAll<HTMLElement>('h1, h2, h3, p, span'));
  if (textNodes.length === 0) {
    textNodes.push(el);
  }

  textNodes.forEach((node, hIdx) => {
    // Stage 1 & 2: Draw baseline & alignment guides
    tl.to(
      node,
      {
        duration: 0.3,
        outline: '1.5px dashed rgba(0, 240, 255, 0.75)',
        outlineOffset: '4px',
        ease: 'power1.out',
      },
      hIdx * 0.15
    );

    // Stage 3, 4 & 5: Assemble glyphs with letter-spacing adjustment
    tl.fromTo(
      node,
      {
        opacity: 0,
        y: 10,
        letterSpacing: '0.18em',
        filter: 'blur(3px)',
      },
      {
        opacity: 0.85,
        y: 0,
        letterSpacing: 'normal',
        filter: 'blur(0px)',
        duration: 0.35,
        ease: 'power3.out',
      },
      '>-0.1'
    );

    // Stage 6 & 7: Outline to solid transition & final opacity snap
    tl.to(
      node,
      {
        opacity: 1,
        color: '#F3F3F5',
        duration: 0.25,
        ease: 'power2.inOut',
      },
      '>'
    );

    // Stage 8 & 9: Remove temporary alignment guides & apply final polish
    tl.to(
      node,
      {
        outline: 'none',
        clearProps: 'outline,outlineOffset,filter',
        duration: 0.15,
        ease: 'power1.in',
      },
      '>'
    );
  });

  return tl;
}
