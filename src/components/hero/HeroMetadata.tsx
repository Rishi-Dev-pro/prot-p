import React from 'react';

export const HeroMetadata: React.FC = () => {
  const metadataItems = [
    { label: 'SYSTEM_ID', value: 'RKS_001' },
    { label: 'DISCIPLINE', value: 'SOFTWARE ENGINEERING' },
    { label: 'FOCUS', value: 'AI / FULL STACK / SYSTEMS' },
    { label: 'LOCATION', value: 'INDIA' },
    { label: 'EDUCATION', value: 'BCA (MAWT), BRAINWARE UNIVERSITY' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 border-y border-white/10 py-4 my-8 bg-[#101116]/40 backdrop-blur-sm">
      {metadataItems.map((item, idx) => (
        <div key={idx} className="flex flex-col border-l border-white/10 pl-3">
          <span className="font-mono text-[9px] text-[#92939F] uppercase tracking-wider">
            {item.label}
          </span>
          <span className="font-mono text-[11px] text-[#F3F3F5] font-medium tracking-tight mt-0.5 truncate">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

