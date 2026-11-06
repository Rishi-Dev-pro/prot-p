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
      {/* Editorial category prefix */}
      <div className={`inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#FF414D] mb-3.5 ${isCenter ? 'justify-center' : ''}`}>
        <span className="w-1.5 h-1.5 bg-[#FF414D] rounded-full shadow-[0_0_8px_#FF414D]" />
        <span className="text-white/40">// {number}</span>
        <span className="font-semibold text-white/80">{category}</span>
      </div>

      {/* Primary heading - High-Contrast Editorial Typography */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[#F3F3F5] leading-tight">
        <span>{title}</span>{' '}
        {titleAccent && (
          <span className="text-white/40 font-light transition-colors hover:text-white/70">
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
        <div className="h-[1px] w-12 bg-[#FF414D]/60" />
        <div className="h-[1px] w-24 bg-white/10" />
      </div>
    </div>
  );
};
