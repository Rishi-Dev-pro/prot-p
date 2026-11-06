import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { Principles } from './Principles';
import { EngineeringTimeline } from '../timeline/EngineeringTimeline';
import { GraduationCap, MapPin, Compass, Terminal, Briefcase } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-build-target="about-heading" data-build-status="unbuilt">
          <SectionHeading
            number="01"
            category="PHILOSOPHY & FOUNDATIONS"
            title="BEYOND WRITING"
            titleAccent="CODE."
            subtitle="Understanding the architectural mechanics beneath modern software, contextual interfaces, and intelligent systems."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Biography & Engineering Stance */}
          <div
            data-build-target="about-bio"
            data-build-status="unbuilt"
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#101116]/80 backdrop-blur-md relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[#FF414D]">
                <Terminal className="w-4 h-4" />
                <span>RKS // CORE_THESIS</span>
              </div>

              <blockquote className="text-[#F3F3F5] text-base sm:text-lg leading-relaxed font-sans mb-5 font-medium">
                “Understanding systems from the ground up — from component lifecycles and backend architectures to computer vision models and intelligent interfaces.”
              </blockquote>

              <p className="text-[#92939F] text-sm leading-relaxed font-sans mb-4">
                Full-stack builder with hands-on experience across the MERN stack, Python, and AI. Focused on deterministic code, empirical testing, and clean software engineering.
              </p>

              {/* Verified academic & personal profile tags */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono text-[#F3F3F5]">
                  <GraduationCap className="w-4 h-4 text-[#34D399] shrink-0" />
                  <span>BCA (MAWT) — Brainware University (CGPA: 9.60)</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#00F0FF]">
                  <Briefcase className="w-4 h-4 text-[#00F0FF] shrink-0" />
                  <span>Gameonix — 2× 6-Month Internships (Backend & Marketing)</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#92939F]">
                  <MapPin className="w-4 h-4 text-[#B44CFF] shrink-0" />
                  <span>Based in India // Open to Global Engineering Initiatives</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#92939F]">
                  <Compass className="w-4 h-4 text-[#FF414D] shrink-0" />
                  <span>Core Focus: MERN Stack, Python, AI, ML, Computer Vision</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Principles */}
          <div className="lg:col-span-7">
            <div
              data-build-target="about-principles-heading"
              data-build-status="unbuilt"
              className="flex items-center justify-between mb-6"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                CORE ARCHITECTURAL AXIOMS
              </span>
              <span className="font-mono text-[11px] text-[#FF414D]">
                4 OF 4 LOADED
              </span>
            </div>

            <Principles />
          </div>
        </div>

        {/* Engineering Chronology & Progression Timeline */}
        <EngineeringTimeline />
      </div>
    </section>
  );
};
