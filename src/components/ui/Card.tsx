import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: 'pass' | 'warn' | 'hold' | 'ask' | 'accent' | 'none';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = 'none',
  hoverEffect = false,
  ...props
}) => {
  const glowClasses = {
    pass: 'border-emerald-500/25',
    warn: 'border-amber-500/25',
    hold: 'border-rose-500/25',
    ask: 'border-blue-500/25',
    accent: 'border-cyan-500/25',
    none: 'border-navy-800',
  };

  return (
    <div
      className={`bg-navy-900 rounded-2xl border shadow-soft-sm ${glowClasses[glow]} ${
        hoverEffect ? 'kavach-card-hover' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, action, icon, className = '' }) => (
  <div className={`p-5 pb-4 flex items-start justify-between gap-4 border-b border-navy-800/70 ${className}`}>
    <div className="flex items-center gap-3">
      {icon && (
        <div className="w-9 h-9 rounded-xl bg-navy-800 border border-navy-750 flex items-center justify-center text-slate-300 shrink-0">
          {icon}
        </div>
      )}
      <div>
        <h3 className="font-semibold text-white tracking-tight text-base">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{subtitle}</p>}
      </div>
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);
