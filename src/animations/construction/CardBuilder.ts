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
        p < 25
          ? 'DRAWING_CARD_CHASSIS'
          : p < 50
          ? 'REVEALING_SPEC_METADATA'
          : p < 75
          ? 'POPPING_TECH_PILLS'
          : 'CARD_SPEC_COMPILED'
      );
    },
    onComplete: options.onComplete,
  });

  const card = document.querySelector<HTMLElement>(options.cardSelector);
  if (!card) return tl;

  // 1. Structural chassis wipe
  tl.fromTo(
    card,
    {
      opacity: 0,
      y: 20,
      clipPath: 'inset(0% 100% 0% 0%)',
    },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      outline: '1px solid rgba(0, 240, 255, 0.7)',
      outlineOffset: '2px',
      duration: 0.6,
      ease: 'power2.out',
    }
  );

  // 2. Internal children stagger
  const headers = card.querySelectorAll('h3, p, [class*="font-mono"]');
  tl.fromTo(
    headers,
    {
      opacity: 0,
      y: 8,
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.4,
      ease: 'power1.out',
    },
    '>-0.2'
  );

  // 3. Tech stack pills popping into place one by one
  const pills = card.querySelectorAll('span.font-mono, [class*="bg-white/5"]');
  if (pills.length > 0) {
    tl.fromTo(
      pills,
      {
        opacity: 0,
        scale: 0.7,
      },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.3,
        ease: 'back.out(2)',
      },
      '>-0.1'
    );
  }

  // 4. Solidify border and clear wireframe outline
  tl.to(
    card,
    {
      outline: 'none',
      duration: 0.2,
      ease: 'power1.out',
    },
    '>'
  );

  return tl;
}

