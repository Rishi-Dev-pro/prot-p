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
  color,
  x,
  y,
  angle,
  isWorking,
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
            className="absolute inset-0 rounded-full border border-current opacity-70"
            style={{ borderColor: color }}
          />
          {/* Center reticle dot */}
          <span
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: color }}
          />
          {/* Subtle crosshair ticks */}
          <span
            className="absolute -top-1 w-[1px] h-1 bg-current opacity-80"
            style={{ backgroundColor: color }}
          />
          <span
            className="absolute -bottom-1 w-[1px] h-1 bg-current opacity-80"
            style={{ backgroundColor: color }}
          />
          <span
            className="absolute -left-1 w-1 h-[1px] bg-current opacity-80"
            style={{ backgroundColor: color }}
          />
          <span
            className="absolute -right-1 w-1 h-[1px] bg-current opacity-80"
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
          filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.95)) drop-shadow(0 0 3px ${color}60)`,
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
    </div>
  );
};
