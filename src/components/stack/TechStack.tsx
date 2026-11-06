import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { TechCategory } from './TechCategory';
import { TECH_CATEGORIES, FUTURE_EXPLORATIONS } from '../../data/technologies';
import { Compass, Sparkles } from 'lucide-react';

export const TechStack: React.FC = () => {
  return (
    <section id="stack" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-build-target="stack-heading" data-build-status="unbuilt">
          <SectionHeading
            number="04"
            category="TECHNICAL CAPABILITIES"
            title="TOOLS OF THE"
            titleAccent="TRADE."
            subtitle="A concrete, pragmatic toolchain selected for system resilience, reactive state handling, and intelligent computing across full-stack applications."
          />
        </div>

        {/* Categories Grid - Each Category Builds Individually */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mb-16">
          {TECH_CATEGORIES.map((category) => (
            <TechCategory key={category.code} category={category} />
          ))}
        </div>

        {/* Exploring Next: Future Learning Interests */}
        <div
          data-build-target="stack-exploring"
          data-build-status="unbuilt"
          className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0C0D12]/80 backdrop-blur-md relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-[#00F0FF]" />
              <h3 className="font-display font-bold text-lg text-white tracking-wide">
                EXPLORING NEXT // FUTURE LEARNING INTERESTS
              </h3>
            </div>
            <span className="font-mono text-[10px] text-white/40 tracking-wider uppercase">
              ACTIVE RESEARCH & CURIOSITY
            </span>
          </div>

          <p className="text-sm font-sans text-[#92939F] max-w-3xl mb-6 leading-relaxed">
            Technologies and advanced computing paradigms under active self-directed study and exploration — demonstrating curiosity and future direction rather than claimed commercial expertise.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FUTURE_EXPLORATIONS.map((item) => (
              <div
                key={item.domain}
                className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-mono text-[9px] font-semibold px-2 py-0.5 rounded border"
                      style={{
                        borderColor: `${item.accent}40`,
                        backgroundColor: `${item.accent}12`,
                        color: item.accent,
                      }}
                    >
                      {item.tag}
                    </span>
                    <Sparkles className="w-3.5 h-3.5" style={{ color: item.accent }} />
                  </div>
                  <h4 className="font-display font-semibold text-sm text-[#F3F3F5] mb-1.5">
                    {item.domain}
                  </h4>
                  <p className="font-sans text-xs text-[#92939F] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
