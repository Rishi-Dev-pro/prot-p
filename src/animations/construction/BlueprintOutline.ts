import { gsap } from 'gsap';
import { BlueprintManager } from './BlueprintManager';

export interface BlueprintOutlineOptions {
  targetElement: HTMLElement;
  accentColor?: string;
  durationSec?: number;
  onPerimeterTrace?: (x: number, y: number) => void;
  onComplete?: () => void;
}

export interface BlueprintOutlineInstance {
  id: string;
  svgElement: SVGSVGElement;
  timeline: gsap.core.Timeline;
  dissolve: (durationSec?: number) => Promise<void>;
  destroy: () => void;
}

/**
 * Creates a precision 1px SVG blueprint outline that traces the exact shape,
 * dimensions, and border-radius of a DOM element before construction begins.
 */
export function createBlueprintOutline(
  options: BlueprintOutlineOptions
): BlueprintOutlineInstance {
  const {
    targetElement,
    accentColor = '#B44CFF',
    durationSec = 0.45,
    onPerimeterTrace,
    onComplete,
  } = options;

  const rect = targetElement.getBoundingClientRect();
  const cs = window.getComputedStyle(targetElement);
  const rx = Math.min(parseFloat(cs.borderRadius) || 0, rect.width / 2, rect.height / 2);

  const width = Math.max(10, Math.round(rect.width));
  const height = Math.max(10, Math.round(rect.height));

  // Calculate perimeter with rounded corners
  const perimeter = Math.max(
    10,
    Math.round(2 * (width + height) - 8 * rx + 2 * Math.PI * rx)
  );

  // Create SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'blueprint-outline-svg pointer-events-none');
  svg.style.position = 'fixed';
  svg.style.left = `${Math.round(rect.left)}px`;
  svg.style.top = `${Math.round(rect.top)}px`;
  svg.style.width = `${width}px`;
  svg.style.height = `${height}px`;
  svg.style.zIndex = '45';
  svg.style.overflow = 'visible';
  svg.style.pointerEvents = 'none';

  const rectPath = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rectPath.setAttribute('x', '0.5');
  rectPath.setAttribute('y', '0.5');
  rectPath.setAttribute('width', `${Math.max(1, width - 1)}`);
  rectPath.setAttribute('height', `${Math.max(1, height - 1)}`);
  rectPath.setAttribute('rx', `${rx}`);
  rectPath.setAttribute('ry', `${rx}`);
  rectPath.setAttribute('fill', 'none');
  rectPath.setAttribute('stroke', accentColor);
  rectPath.setAttribute('stroke-width', '1');
  rectPath.setAttribute('stroke-dasharray', `${perimeter}`);
  rectPath.setAttribute('stroke-dashoffset', `${perimeter}`);
  rectPath.setAttribute('opacity', '0.85');
  rectPath.style.filter = `drop-shadow(0 0 2px ${accentColor}40)`;

  svg.appendChild(rectPath);
  document.body.appendChild(svg);

  // Dispatch spatial pulse for Three.js 3D depth ripple
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('three:spatial-pulse', {
        detail: {
          x: rect.left + width / 2,
          y: rect.top + height / 2,
          color: accentColor,
          intensity: 0.8,
        },
      })
    );
  }

  const instanceId = `blueprint-${Math.random().toString(36).substring(2, 9)}`;

  // Animate perimeter drawing
  const tl = gsap.timeline({
    onUpdate: () => {
      const progress = tl.progress();
      if (onPerimeterTrace) {
        // Calculate point along perimeter
        const pt = getPointAlongRect(width, height, rx, progress);
        onPerimeterTrace(rect.left + pt.x, rect.top + pt.y);
      }
    },
    onComplete: () => {
      BlueprintManager.setStatus(instanceId, 'OUTLINE_ACTIVE');
      onComplete?.();
    },
  });

  tl.to(rectPath, {
    strokeDashoffset: 0,
    duration: durationSec,
    ease: 'power2.inOut',
  });

  const dissolve = (dissolveDuration = 0.25): Promise<void> => {
    return new Promise((resolve) => {
      BlueprintManager.setStatus(instanceId, 'OUTLINE_DISSOLVING');
      gsap.to(svg, {
        opacity: 0,
        duration: dissolveDuration,
        ease: 'power1.out',
        onComplete: () => {
          if (svg.parentNode) {
            svg.parentNode.removeChild(svg);
          }
          BlueprintManager.setStatus(instanceId, 'OUTLINE_REMOVED');
          resolve();
        },
      });
    });
  };

  const destroy = () => {
    tl.kill();
    gsap.killTweensOf(svg);
    if (svg.parentNode) {
      svg.parentNode.removeChild(svg);
    }
    BlueprintManager.setStatus(instanceId, 'OUTLINE_REMOVED');
  };

  BlueprintManager.register(instanceId, targetElement, svg, dissolve, destroy);

  return { id: instanceId, svgElement: svg, timeline: tl, dissolve, destroy };
}

/**
 * Calculates (x, y) along a rounded rectangle perimeter at a given progress (0 to 1).
 * Starts at top-center and moves clockwise: Top -> Right -> Bottom -> Left -> Top.
 */
function getPointAlongRect(
  w: number,
  h: number,
  rx: number,
  progress: number
): { x: number; y: number } {
  // Approximate perimeter as 4 line segments
  const p = ((progress % 1) + 1) % 1;
  const total = 2 * (w + h);
  const dist = p * total;

  // 1. Top edge (0 to w)
  if (dist <= w) {
    return { x: dist, y: 0 };
  }
  // 2. Right edge (w to w + h)
  if (dist <= w + h) {
    return { x: w, y: dist - w };
  }
  // 3. Bottom edge (w + h to 2w + h)
  if (dist <= 2 * w + h) {
    return { x: w - (dist - (w + h)), y: h };
  }
  // 4. Left edge (2w + h to 2w + 2h)
  return { x: 0, y: h - (dist - (2 * w + h)) };
}

