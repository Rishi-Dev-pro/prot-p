import React, { useState } from 'react';
import {
  GraduationCap,
  Cpu,
  Layers,
  Code2,
  Eye,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  category: 'academic' | 'flagship' | 'vision' | 'architecture';
  categoryLabel: string;
  institutionOrSystem: string;
  description: string;
  highlights: string[];
  statusBadge: string;
  accentColor: string;
}

export const ENGINEERING_MILESTONES: TimelineMilestone[] = [
  {
    id: 'brainware-bca',
    year: '2023 — Present',
    title: 'Bachelor of Computer Applications (MAWT)',
    category: 'academic',
    categoryLabel: 'ACADEMIC FOUNDATION',
    institutionOrSystem: 'Brainware University, India',
    description:
      'Rigorous foundational computing studies focusing on discrete mathematics, object-oriented systems, data structures, and computer network mechanics.',
    highlights: [
      'Core focus: Software Engineering, Database Systems, Network Architecture',
      'Hands-on system prototypes built in parallel with formal coursework',
      'Autonomous exploration of high-concurrency Node.js and Python ecosystems',
    ],
    statusBadge: 'ACTIVE DEGREE ENROLLMENT',
    accentColor: '#FF414D',
  },
  {
    id: 'ahi-prototype',
    year: '2024 — 2025',
    title: 'AHI: Adaptive Human Interface Prototype',
    category: 'flagship',
    categoryLabel: 'INTELLIGENT SYSTEMS',
    institutionOrSystem: 'Autonomous Desktop Exploration',
    description:
      'Engineered an experimental contextual intelligence agent designed to observe desktop interactions and construct structured relational knowledge without manual user telemetry.',
    highlights: [
      'Event loop observing user workflows and desktop activity streams',
      'SQLite-based persistent vector storage with low-latency indexing',
      'Cross-application event bus for proactive contextual anticipation',
    ],
    statusBadge: 'PROTOTYPE DEVELOPMENT',
    accentColor: '#FF414D',
  },
  {
    id: 'aether-os-foundation',
    year: '2025',
    title: 'Aether OS: Spatial Vision HUD',
    category: 'vision',
    categoryLabel: 'COMPUTER VISION',
    institutionOrSystem: 'Experimental Cognitive OS',
    description:
      'Designed an operating environment synthesizing real-time computer vision, user intent inference, and desktop task automation.',
    highlights: [
      'MediaPipe and OpenCV visual tracking pipeline with hand landmarking',
      'Intent engine decomposing natural-language prompt structures for LLMs',
      'Bi-directional telemetry synchronization via Socket.IO and Zustand',
    ],
    statusBadge: 'EXPERIMENTAL REPO ACTIVE',
    accentColor: '#B44CFF',
  },
  {
    id: 'pirate-civ-marketplace',
    year: '2025 — 2026',
    title: 'Pirate-Civ: 6-Island Marketplace Engine',
    category: 'architecture',
    categoryLabel: 'BACKEND ARCHITECTURE',
    institutionOrSystem: 'Decoupled Domain Engine',
    description:
      'Built a canonical two-sided commerce architecture with strict transactional boundaries across six thematic islands, validated through exhaustive automated test suites.',
    highlights: [
      '695 / 695 passing unit and integration tests across core commerce modules',
      'Completed implementations for Phases 3.1 through 3.6',
      'Persistent shopping cart engine with session-to-database state migration',
      'Granular RBAC permission foundation across buyers and sellers',
    ],
    statusBadge: 'PHASE 3.6 VERIFIED (695/695 TESTS)',
    accentColor: '#00F0FF',
  },
  {
    id: 'edge-ai-detector',
    year: '2025 — 2026',
    title: 'Edge AI: Road Surface Defect Detection',
    category: 'vision',
    categoryLabel: 'EDGE COMPUTING',
    institutionOrSystem: 'Computer Vision Benchmark',
    description:
      'Quantized and deployed a real-time YOLOv8n ONNX model pipeline dedicated to low-power edge detection of potholes and road distress.',
    highlights: [
      '28 FPS real-time inference on edge processing pipelines',
      'Custom bounding box calibration and road geometry segmentation',
      'Optimized ONNX Runtime graph execution for sub-40ms latency',
    ],
    statusBadge: 'INFERENCE VALIDATED',
    accentColor: '#00FF88',
  },
  {
    id: 'callbuddy-telephony',
    year: '2026',
    title: 'CallBuddy AI: Telephony Voice Copilot',
    category: 'flagship',
    categoryLabel: 'REAL-TIME AUDIO',
    institutionOrSystem: 'Conversational Network',
    description:
      'Architected a conversational assistant coordinating multi-person rooms, audio streams, and real-time speech-to-text transcriptions.',
    highlights: [
      'Low-latency audio streaming broker with WebSocket multiplexing',
      'Shared communication rooms with contextual memory',
      'Dynamic speaker diarization and automated meeting synthesis',
    ],
    statusBadge: 'ACTIVE EXPERIMENTAL',
    accentColor: '#FACC15',
  },
];

