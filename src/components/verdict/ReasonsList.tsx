import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { CheckCircle2, AlertTriangle, AlertCircle, ShieldAlert, ChevronDown, Code2 } from 'lucide-react';
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
  const [showCodes, setShowCodes] = useState(false);

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
    <Card>
      <CardHeader
        title="Why this decision?"
        subtitle="Plain-language reasons behind the verdict"
      />
      <CardContent className="space-y-4">
        {/* Plain Language Reasons */}
        <div className="space-y-2">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-navy-850 border border-navy-800"
            >
              {getIcon(verdict)}
              <span className="text-sm text-slate-200 leading-relaxed">
                {reason}
              </span>
            </div>
          ))}
        </div>

        {/* Reason Codes — collapsed by default */}
        {reasonCodes.length > 0 && (
          <div className="pt-2 border-t border-navy-800/70">
            <button
              type="button"
              onClick={() => setShowCodes(!showCodes)}
              className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-slate-300 transition-colors py-1"
            >
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>View technical audit codes</span>
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCodes ? 'rotate-180' : ''}`} />
            </button>
            {showCodes && (
              <div className="flex flex-wrap gap-1.5 mt-2 animate-in fade-in duration-150">
                {reasonCodes.map((code, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-navy-800 text-slate-400 border border-navy-750"
                  >
                    #{code}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
