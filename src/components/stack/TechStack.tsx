import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { TechCategory } from './TechCategory';
import { TECH_CATEGORIES } from '../../data/technologies';
import { Layers } from 'lucide-react';

export const TechStack: React.FC = () => {
  return (
    <section id="stack" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04"
          category="TECHNICAL CAPABILITIES"
          title="TOOLS OF THE"
          titleAccent="TRADE."
          subtitle="A concrete, pragmatic toolchain selected for system resilience, reactive state handling, and intelligent computing across full-stack applications."
        />

        {/* Categories Grid */}
        <div
          data-build-target="tech-stack"
          data-build-status="unbuilt"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {TECH_CATEGORIES.map((category) => (
            <TechCategory key={category.code} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

