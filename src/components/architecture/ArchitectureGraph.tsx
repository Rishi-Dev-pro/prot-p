import React from 'react';
import { ArchitectureDomain } from '../../types/architecture';
import { Layout, Server, BrainCircuit, Eye, Database, Cpu } from 'lucide-react';

interface ArchitectureGraphProps {
  domains: ArchitectureDomain[];
  selectedDomain: ArchitectureDomain;
  onSelectDomain: (domain: ArchitectureDomain) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Layout,
  Server,
  BrainCircuit,
  Eye,
  Database,
  Cpu,
};

export const ArchitectureGraph: React.FC<ArchitectureGraphProps> = ({
  domains,
  selectedDomain,
  onSelectDomain,
}) => {
  // Center is at (300, 300) in a 600x600 SVG coordinate space
  const centerX = 300;
  const centerY = 300;
  const radius = 200;

  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto select-none p-4">
      {/* SVG canvas for connectors and animated pulse lines */}
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Subtle glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer orbital guide rings */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 45}
          fill="none"
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth="1"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={radius - 70}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1"
        />

        {/* Connecting Lines from Central Core to each Peripheral Domain */}
        {domains.map((domain, i) => {
          const angleRad = (i * 60 - 90) * (Math.PI / 180);
          const x = centerX + radius * Math.cos(angleRad);
          const y = centerY + radius * Math.sin(angleRad);
          const isSelected = domain.id === selectedDomain.id;

          return (
            <g key={`line-${domain.id}`}>
              {/* Base line */}
              <line
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={isSelected ? domain.accentColor : 'rgba(255, 255, 255, 0.15)'}
                strokeWidth={isSelected ? '2.5' : '1.5'}
                strokeDasharray={isSelected ? 'none' : '4 4'}
                className="transition-all duration-300"
              />

              {/* Animated pulse packet when selected */}
              {isSelected && (
                <circle
                  r="4"
                  fill={domain.accentColor}
                  filter="url(#glow)"
                >
                  <animateMotion
                    path={`M ${centerX} ${centerY} L ${x} ${y}`}
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Central Core Ecosystem SVG Representation */}
        <g className="cursor-pointer">
          {/* Outer glow aura */}
          <circle
            cx={centerX}
            cy={centerY}
            r="60"
            fill="rgba(255, 65, 77, 0.05)"
            stroke="rgba(255, 65, 77, 0.25)"
            strokeWidth="1.5"
            className="animate-pulse"
          />
          {/* Inner core circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r="44"
            fill="#101116"
            stroke="#FF414D"
            strokeWidth="2"
          />
          <text
            x={centerX}
            y={centerY - 10}
            textAnchor="middle"
            fill="#FF414D"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="1"
          >
            RISHI
          </text>
          <text
            x={centerX}
            y={centerY + 5}
            textAnchor="middle"
            fill="#F3F3F5"
            fontSize="9"
            fontFamily="monospace"
            fontWeight="600"
            letterSpacing="0.5"
          >
            ENGINEERING
          </text>
          <text
            x={centerX}
            y={centerY + 18}
            textAnchor="middle"
            fill="#92939F"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="1"
          >
            ECOSYSTEM
          </text>
        </g>
      </svg>

      {/* Interactive HTML Overlay Nodes (positioning accurately matching the 6 angles) */}
      <div className="absolute inset-0 pointer-events-none">
        {domains.map((domain, i) => {
          // Angle calculation for overlay HTML badges
          const angleDeg = i * 60 - 90;
          const angleRad = angleDeg * (Math.PI / 180);
          // Distance in percentage relative to container center (50%, 50%)
          // radius 200 in 600 space is 33.33%
          const pctDistance = 34;
          const leftPct = 50 + pctDistance * Math.cos(angleRad);
          const topPct = 50 + pctDistance * Math.sin(angleRad);

          const isSelected = domain.id === selectedDomain.id;
          const IconComponent = ICON_MAP[domain.iconName] || Cpu;

          return (
            <div
              key={`node-${domain.id}`}
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute pointer-events-auto"
            >
              <button
                onClick={() => onSelectDomain(domain)}
                className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#101116] border-white/40 shadow-xl scale-110'
                    : 'bg-[#101116]/80 border-white/10 hover:border-white/30 hover:bg-[#101116]'
                }`}
                style={{
                  borderColor: isSelected ? domain.accentColor : undefined,
                  boxShadow: isSelected
                    ? `0 0 20px ${domain.accentColor}30`
                    : undefined,
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-white/10"
                  style={{
                    backgroundColor: `${domain.accentColor}15`,
                    color: domain.accentColor,
                  }}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="font-mono text-[9px] text-white/40 leading-none">
                    // {domain.number}
                  </span>
                  <span className="font-display font-semibold text-xs text-[#F3F3F5] leading-tight group-hover:text-white mt-0.5">
                    {domain.shortLabel}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

