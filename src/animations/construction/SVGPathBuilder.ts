import { gsap } from 'gsap';

export interface SVGPathBuilderOptions {
  svgContainerSelector: string;
  accentColor?: string;
  durationSec?: number;
  onCursorPosition?: (x: number, y: number) => void;
  onProgress?: (progressPct: number, currentAction: string) => void;
  onComplete?: () => void;
}

/**
 * SVGPathBuilder: Progressive vector path drawing, node expansion, and topological connection.
 * Used for both the Hero orbital hexagon avatar and the Architecture distributed neural network.
 */
export function buildArchitectureSVG(options: SVGPathBuilderOptions): gsap.core.Timeline {
  const duration = options.durationSec || 1.35;

  const tl = gsap.timeline({
    onUpdate: () => {
      const p = Math.round(tl.progress() * 100);
      options.onProgress?.(
        p,
        p < 25
          ? 'ESTABLISHING_CENTRAL_APEX'
          : p < 60
          ? 'DRAWING_VECTOR_CONNECTORS'
          : p < 85
          ? 'EXPANDING_DOMAIN_NODES'
          : 'NETWORK_CONNECTED'
      );
    },
    onComplete: options.onComplete,
  });

  const container = document.querySelector<HTMLElement>(options.svgContainerSelector);
  if (!container) return tl;

  container.style.opacity = '1';
  container.style.visibility = 'visible';

  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const svgLines = container.querySelectorAll('line, path');
  const svgCircles = container.querySelectorAll('circle');
  const nodeButtons = container.querySelectorAll('button, [class*="node-item"], [class*="badge"]');

  // 1. Initial State: SVG lines set to strokeDasharray/offset, nodes scaled to zero
  tl.set(svgLines, {
    strokeDasharray: 350,
    strokeDashoffset: 350,
    opacity: 0.9,
  });

  tl.set(svgCircles, {
    scale: 0,
    transformOrigin: 'center center',
  });

  if (nodeButtons.length > 0) {
    tl.set(nodeButtons, {
      scale: 0.6,
      opacity: 0,
    });
  }

  // 2. Central Hub Anchor point pop (cursor at center)
  tl.call(() => {
    options.onCursorPosition?.(centerX, centerY);
  });

  tl.to(svgCircles, {
    scale: 1,
    duration: duration * 0.35,
    stagger: 0.08,
    ease: 'back.out(2)',
  });

  // 3. Vector paths draw outward (strokeDashoffset -> 0)
  tl.to(
    svgLines,
    {
      strokeDashoffset: 0,
      duration: duration * 0.5,
      stagger: 0.06,
      ease: 'power2.inOut',
    },
    '>-0.2'
  );

  // 4. Peripheral Domain Nodes and Labels expand (cursor moves to domain node)
  if (nodeButtons.length > 0) {
    tl.to(
      nodeButtons,
      {
        scale: 1,
        opacity: 1,
        duration: duration * 0.35,
        stagger: 0.05,
        ease: 'back.out(1.8)',
      },
      '>-0.25'
    );
  }

  return tl;
}
