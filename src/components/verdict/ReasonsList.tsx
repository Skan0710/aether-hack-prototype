import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { CheckCircle2, AlertTriangle, AlertCircle, ShieldAlert, Code } from 'lucide-react';
import { VerdictStatus } from '../../types/payment';

interface ReasonsListProps {
  verdict: VerdictStatus;
  reasons: string[];
  reasonCodes: string[];
}

export const ReasonsList: React.FC<ReasonsListProps> = ({
  verdict,
  reasons,
  reasonCodes,
}) => {
  const getIcon = (v: VerdictStatus) => {
    switch (v) {
      case 'HOLD':
        return <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />;
      case 'WARN':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />;
      case 'ASK':
        return <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />;
      case 'PASS':
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />;
    }
  };

  return (
    <Card className="border-navy-750">
      <CardHeader
        title="Why Was This Decision Generated?"
        subtitle="Transparent plain-language explainability with deterministic reason codes"
        icon={<Code className="w-5 h-5 text-cyan-400" />}
        action={
          <span className="text-xs px-2.5 py-1 rounded-full bg-navy-800 text-slate-300 border border-navy-700 font-mono">
            {reasons.length} Explanatory Factors
          </span>
        }
      />
      <CardContent className="space-y-4">
        {/* Plain Language Reasons */}
        <div className="space-y-2.5">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-navy-850 border border-navy-800"
            >
              {getIcon(verdict)}
              <div className="flex-1">
                <span className="text-sm font-medium text-white leading-relaxed">
                  {reason}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Reason Codes */}
        {reasonCodes.length > 0 && (
          <div className="pt-3 border-t border-navy-800/80">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              System Audit Reason Codes
            </div>
            <div className="flex flex-wrap gap-1.5">
              {reasonCodes.map((code, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-navy-800 text-slate-300 border border-navy-700"
                >
                  #{code}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
