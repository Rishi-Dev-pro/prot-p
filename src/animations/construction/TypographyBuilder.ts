import { gsap } from 'gsap';
import { createBlueprintOutline } from './BlueprintOutline';
import { writeCharacters } from './CharacterWriter';

export interface TypographyBuilderOptions {
  containerSelector: string;
  accentColor?: string;
  durationSec?: number;
  onCursorPosition?: (x: number, y: number) => void;
  onProgress?: (progressPct: number, currentAction: string) => void;
  onComplete?: () => void;
}

/**
 * TypographyBuilder: True character-by-character physical text synthesis.
 * Sequence:
 * 1. Blueprint outline traces the text container bounds.
 * 2. Letters appear individually (E -> N -> G -> I -> N -> E -> E -> R -> I -> N -> G).
 * 3. Cursor glides along the text baseline synchronized to character reveals.
 * 4. Blueprint outline smoothly dissolves leaving pristine final typography.
 */
export function buildTypography(options: TypographyBuilderOptions): gsap.core.Timeline {
  const accent = options.accentColor || '#C4B5FD';
  const totalDuration = options.durationSec || 1.1;

  const masterTl = gsap.timeline({
    onComplete: options.onComplete,
  });

  const el = document.querySelector<HTMLElement>(options.containerSelector);
  if (!el) return masterTl;

  // Make element container visible and unclipped
  el.style.opacity = '1';
  el.style.visibility = 'visible';
  el.style.clipPath = 'none';

  // 1. Stage: Blueprint Outline (~0.32s)
  const blueprintDuration = 0.32;
  const blueprint = createBlueprintOutline({
    targetElement: el,
    accentColor: accent,
    durationSec: blueprintDuration,
    onPerimeterTrace: options.onCursorPosition,
  });

  masterTl.add(blueprint.timeline, 0);

  // 2. Stage: Character-by-Character Writing
  const writeDuration = Math.max(0.4, totalDuration - blueprintDuration - 0.25);
  const writer = writeCharacters({
    containerElement: el,
    durationSec: writeDuration,
    accentColor: accent,
    onCharacterProgress: (cx, cy, char, pct) => {
      options.onCursorPosition?.(cx, cy);
      options.onProgress?.(
        35 + Math.round(pct * 0.55),
        `WRITING_GLYPH: "${char}"`
      );
    },
  });

  masterTl.add(writer.timeline, blueprintDuration);

  // 3. Stage: Blueprint Outline Dissolve (~0.25s)
  masterTl.add(() => {
    options.onProgress?.(95, 'SOLIDIFYING_TYPOGRAPHY');
    blueprint.dissolve(0.25);
  }, blueprintDuration + writeDuration);

  masterTl.to({}, { duration: 0.25 });

  return masterTl;
}
