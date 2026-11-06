import React, { useState, useEffect } from 'react';
import { AgentCursor } from './AgentCursor';
import { FreestyleAgentState } from '../../animations/construction/FreestyleAgentEngine';

interface AgentCursorLayerProps {
  agents?: FreestyleAgentState[];
  visible: boolean;
}

export const AgentCursorLayer: React.FC<AgentCursorLayerProps> = ({
  agents: propAgents,
  visible,
}) => {
  const [internalAgents, setInternalAgents] = useState<FreestyleAgentState[]>([]);

  useEffect(() => {
    const handleAgentsUpdate = (e: Event) => {
      const custom = e as CustomEvent<FreestyleAgentState[]>;
      if (custom.detail) {
        setInternalAgents(custom.detail);
      }
    };

    window.addEventListener('orchestrator:agents', handleAgentsUpdate);
    return () => {
      window.removeEventListener('orchestrator:agents', handleAgentsUpdate);
    };
  }, []);

  if (!visible) return null;

  const agents = propAgents && propAgents.length > 0 ? propAgents : internalAgents;

  // Find collaborating pairs of working agents within 320px of each other
  const activeWorking = agents.filter((a) => a.isWorking);
  const collaborationBeams: { a1: FreestyleAgentState; a2: FreestyleAgentState }[] = [];

  for (let i = 0; i < activeWorking.length; i++) {
    for (let j = i + 1; j < activeWorking.length; j++) {
      const a1 = activeWorking[i];
      const a2 = activeWorking[j];
      const dx = a1.x - a2.x;
      const dy = a1.y - a2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 340) {
        collaborationBeams.push({ a1, a2 });
      }
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* SVG Canvas for inter-agent laser guidelines and alignment coordinates */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {collaborationBeams.map(({ a1, a2 }, idx) => (
          <g key={`beam-${idx}`}>
            <line
              x1={Math.round(a1.x)}
              y1={Math.round(a1.y)}
              x2={Math.round(a2.x)}
              y2={Math.round(a2.y)}
              stroke={a1.color}
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.35"
            />
            {/* Midpoint alignment reticle */}
            <circle
              cx={Math.round((a1.x + a2.x) / 2)}
              cy={Math.round((a1.y + a2.y) / 2)}
              r="2.5"
              fill={a2.color}
              opacity="0.6"
            />
          </g>
        ))}
      </svg>

      {/* Render Individual Freestyle Cursors */}
      {agents.map((agent) => (
        <AgentCursor
          key={agent.id}
          id={agent.id}
          name={agent.name}
          color={agent.color}
          x={agent.x}
          y={agent.y}
          angle={agent.angle}
          isWorking={agent.isWorking}
          activity={agent.activity}
          trail={agent.trail}
        />
      ))}
    </div>
  );
};
