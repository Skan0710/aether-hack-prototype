import React from 'react';
import { VerdictStatus } from '../../types/payment';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pass' | 'warn' | 'hold' | 'ask' | 'neutral' | 'accent' | 'emerald' | 'amber' | 'rose';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  };

  const variantClasses = {
    pass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    warn: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    hold: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
    rose: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
    ask: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
    accent: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
    neutral: 'bg-navy-800 text-slate-300 border border-navy-700',
  };

  const dotColors = {
    pass: 'bg-emerald-400',
    emerald: 'bg-emerald-400',
    warn: 'bg-amber-400',
    amber: 'bg-amber-400',
    hold: 'bg-rose-400',
    rose: 'bg-rose-400',
    ask: 'bg-blue-400',
    accent: 'bg-cyan-400',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};

export const VerdictBadge: React.FC<{ verdict: VerdictStatus; size?: 'sm' | 'md' | 'lg' }> = ({
  verdict,
  size = 'md',
}) => {
  const map: Record<VerdictStatus, { label: string; variant: 'pass' | 'warn' | 'hold' | 'ask' }> = {
    PASS: { label: 'PASS • SAFE', variant: 'pass' },
    WARN: { label: 'WARN • CAUTION', variant: 'warn' },
    HOLD: { label: 'HOLD • INTERCEPT', variant: 'hold' },
    ASK: { label: 'ASK • VERIFY', variant: 'ask' },
  };

  const item = map[verdict] || { label: verdict, variant: 'neutral' };
  return (
    <Badge variant={item.variant} size={size} dot>
      {item.label}
    </Badge>
  );
};
