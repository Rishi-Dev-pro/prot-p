import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { Brain, Sparkles, Eye, ArrowUpRight, Cpu } from 'lucide-react';

export const Experiments: React.FC = () => {
  const experiments = [
    {
      number: '01',
      title: 'INTELLIGENT OPERATING ENVIRONMENTS',
      focus: 'Contextual Ingestion & Ambient Desktop Assistants',
      description: 'Investigating how OS-level interfaces can passively structure human workflow context, reduce context-switching friction, and dynamically compose toolchains without active user prompting.',
      hypotheses: [
        'Persistent SQLite event log as universal semantic memory',
        'Lightweight vision models for non-intrusive activity clustering',
        'Zero-latency inter-process messaging protocols',
      ],
      icon: Brain,
      accent: '#FF414D',
    },
    {
      number: '02',
      title: 'AI-ASSISTED SOFTWARE WORKFLOWS',
      focus: 'Agentic Collaboration & Task Decomposition',
      description: 'Prototyping multi-stage reasoning frameworks where specialized synthetic agents audit, verify, and execute software modifications within constrained deterministic sandboxes.',
      hypotheses: [
        'Structured prompt builders minimizing hallucination surface',
        'Atomic phase-based execution and empirical checkpoints',
        'Human-in-the-loop validation barriers for critical writes',
      ],
      icon: Sparkles,
      accent: '#B44CFF',
    },
    {
      number: '03',
      title: 'COMPUTER VISION & EDGE INTELLIGENCE',
      focus: 'Real-time Edge Perception & Constrained Hardware',
      description: 'Deploying optimized neural networks (such as YOLOv8n) onto embedded microcontrollers (like Arduino UNO Q) to solve physical road safety and spatial tracking problems without internet dependency.',
      hypotheses: [
        'Sub-50ms inference on low-power edge microcontrollers',
        'Spatial depth approximation from monocular road telemetry',
        'Resilient offline operation in harsh environmental conditions',
      ],
      icon: Eye,
      accent: '#00F0FF',
    },
  ];

  return (
    <section id="experiments" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="05"
          category="R&D HORIZONS"
          title="CURRENTLY"
          titleAccent="EXPLORING."
          subtitle="Active experimental vectors, early prototypes, and architectural hypotheses being tested in the lab."
        />

        <div
          data-build-target="experiments"
          data-build-status="unbuilt"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {experiments.map((exp) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.number}
                className="group relative rounded-2xl border border-white/10 bg-[#101116]/80 backdrop-blur-md p-6 sm:p-7 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: exp.accent }}
                    >
                      EXP_{exp.number}
                    </span>
                    <div
                      className="p-2 rounded-lg border border-white/10 bg-white/5 group-hover:scale-110 transition-transform"
                      style={{ color: exp.accent }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Focus */}
                  <h3 className="font-display font-bold text-lg text-[#F3F3F5] mb-2 leading-snug group-hover:text-white">
                    {exp.title}
                  </h3>
                  <p className="font-mono text-xs text-[#FF414D] mb-4">
                    // {exp.focus}
                  </p>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#92939F] leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Hypotheses */}
                  <div className="space-y-2 bg-black/40 p-3.5 rounded-xl border border-white/5">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block">
                      TESTING HYPOTHESES:
                    </span>
                    {exp.hypotheses.map((h, i) => (
                      <div
                        key={i}
                        className="text-[11px] font-mono text-[#F3F3F5] flex items-start gap-2"
                      >
                        <span className="text-white/30">•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer status */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span>STAGE: ACTIVE_PROTOTYPING</span>
                  <span className="text-[#FF414D] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    LAB_SPEC <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

