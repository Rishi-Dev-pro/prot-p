import React from 'react';
import { Layers, TestTube2, Wrench, Sparkles } from 'lucide-react';

export const Principles: React.FC = () => {
  const principles = [
    {
      number: '01',
      title: 'SYSTEM THINKING',
      description: 'Understanding how individual components form larger systems. Inspecting the interplay between UI, event loops, persistent schemas, and background tasks.',
      icon: Layers,
      accent: '#FF414D',
    },
    {
      number: '02',
      title: 'EXPERIMENTATION',
      description: 'Testing ideas through prototypes and practical implementation. Hypothesizing, measuring edge cases, and discarding assumptions that fail empirical tests.',
      icon: TestTube2,
      accent: '#B44CFF',
    },
    {
      number: '03',
      title: 'ENGINEERING',
      description: 'Building functional, maintainable, and scalable applications. Clean separation of concerns, explicit error boundaries, and defensive architecture.',
      icon: Wrench,
      accent: '#00F0FF',
    },
    {
      number: '04',
      title: 'CONTINUOUS LEARNING',
      description: 'Exploring emerging technologies through hands-on work. Staying ahead by dissecting new models, edge runtimes, and next-gen human-computer paradigms.',
      icon: Sparkles,
      accent: '#34D399',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {principles.map((p) => {
        const IconComponent = p.icon;
        return (
          <div
            key={p.number}
            className="group relative p-6 rounded-xl border border-white/10 bg-[#101116]/60 hover:bg-[#101116] hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-white/40 group-hover:text-[#FF414D] transition-colors">
                  // {p.number}
                </span>
                <div
                  className="p-2 rounded-lg border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: p.accent }}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#F3F3F5] mb-2 tracking-wide">
                {p.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#92939F] leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30">
              <span>PRINCIPLE_RULE</span>
              <span className="group-hover:text-white transition-colors">ACTIVE</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

