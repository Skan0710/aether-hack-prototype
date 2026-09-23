import React from 'react';
import { ShieldAlert, BookOpen } from 'lucide-react';

interface ScamPlaybookBannerProps {
  playbook: {
    name: string;
    similarity: number;
    tactics: string[];
  };
}

export const ScamPlaybookBanner: React.FC<ScamPlaybookBannerProps> = ({ playbook }) => {
  return (
    <div className="p-4 rounded-xl bg-rose-500/[0.06] border border-rose-500/25 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-rose-400">
                Matches a known scam pattern
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 font-medium">
                {playbook.similarity}% match
              </span>
            </div>
            <h4 className="text-sm font-semibold text-white mt-0.5">{playbook.name}</h4>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-rose-500/15">
        <div className="text-[11px] text-slate-400 mb-1.5 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-rose-400/70" />
          <span>Common tactics in this scam:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {playbook.tactics.map((tactic, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-lg bg-navy-900/60 text-rose-200 border border-rose-500/20"
            >
              {tactic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
