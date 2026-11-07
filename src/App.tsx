import React, { useState, useCallback, useEffect } from 'react';
import { GridBackground } from './components/common/GridBackground';
import { Construction3DCanvas } from './components/canvas/Construction3DCanvas';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { Projects } from './components/projects/Projects';
import { Architecture } from './components/architecture/Architecture';
import { TechStack } from './components/stack/TechStack';
import { Experiments } from './components/experiments/Experiments';
import { Contact } from './components/contact/Contact';
import { IntroExperience } from './components/intro/IntroExperience';
import { CommandPalette } from './components/common/CommandPalette';
import { TerminalModal } from './components/common/TerminalModal';
import { ProjectComparator } from './components/projects/ProjectComparator';
import { FLAGSHIP_PROJECTS } from './data/projects';
import { FlagshipProject } from './types/project';
import { soundEffects } from './services/soundEffects';

export const App: React.FC = () => {
  const [introActive, setIntroActive] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [comparatorOpen, setComparatorOpen] = useState(false);
  const [externalProject, setExternalProject] = useState<FlagshipProject | null>(null);

  const handleIntroComplete = useCallback(() => {
    // Preserve IntroExperience mounted so the 6 agent cursors remain visible at their resting stations
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('is-booting');
      document.body.classList.remove('is-booting');
      document.body.classList.remove('construction-active');
    }
  }, []);

  const handleReplayIntro = useCallback(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('is-booting');
      document.body.classList.add('construction-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const globalOrch = (window as unknown as { __orchestrator?: { restart: () => void } }).__orchestrator;
    if (globalOrch) {
      globalOrch.restart();
    } else {
      setIntroActive(true);
    }
  }, []);

  const handleOpenProjectById = useCallback((id: string) => {
    const found = FLAGSHIP_PROJECTS.find(
      (p) => p.id.toLowerCase() === id.toLowerCase() || p.title.toLowerCase().includes(id.toLowerCase())
    );
    if (found) {
      setExternalProject(found);
      const projEl = document.getElementById('projects');
      if (projEl) {
        projEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Global Keyboard Shortcuts (Ctrl+K / Cmd+K and `)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an active input/textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        soundEffects.playClick();
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        soundEffects.playClick();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090D] text-[#F3F3F5] selection:bg-[#FF414D] selection:text-white overflow-x-hidden font-sans">
      {/* Background Grid Canvas */}
      <GridBackground />

      {/* Atmospheric Three.js 3D Construction & Spatial Depth Layer */}
      <Construction3DCanvas />

      {/* Desktop Interactive Custom Pointer */}
      <CustomCursor />

      {/* Scripted 6-Agent Website Construction Experience (V6 Coordinated Symmetrical Choreography) */}
      {introActive && (
        <IntroExperience
          onComplete={handleIntroComplete}
        />
      )}

      {/* Navigation Header */}
      <Navbar
        onReplayIntro={handleReplayIntro}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenComparator={() => setComparatorOpen(true)}
      />

      {/* Main Portfolio Sections */}
      <main id="main-content" className="relative z-10 select-auto">
        {/* SECTION B: HERO */}
        <Hero
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenComparator={() => setComparatorOpen(true)}
        />

        {/* SECTION C: ABOUT */}
        <About />

        {/* SECTION D: FLAGSHIP PROJECTS */}
        <Projects
          externalSelectedProject={externalProject}
          onClearExternalProject={() => setExternalProject(null)}
        />

        {/* SECTION E: SYSTEM ARCHITECTURE */}
        <Architecture />

        {/* SECTION F: TECHNOLOGY MATRIX */}
        <TechStack />

        {/* SECTION G: CURRENT EXPERIMENTS */}
        <Experiments />

        {/* SECTION H: CONTACT & FOOTER */}
        <Contact />
      </main>

      {/* Command Palette Modal (Ctrl + K / Cmd + K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onReplayIntro={handleReplayIntro}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenProject={handleOpenProjectById}
        onOpenComparator={() => setComparatorOpen(true)}
      />

      {/* Developer Terminal Modal (`) */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenProject={handleOpenProjectById}
        onOpenComparator={() => setComparatorOpen(true)}
      />

      {/* Side-by-Side Project Comparator Workbench */}
      <ProjectComparator
        isOpen={comparatorOpen}
        onClose={() => setComparatorOpen(false)}
      />
    </div>
  );
};

export default App;
