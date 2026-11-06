import React from 'react';
import { Terminal, Cpu } from 'lucide-react';

interface IntroProgressProps {
  progress: number; // 0 to 100
  phaseText: string;
  activeAgentsCount: number;
}

export const IntroProgress: React.FC<IntroProgressProps> = ({
  progress,
  phaseText,
  activeAgentsCount,
}) => {
  return (
    <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 z-50 p-4 rounded-xl border border-white/15 bg-[#101116]/90 backdrop-blur-xl shadow-2xl transition-all duration-300">
      {/* Header bar */}
      <div className="flex items-center justify-between text-xs font-mono mb-2">
        <div className="flex items-center gap-2 text-[#FF414D]">
          <Cpu className="w-3.5 h-3.5 animate-spin [animation-duration:3s]" />
          <span className="font-bold">AGENTIC_BUILDER</span>
        </div>
        <div className="flex items-center gap-2 text-white/50">
          <span>{activeAgentsCount}/20 AGENTS</span>
          <span className="font-bold text-white">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2.5">
        <div
          className="h-full bg-gradient-to-r from-[#FF414D] via-[#B44CFF] to-[#00F0FF] transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Current Phase Message */}
      <div className="flex items-center gap-2 font-mono text-[11px] text-white/80 truncate">
        <Terminal className="w-3 h-3 text-[#00FF88] shrink-0" />
        <span className="truncate uppercase">{phaseText}</span>
      </div>
    </div>
  );
};

