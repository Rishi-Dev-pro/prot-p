import { gsap } from 'gsap';

export interface SVGPathBuilderOptions {
  svgContainerSelector: string;
  onProgress?: (progressPct: number, currentAction: string) => void;
  onComplete?: () => void;
}

export function buildArchitectureSVG(options: SVGPathBuilderOptions): gsap.core.Timeline {
  const tl = gsap.timeline({
    onUpdate: () => {
      const p = Math.round(tl.progress() * 100);
      options.onProgress?.(
        p,
        p < 30
          ? 'DRAWING_CENTRAL_CORE'
          : p < 70
          ? 'EXTENDING_RADIAL_RAYS'
          : 'SYNCHRONIZING_DOMAIN_NODES'
      );
    },
    onComplete: options.onComplete,
  });

  const container = document.querySelector<HTMLElement>(options.svgContainerSelector);
  if (!container) return tl;

  const svgLines = container.querySelectorAll('line, path');
  const svgCircles = container.querySelectorAll('circle');
  const nodeButtons = container.querySelectorAll('button');

  // 1. Initial State: SVG lines start with strokeDasharray and offset
  tl.set(svgLines, {
    strokeDasharray: 200,
    strokeDashoffset: 200,
    opacity: 0.8,
  });

  tl.set(svgCircles, {
    scale: 0,
    transformOrigin: 'center center',
  });

  tl.set(nodeButtons, {
    scale: 0.5,
    opacity: 0,
  });

  // 2. Central Core Circle Drawing
  tl.to(svgCircles, {
    scale: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.8)',
  });

  // 3. Radial Rays Drawing outward from center
  tl.to(
    svgLines,
    {
      strokeDashoffset: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.inOut',
    },
    '>-0.2'
  );

  // 4. Peripheral Domain Nodes Expand
  tl.to(
    nodeButtons,
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: 'back.out(2)',
    },
    '>-0.3'
  );

  return tl;
}
