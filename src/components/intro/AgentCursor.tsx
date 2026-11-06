import React from 'react';

export interface AgentCursorViewProps {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  angle: number;
  isWorking: boolean;
  activity: string;
  trail?: { x: number; y: number }[];
}

export const AgentCursor: React.FC<AgentCursorViewProps> = ({
  id,
  name,
  color,
  x,
  y,
  angle,
  isWorking,
  activity,
  trail = [],
}) => {
  return (
    <div
      className="fixed pointer-events-none z-50 select-none will-change-transform transition-opacity duration-300"
      style={{
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
        transform: 'translate(-3px, -3px)',
      }}
    >
      {/* Delicate trailing motion particles */}
      {trail.map((pos, idx) => (
        <span
          key={idx}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${pos.x - x}px`,
            top: `${pos.y - y}px`,
            width: `${Math.max(2, 4 - idx)}px`,
            height: `${Math.max(2, 4 - idx)}px`,
            backgroundColor: color,
            opacity: 0.35 - idx * 0.1,
            boxShadow: `0 0 6px ${color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Working energy flare & ripple when actively constructing */}
      {isWorking && (
        <>
          <span
            className="absolute -top-3 -left-3 w-8 h-8 rounded-full border animate-ping pointer-events-none opacity-75"
            style={{ borderColor: color }}
          />
          <span
            className="absolute -top-1 -left-1 w-3.5 h-3.5 rounded-full blur-[2px] animate-pulse pointer-events-none"
            style={{ backgroundColor: color }}
          />
        </>
      )}

      {/* Minimalist, Sleek Pointer Arrow with directional rotation */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-transform duration-75"
        style={{
          transform: `rotate(${Math.round(angle - 45)}deg)`,
          transformOrigin: '3px 3px',
        }}
      >
        <path
          d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
          fill={color}
          stroke="#08090D"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Tiny Floating Agent Identity Tag */}
      <div className="absolute left-4 top-0 flex items-center gap-1.5 pointer-events-none">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: color, color }}
        />
        <span
          className="font-mono text-[9px] font-bold tracking-tight text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
          style={{ color }}
        >
          {id}
        </span>
      </div>

      {/* Temporary Activity Badge (Renders ONLY when actively working on a component, fades out otherwise) */}
      {isWorking && activity && (
        <div
          className="absolute left-4 top-4 px-2 py-0.5 rounded border backdrop-blur-md whitespace-nowrap shadow-xl animate-in fade-in zoom-in-95 duration-200"
          style={{
            backgroundColor: 'rgba(8, 9, 13, 0.92)',
            borderColor: `${color}80`,
            boxShadow: `0 4px 15px rgba(0,0,0,0.8), 0 0 10px ${color}30`,
          }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="font-mono text-[8px] tracking-wider text-white/90 font-medium uppercase">
              {activity}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
