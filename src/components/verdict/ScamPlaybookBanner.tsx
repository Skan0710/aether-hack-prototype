import React from 'react';
import { ShieldAlert, BookOpen, AlertOctagon } from 'lucide-react';

interface ScamPlaybookBannerProps {
  playbook: {
    name: string;
    similarity: number;
    tactics: string[];
  };
}

export const ScamPlaybookBanner: React.FC<ScamPlaybookBannerProps> = ({ playbook }) => {
  return (
    <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-rose-400 uppercase">
                Known Scam Playbook Matched
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold">
                {playbook.similarity}% Correlation
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">{playbook.name}</h4>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-rose-300">
          <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
          <span>High-Confidence Social Engineering Trap</span>
        </div>
      </div>

      <div className="pt-2 border-t border-rose-500/20">
        <div className="text-[11px] font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-rose-400" />
          <span>Recognized Coercive Tactics:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {playbook.tactics.map((tactic, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-lg bg-navy-900/90 text-rose-200 border border-rose-500/30 font-medium"
            >
              • {tactic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
