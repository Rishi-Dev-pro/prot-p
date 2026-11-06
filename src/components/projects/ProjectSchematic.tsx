import React from 'react';

interface ProjectSchematicProps {
  projectId: string;
  accentColor: string;
}

export const ProjectSchematic: React.FC<ProjectSchematicProps> = ({
  projectId,
  accentColor,
}) => {
  switch (projectId) {
    case 'ahi':
      return (
        <div className="w-full h-44 rounded-xl border border-white/10 bg-black/40 p-3 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-1.5">
            <span className="text-[#00F0FF] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
              EVENT_STREAM_OBSERVER
            </span>
            <span className="text-white/40">SQLITE_BUFFER // REALTIME</span>
          </div>

          {/* SVG Pipeline */}
          <svg viewBox="0 0 400 100" className="w-full h-24 my-auto" fill="none">
            {/* Pipeline connecting path */}
            <path
              d="M 30 50 L 120 50 L 190 25 L 280 25 L 370 50"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />
            <path
              d="M 120 50 L 190 75 L 280 75 L 370 50"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />
            {/* Animated packet flow */}
            <circle r="3.5" fill={accentColor}>
              <animateMotion
                path="M 30 50 L 120 50 L 190 25 L 280 25 L 370 50"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3.5" fill="#00F0FF">
              <animateMotion
                path="M 120 50 L 190 75 L 280 75 L 370 50"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Nodes */}
            <g transform="translate(30, 50)">
              <circle r="12" fill="#101116" stroke={accentColor} strokeWidth="1.5" />
              <text y="3" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="monospace">UI</text>
            </g>
            <g transform="translate(120, 50)">
              <circle r="14" fill="#101116" stroke="#00F0FF" strokeWidth="1.5" />
              <text y="3" textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace">TAP</text>
            </g>
            <g transform="translate(235, 25)">
              <rect x="-30" y="-10" width="60" height="20" rx="4" fill="#101116" stroke="rgba(255,255,255,0.2)" />
              <text y="3" textAnchor="middle" fill={accentColor} fontSize="6.5" fontFamily="monospace">SQLITE</text>
            </g>
            <g transform="translate(235, 75)">
              <rect x="-30" y="-10" width="60" height="20" rx="4" fill="#101116" stroke="rgba(255,255,255,0.2)" />
              <text y="3" textAnchor="middle" fill="#00F0FF" fontSize="6.5" fontFamily="monospace">CONTEXT</text>
            </g>
            <g transform="translate(370, 50)">
              <circle r="14" fill="#101116" stroke={accentColor} strokeWidth="2" />
              <text y="3" textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace">ACTION</text>
            </g>
          </svg>

          <div className="flex justify-between text-[9px] font-mono text-white/40 border-t border-white/5 pt-1">
            <span>INPUT: DESKTOP EVENTS</span>
            <span>SYNTHESIS: NON-INVASIVE AI</span>
          </div>
        </div>
      );

    case 'aether-os':
      return (
        <div className="w-full h-44 rounded-xl border border-white/10 bg-black/40 p-3 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-1.5">
            <span className="text-[#B44CFF] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B44CFF] animate-ping" />
              VISION_PERCEPTION_HUD
            </span>
            <span className="text-white/40">MEDIAPIPE + OPENCV</span>
          </div>

          {/* SVG Computer Vision Scanning HUD */}
          <svg viewBox="0 0 400 100" className="w-full h-24 my-auto" fill="none">
            {/* Grid crosshairs */}
            <circle cx="200" cy="50" r="38" stroke="rgba(180, 76, 255, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="200" cy="50" r="22" stroke="rgba(180, 76, 255, 0.5)" strokeWidth="1.5" />
            <line x1="200" y1="5" x2="200" y2="95" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <line x1="120" y1="50" x2="280" y2="50" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />

            {/* Corner tracking brackets */}
            <path d="M 140 25 L 130 25 L 130 35" stroke="#00F0FF" strokeWidth="1.5" />
            <path d="M 260 25 L 270 25 L 270 35" stroke="#00F0FF" strokeWidth="1.5" />
            <path d="M 140 75 L 130 75 L 130 65" stroke="#00F0FF" strokeWidth="1.5" />
            <path d="M 260 75 L 270 75 L 270 65" stroke="#00F0FF" strokeWidth="1.5" />

            {/* Scanning radar line */}
            <line x1="200" y1="50" x2="238" y2="50" stroke={accentColor} strokeWidth="1.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 200 50"
                to="360 200 50"
                dur="4s"
                repeatCount="indefinite"
              />
            </line>

            {/* Landmark tracking dots */}
            <circle cx="180" cy="40" r="2.5" fill="#00FF88" className="animate-pulse" />
            <circle cx="220" cy="40" r="2.5" fill="#00FF88" className="animate-pulse" />
            <circle cx="200" cy="62" r="2.5" fill="#00FF88" className="animate-pulse" />
          </svg>

          <div className="flex justify-between text-[9px] font-mono text-white/40 border-t border-white/5 pt-1">
            <span>INTENT ENGINE: ACTIVE</span>
            <span>TASK AUTOMATION: READY</span>
          </div>
        </div>
      );

    case 'pirate-civ':
      return (
        <div className="w-full h-44 rounded-xl border border-white/10 bg-black/40 p-3 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-1.5">
            <span className="text-[#00F0FF] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
              6 CANONICAL ISLANDS TOPOLOGY
            </span>
            <span className="text-[#00FF88] font-bold">695/695 PASSED</span>
          </div>

          {/* SVG Islands Mesh */}
          <svg viewBox="0 0 400 100" className="w-full h-24 my-auto" fill="none">
            {/* Connections to central marketplace engine */}
            <line x1="80" y1="30" x2="200" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <line x1="80" y1="70" x2="200" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <line x1="140" y1="18" x2="200" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <line x1="260" y1="18" x2="200" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <line x1="320" y1="30" x2="200" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <line x1="320" y1="70" x2="200" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

            {/* Central Cart State Core */}
            <circle cx="200" cy="50" r="18" fill="#101116" stroke={accentColor} strokeWidth="2" />
            <text x="200" y="53" textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace">CART_DB</text>

            {/* 6 Peripheral Island Nodes */}
            <circle cx="80" cy="30" r="9" fill="#101116" stroke="#00F0FF" strokeWidth="1.5" />
            <circle cx="80" cy="70" r="9" fill="#101116" stroke="#00F0FF" strokeWidth="1.5" />
            <circle cx="140" cy="18" r="9" fill="#101116" stroke="#34D399" strokeWidth="1.5" />
            <circle cx="260" cy="18" r="9" fill="#101116" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="320" cy="30" r="9" fill="#101116" stroke="#EC4899" strokeWidth="1.5" />
            <circle cx="320" cy="70" r="9" fill="#101116" stroke="#B44CFF" strokeWidth="1.5" />
          </svg>

          <div className="flex justify-between text-[9px] font-mono text-white/40 border-t border-white/5 pt-1">
            <span>EXPRESS 5 + MONGOOSE</span>
            <span>PHASE 3.1 - 3.6 VERIFIED</span>
          </div>
        </div>
      );

    case 'campusresolve':
      return (
        <div className="w-full h-44 rounded-xl border border-white/10 bg-black/40 p-3 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-1.5">
            <span className="text-[#34D399] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-ping" />
              CAMPUS_WORKFLOW_STATE_MACHINE
            </span>
            <span className="text-white/40">MERN FULL-STACK</span>
          </div>

          {/* SVG Pipeline */}
          <svg viewBox="0 0 400 100" className="w-full h-24 my-auto" fill="none">
            <path d="M 40 50 L 130 50 L 220 50 L 310 50 L 370 50" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="40" cy="50" r="12" fill="#101116" stroke="#34D399" strokeWidth="1.5" />
            <text x="40" y="53" textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace">INTAKE</text>

            <rect x="100" y="38" width="60" height="24" rx="4" fill="#101116" stroke="rgba(255,255,255,0.2)" />
            <text x="130" y="53" textAnchor="middle" fill="#F3F3F5" fontSize="6.5" fontFamily="monospace">ROUTING</text>

            <rect x="190" y="38" width="60" height="24" rx="4" fill="#101116" stroke="rgba(255,255,255,0.2)" />
            <text x="220" y="53" textAnchor="middle" fill="#F3F3F5" fontSize="6.5" fontFamily="monospace">ESCALATE</text>

            <rect x="280" y="38" width="60" height="24" rx="4" fill="#101116" stroke="#00F0FF" strokeWidth="1.5" />
            <text x="310" y="53" textAnchor="middle" fill="#00F0FF" fontSize="6.5" fontFamily="monospace">AUDIT</text>

            <circle cx="370" cy="50" r="12" fill="#101116" stroke="#00FF88" strokeWidth="2" />
            <text x="370" y="53" textAnchor="middle" fill="#00FF88" fontSize="6.5" fontFamily="monospace">RESOLVE</text>
          </svg>

          <div className="flex justify-between text-[9px] font-mono text-white/40 border-t border-white/5 pt-1">
            <span>STUDENT GRIEVANCES</span>
            <span>AUDITABLE RESOLUTION</span>
          </div>
        </div>
      );

    case 'callbuddy-ai':
      return (
        <div className="w-full h-44 rounded-xl border border-white/10 bg-black/40 p-3 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-1.5">
            <span className="text-[#F59E0B] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
              TRI-MODAL CONVERSATIONAL TOPOLOGY
            </span>
            <span className="text-white/40">WEBRTC + WEBSOCKET</span>
          </div>

          {/* SVG Conversational Nodes */}
          <svg viewBox="0 0 400 100" className="w-full h-24 my-auto" fill="none">
            <line x1="200" y1="50" x2="80" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <line x1="200" y1="50" x2="200" y2="15" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <line x1="200" y1="50" x2="320" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

            {/* Central Orchestrator */}
            <circle cx="200" cy="50" r="16" fill="#101116" stroke={accentColor} strokeWidth="2" />
            <text x="200" y="53" textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace">AI_CORE</text>

            {/* 3 Modes */}
            <g transform="translate(80, 50)">
              <rect x="-30" y="-12" width="60" height="24" rx="4" fill="#101116" stroke="#F59E0B" />
              <text y="3" textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace">1:1 CHAT</text>
            </g>
            <g transform="translate(200, 15)">
              <rect x="-35" y="-10" width="70" height="20" rx="4" fill="#101116" stroke="#38BDF8" />
              <text y="3" textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace">SHARED ROOM</text>
            </g>
            <g transform="translate(320, 50)">
              <rect x="-30" y="-12" width="60" height="24" rx="4" fill="#101116" stroke="#EC4899" />
              <text y="3" textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace">AI CALLING</text>
            </g>
          </svg>

          <div className="flex justify-between text-[9px] font-mono text-white/40 border-t border-white/5 pt-1">
            <span>MULTI-PARTY DISCOURSE</span>
            <span>SUMMARY SYNTHESIS</span>
          </div>
        </div>
      );

    case 'edge-ai-pothole':
      return (
        <div className="w-full h-44 rounded-xl border border-white/10 bg-black/40 p-3 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-1.5">
            <span className="text-[#EC4899] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-ping" />
              YOLOV8n EDGE DETECTION // ARDUINO
            </span>
            <span className="text-[#00FF88] font-bold">mAP50 ~0.58</span>
          </div>

          {/* SVG Road Perspective & Detection Box */}
          <svg viewBox="0 0 400 100" className="w-full h-24 my-auto" fill="none">
            {/* Road perspective vanishing lines */}
            <line x1="160" y1="10" x2="60" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="240" y1="10" x2="340" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="200" y1="10" x2="200" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="6 4" />

            {/* Bounding box on detected pothole */}
            <rect x="175" y="45" width="55" height="30" fill="rgba(236, 72, 153, 0.15)" stroke="#EC4899" strokeWidth="1.5" />
            <text x="178" y="41" fill="#EC4899" fontSize="6.5" fontFamily="monospace">POTHOLE: 0.80</text>

            {/* Telemetry banner */}
            <rect x="290" y="48" width="95" height="26" rx="4" fill="#101116" stroke="rgba(0, 255, 136, 0.5)" />
            <text x="337" y="60" textAnchor="middle" fill="#00FF88" fontSize="7" fontFamily="monospace">SLOWDOWN_DIRECTIVE</text>
            <text x="337" y="69" textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace">VEHICLE_SPEED: 42km/h</text>
          </svg>

          <div className="flex justify-between text-[9px] font-mono text-white/40 border-t border-white/5 pt-1">
            <span>IIT MADRAS DATASET (300 IMGS)</span>
            <span>OFFLINE EDGE INFERENCE</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
