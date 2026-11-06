import React from 'react';
import { PhaseInfo } from '../../animations/constructionConfig';
import { Cpu, Terminal, Shield } from 'lucide-react';

interface ConstructionOverlayProps {
  phase: PhaseInfo;
  progress: number;
  activeAgentsCount: number;
}

export const ConstructionOverlay: React.FC<ConstructionOverlayProps> = ({
  phase,
  progress,
  activeAgentsCount,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Blueprint calibration crosshairs in corners */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-[#00F0FF]/60 flex items-center gap-1.5 select-none bg-black/60 px-2.5 py-1 rounded border border-[#00F0FF]/30 backdrop-blur-md">
        <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-ping" />
        <span>CANVAS_BUILD_MODE // ACTIVE</span>
      </div>

      <div className="absolute top-4 right-32 font-mono text-[10px] text-white/50 hidden md:flex items-center gap-2 select-none bg-black/60 px-2.5 py-1 rounded border border-white/10 backdrop-blur-md">
        <span>PHASE_{phase.phase < 10 ? `0${phase.phase}` : phase.phase}/10</span>
        <span className="text-[#FF414D]">{phase.label}</span>
      </div>

      {/* Floating Blueprint Telemetry Dock */}
      <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 p-4 rounded-xl border border-white/15 bg-[#101116]/95 backdrop-blur-xl shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <div className="flex items-center gap-2 text-[#FF414D]">
            <Cpu className="w-3.5 h-3.5 animate-spin [animation-duration:3s]" />
            <span className="font-bold">AGENT_ORCHESTRATOR</span>
          </div>
          <div className="flex items-center gap-2 text-white/50">
            <span>{activeAgentsCount}/20 AGENTS</span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2.5">
          <div
            className="h-full bg-gradient-to-r from-[#FF414D] via-[#B44CFF] to-[#00F0FF] transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Phase & Live Action */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-white/90 truncate">
          <Terminal className="w-3 h-3 text-[#00FF88] shrink-0" />
          <span className="truncate uppercase font-medium">
            {phase.actionText}
          </span>
        </div>
      </div>
    </div>
  );
};

