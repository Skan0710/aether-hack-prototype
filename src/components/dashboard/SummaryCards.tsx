import React from 'react';
import { Wallet, ShieldCheck, CalendarClock, Award, ArrowUpRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatINR } from '../../utils/formatCurrency';
import { INITIAL_DEMO_USER } from '../../data/demoUser';
import { Link } from 'react-router-dom';

export const SummaryCards: React.FC = () => {
  const totalObligations = INITIAL_DEMO_USER.obligations.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Available Balance */}
      <Card className="p-5 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Available Balance
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {formatINR(INITIAL_DEMO_USER.currentBalance)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <span>Salary lands 1st of month</span>
          </div>
        </div>
      </Card>

      {/* 2. Protection Engine */}
      <Card className="p-5 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            AI Kavach Status
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl lg:text-3xl font-bold text-emerald-400 tracking-tight flex items-center gap-2">
            Active
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
              4 Models
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <span>Voice, Script, Payee & Cash-Flow</span>
          </div>
        </div>
      </Card>

      {/* 3. Upcoming Obligations */}
      <Card className="p-5 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Upcoming in 5 Days
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <CalendarClock className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl lg:text-3xl font-bold text-amber-300 tracking-tight">
            {formatINR(totalObligations)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <span>Rent, EMI & Electricity</span>
          </div>
        </div>
      </Card>

      {/* 4. Credit Passport */}
      <Card className="p-5 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Credit Passport
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline justify-between">
            <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              78<span className="text-sm font-normal text-slate-500">/100</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
              Low Risk
            </span>
          </div>
          <Link
            to="/credit-passport"
            className="inline-flex items-center gap-1 mt-2 text-xs text-emerald-400 hover:text-emerald-300 group-hover:underline"
          >
            <span>View Full Passport</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </Card>
    </div>
  );
};
