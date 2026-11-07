import React from 'react';
import { OrchestratorStage } from '../../animations/orchestration/AgentOrchestrator';

export interface CentralCoreProps {
  stage: OrchestratorStage;
  activeAgentsCount?: number;
  bootMessage?: string;
  syncTelemetry?: string;
  burstParticles?: Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    alpha: number;
  }>;
}

export const CentralCore: React.FC<CentralCoreProps> = ({
  stage,
  activeAgentsCount = 6,
  bootMessage,
  syncTelemetry,
  burstParticles = [],
}) => {
  if (
    stage === 'CONSTRUCTION_ACTIVE' ||
    stage === 'SECTION_TRANSITION' ||
    stage === 'FINAL_REVEAL' ||
    stage === 'INTERACTIVE' ||
    stage === 'ALL_SECTIONS_COMPLETED' ||
    stage === 'FINAL_SCROLL_STARTED' ||
    stage === 'FINAL_SCROLL_COMPLETED' ||
    stage === 'DANCE_STARTED' ||
    stage === 'CIRCLE_FORMATION' ||
    stage === 'CIRCLE_HOLD' ||
    stage === 'OUTWARD_DEPARTURE' ||
    stage === 'FINAL_RESTING_STATE'
  ) {
    return null;
  }

  const isCircular = stage === 'FORMATION_ACTIVE';

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {/* Dynamic Radial Particle Bursts */}
      {burstParticles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full pointer-events-none will-change-transform"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.alpha,
            boxShadow: `0 0 10px ${p.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Central SVG Animated Geometric Core (Strict Mathematical Centering) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 pointer-events-none flex items-center justify-center">
        {/* Outermost Radar Ring with Dashes */}
        <svg
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 pointer-events-none ${
            isCircular ? 'opacity-90 animate-[spin_28s_linear_infinite]' : 'opacity-25'
          }`}
          viewBox="0 0 288 288"
          fill="none"
        >
          <circle
            cx="144"
            cy="144"
            r="140"
            stroke="rgba(180,76,255,0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
        </svg>

        {/* Secondary Calibrated Degree Ring */}
        <svg
          className={`absolute w-56 h-56 transition-all duration-700 pointer-events-none ${
            isCircular ? 'opacity-100 animate-[spin_20s_linear_infinite_reverse]' : 'opacity-40'
          }`}
          viewBox="0 0 200 200"
          fill="none"
        >
          {/* Calibrated Ticks */}
          {[...Array(28)].map((_, i) => {
            const angle = (i * 360) / 28;
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + Math.cos(rad) * 92;
            const y1 = 100 + Math.sin(rad) * 92;
            const x2 = 100 + Math.cos(rad) * 98;
            const y2 = 100 + Math.sin(rad) * 98;
            const isMajor = i % 4 === 0;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? '#B44CFF' : 'rgba(255,255,255,0.2)'}
                strokeWidth={isMajor ? '1.5' : '1'}
              />
            );
          })}
          {/* Outer Thin Ring */}
          <circle cx="100" cy="100" r="90" stroke="rgba(180,76,255,0.2)" strokeWidth="1" strokeDasharray="6 6" />
          {/* Inner Accent Ring */}
          <circle cx="100" cy="100" r="60" stroke="rgba(56,189,248,0.25)" strokeWidth="1" strokeDasharray="3 9" />
        </svg>

        {/* Center Crosshair Lines */}
        <div className="absolute w-36 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        <div className="absolute h-36 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* Center Luminous Energy Emitter (Strictly Centered Diamond & Aura) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Pulsing Aura */}
          <div
            className={`w-16 h-16 rounded-full transition-transform duration-500 blur-md pointer-events-none ${
              isCircular ? 'bg-[#B44CFF]/25 scale-125 animate-pulse' : 'bg-[#38BDF8]/15 scale-90'
            }`}
          />
          {/* Core Geometric Diamond */}
          <div className="absolute w-5 h-5 border border-[#B44CFF] rotate-45 flex items-center justify-center bg-[#08090D]/95 shadow-[0_0_15px_rgba(180,76,255,0.7)] pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
          </div>
        </div>
      </div>

      {/* Symmetrical Telemetry Badge (Positioned below the core with ample orbit clearance) */}
      <div className="absolute top-[calc(50%+130px)] left-1/2 -translate-x-1/2 flex flex-col items-center text-center whitespace-nowrap pointer-events-none transition-all duration-300">
        {(stage === 'BOOTING' || stage === 'CANVAS_INITIALIZED') && bootMessage && (
          <div className="flex flex-col items-center gap-1 animate-in fade-in zoom-in-95 duration-300">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-white/90 font-semibold uppercase">
              {bootMessage}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B44CFF] animate-ping" />
              <span className="font-mono text-[8px] sm:text-[9px] text-[#92939F] tracking-widest">
                PORTFOLIO_CANVAS // ZERO_STATE
              </span>
            </div>
          </div>
        )}

        {stage === 'AGENTS_ENTERING' && (
          <div className="flex flex-col items-center gap-1 animate-in fade-in duration-300">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[#38BDF8] font-bold uppercase">
              INCOMING AGENT CLUSTER
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] text-white/60 tracking-wider">
              CONVERGING {activeAgentsCount} SPECIALIZED NODES
            </span>
          </div>
        )}

        {stage === 'FORMATION_ACTIVE' && (
          <div className="flex flex-col items-center gap-1 bg-[#08090D]/95 border border-[#B44CFF]/30 px-4 py-1.5 rounded-lg shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-white">
                AGENT CLUSTER SYNCHRONIZED
              </span>
            </div>
            <div className="flex items-center gap-2 text-[8px] sm:text-[9px] font-mono text-[#92939F]">
              <span className="text-white/80">{activeAgentsCount} NODES CONNECTED</span>
              <span>•</span>
              <span>SHARED WORKSPACE ESTABLISHED</span>
            </div>
            {syncTelemetry && (
              <span className="font-mono text-[8px] text-[#C4B5FD] tracking-wider font-medium hidden sm:inline">
                {syncTelemetry}
              </span>
            )}
          </div>
        )}

        {stage === 'DEPLOYMENT_ACTIVE' && (
          <div className="flex flex-col items-center gap-1 animate-in fade-in zoom-in-95 duration-200">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#00F0FF] uppercase">
              RADIAL DEPLOYMENT INITIATED
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] text-white/70 tracking-wider">
              DISPATCHING TASK ASSIGNMENT QUEUES
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
