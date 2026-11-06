import React from 'react';
import { TechCategory as TechCategoryType } from '../../data/technologies';
import { Terminal } from 'lucide-react';

interface TechCategoryProps {
  category: TechCategoryType;
}

export const TechCategory: React.FC<TechCategoryProps> = ({ category }) => {
  return (
    <div
      data-build-target={`stack-${category.code.toLowerCase()}`}
      data-build-status="unbuilt"
      className="rounded-2xl border border-white/10 bg-[#101116]/80 backdrop-blur-md p-6 sm:p-7 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Category Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: category.accent }}
            />
            <h3 className="font-display font-bold text-lg text-[#F3F3F5] tracking-wide">
              {category.title}
            </h3>
          </div>
          <span
            className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border"
            style={{
              borderColor: `${category.accent}40`,
              backgroundColor: `${category.accent}12`,
              color: category.accent,
            }}
          >
            {category.badge || `// ${category.code}`}
          </span>
        </div>

        {/* Short context description */}
        <p className="font-sans text-xs sm:text-sm text-[#92939F] leading-relaxed mb-6">
          {category.description}
        </p>

        {/* Technical skills grid */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <div
              key={skill.name}
              className="group/pill inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/25 transition-all duration-200 cursor-default"
            >
              <span className="font-mono text-xs text-[#F3F3F5] font-medium group-hover/pill:text-white">
                {skill.name}
              </span>
              <span className="font-mono text-[9px] text-white/40 border-l border-white/10 pl-1.5 uppercase">
                {skill.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle bottom reticle */}
      <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30">
        <span>STATUS: ACTIVE_TOOLKIT</span>
        <span className="group-hover:text-white transition-colors">READY</span>
      </div>
    </div>
  );
};

