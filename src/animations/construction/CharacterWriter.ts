import { gsap } from 'gsap';

export interface CharacterWriterOptions {
  containerElement: HTMLElement;
  durationSec?: number;
  charIntervalSec?: number;
  accentColor?: string;
  onCharacterProgress?: (x: number, y: number, char: string, progressPct: number) => void;
  onComplete?: () => void;
}

export interface CharacterWriterInstance {
  timeline: gsap.core.Timeline;
  cleanup: () => void;
}

/**
 * CharacterWriter: Progressively writes out text character-by-character.
 * 1. Wraps text in invisible spans preserving 100% of the original layout, dimensions, fonts, and styles.
 * 2. Reveals characters sequentially in left-to-right reading order.
 * 3. Synchronizes the active writing cursor coordinate to the baseline of each revealed character.
 */
export function writeCharacters(options: CharacterWriterOptions): CharacterWriterInstance {
  const {
    containerElement,
    durationSec,
    charIntervalSec,
    accentColor = '#C4B5FD',
    onCharacterProgress,
    onComplete,
  } = options;

  // Make sure container itself is visible
  containerElement.style.visibility = 'visible';
  containerElement.style.opacity = '1';

  // 1. Prepare DOM: Wrap text characters
  const charSpans: HTMLElement[] = prepareTextSpans(containerElement);

  const totalChars = charSpans.length;
  if (totalChars === 0) {
    const emptyTl = gsap.timeline({ onComplete });
    return { timeline: emptyTl, cleanup: () => {} };
  }

  // Calculate per-character timing
  const totalDuration =
    durationSec || Math.min(2.0, Math.max(0.4, totalChars * (charIntervalSec || 0.045)));
  const stepDuration = totalDuration / totalChars;

  const tl = gsap.timeline({
    onComplete: () => {
      charSpans.forEach((span) => {
        span.style.opacity = '1';
        span.style.visibility = 'visible';
      });
      onComplete?.();
    },
  });

  // Subtle temporary baseline guide line under the active line
  const baselineGuide = document.createElement('div');
  baselineGuide.className = 'char-baseline-guide pointer-events-none';
  baselineGuide.style.position = 'fixed';
  baselineGuide.style.height = '1.5px';
  baselineGuide.style.backgroundColor = `${accentColor}80`;
  baselineGuide.style.boxShadow = `0 0 4px ${accentColor}40`;
  baselineGuide.style.zIndex = '44';
  baselineGuide.style.opacity = '0';
  baselineGuide.style.pointerEvents = 'none';
  document.body.appendChild(baselineGuide);

  // Hard safety timeout: Baseline guide must never persist beyond 3.5s
  window.setTimeout(() => {
    if (baselineGuide.parentNode) {
      baselineGuide.parentNode.removeChild(baselineGuide);
    }
  }, 3500);

  charSpans.forEach((span, idx) => {
    const startTime = idx * stepDuration;

    // Direct GSAP tween for the character
    tl.set(
      span,
      {
        opacity: 1,
        visibility: 'visible',
      },
      startTime
    );

    tl.call(
      () => {
        const rect = span.getBoundingClientRect();
        if (rect.width > 0 || rect.height > 0) {
          const char = span.textContent || '';

          if (idx === 0) {
            baselineGuide.style.opacity = '0.7';
          }
          baselineGuide.style.left = `${Math.round(rect.left)}px`;
          baselineGuide.style.top = `${Math.round(rect.bottom)}px`;
          baselineGuide.style.width = `${Math.max(12, Math.round(rect.width * 1.5))}px`;

          onCharacterProgress?.(
            rect.right,
            rect.bottom - 4,
            char,
            Math.round(((idx + 1) / totalChars) * 100)
          );
        }
      },
      undefined,
      startTime
    );
  });

  // Dissolve baseline guide at the end
  tl.to(
    baselineGuide,
    {
      opacity: 0,
      duration: 0.15,
      ease: 'power1.out',
      onComplete: () => {
        if (baselineGuide.parentNode) {
          baselineGuide.parentNode.removeChild(baselineGuide);
        }
      },
    },
    `>${stepDuration}`
  );

  const cleanup = () => {
    tl.kill();
    charSpans.forEach((span) => {
      span.style.opacity = '1';
      span.style.visibility = 'visible';
    });
    if (baselineGuide.parentNode) {
      baselineGuide.parentNode.removeChild(baselineGuide);
    }
  };

  return { timeline: tl, cleanup };
}

/**
 * Recursively inspects leaf text nodes and wraps individual characters in spans
 * with opacity: 0 to reserve the exact layout without any layout shifting.
 */
export function prepareTextSpans(root: HTMLElement): HTMLElement[] {
  if (root.getAttribute('data-chars-prepared') === 'true') {
    return Array.from(root.querySelectorAll<HTMLElement>('.build-char-span'));
  }

  const charSpans: HTMLElement[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);

  const textNodes: Text[] = [];
  let currentNode: Node | null = walker.nextNode();
  while (currentNode) {
    if (currentNode.textContent && currentNode.textContent.trim().length > 0) {
      textNodes.push(currentNode as Text);
    }
    currentNode = walker.nextNode();
  }

  textNodes.forEach((textNode) => {
    const text = textNode.textContent || '';
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement('span');
      span.className = 'build-char-span';
      span.textContent = char;
      span.style.opacity = '0';
      span.style.display = 'inline';
      span.style.visibility = 'hidden';
      span.style.whiteSpace = 'pre-wrap';

      fragment.appendChild(span);
      charSpans.push(span);
    }

    if (textNode.parentNode) {
      textNode.parentNode.replaceChild(fragment, textNode);
    }
  });

  root.setAttribute('data-chars-prepared', 'true');
  return charSpans;
}
