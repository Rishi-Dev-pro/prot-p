import { gsap } from 'gsap';

export interface CardBuilderOptions {
  cardSelector: string;
  onProgress?: (progressPct: number, currentAction: string) => void;
  onComplete?: () => void;
}

export function buildCard(options: CardBuilderOptions): gsap.core.Timeline {
  const tl = gsap.timeline({
    onUpdate: () => {
      const p = Math.round(tl.progress() * 100);
      options.onProgress?.(
        p,
        p < 15
          ? 'OUTER_GEOMETRY_DRAW'
          : p < 35
          ? 'INTERNAL_LAYOUT_SCAFFOLD'
          : p < 50
          ? 'REVEALING_PROJECT_NUMBER'
          : p < 65
          ? 'ASSEMBLING_HEADING_DESC'
          : p < 85
          ? 'PLACING_TECH_TAXONOMY_TAGS'
          : 'CALIBRATING_STATUS_INDICATOR'
      );
    },
    onComplete: options.onComplete,
  });

  const card = document.querySelector<HTMLElement>(options.cardSelector);
  if (!card) return tl;

  // 1. Draw outer boundary geometry
  tl.fromTo(
    card,
    {
      opacity: 0,
      y: 18,
      clipPath: 'inset(0% 100% 0% 0%)',
    },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      outline: '1.5px dashed rgba(0, 240, 255, 0.85)',
      outlineOffset: '3px',
      duration: 0.45,
      ease: 'power2.out',
    }
  );

  // 2. Construct internal layout dividers
  const dividers = card.querySelectorAll('hr, [class*="border-b"], [class*="border-t"]');
  if (dividers.length > 0) {
    tl.fromTo(
      dividers,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.25, stagger: 0.04, ease: 'power2.out' },
      '>-0.1'
    );
  }

  // 3. Reveal project number & category badges
  const badges = card.querySelectorAll('[class*="PROJECT_"], [class*="font-mono text-xs"], [class*="rounded border"]');
  if (badges.length > 0) {
    tl.fromTo(
      badges,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.25, stagger: 0.04, ease: 'back.out(2)' },
      '>-0.1'
    );
  }

  // 4. Assemble heading
  const headings = card.querySelectorAll('h3, h4');
  if (headings.length > 0) {
    tl.fromTo(
      headings,
      { opacity: 0, y: 8, letterSpacing: '0.08em' },
      { opacity: 1, y: 0, letterSpacing: 'normal', duration: 0.3, ease: 'power2.out' },
      '>-0.1'
    );
  }

  // 5. Construct description lines
  const desc = card.querySelectorAll('p');
  if (desc.length > 0) {
    tl.fromTo(
      desc,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' },
      '>-0.1'
    );
  }

  // 6. Place technology labels individually
  const techTags = card.querySelectorAll('span.font-mono, [class*="bg-white/5"]');
  if (techTags.length > 0) {
    tl.fromTo(
      techTags,
      { opacity: 0, scale: 0.6, y: 4 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.04, duration: 0.25, ease: 'back.out(2)' },
      '>-0.1'
    );
  }

  // 7. Build status indicator pulse & 8. Apply final styling
  tl.to(
    card,
    {
      outline: 'none',
      clearProps: 'outline,outlineOffset,clipPath',
      duration: 0.2,
      ease: 'power1.in',
    },
    '>'
  );

  return tl;
}
