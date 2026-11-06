import React, { useState, useCallback } from 'react';
import { GridBackground } from './components/common/GridBackground';
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

export const App: React.FC = () => {
  const [introActive, setIntroActive] = useState(true);

  const handleIntroComplete = useCallback(() => {
    setIntroActive(false);
  }, []);

  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIntroActive(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090D] text-[#F3F3F5] selection:bg-[#FF414D] selection:text-white overflow-x-hidden font-sans">
      {/* Background Grid Canvas */}
      <GridBackground />

      {/* Desktop Interactive Custom Pointer */}
      <CustomCursor />

      {/* Scripted 20-Agent Website Construction Experience (V2 Physical Synchronization) */}
      {introActive && (
        <IntroExperience
          onComplete={handleIntroComplete}
        />
      )}

      {/* Navigation Header */}
      <Navbar onReplayIntro={handleReplayIntro} />

      {/* Main Portfolio Sections */}
      <main className="relative z-10 select-auto">
        {/* SECTION B: HERO */}
        <Hero />

        {/* SECTION C: ABOUT */}
        <About />

        {/* SECTION D: FLAGSHIP PROJECTS */}
        <Projects />

        {/* SECTION E: SYSTEM ARCHITECTURE */}
        <Architecture />

        {/* SECTION F: TECHNOLOGY MATRIX */}
        <TechStack />

        {/* SECTION G: CURRENT EXPERIMENTS */}
        <Experiments />

        {/* SECTION H: CONTACT & FOOTER */}
        <Contact />
      </main>
    </div>
  );
};

export default App;
