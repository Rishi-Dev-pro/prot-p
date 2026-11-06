import React from 'react';
import { AgentCursorData } from '../../types/agent';

interface AgentCursorProps {
  agent: AgentCursorData;
  x: number;
  y: number;
  xUnit?: 'px' | '%';
  activity: string;
  isClicking?: boolean;
}

export const AgentCursor: React.FC<AgentCursorProps> = ({
  agent,
  x,
  y,
  xUnit = '%',
  activity,
  isClicking = false,
}) => {
  const coordStyle =
    xUnit === 'px'
      ? { left: `${Math.round(x)}px`, top: `${Math.round(y)}px` }
      : { left: `${x}%`, top: `${y}%` };

  return (
    <div
      className="fixed pointer-events-none transition-all duration-500 ease-out z-50 select-none will-change-transform"
      style={{
        ...coordStyle,
        transform: 'translate(-2px, -2px)',
      }}
    >
      {/* Click ripple & laser spark flare when actively drawing/constructing */}
      {isClicking && (
        <>
          <span
            className="absolute -top-3 -left-3 w-8 h-8 rounded-full border animate-ping pointer-events-none"
            style={{ borderColor: agent.color }}
          />
          <span
            className="absolute -top-1 -left-1 w-3 h-3 rounded-full blur-[2px] animate-pulse pointer-events-none"
            style={{ backgroundColor: agent.color }}
          />
        </>
      )}

      {/* SVG Cursor Pointer Arrow */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
      >
        <path
          d="M3 3L10.07 20.97L13.58 13.58L20.97 10.07L3 3Z"
          fill={agent.color}
          stroke="#08090D"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Agent Identity & Live Telemetry Pill */}
      <div
        className="ml-4 -mt-2 px-2.5 py-1 rounded border backdrop-blur-md flex flex-col gap-0.5 shadow-2xl min-w-[130px] max-w-[200px]"
        style={{
          backgroundColor: '#08090Deb',
          borderColor: `${agent.color}80`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.8), 0 0 10px ${agent.color}25`,
        }}
      >
        <div className="flex items-center justify-between gap-1.5">
          <span
            className="font-mono text-[9px] font-bold tracking-tight"
            style={{ color: agent.color }}
          >
            {agent.id}
          </span>
          <span className="font-mono text-[8px] text-white/50 truncate">
            {agent.name}
          </span>
        </div>

        {/* Dynamic Activity Telemetry */}
        <div className="flex items-center gap-1.5 pt-0.5 border-t border-white/10">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
            style={{ backgroundColor: agent.color }}
          />
          <span className="font-mono text-[8px] text-white/90 tracking-tighter truncate font-medium">
            {activity || agent.activity}
          </span>
        </div>
      </div>
    </div>
  );
};
