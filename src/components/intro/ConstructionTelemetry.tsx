import React from 'react';
import { FastForward } from 'lucide-react';

interface ConstructionTelemetryProps {
  progress: number;
  speed: number;
  onToggleSpeed: () => void;
  onSkip: () => void;
}

export const ConstructionTelemetry: React.FC<ConstructionTelemetryProps> = ({
  speed,
  onToggleSpeed,
  onSkip,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Top Right: Minimal, Elegant Controls */}
      <div className="absolute top-4 sm:top-5 right-4 sm:right-6 pointer-events-auto flex items-center gap-2">
        <button
          onClick={onToggleSpeed}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#0C0D12]/80 hover:bg-white/10 hover:border-white/20 text-[#F3F3F5] font-mono text-[11px] tracking-wider transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-md"
          title="Toggle playback speed (Key: F)"
        >
          <FastForward className="w-3 h-3 text-[#38BDF8]" />
          <span>{speed}X</span>
        </button>

        <button
          onClick={onSkip}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0C0D12]/80 hover:bg-white/15 hover:border-white/25 text-[#F3F3F5] font-mono text-[11px] tracking-wider transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-md group"
          title="Skip intro (Key: ESC or Space)"
        >
          <span>SKIP</span>
          <span className="text-[9px] text-white/40 group-hover:text-white/70 hidden sm:inline border-l border-white/15 pl-1.5">
            ESC
          </span>
        </button>
      </div>
    </div>
  );
};
