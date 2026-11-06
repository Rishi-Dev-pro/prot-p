import React from 'react';

export const HeroTypography: React.FC = () => {
  return (
    <div className="relative select-none" id="hero-title">
      {/* Decorative technical line tag */}
      <div
        data-build-target="hero-tag"
        data-build-status="unbuilt"
        className="flex items-center gap-2 mb-4 font-mono text-xs text-[#FF414D] tracking-widest"
      >
        <span className="w-2 h-2 bg-[#FF414D] rounded-full glow-accent" />
        <span>RISHI KUMAR SHAW // ARCHITECTURE & SYSTEMS</span>
      </div>

      <div className="space-y-1 sm:space-y-2">
        <div
          data-build-target="hero-line-1"
          data-build-status="unbuilt"
          className="overflow-hidden"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold tracking-tight uppercase text-[#F3F3F5] leading-[0.9] flex items-baseline gap-4 flex-wrap">
            <span>ENGINEERING</span>
          </h1>
        </div>

        <div
          data-build-target="hero-line-2"
          data-build-status="unbuilt"
          className="overflow-hidden"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold tracking-tight uppercase text-outline leading-[0.9] hover:text-[#FF414D]/20 transition-all duration-300">
            THE
          </h1>
        </div>

        <div
          data-build-target="hero-line-3"
          data-build-status="unbuilt"
          className="overflow-hidden"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold tracking-tight uppercase text-[#F3F3F5] leading-[0.9] flex items-baseline gap-2">
            <span>UNEXPECTED</span>
            <span className="text-[#FF414D] text-3xl sm:text-5xl md:text-7xl lg:text-8xl">.</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

