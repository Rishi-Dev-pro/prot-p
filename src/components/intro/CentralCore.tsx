import React from 'react';
import { OrchestratorStage } from '../../animations/orchestration/AgentOrchestrator';

export interface CentralCoreProps {
  stage: OrchestratorStage;
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
  bootMessage,
  syncTelemetry,
  burstParticles = [],
}) => {
  if (
    stage === 'CONSTRUCTION_ACTIVE' ||
    stage === 'SECTION_TRANSITION' ||
    stage === 'FINAL_REVEAL' ||
    stage === 'INTERACTIVE'
  ) {
    return null;
  }

  const isCircular = stage === 'FORMATION_ACTIVE';

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden select-none">
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

      {/* Central SVG Animated Geometric Core */}
      <div className="relative flex items-center justify-center">
        {/* Outermost Radar Ring with Dashes */}
        <svg
          className={`absolute w-72 h-72 transition-opacity duration-700 pointer-events-none ${
            isCircular ? 'opacity-90 animate-[spin_24s_linear_infinite]' : 'opacity-30'
          }`}
          viewBox="0 0 288 288"
          fill="none"
        >
          <circle
            cx="144"
            cy="144"
            r="140"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
        </svg>

        {/* Secondary Calibrated Degree Ring */}
        <svg
          className={`w-56 h-56 transition-all duration-700 ${
            isCircular ? 'opacity-100 animate-[spin_16s_linear_infinite_reverse]' : 'opacity-40'
          }`}
          viewBox="0 0 200 200"
          fill="none"
        >
          {/* Calibrated Ticks */}
          {[...Array(24)].map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + Math.cos(rad) * 92;
            const y1 = 100 + Math.sin(rad) * 92;
            const x2 = 100 + Math.cos(rad) * 98;
            const y2 = 100 + Math.sin(rad) * 98;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 6 === 0 ? '#FF414D' : 'rgba(255,255,255,0.25)'}
                strokeWidth={i % 6 === 0 ? '2' : '1'}
              />
            );
          })}
          {/* Outer Thin Ring */}
          <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="6 6" />
          {/* Inner Accent Ring */}
          <circle cx="100" cy="100" r="60" stroke="rgba(0,255,136,0.3)" strokeWidth="1" strokeDasharray="3 9" />
        </svg>

        {/* Center Luminous Energy Emitter */}
        <div className="absolute flex items-center justify-center">
          {/* Pulsing Aura */}
          <div
            className={`w-20 h-20 rounded-full transition-transform duration-500 blur-md ${
              isCircular ? 'bg-[#FF414D]/25 scale-125 animate-pulse' : 'bg-cyan-500/15 scale-90'
            }`}
          />
          {/* Core Geometric Diamond */}
          <div className="w-6 h-6 border border-[#FF414D] rotate-45 flex items-center justify-center bg-[#08090D]/80 shadow-[0_0_15px_rgba(255,65,77,0.6)]">
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
          </div>
        </div>

        {/* Center Crosshair Lines */}
        <div className="absolute w-36 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        <div className="absolute h-36 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* Telemetry Message Overlay */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center whitespace-nowrap pointer-events-none transition-all duration-300 ${
            isCircular ? '-bottom-48' : '-bottom-24'
          }`}
        >
          {(stage === 'BOOTING' || stage === 'CANVAS_INITIALIZED') && bootMessage && (
            <div className="flex flex-col items-center gap-1.5 animate-in fade-in zoom-in-95 duration-300">
              <span className="font-mono text-[11px] tracking-[0.25em] text-white/90 font-semibold uppercase">
                {bootMessage}
              </span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF414D] animate-ping" />
                <span className="font-mono text-[9px] text-[#92939F] tracking-widest">
                  PORTFOLIO_CANVAS // ZERO_STATE
                </span>
              </div>
            </div>
          )}

          {stage === 'AGENTS_ENTERING' && (
            <div className="flex flex-col items-center gap-1 animate-in fade-in duration-300">
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#00FF88] font-bold uppercase">
                INCOMING AGENT CLUSTER
              </span>
              <span className="font-mono text-[9px] text-white/60 tracking-wider">
                CONVERGING 20 NODES TO CENTRAL APEX
              </span>
            </div>
          )}

          {stage === 'FORMATION_ACTIVE' && (
            <div className="flex flex-col items-center gap-1.5 bg-[#08090D]/90 border border-white/10 px-4 py-2 rounded shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88]" />
                <span className="font-mono text-[12px] font-bold tracking-widest text-white">
                  AGENT CLUSTER SYNCHRONIZED
                </span>
              </div>
              <div className="flex items-center gap-3 text-[9px] font-mono text-[#92939F]">
                <span>20 NODES CONNECTED</span>
                <span>•</span>
                <span>SHARED WORKSPACE ESTABLISHED</span>
              </div>
              {syncTelemetry && (
                <span className="font-mono text-[9px] text-[#FF414D] tracking-wider font-semibold">
                  {syncTelemetry}
                </span>
              )}
            </div>
          )}

          {stage === 'DEPLOYMENT_ACTIVE' && (
            <div className="flex flex-col items-center gap-1 animate-in fade-in zoom-in-95 duration-200">
              <span className="font-mono text-[11px] font-bold tracking-widest text-[#00FF88] uppercase">
                RADIAL DEPLOYMENT INITIATED
              </span>
              <span className="font-mono text-[9px] text-white/70 tracking-wider">
                DISPATCHING TASK ASSIGNMENT QUEUES
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
