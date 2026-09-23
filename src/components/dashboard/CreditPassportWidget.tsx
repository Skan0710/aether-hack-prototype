import React from 'react';
import { Award, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Link } from 'react-router-dom';

export const CreditPassportWidget: React.FC = () => {
  return (
    <Card className="h-full flex flex-col border-emerald-500/20">
      <CardHeader
        title="Credit Passport"
        subtitle="Explainable Cash-Flow Health Passport"
        icon={<Award className="w-5 h-5 text-emerald-400" />}
        action={
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
            Demo 3
          </span>
        }
      />
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        {/* Score Display */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-navy-850 border border-navy-800">
          <div>
            <div className="text-xs text-slate-500">Composite Score</div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl font-bold text-white">78</span>
              <span className="text-slate-500 text-sm">/ 100</span>
            </div>
            <div className="inline-flex items-center gap-1.5 mt-1.5 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Low Financial Risk</span>
            </div>
          </div>
          {/* Circular Score Bar preview */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-navy-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400 transition-all duration-1000 ease-out"
                strokeDasharray="78, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-bold text-white">78%</span>
          </div>
        </div>

        {/* Factors quick list */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-navy-850/60 border border-navy-800">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Salary: 12 of 12 months credited</span>
            </div>
            <span className="text-emerald-400 font-semibold">+Strong</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-navy-850/60 border border-navy-800">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Rent & Utility bills: 96% on-time</span>
            </div>
            <span className="text-emerald-400 font-semibold">+Positive</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-navy-850/60 border border-navy-800">
            <div className="flex items-center gap-2 text-slate-300">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Single late EMI in March</span>
            </div>
            <span className="text-amber-400 font-semibold">-Minor</span>
          </div>
        </div>

        {/* Action Link */}
        <Link
          to="/credit-passport"
          className="w-full py-2.5 px-4 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 hover:text-white border border-navy-700 flex items-center justify-center gap-2 text-xs font-semibold transition-all group"
        >
          <span>Explore Passport & AA Sharing</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardContent>
    </Card>
  );
};
