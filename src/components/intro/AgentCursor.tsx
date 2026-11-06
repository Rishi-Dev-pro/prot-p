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
          className="absolute -top-3 -left-3 w-6 h-6 pointer-events-none flex items-center justify-center"
          style={{ color }}
        >
          {/* Thin circular alignment ring */}
          <span
            className="absolute inset-0 rounded-full border border-current opacity-75"
            style={{ borderColor: color }}
          />
          {/* Center reticle dot */}
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
          {/* Subtle crosshair ticks */}
          <span
            className="absolute -top-1 w-[1px] h-1.5 bg-current opacity-85"
            style={{ backgroundColor: color }}
          />
          <span
            className="absolute -bottom-1 w-[1px] h-1.5 bg-current opacity-85"
            style={{ backgroundColor: color }}
          />
          <span
            className="absolute -left-1 w-1.5 h-[1px] bg-current opacity-85"
            style={{ backgroundColor: color }}
          />
          <span
            className="absolute -right-1 w-1.5 h-[1px] bg-current opacity-85"
            style={{ backgroundColor: color }}
          />
        </div>
      )}

      {/* Precision Engineered Pointer Instrument (+25% scale, dual-contour contrast) */}
      <svg
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        className="pointer-events-none"
        style={{
          transform: `rotate(${Math.round(angle - 45)}deg)`,
          transformOrigin: '3px 3px',
          filter: `drop-shadow(0 2px 6px rgba(0,0,0,0.95)) drop-shadow(0 0 5px ${color}50)`,
        }}
      >
        {/* Outer dark base silhouette for sharp contrast against bright elements */}
        <path
          d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
          fill="#05060A"
          stroke="#05060A"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Core color body */}
        <path
          d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
          fill={color}
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Crisp interior leading-edge highlight for high contrast on dark themes */}
        <path
          d="M3.5 4.5L9.8 18.5L12.5 12.8L18.5 9.8L3.5 4.5Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Precision apex focal glint */}
        <circle cx="3" cy="3" r="1.2" fill="#FFFFFF" opacity="0.9" />
      </svg>
    </div>
  );
};
