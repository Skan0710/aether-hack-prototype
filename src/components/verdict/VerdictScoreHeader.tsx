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
      border: 'border-rose-500/40 bg-gradient-to-r from-navy-900 via-rose-950/20 to-navy-900',
      badge: 'bg-rose-500/20 text-rose-400 border border-rose-500/40',
      text: 'text-rose-400',
      meter: 'bg-rose-500',
      icon: <ShieldAlert className="w-8 h-8 text-rose-400 shrink-0" />,
      tag: 'HOLD • INTERCEPTED',
    },
    WARN: {
      border: 'border-amber-500/40 bg-gradient-to-r from-navy-900 via-amber-950/20 to-navy-900',
      badge: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
      text: 'text-amber-400',
      meter: 'bg-amber-500',
      icon: <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />,
      tag: 'WARN • ADVISORY',
    },
    ASK: {
      border: 'border-blue-500/40 bg-gradient-to-r from-navy-900 via-blue-950/20 to-navy-900',
      badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/40',
      text: 'text-blue-400',
      meter: 'bg-blue-500',
      icon: <HelpCircle className="w-8 h-8 text-blue-400 shrink-0" />,
      tag: 'ASK • VERIFY',
    },
    PASS: {
      border: 'border-emerald-500/40 bg-gradient-to-r from-navy-900 via-emerald-950/20 to-navy-900',
      badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
      text: 'text-emerald-400',
      meter: 'bg-emerald-500',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />,
      tag: 'PASS • SAFE',
    },
  }[verdict];

  return (
    <div className={`p-6 rounded-2xl border ${config.border} shadow-2xl relative overflow-hidden`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Verdict title & explanation */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider ${config.badge}`}>
              {config.tag}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Decision Priority Applied: <span className="text-white font-semibold">{verdict}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            {config.icon}
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {title}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal pt-1">
            {explanation}
          </p>
        </div>

        {/* Right: Risk Score Meter */}
        <div className="shrink-0 p-4 rounded-xl bg-navy-850/90 border border-navy-750 flex flex-col items-center justify-center min-w-[170px]">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Composite Risk Score
          </span>
          <div className="flex items-baseline gap-1 my-1">
            <span className={`text-4xl font-extrabold font-mono ${config.text}`}>
              {score}
            </span>
            <span className="text-slate-400 text-sm font-mono">/ 100</span>
          </div>
          <div className="w-full bg-navy-900 rounded-full h-2 mt-1 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${config.meter}`}
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-2">
            {score >= 75 ? 'Critical Threat Level' : score >= 40 ? 'Moderate Caution' : 'Minimal Threat'}
          </span>
        </div>
      </div>
    </div>
  );
};
