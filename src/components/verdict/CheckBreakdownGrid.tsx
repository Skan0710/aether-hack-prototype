import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { RiskCheckScore } from '../../types/payment';
import { ShieldAlert, UserCheck, Mic, BrainCircuit } from 'lucide-react';

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
    { data: checks.script, icon: <BrainCircuit className="w-4 h-4" /> },
    { data: checks.payee, icon: <UserCheck className="w-4 h-4" /> },
    { data: checks.voice, icon: <Mic className="w-4 h-4" /> },
    { data: checks.context, icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  const statusLabel = (status: string) =>
    status === 'danger' ? 'High Risk' : status === 'warning' ? 'Caution' : 'Safe';

  const statusClasses = (status: string) =>
    status === 'danger'
      ? 'text-rose-400 bg-rose-500/10'
      : status === 'warning'
      ? 'text-amber-400 bg-amber-500/10'
      : 'text-emerald-400 bg-emerald-500/10';

  return (
    <Card>
      <CardHeader
        title="Model breakdown"
        subtitle="How each engine scored this payment"
      />
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {checkItems.map(({ data, icon }) => (
            <div
              key={data.key}
              className="p-3.5 rounded-xl bg-navy-850 border border-navy-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  {icon}
                  <span className="text-xs font-medium text-slate-200">{data.name}</span>
                </div>
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${statusClasses(data.status)}`}>
                  {statusLabel(data.status)}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{data.headline}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
