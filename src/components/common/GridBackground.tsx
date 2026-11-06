import React from 'react';

export const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Radial Vignette to focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#08090D_90%)]" />

      {/* Ambient glowing accent spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF414D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-[#B44CFF]/5 rounded-full blur-3xl pointer-events-none" />

    </div>
  );
};

