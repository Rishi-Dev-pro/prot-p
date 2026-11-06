import React from 'react';

export const ConstructionOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {/* Subtle blueprint workspace grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
    </div>
  );
};
