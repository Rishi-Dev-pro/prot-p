import React from 'react';
import { HeroTypography } from './HeroTypography';
import { HeroMetadata } from './HeroMetadata';
import { Button } from '../common/Button';
import { ArrowDown, Terminal, Cpu } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { SOCIAL_LINKS } from '../../data/navigation';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Top Section Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        {/* Left Column: Headlines & Intro */}
        <div className="lg:col-span-8 flex flex-col">
          <HeroTypography />

          {/* Positioning statement */}
          <div
            data-build-target="hero-subhead"
            data-build-status="unbuilt"
            className="mt-8 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#FF414D]" />
            <p className="font-mono text-sm sm:text-base font-semibold text-[#FF414D] tracking-wide uppercase">
              Full-Stack Developer | AI Systems Builder | Experimental Engineer
            </p>
          </div>

          {/* Short introduction narrative */}
          <p
            data-build-target="hero-bio"
            data-build-status="unbuilt"
            className="mt-5 text-[#92939F] text-base sm:text-lg leading-relaxed max-w-2xl font-sans"
          >
            I'm <strong className="text-[#F3F3F5] font-semibold">Rishi Kumar Shaw</strong> — a developer exploring the intersection of software engineering, artificial intelligence, computer vision, and intelligent systems. I build ideas into working software, experiment with unconventional interfaces, and enjoy understanding how complex systems work.
          </p>

          {/* Action CTAs */}
          <div
            data-build-target="hero-actions"
            data-build-status="unbuilt"
            className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Button href="#projects" variant="primary" size="md" icon techCode="02">
              VIEW PROJECTS
            </Button>
            <Button href="#about" variant="secondary" size="md" techCode="01">
              EXPLORE ABOUT
            </Button>
            <Button
              href={SOCIAL_LINKS.github}
              external
              variant="outline"
              size="md"
              techCode="GIT"
            >
              <GithubIcon className="w-3.5 h-3.5 mr-2" />
              GITHUB
            </Button>
            <Button href="#contact" variant="ghost" size="md">
              CONTACT
            </Button>
          </div>
        </div>

        {/* Right Column: Abstract Geometric Identity Avatar & System Node Visualizer */}
        <div
          data-build-target="hero-avatar"
          data-build-status="unbuilt"
          className="lg:col-span-4 flex flex-col items-center justify-center"
        >
          <div className="w-full max-w-sm border border-white/10 bg-[#101116]/80 backdrop-blur-md rounded-xl p-6 relative group overflow-hidden shadow-2xl shadow-black/80">
            {/* Top header badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF414D] rounded-full glow-accent" />
                <span className="font-mono text-[11px] text-white/70">IDENTITY_SPEC</span>
              </div>
              <span className="font-mono text-[10px] text-white/30">CANVAS_2026</span>
            </div>

            {/* Geometric SVG Matrix */}
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center my-2">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 border border-dashed border-white/15 rounded-full animate-spin [animation-duration:35s]" />
              
              {/* Inner accent ring */}
              <div className="absolute inset-4 border border-[#FF414D]/30 rounded-full animate-spin [animation-duration:20s] [animation-direction:reverse]" />

              {/* Central Geometric Glyph representing RKS */}
              <svg viewBox="0 0 120 120" className="w-28 h-28 relative z-10" fill="none">
                {/* Background polygon */}
                <polygon
                  points="60,10 105,35 105,85 60,110 15,85 15,35"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.5"
                  fill="rgba(16,17,22,0.6)"
                />
                {/* Secondary accent polygon */}
                <polygon
                  points="60,25 90,42 90,78 60,95 30,78 30,42"
                  stroke="#FF414D"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                {/* Central Core Nodes */}
                <circle cx="60" cy="60" r="14" fill="#101116" stroke="#B44CFF" strokeWidth="2" />
                <circle cx="60" cy="60" r="5" fill="#FF414D" className="animate-pulse" />
                
                {/* Cross vectors */}
                <line x1="60" y1="10" x2="60" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="15" y1="60" x2="105" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                
                {/* Perimeter satellites */}
                <circle cx="60" cy="10" r="3" fill="#B44CFF" />
                <circle cx="105" cy="35" r="3" fill="#00F0FF" />
                <circle cx="105" cy="85" r="3" fill="#FF414D" />
                <circle cx="60" cy="110" r="3" fill="#34D399" />
                <circle cx="15" cy="85" r="3" fill="#F59E0B" />
                <circle cx="15" cy="35" r="3" fill="#EC4899" />
              </svg>
            </div>

            {/* Spec details below avatar */}
            <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-white/40">ENGINEERING_PROFILE</span>
                <span className="text-[#FF414D]">VERIFIED_CORE</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-white/40">METHODOLOGY</span>
                <span className="text-white/80">PROTOTYPE & BUILD</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-white/40">AGENT_ECOSYSTEM</span>
                <span className="text-[#00F0FF]">20 UNITS SIMULATED</span>
              </div>
            </div>

            {/* Decorative corner markers */}
            <div className="absolute top-2 left-2 text-[8px] font-mono text-white/20">+</div>
            <div className="absolute top-2 right-2 text-[8px] font-mono text-white/20">+</div>
            <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/20">+</div>
            <div className="absolute bottom-2 right-2 text-[8px] font-mono text-white/20">+</div>
          </div>
        </div>
      </div>

      {/* Hero Metadata Bar */}
      <div
        data-build-target="hero-meta"
        data-build-status="unbuilt"
        className="relative z-10"
      >
        <HeroMetadata />

        {/* Scroll down indicator */}
        <div className="flex items-center justify-between text-xs font-mono text-[#92939F] pt-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[#FF414D]" />
            <span>INITIALIZED WITH ZERO THIRD-PARTY RUNTIME APIS</span>
          </div>
          <a
            href="#about"
            className="flex items-center gap-1.5 hover:text-[#FF414D] transition-colors"
          >
            <span>SCROLL_TO_DISCOVER</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
