import React from 'react';
import { History, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { VerdictBadge } from '../ui/Badge';
import { Link, useNavigate } from 'react-router-dom';
import { formatINR } from '../../utils/formatCurrency';

export const RecentActivityPreview: React.FC = () => {
  const navigate = useNavigate();

  // Initial seed checks for preview
  const recentItems = [
    {
      id: 'chk-seed-1',
      payee: 'Swiggy Online',
      vpa: 'swiggy@icici',
      amount: 450,
      verdict: 'PASS' as const,
      time: 'Today, 1:15 PM',
      risk: 12,
    },
    {
      id: 'chk-seed-2',
      payee: 'Airtel Broadband Bill',
      vpa: 'airtel.bills@axis',
      amount: 1199,
      verdict: 'PASS' as const,
      time: 'Yesterday',
      risk: 8,
    },
    {
      id: 'chk-seed-3',
      payee: 'Instant Cash Prize Admin',
      vpa: 'lottery991@paytm',
      amount: 4999,
      verdict: 'HOLD' as const,
      time: '3 days ago',
      risk: 96,
    },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Recent Payment Screenings"
        subtitle="Last pre-payment evaluations on this device"
        icon={<History className="w-5 h-5 text-slate-300" />}
        action={
          <Link
            to="/activity"
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
          >
            <span>All History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
      />
      <CardContent className="flex-1 space-y-2.5">
        {recentItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate('/activity')}
            className="flex items-center justify-between p-3 rounded-xl bg-navy-850 hover:bg-navy-800 border border-navy-800 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-navy-800 border border-navy-750 flex items-center justify-center shrink-0">
                {item.verdict === 'PASS' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                  {item.payee}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">{item.vpa} • {item.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-sm font-semibold text-white font-mono">
                  {formatINR(item.amount)}
                </span>
                <p className="text-[10px] text-slate-400 font-mono">Risk {item.risk}/100</p>
              </div>
              <VerdictBadge verdict={item.verdict} size="sm" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
