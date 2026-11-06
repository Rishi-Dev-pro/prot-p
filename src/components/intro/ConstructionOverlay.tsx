import React from 'react';
import { SectionTimelineConfig } from '../../animations/construction/ConstructionConfig';

interface ConstructionOverlayProps {
  currentSection: SectionTimelineConfig;
  progress: number;
  activeAgentsCount: number;
}

export const ConstructionOverlay: React.FC<ConstructionOverlayProps> = ({
  currentSection,
  progress,
  activeAgentsCount,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {/* Dynamic Design Workspace Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 animate-pulse [animation-duration:8s]" />

      {/* Sweeping technical laser scanline */}
      <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent animate-laser-scan pointer-events-none" />

      {/* Viewport Boundary Caliper Markers (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-[#00F0FF]/50 flex items-center gap-1.5">
        <span>+ [0.00, 0.00]</span>
        <span className="text-white/20">|</span>
        <span>WORKSPACE_INIT</span>
      </div>

      <div className="absolute top-4 right-44 font-mono text-[9px] text-white/30 hidden md:flex items-center gap-2">
        <span>LAYER_STACK // ACTIVE</span>
        <span className="text-[#FF414D]">{currentSection.title}</span>
      </div>

      <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/30 hidden sm:flex items-center gap-2">
        <span>GRID: 12_COL_RESPONSIVE</span>
        <span className="text-white/20">•</span>
        <span>AGENTS: {activeAgentsCount} UNITS ALLOCATED</span>
      </div>
    </div>
  );
};
