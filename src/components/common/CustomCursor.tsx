import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Disable on mobile/touch screens or reduced motion
    if (prefersReduced || typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        currentX = mouseX;
        currentY = mouseY;
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer');
        setIsPointer(!!isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth 60-144fps direct DOM animation loop without React state overhead
    const render = () => {
      // Critically damped fast interpolation (factor 0.35) for instant responsiveness
      currentX += (mouseX - currentX) * 0.35;
      currentY += (mouseY - currentY) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${Math.round(currentX)}px, ${Math.round(currentY)}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, prefersReduced]);

  if (prefersReduced || !isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 will-change-transform hidden md:block"
      style={{
        left: 0,
        top: 0,
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    >
      {/* Outer subtle ring */}
      <div
        ref={ringRef}
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-150 ${
          isPointer
            ? 'w-9 h-9 border-[#FF414D] bg-[#FF414D]/15 scale-110 shadow-[0_0_12px_rgba(255,65,77,0.35)]'
            : 'w-5 h-5 border-white/30 bg-transparent'
        }`}
      />
      {/* Central focal dot */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-150 ${
          isPointer ? 'bg-[#FF414D]' : 'bg-white shadow-[0_0_4px_#fff]'
        }`}
      />
    </div>
  );
};
