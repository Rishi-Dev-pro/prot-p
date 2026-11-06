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
}) => {
  return (
    <div
      className="fixed pointer-events-none z-50 select-none will-change-transform"
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`,
      }}
    >
      {/* Precision Calibration Reticle when actively working / constructing */}
      {isWorking && (
        <div
          className="absolute -top-2.5 -left-2.5 w-5 h-5 pointer-events-none flex items-center justify-center"
          style={{ color }}
        >
          {/* Thin circular alignment ring */}
          <span
            className="absolute inset-0 rounded-full border border-current opacity-60"
            style={{ borderColor: color }}
          />
          {/* Center reticle dot */}
          <span
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: color }}
          />
          {/* Subtle crosshair ticks */}
          <span
            className="absolute -top-1 w-[1px] h-1 bg-current opacity-70"
            style={{ backgroundColor: color }}
          />
          <span
            className="absolute -bottom-1 w-[1px] h-1 bg-current opacity-70"
            style={{ backgroundColor: color }}
          />
          <span
            className="absolute -left-1 w-1 h-[1px] bg-current opacity-70"
            style={{ backgroundColor: color }}
          />
          <span
            className="absolute -right-1 w-1 h-[1px] bg-current opacity-70"
            style={{ backgroundColor: color }}
          />
        </div>
      )}

      {/* Sleek Razor-Sharp Precision Pointer Arrow */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="pointer-events-none"
        style={{
          transform: `rotate(${Math.round(angle - 45)}deg)`,
          transformOrigin: '2px 2px',
          filter: `drop-shadow(0 1px 3px rgba(0,0,0,0.95)) drop-shadow(0 0 2px ${color}60)`,
        }}
      >
        <path
          d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
          fill={color}
          stroke="#090A0F"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Stable Floating Agent Identity Tag */}
      <div className="absolute left-4 top-0 flex items-center gap-1.5 pointer-events-none whitespace-nowrap">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 4px ${color}90`,
          }}
        />
        <span
          className="font-mono text-[9px] font-bold tracking-tight text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
          style={{ color }}
        >
          {id}
        </span>
        <span className="font-mono text-[8px] tracking-tight text-white/50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] hidden sm:inline">
          {name}
        </span>
      </div>

      {/* Active Work Activity Badge (Clean Monospace Pill) */}
      {isWorking && activity && (
        <div
          className="absolute left-4 top-4 px-2 py-0.5 rounded border backdrop-blur-md whitespace-nowrap shadow-lg pointer-events-none"
          style={{
            backgroundColor: 'rgba(9, 10, 15, 0.94)',
            borderColor: `${color}60`,
            boxShadow: `0 2px 8px rgba(0,0,0,0.8), 0 0 4px ${color}20`,
          }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-1 h-1 rounded-full shrink-0"
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
