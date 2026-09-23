import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { RiskCheckScore } from '../../types/payment';
import { Layers, ShieldAlert, UserCheck, Mic, BrainCircuit } from 'lucide-react';

interface CheckBreakdownGridProps {
  checks: {
    script: RiskCheckScore;
    payee: RiskCheckScore;
    voice: RiskCheckScore;
    context: RiskCheckScore;
  };
}

export const CheckBreakdownGrid: React.FC<CheckBreakdownGridProps> = ({ checks }) => {
  const checkItems = [
    {
      data: checks.script,
      icon: <BrainCircuit className="w-4 h-4 text-cyan-400" />,
      weightLabel: '35% Fusion Weight',
    },
    {
      data: checks.payee,
      icon: <UserCheck className="w-4 h-4 text-emerald-400" />,
      weightLabel: '30% Fusion Weight',
    },
    {
      data: checks.voice,
      icon: <Mic className="w-4 h-4 text-rose-400" />,
      weightLabel: '20% Fusion Weight',
    },
    {
      data: checks.context,
      icon: <ShieldAlert className="w-4 h-4 text-amber-400" />,
      weightLabel: '15% Fusion Weight',
    },
  ];

  return (
    <Card className="border-navy-750">
      <CardHeader
        title="Multi-Model Risk Vector Breakdown"
        subtitle="Individual sub-engine evaluations and weighted contribution"
        icon={<Layers className="w-5 h-5 text-indigo-400" />}
      />
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checkItems.map(({ data, icon, weightLabel }) => {
            const scorePct = Math.round(data.score * 100);
            const statusColor =
              data.status === 'danger'
                ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                : data.status === 'warning'
                ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';

            return (
              <div
                key={data.key}
                className="p-4 rounded-xl bg-navy-850 border border-navy-800 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-navy-800 border border-navy-750 flex items-center justify-center shrink-0">
                      {icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{data.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{weightLabel}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-0.5 rounded font-mono text-xs font-bold border ${statusColor}`}>
                    {scorePct}/100
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-200">{data.headline}</p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{data.detail}</p>
                </div>

                <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Weight Contribution:</span>
                  <span className="text-slate-300 font-semibold">
                    +{data.weightedContribution.toFixed(3)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
