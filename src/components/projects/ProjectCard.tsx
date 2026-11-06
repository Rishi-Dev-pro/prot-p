import React from 'react';
import { FlagshipProject } from '../../types/project';
import { Button } from '../common/Button';
import { ArrowUpRight, Check, Activity, Terminal } from 'lucide-react';
import { ProjectSchematic } from './ProjectSchematic';

interface ProjectCardProps {
  project: FlagshipProject;
  onInspect: (project: FlagshipProject) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onInspect,
  index,
}) => {
  return (
    <article
      id={`project-${project.id}`}
      data-build-target={`project-${project.number}`}
      data-build-status="unbuilt"
      className="group relative rounded-2xl border border-white/10 bg-[#101116]/80 hover:bg-[#101116] hover:border-white/20 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl"
    >
      {/* Top editorial bar */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-sm font-bold tracking-wider px-2.5 py-1 rounded border border-white/10 bg-white/5"
              style={{ color: project.accentColor }}
            >
              // {project.number}
            </span>
            <span className="font-mono text-xs uppercase text-[#92939F] tracking-widest">
              {project.category}
            </span>
          </div>

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: project.accentColor }}
            />
            <span className="text-[#F3F3F5] truncate max-w-[200px] sm:max-w-none">
              {project.status}
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F3F3F5] tracking-tight group-hover:text-white transition-colors flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-[#FF414D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </h3>
          <p className="font-mono text-xs text-[#FF414D] mt-1 tracking-wide">
            {project.subtitle}
          </p>
        </div>

        {/* Concept description */}
        <p className="font-sans text-sm sm:text-base text-[#92939F] leading-relaxed mb-5">
          {project.concept}
        </p>

        {/* Bespoke Interactive Project Architectural Schematic */}
        <div className="mb-6">
          <ProjectSchematic projectId={project.id} accentColor={project.accentColor} />
        </div>

        {/* Key Engineering Areas */}
        <div className="space-y-2 mb-6 bg-black/30 p-4 rounded-xl border border-white/5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">
            CORE IMPLEMENTATION FOCUS
          </span>
          {project.engineeringFocus.slice(0, 3).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs font-mono text-[#F3F3F5]"
            >
              <Check className="w-3.5 h-3.5 text-[#00FF88] shrink-0" />
              <span className="truncate">{item}</span>
            </div>
          ))}
          {project.engineeringFocus.length > 3 && (
            <div className="text-[10px] font-mono text-white/40 pt-1">
              +{project.engineeringFocus.length - 3} additional system specs documented
            </div>
          )}
        </div>

        {/* Highlighted empirical metrics if available */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg border border-white/10 bg-white/[0.02] flex flex-col"
              >
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-tighter">
                  {m.label}
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-white mt-0.5">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom area: Tech stack and Inspect action */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white/80"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="font-mono text-[10px] text-white/30 hidden sm:inline">
            ARCH_REF: {project.id.toUpperCase()}_v2026
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onInspect(project)}
            className="w-full sm:w-auto"
          >
            INSPECT FULL ARCHITECTURE
          </Button>
        </div>
      </div>

      {/* Decorative corner reticle */}
      <div className="absolute top-2 right-2 text-[8px] font-mono text-white/15 select-none pointer-events-none">
        [{index < 9 ? `0${index + 1}` : index + 1}/06]
      </div>
    </article>
  );
};

