import React from 'react';
import { X, CheckCircle, Cpu, Layers } from 'lucide-react';
import { FlagshipProject } from '../../types/project';
import { Button } from '../common/Button';

interface ProjectDetailsProps {
  project: FlagshipProject | null;
  onClose: () => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#08090D]/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#101116] border border-white/15 rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-2xl shadow-black/80 flex flex-col justify-between">
        {/* Top Header */}
        <div>
          <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs px-2.5 py-0.5 rounded border border-white/10"
                  style={{ color: project.accentColor }}
                >
                  PROJECT_{project.number}
                </span>
                <span className="font-mono text-xs text-white/40 uppercase">
                  {project.category}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F3F3F5] tracking-tight">
                {project.title}
              </h3>
              <p className="font-sans text-sm text-[#92939F]">
                {project.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close project modal"
              className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Alert Banner */}
          <div className="p-3.5 rounded-lg border border-white/10 bg-white/5 mb-6 flex items-center justify-between">
            <span className="font-mono text-xs text-white/60">CURRENT_STATUS</span>
            <span
              className="font-mono text-xs font-semibold px-2 py-0.5 rounded"
              style={{
                color: project.accentColor,
                backgroundColor: `${project.accentColor}15`,
              }}
            >
              {project.status}
            </span>
          </div>

          {/* Architecture Concept */}
          <div className="space-y-4 mb-6">
            <h4 className="font-mono text-xs text-white/50 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#FF414D]" />
              SYSTEM_CONCEPT & VISION
            </h4>
            <p className="text-[#F3F3F5] text-sm sm:text-base leading-relaxed font-sans">
              {project.concept}
            </p>
            {project.visionOrGoals && (
              <p className="text-[#92939F] text-xs sm:text-sm leading-relaxed font-sans bg-black/40 p-3.5 rounded-lg border border-white/5">
                <strong className="text-white block font-mono text-xs mb-1">ENGINEERING VISION:</strong>
                {project.visionOrGoals}
              </p>
            )}
          </div>

          {/* Key Engineering Areas */}
          <div className="space-y-3 mb-6">
            <h4 className="font-mono text-xs text-white/50 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
              KEY ENGINEERING FOCUS
            </h4>
            <div className="space-y-2">
              {project.engineeringFocus.map((focus, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#92939F]"
                >
                  <CheckCircle
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: project.accentColor }}
                  />
                  <span>{focus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experimental / Verified Metrics (if present) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-6">
              <h4 className="font-mono text-xs text-white/50 uppercase tracking-widest mb-3">
                EMPIRICAL METRICS & VERIFICATION
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-white/10 bg-white/[0.02]"
                  >
                    <span className="block font-mono text-[10px] text-white/40 uppercase">
                      {m.label}
                    </span>
                    <span className="block font-mono text-sm font-bold text-white mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Tech Stack */}
          <div className="space-y-2 mb-6">
            <h4 className="font-mono text-xs text-white/50 uppercase tracking-widest">
              TECHNOLOGY MATRIX
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-white/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="font-mono text-[10px] text-white/30">
            SPEC_DIGEST // VERIFIED
          </span>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              CLOSE SPEC
            </Button>
            <Button
              href="#contact"
              variant="primary"
              size="sm"
              onClick={onClose}
            >
              DISCUSS ARCHITECTURE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
