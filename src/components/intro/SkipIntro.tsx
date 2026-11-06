import React, { useEffect } from 'react';
import { FastForward } from 'lucide-react';

interface SkipIntroProps {
  onSkip: () => void;
}

export const SkipIntro: React.FC<SkipIntroProps> = ({ onSkip }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        onSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSkip]);

  return (
    <button
      onClick={onSkip}
      className="fixed top-6 right-6 z-50 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-[#101116]/90 hover:bg-[#FF414D] hover:border-[#FF414D] text-[#F3F3F5] font-mono text-xs tracking-wider transition-all duration-200 shadow-xl cursor-pointer group"
      title="Press ESC or Space to skip construction"
    >
      <span>SKIP INTRO</span>
      <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      <span className="text-[9px] text-white/40 group-hover:text-white/80 hidden sm:inline border-l border-white/20 pl-1.5">
        ESC
      </span>
    </button>
  );
};

