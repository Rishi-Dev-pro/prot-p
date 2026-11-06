import React from 'react';

interface StatusIndicatorProps {
  label?: string;
  sublabel?: string;
  pulseColor?: string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  label = 'AVAILABLE FOR COLLABORATION',
  sublabel,
  pulseColor = '#00FF88',
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#101116]/80 backdrop-blur-md text-xs font-mono tracking-wider ${className}`}>
      <span className="relative flex h-2 w-2">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: pulseColor }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: pulseColor }}
        />
      </span>
      <span className="text-[#F3F3F5] uppercase text-[11px] font-medium tracking-wider">
        {label}
      </span>
      {sublabel && (
        <span className="text-[#92939F] text-[10px] hidden sm:inline border-l border-white/10 pl-2">
          {sublabel}
        </span>
      )}
    </div>
  );
};

