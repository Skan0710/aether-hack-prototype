import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { ObligationsCard } from '../components/dashboard/ObligationsCard';
import { CreditPassportWidget } from '../components/dashboard/CreditPassportWidget';
import { QuickDemoLauncher } from '../components/dashboard/QuickDemoLauncher';
import { RecentActivityPreview } from '../components/dashboard/RecentActivityPreview';
import { Button } from '../components/ui/Button';
import { INITIAL_DEMO_USER } from '../data/demoUser';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner Greeting */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-750 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
            <Sparkles className="w-4 h-4" />
            <span>FINANCIAL SAFETY COMPANION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Hello, {INITIAL_DEMO_USER.name}
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            PayKavach is monitoring your pre-payment risk. Every UPI payment is evaluated for scam playbooks, AI voice clones, and cash-flow obligations before you pay.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            variant="emerald"
            leftIcon={<ShieldAlert className="w-5 h-5" />}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/check')}
            className="shadow-glow-pass w-full sm:w-auto"
          >
            Check a Payment Now
          </Button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <SummaryCards />

      {/* Quick 1-click Demo Showcase */}
      <QuickDemoLauncher />

      {/* Grid: Obligations + Credit Passport Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ObligationsCard />
        <CreditPassportWidget />
      </div>

      {/* Recent Activity Screening */}
      <RecentActivityPreview />
    </div>
  );
};
