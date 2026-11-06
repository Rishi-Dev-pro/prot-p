import React from 'react';
import { AgentCursor } from './AgentCursor';
import { AgentCursorData } from '../../types/agent';

export interface CursorDisplayState {
  agent: AgentCursorData;
  x: number;
  y: number;
  activity: string;
  isClicking: boolean;
  codeSnippet?: string;
}

interface AgentCursorLayerProps {
  cursors: CursorDisplayState[];
  visible: boolean;
  activePhase?: number;
}

export const AgentCursorLayer: React.FC<AgentCursorLayerProps> = ({
  cursors,
  visible,
  activePhase = 0,
}) => {
  if (!visible) return null;

  // Find paired collaborating agents for visual laser connection lines
  const pairs: [CursorDisplayState, CursorDisplayState][] = [];
  if (cursors.length >= 4) {
    // Pair 01 and 02
    const c1 = cursors.find((c) => c.agent.id === 'AGENT_01');
    const c2 = cursors.find((c) => c.agent.id === 'AGENT_02');
    if (c1 && c2) pairs.push([c1, c2]);

    // Pair 03 and 04 (Motion & Typography)
    const c3 = cursors.find((c) => c.agent.id === 'AGENT_03');
    const c4 = cursors.find((c) => c.agent.id === 'AGENT_04');
    if (c3 && c4) pairs.push([c3, c4]);

    // Pair 06 and 09 (Layout & Projects)
    const c6 = cursors.find((c) => c.agent.id === 'AGENT_06');
    const c9 = cursors.find((c) => c.agent.id === 'AGENT_09');
    if (c6 && c9) pairs.push([c6, c9]);

    // Pair 14 and 17 (Neural & Hardware)
    const c14 = cursors.find((c) => c.agent.id === 'AGENT_14');
    const c17 = cursors.find((c) => c.agent.id === 'AGENT_17');
    if (c14 && c17) pairs.push([c14, c17]);
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* SVG Canvas for inter-agent alignment guidelines and selection bounding boxes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="laser-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Laser alignment lines between collaborating agents */}
        {pairs.map(([a1, a2], idx) => (
          <g key={`pair-${idx}`}>
            <line
              x1={`${a1.x}%`}
              y1={`${a1.y}%`}
              x2={`${a2.x}%`}
              y2={`${a2.y}%`}
              stroke={a1.agent.color}
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.35"
            />
            {/* Midpoint alignment dot */}
            <circle
              cx={`${(a1.x + a2.x) / 2}%`}
              cy={`${(a1.y + a2.y) / 2}%`}
              r="2"
              fill={a2.agent.color}
              opacity="0.6"
            />
          </g>
        ))}

        {/* Dynamic selection bounding boxes based on assembly phase */}
        {activePhase >= 4 && activePhase <= 7 && (
          <g className="animate-in fade-in duration-300">
            {/* Hero selection bounding box constructed by AGENT_04 */}
            <rect
              x="8%"
              y="20%"
              width="60%"
              height="35%"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="1"
              strokeDasharray="6 6"
              opacity="0.3"
            />
            {/* Corner reticles */}
            <path
              d="M 8% 22% L 8% 20% L 10% 20%"
              stroke="#FBBF24"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 66% 20% L 68% 20% L 68% 22%"
              stroke="#FBBF24"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 8% 53% L 8% 55% L 10% 55%"
              stroke="#FBBF24"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 66% 55% L 68% 55% L 68% 53%"
              stroke="#FBBF24"
              strokeWidth="2"
              fill="none"
            />
            <text
              x="8.5%"
              y="19%"
              fill="#FBBF24"
              fontSize="9"
              fontFamily="monospace"
              opacity="0.7"
            >
              [AGENT_04: TYPOGRAPHY_KERNING_BOUNDS]
            </text>
          </g>
        )}

        {activePhase >= 3 && activePhase <= 6 && (
          <g className="animate-in fade-in duration-300">
            {/* Navbar selection bounding box constructed by AGENT_02 */}
            <rect
              x="2%"
              y="1.5%"
              width="96%"
              height="7%"
              fill="none"
              stroke="#B44CFF"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.25"
            />
            <text
              x="2.5%"
              y="11%"
              fill="#B44CFF"
              fontSize="9"
              fontFamily="monospace"
              opacity="0.6"
            >
              [AGENT_02: NAV_TOPOLOGY_MATRIX]
            </text>
          </g>
        )}
      </svg>

      {/* Render the individual animated cursors */}
      {cursors.map((c) => (
        <AgentCursor
          key={c.agent.id}
          agent={c.agent}
          x={c.x}
          y={c.y}
          activity={c.activity}
          isClicking={c.isClicking}
        />
      ))}
    </div>
  );
};
