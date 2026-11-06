import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AgentCursor } from './AgentCursor';
import { ConstructionTelemetry } from './ConstructionTelemetry';
import { AGENT_REGISTRY } from '../../data/agents';
import { SECTION_TIMELINES, SectionTimelineConfig } from '../../animations/construction/ConstructionConfig';
import { ConstructionEngine } from '../../animations/construction/ConstructionEngine';
import { CursorDisplayState } from './AgentCursorLayer';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useDeviceType } from '../../hooks/useMediaQuery';

interface IntroExperienceProps {
  onComplete: () => void;
}

export const IntroExperience: React.FC<IntroExperienceProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const { isMobile } = useDeviceType();

  const [currentSection, setCurrentSection] = useState<SectionTimelineConfig>(SECTION_TIMELINES[0]);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [cursors, setCursors] = useState<CursorDisplayState[]>([]);
  const [isDone, setIsDone] = useState(false);

  const engineRef = useRef<ConstructionEngine | null>(null);

  // Curated agents on mobile for 60 FPS, full 20 on desktop/tablet
  const activeAgents = useRef(
    isMobile
      ? AGENT_REGISTRY.filter((_, idx) => [0, 1, 2, 3, 7, 8, 19].includes(idx))
      : AGENT_REGISTRY
  ).current;

  const handleSkip = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.skip();
    }
    setIsDone(true);
    onComplete();
  }, [onComplete]);

  const handleToggleSpeed = useCallback(() => {
    if (engineRef.current) {
      const nextSpeed = speed === 1 ? 2 : 1;
      engineRef.current.setSpeed(nextSpeed);
      setSpeed(nextSpeed);
    }
  }, [speed]);

  useEffect(() => {
    if (prefersReduced) {
      handleSkip();
      return;
    }

    const engine = new ConstructionEngine(activeAgents, {
      onSectionChange: (sec) => {
        setCurrentSection(sec);
      },
      onOverallProgress: (pct) => {
        setProgress(pct);
      },
      onCursorsUpdate: (updatedCursors) => {
        setCursors(updatedCursors);
      },
      onComplete: () => {
        setIsDone(true);
        onComplete();
      },
    });

    engineRef.current = engine;
    engine.init();
    engine.play();

    // Support keyboard shortcuts (ESC or Space to skip, F to fast-forward)
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
      engine.destroy();
    };
  }, [activeAgents, onComplete, prefersReduced, handleSkip, handleToggleSpeed]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">
      {/* HUD Telemetry and Speed/Skip Controls */}
      <ConstructionTelemetry
        currentSection={currentSection}
        progress={progress}
        activeAgentsCount={activeAgents.length}
        speed={speed}
        onToggleSpeed={handleToggleSpeed}
        onSkip={handleSkip}
      />

      {/* Synchronized Physical Agent Cursors */}
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
