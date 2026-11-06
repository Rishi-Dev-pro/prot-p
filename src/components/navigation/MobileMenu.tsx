import React from 'react';
import { X } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-[#08090D]/95 backdrop-blur-xl lg:hidden flex flex-col justify-between p-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FF414D] rounded-full" />
          <span className="font-display font-bold text-lg tracking-wider text-white">
            RISHI.SHΛW
          </span>
          <span className="font-mono text-[10px] text-white/40">// RKS_001</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-4 py-8">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.href.replace('#', '');
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`flex items-center justify-between py-2 text-lg font-display tracking-wider border-b border-white/5 transition-all ${
                isActive
                  ? 'text-[#FF414D] font-bold pl-2 border-[#FF414D]/40'
                  : 'text-[#92939F] hover:text-[#F3F3F5] hover:pl-2'
              }`}
            >
              <span>{item.label}</span>
              <span className="font-mono text-xs text-white/30">[{item.code}]</span>
            </a>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
        <StatusIndicator label="AVAILABLE FOR COLLABORATION" />
        <div className="font-mono text-[11px] text-white/40 flex justify-between">
          <span>LOC: INDIA</span>
          <span>DISCIPLINE: SOFTWARE ENG</span>
        </div>
      </div>
    </div>
  );
};

