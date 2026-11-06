import React from 'react';

interface LaserSparkProps {
  x: number; // pixel coords
  y: number;
  color: string;
}

export const LaserSpark: React.FC<LaserSparkProps> = ({ x, y, color }) => {
  return (
    <div
      className="absolute pointer-events-none z-50 will-change-transform"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer energy pulse */}
      <span
        className="absolute -inset-3 rounded-full border animate-ping pointer-events-none opacity-80"
        style={{ borderColor: color }}
      />
      {/* Inner spark flare */}
      <span
        className="block w-2.5 h-2.5 rounded-full shadow-[0_0_12px_currentColor]"
        style={{ backgroundColor: color, color: color }}
      />
    </div>
  );
};

