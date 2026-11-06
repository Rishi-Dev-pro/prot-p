import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AgentCursorLayer } from './AgentCursorLayer';
import { ConstructionOverlay } from './ConstructionOverlay';
import { ConstructionTelemetry } from './ConstructionTelemetry';
import { CentralCore } from './CentralCore';
import { AGENT_REGISTRY, MOBILE_AGENT_REGISTRY } from '../../data/agents';
import { SECTION_TIMELINES, SectionTimelineConfig } from '../../animations/construction/ConstructionConfig';
import {
  AgentOrchestrator,
  OrchestratorStage,
} from '../../animations/orchestration/AgentOrchestrator';
import { FreestyleAgentState } from '../../animations/construction/FreestyleAgentEngine';
import { RadialParticle } from '../../animations/orchestration/RadialDeployment';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useDeviceType } from '../../hooks/useMediaQuery';

interface IntroExperienceProps {
  onComplete: () => void;
}

export const IntroExperience: React.FC<IntroExperienceProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const { isMobile } = useDeviceType();

  const [stage, setStage] = useState<OrchestratorStage>('BOOTING');
  const [bootMessage, setBootMessage] = useState<string>('INITIALIZING CREATIVE ENVIRONMENT');
  const [syncTelemetry, setSyncTelemetry] = useState<string>('');
  const [bannerNotification, setBannerNotification] = useState<string>('');
  const [burstParticles, setBurstParticles] = useState<RadialParticle[]>([]);
  const [currentSection, setCurrentSection] = useState<SectionTimelineConfig>(SECTION_TIMELINES[0]);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [agents, setAgents] = useState<FreestyleAgentState[]>([]);
  const [isDone, setIsDone] = useState(false);

  const orchestratorRef = useRef<AgentOrchestrator | null>(null);

  // 7 curated active agents on desktop, 4 on mobile
  const activeAgents = useRef(isMobile ? MOBILE_AGENT_REGISTRY : AGENT_REGISTRY).current;

  const handleSkip = useCallback(() => {
    if (orchestratorRef.current) {
      orchestratorRef.current.skip();
    }
    setIsDone(true);
    onComplete();
  }, [onComplete]);

  const handleToggleSpeed = useCallback(() => {
    if (orchestratorRef.current) {
      const nextSpeed = speed === 1 ? 2 : speed === 2 ? 4 : 1;
      orchestratorRef.current.setSpeed(nextSpeed);
      setSpeed(nextSpeed);
    }
  }, [speed]);

  useEffect(() => {
    if (prefersReduced) {
      handleSkip();
      return;
    }

    const orchestrator = new AgentOrchestrator(activeAgents, {
      onStageChange: (newStage) => {
        setStage(newStage);
      },
      onBootMessage: (msg) => {
        setBootMessage(msg);
      },
      onSyncTelemetry: (telemetry) => {
        setSyncTelemetry(telemetry);
      },
      onBannerNotification: (banner) => {
        setBannerNotification(banner);
        window.setTimeout(() => {
          setBannerNotification('');
        }, 3200);
      },
      onOverallProgress: (pct) => {
        setProgress(pct);
      },
      onAgentsUpdate: (updatedAgents) => {
        setAgents(updatedAgents);
      },
      onParticlesUpdate: (particles) => {
        setBurstParticles(particles);
      },
      onComplete: () => {
        setIsDone(true);
        onComplete();
      },
    });

    orchestratorRef.current = orchestrator;
    if (typeof window !== 'undefined') {
      (window as unknown as { __orchestrator?: typeof orchestrator }).__orchestrator = orchestrator;
    }
    orchestrator.init();
    orchestrator.play();

    // Keyboard shortcuts: ESC/Space to skip, F to fast-forward
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        handleSkip();
      } else if (e.key === 'f' || e.key === 'F') {
        handleToggleSpeed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      orchestrator.destroy();
    };
  }, [activeAgents, onComplete, prefersReduced, handleSkip, handleToggleSpeed]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">
      {/* Stage 0-4 Canvas Backdrop: Symmetrical, deep blueprint canvas with subtle radial illumination */}
      {(stage === 'BOOTING' ||
        stage === 'CANVAS_INITIALIZED' ||
        stage === 'AGENTS_ENTERING' ||
        stage === 'FORMATION_ACTIVE' ||
        stage === 'DEPLOYMENT_ACTIVE') && (
        <div className="absolute inset-0 bg-[#06070A] z-20 pointer-events-auto transition-opacity duration-700">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(to right, #B44CFF 1px, transparent 1px), linear-gradient(to bottom, #B44CFF 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />
          {/* Radial center illumination vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle 420px at 50% 50%, rgba(180, 76, 255, 0.08) 0%, rgba(56, 189, 248, 0.03) 45%, transparent 75%)',
            }}
          />
          {/* Subtle concentric orbit watermark rings */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <circle
              cx="50%"
              cy="50%"
              r="290"
              stroke="#B44CFF"
              strokeWidth="0.75"
              strokeDasharray="4 8"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="140"
              stroke="#38BDF8"
              strokeWidth="0.5"
              strokeDasharray="2 6"
              fill="none"
            />
          </svg>
        </div>
      )}

      {/* Central Symmetrical Geometric Core */}
      <CentralCore
        stage={stage}
        activeAgentsCount={activeAgents.length}
        bootMessage={bootMessage}
        syncTelemetry={syncTelemetry}
        burstParticles={burstParticles}
      />

      {/* Floating Section Completion Banner Notification */}
      {bannerNotification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#B44CFF]/40 bg-[#08090D]/95 backdrop-blur-xl shadow-[0_0_25px_rgba(180,76,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="font-mono text-[10px] font-bold text-white tracking-widest uppercase">
              {bannerNotification}
            </span>
          </div>
        </div>
      )}

      {/* Design Workspace Blueprint Overlay (Active Construction) */}
      {(stage === 'CONSTRUCTION_ACTIVE' || stage === 'SECTION_TRANSITION') && (
        <ConstructionOverlay />
      )}

      {/* Floating Speed/Skip Controls */}
      <ConstructionTelemetry
        progress={progress}
        speed={speed}
        onToggleSpeed={handleToggleSpeed}
        onSkip={handleSkip}
      />

      {/* 7-Agent Precision Cursor Layer */}
      <AgentCursorLayer
        agents={agents}
        visible={stage !== 'BOOTING' && stage !== 'CANVAS_INITIALIZED' && !isDone}
      />
    </div>
  );
};
