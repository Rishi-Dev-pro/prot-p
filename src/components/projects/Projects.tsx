import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { ProjectCard } from './ProjectCard';
import { ProjectDetails } from './ProjectDetails';
import { FLAGSHIP_PROJECTS } from '../../data/projects';
import { FlagshipProject } from '../../types/project';
import { Terminal, ShieldCheck } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<FlagshipProject | null>(null);

  return (
    <section id="projects" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-build-target="projects-heading" data-build-status="unbuilt">
          <SectionHeading
            number="02"
            category="FLAGSHIP INITIATIVES"
            title="SELECTED"
            titleAccent="WORKS."
            subtitle="System architectures, intelligent environments, computer vision models, and full-stack marketplaces engineered with rigorous specifications."
          />

          {/* Technical verification note */}
          <div className="mb-8 p-3.5 rounded-lg border border-white/10 bg-[#101116]/60 backdrop-blur-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#92939F]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00FF88]" />
              <span>EMPIRICAL METRICS RECORDED // NO FABRICATED ENTERPRISE BENCHMARKS</span>
            </div>
            <span className="text-white/40">
              6 FLAGSHIP SPECIFICATIONS COMPILED
            </span>
          </div>
        </div>

        {/* Editorial Project Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {FLAGSHIP_PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              onInspect={(p) => setSelectedProject(p)}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Deep Architecture Details Modal */}
      <ProjectDetails
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

