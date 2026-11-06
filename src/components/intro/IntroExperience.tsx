import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AgentCursorLayer } from './AgentCursorLayer';
import { ConstructionOverlay } from './ConstructionOverlay';
import { ConstructionTelemetry } from './ConstructionTelemetry';
import { CentralCore } from './CentralCore';
import { AGENT_REGISTRY } from '../../data/agents';
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

  // Curated agents on mobile for 60 FPS, full 20 on desktop/tablet
  const activeAgents = useRef(
    isMobile
      ? AGENT_REGISTRY.filter((_, idx) => [0, 1, 2, 3, 7, 8, 19].includes(idx))
      : AGENT_REGISTRY
  ).current;

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
        }, 3000);
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
      {/* Stage 0-3 Canvas Backdrop: Dark, mysterious slate canvas with technical grid */}
      {(stage === 'BOOTING' ||
        stage === 'CANVAS_INITIALIZED' ||
        stage === 'AGENTS_ENTERING' ||
        stage === 'FORMATION_ACTIVE' ||
        stage === 'DEPLOYMENT_ACTIVE') && (
        <div className="absolute inset-0 bg-[#050608] z-20 pointer-events-auto transition-opacity duration-700">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      )}

      {/* Central Geometric Core for Booting, Arrival, Circular Orbit, and Radial Deployment */}
      <CentralCore
        stage={stage}
        bootMessage={bootMessage}
        syncTelemetry={syncTelemetry}
        burstParticles={burstParticles}
      />

      {/* Floating Section Completion Banner Notification */}
      {bannerNotification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#00FF88]/40 bg-[#08090D]/95 backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,136,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
            <span className="font-mono text-[11px] font-bold text-white tracking-widest uppercase">
              {bannerNotification}
            </span>
          </div>
        </div>
      )}

      {/* Design Workspace Blueprint Overlay (Active Construction) */}
      {(stage === 'CONSTRUCTION_ACTIVE' || stage === 'SECTION_TRANSITION') && (
        <ConstructionOverlay
          currentSection={currentSection}
          progress={progress}
          activeAgentsCount={activeAgents.length}
        />
      )}

      {/* Floating HUD Telemetry and Speed/Skip Controls */}
      <ConstructionTelemetry
        currentSection={currentSection}
        progress={progress}
        activeAgentsCount={activeAgents.length}
        speed={speed}
        onToggleSpeed={handleToggleSpeed}
        onSkip={handleSkip}
      />

      {/* Freestyle 20-Agent Cursor Layer with Dynamic Orbit & Bézier Movement */}
      <AgentCursorLayer
        agents={agents}
        visible={stage !== 'BOOTING' && stage !== 'CANVAS_INITIALIZED' && !isDone}
      />
    </div>
  );
};
