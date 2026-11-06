import React from 'react';
import { ArchitectureDomain } from '../../types/architecture';
import { Sparkles, Layers, Terminal, ArrowRight } from 'lucide-react';

interface ArchitectureDetailsProps {
  selectedDomain: ArchitectureDomain;
}

export const ArchitectureDetails: React.FC<ArchitectureDetailsProps> = ({
  selectedDomain,
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101116]/80 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300">
      <div>
        {/* Domain metadata badge */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-[#FF414D]">
            <Terminal className="w-4 h-4" />
            <span>NODE_SPEC // {selectedDomain.number}</span>
          </div>
          <span
            className="font-mono text-xs px-2.5 py-0.5 rounded border border-white/10"
            style={{ color: selectedDomain.accentColor }}
          >
            {selectedDomain.shortLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F3F3F5] tracking-tight mb-3">
          {selectedDomain.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#92939F] leading-relaxed font-sans mb-6">
          {selectedDomain.description}
        </p>

        {/* Architectural Philosophy */}
        <div className="p-4 rounded-xl border border-white/10 bg-black/40 mb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-white/50 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF414D]" />
            <span>ARCHITECTURAL PRINCIPLE:</span>
          </div>
          <p className="font-mono text-xs sm:text-sm text-[#F3F3F5] leading-relaxed">
            “{selectedDomain.architecturalPhilosophy}”
          </p>
        </div>

        {/* Relevant Technologies */}
        <div className="mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-white/40 block mb-2.5">
            CORE DOMAIN STACK
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedDomain.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-3 py-1 rounded bg-white/5 border border-white/10 text-white/90"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Related Flagship Projects */}
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-white/40 block mb-2.5">
            CONVERGING PROJECTS
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedDomain.relatedProjects.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded border border-white/15 bg-white/[0.03] text-[#F3F3F5]"
              >
                <Layers className="w-3.5 h-3.5 text-[#FF414D]" />
                <span>{p}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer telemetry */}
      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
        <span>TOPOLOGY_STATUS: SYNCHRONIZED</span>
        <span className="text-[#00FF88]">ONLINE</span>
      </div>
    </div>
  );
};

