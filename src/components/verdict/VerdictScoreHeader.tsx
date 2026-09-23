import React from 'react';
import { VerdictStatus } from '../../types/payment';
import { ShieldAlert, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

interface VerdictScoreHeaderProps {
  verdict: VerdictStatus;
  score: number;
  title: string;
  explanation: string;
}

export const VerdictScoreHeader: React.FC<VerdictScoreHeaderProps> = ({
  verdict,
  score,
  title,
  explanation,
}) => {
  const config = {
    HOLD: {
      border: 'border-rose-500/30',
      badge: 'bg-rose-500/15 text-rose-400',
      text: 'text-rose-400',
      meter: 'bg-rose-500',
      iconWrap: 'bg-rose-500/10 text-rose-400',
      icon: <ShieldAlert className="w-7 h-7" />,
      tag: "Don't pay yet",
    },
    WARN: {
      border: 'border-amber-500/30',
      badge: 'bg-amber-500/15 text-amber-400',
      text: 'text-amber-400',
      meter: 'bg-amber-500',
      iconWrap: 'bg-amber-500/10 text-amber-400',
      icon: <AlertTriangle className="w-7 h-7" />,
      tag: 'Proceed with caution',
    },
    ASK: {
      border: 'border-blue-500/30',
      badge: 'bg-blue-500/15 text-blue-400',
      text: 'text-blue-400',
      meter: 'bg-blue-500',
      iconWrap: 'bg-blue-500/10 text-blue-400',
      icon: <HelpCircle className="w-7 h-7" />,
      tag: 'Needs quick verification',
    },
    PASS: {
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-500/15 text-emerald-400',
      text: 'text-emerald-400',
      meter: 'bg-emerald-500',
      iconWrap: 'bg-emerald-500/10 text-emerald-400',
      icon: <ShieldCheck className="w-7 h-7" />,
      tag: 'Safe to proceed',
    },
  }[verdict];

  return (
    <div className={`p-6 sm:p-7 rounded-2xl border bg-navy-900 ${config.border}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Verdict title & explanation — the bottom line first */}
        <div className="flex items-start gap-4 min-w-0">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${config.iconWrap}`}>
            {config.icon}
          </div>
          <div className="space-y-1.5 min-w-0">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block ${config.badge}`}>
              {config.tag}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {title}
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              {explanation}
            </p>
          </div>
        </div>

        {/* Right: Risk Score Meter */}
        <div className="shrink-0 p-4 rounded-xl bg-navy-850 border border-navy-800 flex flex-col items-center justify-center min-w-[150px] self-stretch md:self-auto">
          <span className="text-[11px] text-slate-500 uppercase tracking-wide">
            Risk Score
          </span>
          <div className="flex items-baseline gap-1 my-1">
            <span className={`text-3xl font-bold ${config.text}`}>
              {score}
            </span>
            <span className="text-slate-500 text-sm">/ 100</span>
          </div>
          <div className="w-full bg-navy-900 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${config.meter}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
