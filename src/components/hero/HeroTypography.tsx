import React from 'react';

export const HeroTypography: React.FC = () => {
  return (
    <div className="relative select-none" id="hero-title">
      {/* Top Editorial Metadata Tag */}
      <div
        data-build-target="hero-tag"
        data-build-status="unbuilt"
        className="flex items-center gap-2 mb-5 font-mono text-xs text-[#FF414D] tracking-widest uppercase font-semibold"
      >
        <span className="w-2 h-2 bg-[#FF414D] rounded-full shadow-[0_0_8px_#FF414D]" />
        <span>RISHI KUMAR SHAW // SYSTEMS & AI ARCHITECTURE</span>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        {/* Line 1: ENGINEERING */}
        <div
          data-build-target="hero-line-1"
          data-build-status="unbuilt"
          className="overflow-hidden"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight uppercase text-[#F3F3F5] leading-[0.9]">
            <span>ENGINEERING</span>
          </h1>
        </div>

        {/* Line 2: THE (Refined High-Contrast Editorial Styling) */}
        <div
          data-build-target="hero-line-2"
          data-build-status="unbuilt"
          className="overflow-hidden flex items-baseline gap-4"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-light tracking-tight uppercase text-white/40 hover:text-white/70 leading-[0.9] transition-colors duration-300">
            THE
          </h1>
          <div className="hidden sm:block h-[1px] flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
        </div>

        {/* Line 3: UNEXPECTED. */}
        <div
          data-build-target="hero-line-3"
          data-build-status="unbuilt"
          className="overflow-hidden"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight uppercase text-[#F3F3F5] leading-[0.9] flex items-baseline gap-2">
            <span>UNEXPECTED</span>
            <span className="text-[#FF414D] text-4xl sm:text-6xl md:text-8xl lg:text-9xl">.</span>
          </h1>
        </div>
      </div>
    </div>
  );
};
