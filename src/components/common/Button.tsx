import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  icon?: boolean;
  techCode?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  icon = false,
  techCode,
  className = '',
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all duration-300 select-none group cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF414D]';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-2',
    md: 'text-xs px-5 py-2.5 gap-2.5',
    lg: 'text-sm px-6 py-3.5 gap-3',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#FF414D] text-white hover:bg-[#e03541] active:scale-[0.98] shadow-lg shadow-[#FF414D]/20 border border-[#FF414D]',
    secondary:
      'bg-[#101116] text-[#F3F3F5] border border-white/10 hover:border-white/30 hover:bg-white/[0.04] active:scale-[0.98]',
    outline:
      'bg-transparent text-[#F3F3F5] border border-[#FF414D]/40 hover:border-[#FF414D] hover:bg-[#FF414D]/10 text-[#FF414D]',
    ghost:
      'bg-transparent text-[#92939F] hover:text-[#F3F3F5] hover:bg-white/5 border border-transparent',
  }[variant];

  const content = (
    <>
      {techCode && (
        <span className="text-[10px] text-white/40 mr-1 font-mono tracking-tighter">
          [{techCode}]
        </span>
      )}
      <span>{children}</span>
      {icon && (
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
      {/* Corner notches for futuristic aesthetic */}
      <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
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

