import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { StatusIndicator } from '../common/StatusIndicator';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#08090D]/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg border border-white/15 bg-white/[0.04] flex items-center justify-center">
            <span className="font-mono font-bold text-xs text-white">RS</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-base tracking-wide text-white">
              Rishi Kumar Shaw
            </span>
            <span className="font-mono text-[9px] text-white/40 tracking-wider">
              ENGINEERING STUDIO
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-3 py-6">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.href.replace('#', '');
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`flex items-center justify-between px-4 py-3 rounded-xl font-display text-base tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-white/10 text-white font-semibold border border-white/15'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>{item.label}</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#FF414D] translate-x-1' : 'text-white/20'}`} />
            </a>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="border-t border-white/10 pt-5 flex flex-col gap-3">
        <StatusIndicator label="AVAILABLE FOR COLLABORATION" />
        <div className="font-mono text-[11px] text-white/40 flex justify-between pt-1">
          <span>LOCATION: INDIA</span>
          <span>DISCIPLINE: SOFTWARE ENG</span>
        </div>
      </div>
    </div>
  );
};
