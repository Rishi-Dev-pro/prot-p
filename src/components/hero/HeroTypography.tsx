import React from 'react';

export const HeroTypography: React.FC = () => {
  return (
    <div className="relative select-none" id="hero-title">
      {/* Top Technical Metadata Tag */}
      <div
        data-build-target="hero-tag"
        data-build-status="unbuilt"
        className="flex items-center gap-2 mb-4 font-mono text-xs text-[#FF414D] tracking-widest"
      >
        <span className="w-2 h-2 bg-[#FF414D] rounded-full glow-accent animate-pulse" />
        <span>RISHI KUMAR SHAW // ARCHITECTURAL SYSTEMS & AI</span>
      </div>

      <div className="space-y-1 sm:space-y-2">
        {/* Line 1: ENGINEERING */}
        <div
          data-build-target="hero-line-1"
          data-build-status="unbuilt"
          className="overflow-hidden"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight uppercase text-[#F3F3F5] leading-[0.88] transition-transform duration-300 hover:translate-x-1">
            <span>ENGINEERING</span>
          </h1>
        </div>

        {/* Line 2: THE (Outlined Typography) */}
        <div
          data-build-target="hero-line-2"
          data-build-status="unbuilt"
          className="overflow-hidden flex items-baseline gap-4"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight uppercase text-outline leading-[0.88] hover:text-[#B44CFF]/20 hover:drop-shadow-[0_0_20px_rgba(180,76,255,0.4)] transition-all duration-300">
            THE
          </h1>
          <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-r from-[#FF414D]/40 via-[#B44CFF]/40 to-transparent" />
        </div>

        {/* Line 3: UNEXPECTED. */}
        <div
          data-build-target="hero-line-3"
          data-build-status="unbuilt"
          className="overflow-hidden"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight uppercase text-[#F3F3F5] leading-[0.88] flex items-baseline gap-2 transition-transform duration-300 hover:translate-x-1">
            <span>UNEXPECTED</span>
            <span className="text-[#FF414D] text-4xl sm:text-6xl md:text-8xl lg:text-9xl glow-accent">.</span>
          </h1>
        </div>
      </div>
    </div>
  );
};
