import React from 'react';
import { CalendarClock, AlertCircle, Home, Landmark, Zap } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { INITIAL_DEMO_USER } from '../../data/demoUser';
import { formatINR } from '../../utils/formatCurrency';

export const ObligationsCard: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'rent':
        return <Home className="w-4 h-4 text-emerald-400" />;
      case 'emi':
        return <Landmark className="w-4 h-4 text-amber-400" />;
      case 'utility':
        return <Zap className="w-4 h-4 text-slate-300" />;
      default:
        return <CalendarClock className="w-4 h-4 text-slate-400" />;
    }
  };

  const total = INITIAL_DEMO_USER.obligations.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Upcoming Obligations"
        subtitle="Mandatory payments scheduled before next salary"
        icon={<CalendarClock className="w-5 h-5 text-amber-400" />}
        action={
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 font-medium">
            Due in 5 days
          </span>
        }
      />
      <CardContent className="flex-1 space-y-3">
        {INITIAL_DEMO_USER.obligations.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-xl bg-navy-850 border border-navy-800 hover:border-navy-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-navy-800 border border-navy-750 flex items-center justify-center shrink-0">
                {getCategoryIcon(item.category)}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-slate-500">{item.dueDate}</span>
                  {item.isAutopay && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-navy-800 text-slate-500">
                      Auto-Debit
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-white">
                {formatINR(item.amount)}
              </span>
            </div>
          </div>
        ))}

        {/* Total Summary Footer */}
        <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Reserved cash requirement</span>
          </div>
          <span className="text-base font-bold text-amber-400">
            {formatINR(total)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
