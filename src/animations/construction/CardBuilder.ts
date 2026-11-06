import { gsap } from 'gsap';
import { createBlueprintOutline } from './BlueprintOutline';
import { writeCharacters } from './CharacterWriter';

export interface CardBuilderOptions {
  cardSelector: string;
  accentColor?: string;
  durationSec?: number;
  onCursorPosition?: (x: number, y: number) => void;
  onProgress?: (progressPct: number, currentAction: string) => void;
  onComplete?: () => void;
}

/**
 * CardBuilder: True outside-to-inside nested component construction.
 * 1. Blueprint outline traces the card boundary and rounded corners.
 * 2. Background surface fill floods in.
 * 3. Upper project badge / category pops into place.
 * 4. Project title written character-by-character.
 * 5. Project description written character-by-character.
 * 6. Internal dividers and taxonomy tech tags staggered in.
 * 7. Action buttons and interactive icons assemble.
 * 8. Blueprint outline smoothly dissolves leaving pristine V6 card.
 */
export function buildCard(options: CardBuilderOptions): gsap.core.Timeline {
  const accent = options.accentColor || '#818CF8';
  const totalDuration = options.durationSec || 1.35;

  const masterTl = gsap.timeline({
    onComplete: options.onComplete,
  });

  const card = document.querySelector<HTMLElement>(options.cardSelector);
  if (!card) return masterTl;

  // Make visible for construction
  card.style.opacity = '1';
  card.style.visibility = 'visible';
  card.style.clipPath = 'none';

  // 1. Stage: Blueprint Outline (~0.35s)
  const blueprintDuration = 0.35;
  const blueprint = createBlueprintOutline({
    targetElement: card,
    accentColor: accent,
    durationSec: blueprintDuration,
    onPerimeterTrace: options.onCursorPosition,
  });

  masterTl.add(blueprint.timeline, 0);

  // 2. Stage: Surface Materialization (~0.2s)
  masterTl.add(() => {
    options.onProgress?.(30, 'FLOODING_CARD_SURFACE');
  }, blueprintDuration);

  masterTl.fromTo(
    card,
    { opacity: 0.3 },
    { opacity: 1, duration: 0.18, ease: 'power1.out' },
    blueprintDuration
  );

  let currentTime = blueprintDuration + 0.18;

  // 3. Stage: Upper Badge / Category Pop
  const badges = card.querySelectorAll(
    '[class*="PROJECT_"], [class*="font-mono text-xs"], [class*="rounded border"]'
  );
  if (badges.length > 0) {
    masterTl.add(() => {
      options.onProgress?.(45, 'ASSEMBLING_PROJECT_HEADER');
    }, currentTime);

    masterTl.fromTo(
      badges,
      { opacity: 0, y: -4, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.18, stagger: 0.03, ease: 'back.out(2)' },
      currentTime
    );
    currentTime += 0.18;
  }

  // 4. Stage: Project Title Character-by-Character
  const heading = card.querySelector<HTMLElement>('h3, h4');
  if (heading) {
    masterTl.add(() => {
      options.onProgress?.(60, 'WRITING_PROJECT_TITLE');
    }, currentTime);

    const titleWriter = writeCharacters({
      containerElement: heading,
      durationSec: 0.3,
      accentColor: accent,
      onCharacterProgress: (cx, cy) => {
        options.onCursorPosition?.(cx, cy);
      },
    });

    masterTl.add(titleWriter.timeline, currentTime);
    currentTime += 0.3;
  }

  // 5. Stage: Description Paragraph
  const desc = card.querySelector<HTMLElement>('p');
  if (desc) {
    masterTl.add(() => {
      options.onProgress?.(75, 'WRITING_SPEC_DETAILS');
    }, currentTime);

    const descWriter = writeCharacters({
      containerElement: desc,
      durationSec: 0.25,
      accentColor: accent,
      onCharacterProgress: (cx, cy) => {
        options.onCursorPosition?.(cx, cy);
      },
    });

    masterTl.add(descWriter.timeline, currentTime);
    currentTime += 0.25;
  }

  // 6. Stage: Tech Taxonomy Tags
  const tags = card.querySelectorAll('span.font-mono, [class*="bg-white/5"]');
  if (tags.length > 0) {
    masterTl.add(() => {
      options.onProgress?.(85, 'POPULATING_TAXONOMY_TAGS');
    }, currentTime);

    masterTl.fromTo(
      tags,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.18, stagger: 0.02, ease: 'power2.out' },
      currentTime
    );
    currentTime += 0.18;
  }

  // 7. Stage: Action Buttons & Icons
  const buttons = card.querySelectorAll('button, a');
  if (buttons.length > 0) {
    masterTl.add(() => {
      options.onProgress?.(92, 'CALIBRATING_CONTROLS');
    }, currentTime);

    masterTl.fromTo(
      buttons,
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.18, stagger: 0.03, ease: 'power2.out' },
      currentTime
    );
    currentTime += 0.18;
  }

  // 8. Stage: Blueprint Dissolve
  masterTl.add(() => {
    options.onProgress?.(98, 'CARD_SOLIDIFIED');
    blueprint.dissolve(0.25);
  }, currentTime);

  masterTl.to({}, { duration: 0.25 });

  return masterTl;
}
