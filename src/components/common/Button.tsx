import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  icon?: boolean;
  techCode?: string; // Kept optional for backward compatibility
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  icon = false,
  className = '',
  techCode: _techCode,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 select-none group cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-2',
    md: 'text-xs sm:text-sm px-5 py-2.5 gap-2.5',
    lg: 'text-sm sm:text-base px-6 py-3.5 gap-3',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#FF414D] text-white hover:bg-[#E63743] active:scale-[0.98] shadow-md shadow-[#FF414D]/25 border border-[#FF414D]/90',
    secondary:
      'bg-[#101116] text-[#F3F3F5] hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/[0.05] active:scale-[0.98] shadow-sm',
    outline:
      'bg-transparent text-[#F3F3F5] hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.04] active:scale-[0.98]',
    ghost:
      'bg-transparent text-[#92939F] hover:text-[#F3F3F5] hover:bg-white/[0.04] border border-transparent active:scale-[0.98]',
  }[variant];

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-current opacity-80 group-hover:opacity-100" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};
