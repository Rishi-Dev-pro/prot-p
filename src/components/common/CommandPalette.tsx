import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Terminal,
  RotateCcw,
  Layers,
  FolderGit2,
  Code2,
  Cpu,
  Mail,
  Volume2,
  VolumeX,
  Scale,
  Sparkles,
} from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

export interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Projects' | 'Tools' | 'Preferences';
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onReplayIntro: () => void;
  onOpenTerminal: () => void;
  onOpenProject: (projectId: string) => void;
  onOpenComparator: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onReplayIntro,
  onOpenTerminal,
  onOpenProject,
  onOpenComparator,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundActive, setSoundActive] = useState(soundEffects.isSoundEnabled());
  const inputRef = useRef<HTMLInputElement>(null);

  const navigateTo = (hash: string) => {
    onClose();
    soundEffects.playClick();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const newState = soundEffects.toggleSound();
    setSoundActive(newState);
    onClose();
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-hero',
      title: 'Go to Hero & Identity',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-[#FF414D]" />,
      action: () => navigateTo('#hero'),
    },
    {
      id: 'nav-about',
      title: 'Go to About & Core Principles',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-[#B44CFF]" />,
      action: () => navigateTo('#about'),
    },
    {
      id: 'nav-timeline',
      title: 'Go to Engineering Chronology & Milestones',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-[#FACC15]" />,
      action: () => navigateTo('[data-build-target="engineering-timeline"]'),
    },
    {
      id: 'nav-projects',
      title: 'Explore Flagship Projects',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-[#00F0FF]" />,
      action: () => navigateTo('#projects'),
    },
    {
      id: 'nav-architecture',
      title: 'Explore System Architecture',
      category: 'Navigation',
      icon: <Cpu className="w-4 h-4 text-[#00FF88]" />,
      action: () => navigateTo('#architecture'),
    },
    {
      id: 'nav-stack',
      title: 'View Technology Matrix',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-[#FACC15]" />,
      action: () => navigateTo('#stack'),
    },
    {
      id: 'nav-contact',
      title: 'Contact Rishi Kumar Shaw',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-[#FF414D]" />,
      action: () => navigateTo('#contact'),
    },

    // Projects
    {
      id: 'proj-ahi',
      title: 'Open AHI (Contextual Intelligence Agent)',
      category: 'Projects',
      icon: <Cpu className="w-4 h-4 text-[#00FF88]" />,
      action: () => {
        onClose();
        soundEffects.playClick();
        onOpenProject('ahi');
      },
    },
    {
      id: 'proj-aether',
      title: 'Open AETHER OS (Spatial Vision HUD)',
      category: 'Projects',
      icon: <Sparkles className="w-4 h-4 text-[#00F0FF]" />,
      action: () => {
        onClose();
        soundEffects.playClick();
        onOpenProject('aether-os');
      },
    },
    {
      id: 'proj-pirate',
      title: 'Open PIRATE-CIV (Multiplayer Engine - 695 Tests)',
      category: 'Projects',
      icon: <FolderGit2 className="w-4 h-4 text-[#FF414D]" />,
      action: () => {
        onClose();
        soundEffects.playClick();
        onOpenProject('pirate-civ');
      },
    },
    {
      id: 'proj-campus',
      title: 'Open CAMPUSRESOLVE (Workflow Platform)',
      category: 'Projects',
      icon: <FolderGit2 className="w-4 h-4 text-[#B44CFF]" />,
      action: () => {
        onClose();
        soundEffects.playClick();
        onOpenProject('campusresolve');
      },
    },
    {
      id: 'proj-callbuddy',
      title: 'Open CALLBUDDY AI (Telephony Copilot)',
      category: 'Projects',
      icon: <FolderGit2 className="w-4 h-4 text-[#FACC15]" />,
      action: () => {
        onClose();
        soundEffects.playClick();
        onOpenProject('callbuddy-ai');
      },
    },
    {
      id: 'proj-edge',
      title: 'Open EDGE AI (YOLOv8n Road Telemetry)',
      category: 'Projects',
      icon: <FolderGit2 className="w-4 h-4 text-[#00FF88]" />,
      action: () => {
        onClose();
        soundEffects.playClick();
        onOpenProject('edge-ai');
      },
    },

    // Tools
    {
      id: 'tool-terminal',
      title: 'Open Developer Terminal',
      category: 'Tools',
      shortcut: '`',
      icon: <Terminal className="w-4 h-4 text-[#00FF88]" />,
      action: () => {
        onClose();
        soundEffects.playClick();
        onOpenTerminal();
      },
    },
    {
      id: 'tool-compare',
      title: 'Compare Projects Side-by-Side',
      category: 'Tools',
      icon: <Scale className="w-4 h-4 text-[#00F0FF]" />,
      action: () => {
        onClose();
        soundEffects.playClick();
        onOpenComparator();
      },
    },

    // Preferences & Intro
    {
      id: 'pref-replay',
      title: 'Replay Agent Construction Intro',
      category: 'Preferences',
      icon: <RotateCcw className="w-4 h-4 text-[#FF414D]" />,
      action: () => {
        onClose();
        soundEffects.playClick();
        onReplayIntro();
      },
    },
    {
      id: 'pref-sound',
      title: soundActive ? 'Disable Sound Effects (Mute)' : 'Enable Sound Effects (Synthetic Audio)',
      category: 'Preferences',
      icon: soundActive ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00FF88]" />,
      action: toggleSound,
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation within palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl rounded-xl border border-white/15 bg-[#0C0D12]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <Search className="w-4 h-4 text-white/40 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="w-full bg-transparent font-mono text-sm text-white placeholder-white/40 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 font-mono text-[10px] text-white/40 border border-white/15 rounded bg-white/5">
            ESC
          </kbd>
        </div>

        {/* Command Results */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center font-mono text-xs text-white/40">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded border border-white/10 bg-white/5 shrink-0">
                      {cmd.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-medium">{cmd.title}</span>
                      <span className="font-mono text-[9px] text-white/40 tracking-wider uppercase">
                        {cmd.category}
                      </span>
                    </div>
                  </div>
                  {cmd.shortcut && (
                    <kbd className="px-1.5 py-0.5 font-mono text-[9px] text-white/40 border border-white/15 rounded bg-white/5">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="px-4 py-2 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-[10px] font-mono text-white/40">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>SYS_PALETTE_V5</span>
        </div>
      </div>
    </div>
  );
};

