import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject?: (projectId: string) => void;
  onOpenComparator?: () => void;
}

interface OutputLine {
  id: number;
  type: 'cmd' | 'output' | 'error' | 'success' | 'system';
  text: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenProject,
  onOpenComparator,
}) => {
  const [history, setHistory] = useState<OutputLine[]>([
    {
      id: 1,
      type: 'system',
      text: 'RISHI_KUMAR_SHAW // INTERACTIVE ENGINEERING TERMINAL v5.2',
    },
    {
      id: 2,
      type: 'system',
      text: 'Type "help" to view available diagnostic and exploration commands.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    soundEffects.playClick();
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ').toLowerCase();

    const newHistory: OutputLine[] = [
      ...history,
      { id: Date.now(), type: 'cmd', text: `rishi@systems:~$ ${trimmed}` },
    ];

    switch (cmd) {
      case 'help':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help          - Display this command manual
  whoami        - Print identity profile and background
  about         - Overview of engineering focus & principles
  projects      - List all 6 flagship engineering systems
  open <id>     - Open project detail (ahi, aether-os, pirate-civ, etc.)
  compare       - Launch side-by-side project comparison matrix
  stack         - Output technical capabilities and taxonomy
  architecture  - System topology and distributed engine specs
  agents        - Status of 20 simulated autonomous cluster nodes
  contact       - Transmission channels and verified email
  clear         - Wipe terminal history
  exit          - Close interactive terminal session`,
        });
        break;

      case 'whoami':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: `IDENTITY: Rishi Kumar Shaw
LOCATION: India
EDUCATION: BCA (MAWT), Brainware University
ROLE: Full-Stack Developer | AI Systems Builder | Experimental Engineer
PRIMARY FOCUS: Agentic AI, Computer Vision, Distributed Systems, High-Concurrency Web`,
        });
        break;

      case 'about':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: `ARCHITECTURAL PHILOSOPHY:
  1. Systematic Autonomy  - Deterministic state machines with verified boundaries
  2. Sub-50ms Perception  - Quantized YOLOv8n models with zero-latency feeds
  3. Relentless Testing   - Full test coverage (695/695 unit/integration tests)
  4. Radical Clarity      - Transparent code, no fabricated credentials or hype`,
        });
        break;

      case 'projects':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: `FLAGSHIP PROJECTS:
  1. ahi          - Contextual Intelligence Agent (Event loop, SQLite Vector, Local LLM)
  2. aether-os    - Spatial Vision HUD (Webcam gesture tracking, hand landmarking)
  3. pirate-civ   - Multiplayer Simulation Engine (695/695 tests, zero-latency tick)
  4. campusresolve- Institutional Grievance & SLA Workflow Engine
  5. callbuddy-ai - Telephony AI Copilot (Realtime STT/TTS room broker)
  6. edge-ai      - Edge Road Defect Detector (YOLOv8n ONNX, 28 FPS inference)

Type "open <id>" or directly type "ahi", "aether", "pirate" to view details.`,
        });
        break;

      case 'ahi':
        if (onOpenProject) {
          onOpenProject('ahi');
          newHistory.push({
            id: Date.now() + 1,
            type: 'success',
            text: 'Opening AHI (Adaptive Human Interface) explorer...',
          });
        }
        break;

      case 'aether':
      case 'aether-os':
        if (onOpenProject) {
          onOpenProject('aether-os');
          newHistory.push({
            id: Date.now() + 1,
            type: 'success',
            text: 'Opening AETHER OS (Spatial Vision HUD) explorer...',
          });
        }
        break;

      case 'pirate':
      case 'pirate-civ':
        if (onOpenProject) {
          onOpenProject('pirate-civ');
          newHistory.push({
            id: Date.now() + 1,
            type: 'success',
            text: 'Opening PIRATE-CIV (6-Island Marketplace with 695/695 tests) explorer...',
          });
        }
        break;

      case 'open':
        if (args) {
          if (onOpenProject) {
            onOpenProject(args);
            newHistory.push({
              id: Date.now() + 1,
              type: 'success',
              text: `Dispatched explorer view for project: "${args}"`,
            });
          }
        } else {
          newHistory.push({
            id: Date.now() + 1,
            type: 'error',
            text: 'Usage: open <project-id> (e.g. open ahi, open pirate-civ)',
          });
        }
        break;

      case 'compare':
        if (onOpenComparator) {
          onOpenComparator();
          newHistory.push({
            id: Date.now() + 1,
            type: 'success',
            text: 'Launched project comparison workbench.',
          });
        }
        break;

      case 'stack':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: `CORE TECHNOLOGY MATRIX:
  [Frontend]    TypeScript, React 19, Tailwind CSS, GSAP, Canvas, WebGL, Vite
  [Backend]     Node.js, Fastify, Express, Python, FastAPI, WebSockets
  [AI / Vision] PyTorch, ONNX Runtime, YOLOv8n, MediaPipe, LangChain, SQLite-vec
  [Infra / DB]  PostgreSQL, Redis, Docker, Git, Linux, Supabase`,
        });
        break;

      case 'architecture':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: `SYSTEM TOPOLOGY:
  [Client Layer]       Vite + React SPA -> WebSocket stream
  [Orchestrator Hub]   Event-driven distributed coordinator (6 node cluster)
  [Edge Vision]        Quantized local ONNX model pipeline (sub-35ms)
  [Persistence]        PostgreSQL primary + Redis ephemeral session cache`,
        });
        break;

      case 'agents':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: `AUTONOMOUS AGENT CLUSTER (20 NODES):
  [AGENT_01..05] Nav, Identity, Hero Typography, Graphics, Interactions [IDLE/READY]
  [AGENT_06..10] About, Content, Layout, Projects Matrix, Components     [IDLE/READY]
  [AGENT_11..15] Principles, Technology, Visual, Architecture, Graph     [IDLE/READY]
  [AGENT_16..20] Contact, Edge AI, Typography, Motion, Orchestrator     [IDLE/READY]
  ALL NODES SYNCHRONIZED // LATENCY: 0.2ms`,
        });
        break;

      case 'contact':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: `TRANSMISSION CHANNELS:
  Email:    rishikumarshaw777@gmail.com
  GitHub:   https://github.com/Rishi-Dev-pro
  LinkedIn: https://linkedin.com/in/rishi-kumar-shaw`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        newHistory.push({
          id: Date.now() + 1,
          type: 'error',
          text: `Command not recognized: "${trimmed}". Type "help" to view valid commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx < cmdHistory.length) {
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Terminal Window */}
      <div
        className={`relative flex flex-col rounded-xl border border-white/20 bg-[#0A0B10]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 transition-all duration-200 ${
          isExpanded
            ? 'w-full h-full max-w-5xl max-h-[85vh]'
            : 'w-full max-w-2xl h-[480px]'
        }`}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#101116] select-none">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-[#00FF88]" />
            <span className="font-mono text-xs font-semibold text-white/90">
              rishi@engineering-node:~
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              title={isExpanded ? 'Restore' : 'Maximize'}
            >
              {isExpanded ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Output Screen */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2 select-text">
          {history.map((line) => {
            if (line.type === 'cmd') {
              return (
                <div key={line.id} className="text-[#00F0FF] font-medium">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'error') {
              return (
                <div key={line.id} className="text-[#FF414D]">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={line.id} className="text-[#00FF88]">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-[#92939F] italic">
                  {line.text}
                </div>
              );
            }
            return (
              <pre
                key={line.id}
                className="text-white/80 whitespace-pre-wrap font-mono leading-relaxed"
              >
                {line.text}
              </pre>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt Line */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-[#0C0D12]">
          <span className="font-mono text-xs font-bold text-[#00FF88] shrink-0">
            rishi@systems:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command (e.g. help, projects, about)..."
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder-white/30 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

