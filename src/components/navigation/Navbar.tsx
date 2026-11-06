import React, { useState, useEffect } from 'react';
import { Menu, Terminal, Search, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { StatusIndicator } from '../common/StatusIndicator';
import { MobileMenu } from './MobileMenu';
import { Button } from '../common/Button';
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
      setIsScrolled(window.scrollY > 40);

      // Active section detection
      const sections = ['hero', 'about', 'projects', 'architecture', 'stack', 'experiments', 'contact'];
      const scrollPos = window.scrollY + 200;

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
            ? 'bg-[#08090D]/85 backdrop-blur-md border-b border-white/10 py-2.5 shadow-xl shadow-black/40'
            : 'bg-transparent border-b border-white/5 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity */}
          <a
            href="#hero"
            data-build-target="nav-logo"
            data-build-status="unbuilt"
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-[#FF414D] rounded"
          >
            <div className="w-8 h-8 rounded border border-white/20 bg-[#101116] flex items-center justify-center group-hover:border-[#FF414D] transition-colors relative overflow-hidden">
              <span className="font-mono font-bold text-xs text-[#FF414D]">RS</span>
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-[#FF414D]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider text-[#F3F3F5] group-hover:text-white transition-colors">
                RISHI.SHΛW
              </span>
              <span className="font-mono text-[9px] text-[#92939F] tracking-tight">
                SYS_ID: RKS_001
              </span>
            </div>
          </a>

          {/* Desktop Center Links */}
          <nav
            data-build-target="nav-links"
            data-build-status="unbuilt"
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#101116]/80 backdrop-blur-md"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-1 font-mono text-[11px] tracking-wider uppercase rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white font-medium border border-white/20 shadow-sm'
                      : 'text-[#92939F] hover:text-[#F3F3F5] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action area */}
          <div
            data-build-target="nav-actions"
            data-build-status="unbuilt"
            className="hidden sm:flex items-center gap-2 lg:gap-3"
          >
            {/* Quick Command Palette Button */}
            {onOpenCommandPalette && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenCommandPalette();
                }}
                title="Search commands (Ctrl + K)"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-white/60 hover:text-white border border-white/10 hover:border-white/30 rounded bg-[#101116]/80 transition-all cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#FF414D]" />
                <span className="hidden xl:inline">COMMANDS</span>
                <kbd className="px-1 py-0.5 text-[9px] rounded bg-white/10 text-white/60">⌘K</kbd>
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
                className="p-1.5 text-white/60 hover:text-[#00FF88] border border-white/10 hover:border-white/30 rounded bg-[#101116]/80 transition-all cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Audio Effects Toggle Button */}
            <button
              onClick={handleToggleSound}
              title={soundEnabled ? 'Mute sound effects' : 'Enable synthetic audio effects'}
              className="p-1.5 text-white/60 hover:text-white border border-white/10 hover:border-white/30 rounded bg-[#101116]/80 transition-all cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#00FF88]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-white/40" />
              )}
            </button>

            {onReplayIntro && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onReplayIntro();
                }}
                title="Replay scripted 20-agent construction sequence"
                className="hidden 2xl:inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono text-white/50 hover:text-white border border-white/10 hover:border-white/25 rounded bg-[#101116]/60 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-[#FF414D]" />
                <span>REPLAY</span>
              </button>
            )}

            <StatusIndicator
              label="ONLINE"
              sublabel="INDIA"
              pulseColor="#00FF88"
              className="hidden md:inline-flex"
            />

            <Button
              href="#contact"
              variant="outline"
              size="sm"
              techCode="06"
              className="text-[11px]"
            >
              CONTACT
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            {onOpenCommandPalette && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenCommandPalette();
                }}
                className="p-2 text-white/80 border border-white/10 rounded-md bg-[#101116]"
              >
                <Search className="w-4 h-4 text-[#FF414D]" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation"
              className="p-2 text-white/80 hover:text-white border border-white/10 rounded-md bg-[#101116] cursor-pointer"
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
