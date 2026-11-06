import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AgentCursor } from './AgentCursor';
import { SkipIntro } from './SkipIntro';
import { ConstructionOverlay } from './ConstructionOverlay';
import { AGENT_REGISTRY } from '../../data/agents';
import { CONSTRUCTION_PHASES, PhaseInfo } from '../../animations/constructionConfig';
import { ConstructionTimelineManager } from '../../animations/constructionTimeline';
import { CursorDisplayState } from './AgentCursorLayer';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useDeviceType } from '../../hooks/useMediaQuery';

interface IntroExperienceProps {
  onComplete: () => void;
  onStepChange?: (stepIndex: number) => void;
}

export const IntroExperience: React.FC<IntroExperienceProps> = ({
  onComplete,
  onStepChange,
}) => {
  const prefersReduced = useReducedMotion();
  const { isMobile } = useDeviceType();

  const [currentPhase, setCurrentPhase] = useState<PhaseInfo>(CONSTRUCTION_PHASES[0]);
  const [progress, setProgress] = useState(0);
  const [cursors, setCursors] = useState<CursorDisplayState[]>([]);
  const [isDone, setIsDone] = useState(false);

  const managerRef = useRef<ConstructionTimelineManager | null>(null);

  // Active agents pool (curated on mobile, full 20 on desktop)
  const activeAgents = useRef(
    isMobile
      ? AGENT_REGISTRY.filter((_, idx) => [0, 1, 2, 3, 7, 8, 19].includes(idx))
      : AGENT_REGISTRY
  ).current;

  const handleSkip = useCallback(() => {
    if (managerRef.current) {
      managerRef.current.skip();
    }
    setIsDone(true);
    onStepChange?.(10);
    onComplete();
  }, [onComplete, onStepChange]);

  useEffect(() => {
    if (prefersReduced) {
      handleSkip();
      return;
    }

    const manager = new ConstructionTimelineManager(activeAgents, {
      onPhaseChange: (phase) => {
        setCurrentPhase(phase);
        onStepChange?.(phase.phase);
      },
      onProgress: (pct) => {
        setProgress(pct);
      },
      onCursorsUpdate: (updatedCursors) => {
        setCursors(updatedCursors);
      },
      onComplete: () => {
        setIsDone(true);
        onStepChange?.(10);
        onComplete();
      },
    });

    managerRef.current = manager;
    manager.start();

    return () => {
      manager.destroy();
    };
  }, [activeAgents, onComplete, onStepChange, prefersReduced, handleSkip]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Interactive Skip Button */}
      <div className="pointer-events-auto">
        <SkipIntro onSkip={handleSkip} />
      </div>

      {/* Blueprint Construction Overlay & HUD */}
      <ConstructionOverlay
        phase={currentPhase}
        progress={progress}
        activeAgentsCount={activeAgents.length}
      />

      {/* Physical Synchronized Agent Cursors positioned by getBoundingClientRect */}
      {cursors.map((c) => (
        <AgentCursor
          key={c.agent.id}
          agent={c.agent}
          x={c.x}
          y={c.y}
          xUnit="px"
          activity={c.activity}
          isClicking={c.isClicking}
        />
      ))}
    </div>
  );
};
