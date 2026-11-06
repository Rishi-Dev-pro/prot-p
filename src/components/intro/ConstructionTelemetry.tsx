import React from 'react';
import { SectionTimelineConfig } from '../../animations/construction/ConstructionConfig';
import { Cpu, Terminal, FastForward } from 'lucide-react';

interface ConstructionTelemetryProps {
  currentSection: SectionTimelineConfig;
  progress: number;
  activeAgentsCount: number;
  speed: number;
  onToggleSpeed: () => void;
  onSkip: () => void;
}

export const ConstructionTelemetry: React.FC<ConstructionTelemetryProps> = ({
  currentSection,
  progress,
  activeAgentsCount,
  speed,
  onToggleSpeed,
  onSkip,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Top Left: Canvas Mode Calipers (Hidden on narrow mobile screens to avoid overlap with controls) */}
      <div className="absolute top-5 left-5 font-mono text-[10px] text-[#00F0FF] hidden sm:flex items-center gap-2 bg-[#08090D]/90 border border-[#B44CFF]/30 px-3 py-1.5 rounded-lg backdrop-blur-md shadow-xl">
        <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-ping" />
        <span className="font-semibold tracking-wider text-white/90">
          AUTONOMOUS_ORCHESTRATION // {activeAgentsCount}-NODE MESH
        </span>
      </div>

      {/* Top Right: Speed Toggle & Skip Button */}
      <div className="absolute top-4 sm:top-5 right-4 sm:right-5 pointer-events-auto flex items-center gap-2">
        <button
          onClick={onToggleSpeed}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-[#101116]/90 hover:bg-white/10 text-[#F3F3F5] font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer shadow-xl"
          title="Toggle playback speed"
        >
          <FastForward className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>{speed}X SPEED</span>
        </button>

        <button
          onClick={onSkip}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B44CFF]/30 bg-[#101116]/90 hover:bg-[#B44CFF]/20 hover:border-[#B44CFF] text-[#F3F3F5] font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer shadow-xl group"
          title="Press ESC or Space to skip construction"
        >
          <span>SKIP INTRO</span>
          <span className="text-[9px] text-white/40 group-hover:text-white/80 hidden sm:inline border-l border-white/20 pl-1.5">
            ESC
          </span>
        </button>
      </div>

      {/* Bottom Center-Right: Active Phase HUD (Clean responsive sizing for mobile & desktop) */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-auto right-4 sm:right-6 sm:w-[420px] p-3.5 sm:p-4 rounded-xl border border-white/15 bg-[#0C0D12]/95 backdrop-blur-xl shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <div className="flex items-center gap-1.5 text-[#B44CFF] min-w-0">
            <Cpu className="w-3.5 h-3.5 animate-spin [animation-duration:4s] shrink-0" />
            <span className="font-bold tracking-wider truncate text-[11px] sm:text-xs">
              ENGINEERING_ORCHESTRATOR
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-[10px] sm:text-[11px] shrink-0">
            <span>{activeAgentsCount} NODES</span>
            <span className="font-bold text-white text-xs sm:text-sm">{progress}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2.5 sm:mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#B44CFF] via-[#818CF8] to-[#00F0FF] transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Current Section & Description */}
        <div className="space-y-0.5 sm:space-y-1">
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-white font-semibold truncate">
            <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#38BDF8] shrink-0" />
            <span className="truncate uppercase">{currentSection.title}</span>
          </div>
          <p className="font-mono text-[9px] sm:text-[10px] text-[#92939F] truncate pl-4 sm:pl-5">
            {currentSection.description}
          </p>
        </div>
      </div>
    </div>
  );
};
