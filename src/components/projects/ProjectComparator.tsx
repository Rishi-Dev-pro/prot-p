import React, { useState } from 'react';
import { X, ArrowRightLeft, CheckCircle2, Cpu, Code2, Layers, AlertCircle } from 'lucide-react';
import { FLAGSHIP_PROJECTS } from '../../data/projects';
import { soundEffects } from '../../services/soundEffects';

interface ProjectComparatorProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectAId?: string;
  initialProjectBId?: string;
}

export const ProjectComparator: React.FC<ProjectComparatorProps> = ({
  isOpen,
  onClose,
  initialProjectAId = 'ahi',
  initialProjectBId = 'pirate-civ',
}) => {
  const [projectAId, setProjectAId] = useState(initialProjectAId);
  const [projectBId, setProjectBId] = useState(initialProjectBId);

  const projectA = FLAGSHIP_PROJECTS.find((p) => p.id === projectAId) || FLAGSHIP_PROJECTS[0];
  const projectB = FLAGSHIP_PROJECTS.find((p) => p.id === projectBId) || FLAGSHIP_PROJECTS[2];

  const handleSwap = () => {
    soundEffects.playClick();
    const temp = projectAId;
    setProjectAId(projectBId);
    setProjectBId(temp);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl border border-white/20 bg-[#0A0B10]/98 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#101116] select-none">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded border border-white/10 bg-white/5 text-[#00F0FF]">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-display font-bold text-base text-white tracking-wider">
                PROJECT COMPARISON WORKBENCH
              </h2>
              <p className="font-mono text-[10px] text-white/50 tracking-tight">
                SIDE-BY-SIDE ARCHITECTURAL & TECHNOLOGY ANALYSIS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSwap}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-white/80 transition-colors cursor-pointer"
              title="Swap side positions"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>SWAP</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Project Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10 bg-[#08090D]/50 px-6 py-3">
          <div className="flex items-center gap-3 py-1 md:py-0 pr-4">
            <span className="font-mono text-xs font-bold text-[#FF414D]">PROJECT_ALPHA:</span>
            <select
              value={projectAId}
              onChange={(e) => {
                soundEffects.playClick();
                setProjectAId(e.target.value);
              }}
              className="bg-[#14151C] border border-white/15 rounded px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-[#FF414D] cursor-pointer"
            >
              {FLAGSHIP_PROJECTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.number}. {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 py-1 md:py-0 pl-0 md:pl-6">
            <span className="font-mono text-xs font-bold text-[#00F0FF]">PROJECT_BETA:</span>
            <select
              value={projectBId}
              onChange={(e) => {
                soundEffects.playClick();
                setProjectBId(e.target.value);
              }}
              className="bg-[#14151C] border border-white/15 rounded px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-[#00F0FF] cursor-pointer"
            >
              {FLAGSHIP_PROJECTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.number}. {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Columns */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Left Column: Project A */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2 py-0.5 rounded font-mono text-[10px] font-bold"
                  style={{ backgroundColor: `${projectA.accentColor}25`, color: projectA.accentColor }}
                >
                  {projectA.number} // {projectA.category}
                </span>
                <span className="font-mono text-[10px] text-white/50 uppercase">
                  {projectA.status}
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white tracking-wide">
                {projectA.title}
              </h3>
              <p className="font-mono text-xs text-white/70 mt-1">
                {projectA.subtitle}
              </p>
            </div>

            {/* Architectural Concept */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#101116]/80 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-white/90">
                <Cpu className="w-3.5 h-3.5 text-[#FF414D]" />
                <span>ARCHITECTURAL CONCEPT</span>
              </div>
              <p className="font-sans text-xs text-white/80 leading-relaxed">
                {projectA.concept}
              </p>
              <p className="font-sans text-xs text-white/60 leading-relaxed italic border-t border-white/5 pt-2">
                {projectA.visionOrGoals}
              </p>
            </div>

            {/* Engineering Highlights */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-white/90 tracking-wider">
                ENGINEERING HIGHLIGHTS
              </span>
              <ul className="space-y-1.5">
                {projectA.engineeringFocus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-white/75 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics if available */}
            {projectA.metrics && projectA.metrics.length > 0 && (
              <div className="p-3 rounded-lg border border-white/10 bg-[#12131A] space-y-2">
                <span className="font-mono text-[10px] font-bold text-white/60 uppercase">
                  VERIFIED METRICS
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {projectA.metrics.map((m, idx) => (
                    <div key={idx} className="p-2 rounded bg-white/5 border border-white/5">
                      <div className="font-mono text-[9px] text-white/40">{m.label}</div>
                      <div className="font-mono text-xs font-bold text-[#00FF88]">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-white/90 tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>TECH STACK TAXONOMY</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {projectA.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Project B */}
          <div className="space-y-6 pt-6 md:pt-0 pl-0 md:pl-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2 py-0.5 rounded font-mono text-[10px] font-bold"
                  style={{ backgroundColor: `${projectB.accentColor}25`, color: projectB.accentColor }}
                >
                  {projectB.number} // {projectB.category}
                </span>
                <span className="font-mono text-[10px] text-white/50 uppercase">
                  {projectB.status}
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white tracking-wide">
                {projectB.title}
              </h3>
              <p className="font-mono text-xs text-white/70 mt-1">
                {projectB.subtitle}
              </p>
            </div>

            {/* Architectural Concept */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#101116]/80 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-white/90">
                <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>ARCHITECTURAL CONCEPT</span>
              </div>
              <p className="font-sans text-xs text-white/80 leading-relaxed">
                {projectB.concept}
              </p>
              <p className="font-sans text-xs text-white/60 leading-relaxed italic border-t border-white/5 pt-2">
                {projectB.visionOrGoals}
              </p>
            </div>

            {/* Engineering Highlights */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-white/90 tracking-wider">
                ENGINEERING HIGHLIGHTS
              </span>
              <ul className="space-y-1.5">
                {projectB.engineeringFocus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-white/75 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics if available */}
            {projectB.metrics && projectB.metrics.length > 0 && (
              <div className="p-3 rounded-lg border border-white/10 bg-[#12131A] space-y-2">
                <span className="font-mono text-[10px] font-bold text-white/60 uppercase">
                  VERIFIED METRICS
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {projectB.metrics.map((m, idx) => (
                    <div key={idx} className="p-2 rounded bg-white/5 border border-white/5">
                      <div className="font-mono text-[9px] text-white/40">{m.label}</div>
                      <div className="font-mono text-xs font-bold text-[#00FF88]">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-white/90 tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>TECH STACK TAXONOMY</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {projectB.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
