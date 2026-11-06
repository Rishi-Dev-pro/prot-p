import React, { useState, useEffect } from 'react';
import { Menu, Terminal, Search, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { MobileMenu } from './MobileMenu';
import { soundEffects } from '../../services/soundEffects';

interface NavbarProps {
  onReplayIntro?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenTerminal?: () => void;
  onOpenComparator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onReplayIntro,
  onOpenCommandPalette,
  onOpenTerminal,
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundEffects.isSoundEnabled());

  const handleToggleSound = () => {
    const next = soundEffects.toggleSound();
    setSoundEnabled(next);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'projects', 'architecture', 'stack', 'experiments', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="navbar"
        data-build-target="nav-bar"
        data-build-status="unbuilt"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08090D]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/60'
            : 'bg-transparent border-b border-white/5 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-11">
          {/* Brand Identity - Generous Breathing Room */}
          <a
            href="#hero"
            data-build-target="nav-logo"
            data-build-status="unbuilt"
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-1 focus:ring-white/30 rounded-lg py-1 px-1.5 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg border border-white/15 bg-white/[0.03] flex items-center justify-center group-hover:border-[#FF414D]/80 group-hover:bg-[#FF414D]/10 transition-all relative overflow-hidden">
              <span className="font-mono font-bold text-xs text-white group-hover:text-[#FF414D] transition-colors">
                RS
              </span>
              <span className="absolute bottom-0 right-0 w-1 h-1 bg-[#FF414D]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm tracking-wide text-[#F3F3F5] group-hover:text-white transition-colors">
                Rishi Kumar Shaw
              </span>
              <span className="font-mono text-[9px] text-white/40 tracking-wider">
                ENGINEERING
              </span>
            </div>
          </a>

          {/* Desktop Center Links - Spaced, Refined Typography */}
          <nav
            data-build-target="nav-links"
            data-build-status="unbuilt"
            className="hidden lg:flex items-center gap-2 xl:gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-[#0E1017]/70 backdrop-blur-xl shadow-inner"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1 font-mono text-[11px] tracking-wider uppercase rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white/15 text-white font-medium border border-white/20 shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div
            data-build-target="nav-actions"
            data-build-status="unbuilt"
            className="hidden sm:flex items-center gap-2.5 sm:gap-3"
          >
            {/* Quick Command Palette Button */}
            {onOpenCommandPalette && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenCommandPalette();
                }}
                title="Search commands (⌘K / Ctrl+K)"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-mono text-white/70 hover:text-white border border-white/10 hover:border-white/25 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#FF414D]" />
                <span className="hidden xl:inline">COMMANDS</span>
                <kbd className="px-1.5 py-0.5 text-[9px] rounded bg-white/10 text-white/60 font-mono">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Terminal Toggle Button */}
            {onOpenTerminal && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenTerminal();
                }}
                title="Launch Developer Terminal (`)"
                className="p-2 text-white/60 hover:text-[#00FF88] border border-white/10 hover:border-white/25 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Audio Effects Toggle Button */}
            <button
              onClick={handleToggleSound}
              title={soundEnabled ? 'Mute sound effects' : 'Enable audio feedback'}
              className="p-2 text-white/60 hover:text-white border border-white/10 hover:border-white/25 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#00FF88]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-white/40" />
              )}
            </button>

            {/* Replay Intro Button */}
            {onReplayIntro && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onReplayIntro();
                }}
                title="Replay orchestrated construction sequence"
                className="hidden 2xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono text-white/50 hover:text-white border border-white/10 hover:border-white/25 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-[#FF414D]" />
                <span>REPLAY</span>
              </button>
            )}

            {/* Contact Action Button */}
            <a
              href="#contact"
              className="px-4 py-1.5 text-xs font-mono tracking-wider uppercase font-semibold text-white bg-white/10 hover:bg-[#FF414D] border border-white/15 hover:border-[#FF414D] rounded-lg transition-all shadow-sm cursor-pointer ml-1"
            >
              CONTACT
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            {onOpenCommandPalette && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenCommandPalette();
                }}
                className="p-2 text-white/80 border border-white/10 rounded-lg bg-white/[0.03]"
              >
                <Search className="w-4 h-4 text-[#FF414D]" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation"
              className="p-2 text-white/80 hover:text-white border border-white/10 rounded-lg bg-white/[0.03] cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
};