export const EngineeringTimeline: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('pirate-civ-marketplace');

  const filteredMilestones =
    activeCategory === 'all'
      ? ENGINEERING_MILESTONES
      : ENGINEERING_MILESTONES.filter((m) => m.category === activeCategory);

  const categories = [
    { id: 'all', label: 'ALL MILESTONES' },
    { id: 'academic', label: 'ACADEMIC' },
    { id: 'flagship', label: 'FLAGSHIP INITIATIVES' },
    { id: 'vision', label: 'COMPUTER VISION' },
    { id: 'architecture', label: 'ARCHITECTURE & TESTS' },
  ];

  return (
    <div
      data-build-target="engineering-timeline"
      data-build-status="unbuilt"
      className="mt-12 p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0C0D12]/90 backdrop-blur-xl relative overflow-hidden shadow-2xl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-[#00F0FF]">
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-bold tracking-wider">ENGINEERING CHRONOLOGY</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide">
            TECHNICAL PROGRESSION & VERIFIED MILESTONES
          </h3>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#14151C] p-1 rounded-lg border border-white/10">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                soundEffects.playClick();
                setActiveCategory(c.id);
              }}
              className={`px-2.5 py-1 rounded font-mono text-[10px] tracking-wider transition-colors cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-white/15 text-white font-bold border border-white/20'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Spine Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#FF414D] before:via-[#00F0FF] before:to-[#00FF88]">
        {filteredMilestones.map((milestone) => {
          const isExpanded = expandedId === milestone.id;

          return (
            <div
              key={milestone.id}
              className="relative group transition-all duration-300"
            >
              {/* Spine Node Dot */}
              <div
                className="absolute -left-[30px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-[#0C0D12] transition-transform duration-300 group-hover:scale-125"
                style={{
                  backgroundColor: milestone.accentColor,
                  boxShadow: `0 0 10px ${milestone.accentColor}`,
                }}
              />

              {/* Milestone Card */}
              <div
                onClick={() => {
                  soundEffects.playClick();
                  setExpandedId(isExpanded ? null : milestone.id);
                }}
                className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isExpanded
                    ? 'border-white/25 bg-[#14151C]/90 shadow-xl'
                    : 'border-white/10 bg-[#101116]/60 hover:border-white/20 hover:bg-[#14151C]/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2 py-0.5 rounded font-mono text-[9px] font-bold"
                      style={{
                        backgroundColor: `${milestone.accentColor}20`,
                        color: milestone.accentColor,
                      }}
                    >
                      {milestone.categoryLabel}
                    </span>
                    <span className="font-mono text-xs text-white/50">
                      {milestone.institutionOrSystem}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#00FF88] font-semibold">
                      {milestone.year}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 text-white/40 transition-transform duration-200 ${
                        isExpanded ? 'rotate-90 text-white' : ''
                      }`}
                    />
                  </div>
                </div>

                <h4 className="font-display font-bold text-base sm:text-lg text-white tracking-wide">
                  {milestone.title}
                </h4>

                <p className="font-sans text-xs text-white/70 mt-1.5 leading-relaxed">
                  {milestone.description}
                </p>

                {/* Expanded Verification Highlights */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-white/40 uppercase">
                        VERIFIED HIGHLIGHTS
                      </span>
                      <span
                        className="font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-white/10"
                        style={{ color: milestone.accentColor }}
                      >
                        {milestone.statusBadge}
                      </span>
                    </div>

                    <ul className="space-y-1.5">
                      {milestone.highlights.map((h, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 font-mono text-[11px] text-white/80"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: milestone.accentColor }}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
