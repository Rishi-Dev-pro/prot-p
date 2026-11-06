import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { ArchitectureGraph } from './ArchitectureGraph';
import { ArchitectureDetails } from './ArchitectureDetails';
import { ARCHITECTURE_DOMAINS } from '../../data/architecture';
import { ArchitectureDomain } from '../../types/architecture';
import { Network } from 'lucide-react';

export const Architecture: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<ArchitectureDomain>(
    ARCHITECTURE_DOMAINS[0]
  );

  return (
    <section id="architecture" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="03"
          category="SYSTEM ARCHITECTURE"
          title="HOW I THINK ABOUT"
          titleAccent="SYSTEMS."
          subtitle="Software is not an isolated script. It is an interdependent ecosystem of reactive viewports, fault-tolerant runtimes, persistent schemas, and edge telemetry."
        />

        {/* Mobile Domain Selector Tabs */}
        <div className="flex sm:hidden overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
          {ARCHITECTURE_DOMAINS.map((domain) => {
            const isSelected = domain.id === selectedDomain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain)}
                className={`shrink-0 px-3 py-1.5 rounded-lg font-mono text-xs border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#FF414D] bg-[#FF414D]/15 text-white'
                    : 'border-white/10 bg-[#101116] text-[#92939F]'
                }`}
              >
                {domain.number} {domain.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Main interactive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Graph Visualization */}
          <div
            data-build-target="architecture-graph"
            data-build-status="unbuilt"
            className="lg:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#101116]/40 backdrop-blur-sm p-4 relative overflow-hidden"
          >
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 mb-2 px-2 text-xs font-mono text-white/50">
              <div className="flex items-center gap-2">
                <Network className="w-3.5 h-3.5 text-[#FF414D]" />
                <span>INTERACTIVE_GRAPH_EXPLORER</span>
              </div>
              <span className="text-[10px] text-white/30">CLICK NODES TO INSPECT</span>
            </div>

            <ArchitectureGraph
              domains={ARCHITECTURE_DOMAINS}
              selectedDomain={selectedDomain}
              onSelectDomain={setSelectedDomain}
            />

            <div className="w-full text-center font-mono text-[10px] text-white/30 pt-2 border-t border-white/5">
              CENTRAL BUS: EVENT-DRIVEN PROTOCOL // 6 CONCURRENT SYSTEM DOMAINS
            </div>
          </div>

          {/* Deep Domain Details Panel */}
          <div
            data-build-target="architecture-details"
            data-build-status="unbuilt"
            className="lg:col-span-6"
          >
            <ArchitectureDetails selectedDomain={selectedDomain} />
          </div>
        </div>
      </div>
    </section>
  );
};

