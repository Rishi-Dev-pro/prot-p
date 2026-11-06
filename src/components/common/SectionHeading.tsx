import React from 'react';

interface SectionHeadingProps {
  number: string;
  category: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  category,
  title,
  titleAccent,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-4xl'} ${className}`}>
      {/* Technical prefix */}
      <div className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF414D] mb-3 ${isCenter ? 'justify-center' : ''}`}>
        <span className="w-1.5 h-1.5 bg-[#FF414D] rounded-full glow-accent" />
        <span className="text-white/40">// {number}</span>
        <span>{category}</span>
      </div>

      {/* Primary heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-[#F3F3F5] leading-tight">
        {title}{' '}
        {titleAccent && (
          <span className="text-outline hover:text-[#FF414D]/20 transition-colors">
            {titleAccent}
          </span>
        )}
      </h2>

      {/* Subtitle / context description */}
      {subtitle && (
        <p className="mt-4 text-[#92939F] text-sm md:text-base leading-relaxed font-sans max-w-2xl">
          {subtitle}
        </p>
      )}

      {/* Subtle technical separator bar */}
      <div className={`mt-6 flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
        <div className="h-[1px] w-12 bg-[#FF414D]" />
        <div className="h-[1px] w-24 bg-white/10" />
        <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
          SYS_SEC_{number}
        </span>
      </div>
    </div>
  );
};

