import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight } from 'lucide-react';
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
      <div className="p-6 sm:p-8 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight">
            Good evening, {INITIAL_DEMO_USER.name.split(' ')[0]}
          </h1>
          <p className="text-sm text-slate-400 mt-1.5">
            Your pre-payment guard is active.
          </p>
        </div>
        <Button
          size="lg"
          variant="emerald"
          leftIcon={<ShieldAlert className="w-5 h-5" />}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          onClick={() => navigate('/check')}
          className="w-full sm:w-auto"
        >
          Check a Payment
        </Button>
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
