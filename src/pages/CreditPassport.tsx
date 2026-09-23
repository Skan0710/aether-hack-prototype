import React, { useState } from 'react';
import { DEMO_CREDIT_PASSPORT } from '../data/creditPassportData';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import {
  ShieldCheck,
  Share2,
  HelpCircle,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Building,
  KeyRound,
  Info,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const CreditPassport: React.FC = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [consentGranted, setConsentGranted] = useState(false);

  const monthlyStabilityData = [
    { month: 'Oct', balance: 42000, spend: 31000 },
    { month: 'Nov', balance: 45000, spend: 32500 },
    { month: 'Dec', balance: 43000, spend: 34000 },
    { month: 'Jan', balance: 46000, spend: 31500 },
    { month: 'Feb', balance: 47000, spend: 30000 },
    { month: 'Mar', balance: 41000, spend: 36000 }, // Late EMI month
    { month: 'Apr', balance: 44000, spend: 32000 },
    { month: 'May', balance: 45500, spend: 31000 },
    { month: 'Jun', balance: 46500, spend: 32500 },
    { month: 'Jul', balance: 47200, spend: 31800 },
    { month: 'Aug', balance: 48000, spend: 31200 },
    { month: 'Sep', balance: 48500, spend: 30500 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Credit Passport
          </h1>
          <p className="text-sm text-slate-400 mt-1.5 max-w-lg">
            Your creditworthiness, explained — built from cash-flow health, salary regularity, and how reliably you pay.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            leftIcon={<HelpCircle className="w-4 h-4" />}
            onClick={() => setShowExplainModal(true)}
          >
            How this is calculated
          </Button>
          <Button
            variant="emerald"
            size="md"
            leftIcon={<Share2 className="w-4 h-4" />}
            onClick={() => setShowShareModal(true)}
          >
            Share With Lender via AA
          </Button>
        </div>
      </div>

      {/* Synthetic Disclosure Warning */}
      <div className="p-3.5 rounded-xl bg-navy-850 border border-navy-800 flex items-start gap-3 text-xs text-slate-400">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-300">Synthetic demo data:</strong> {DEMO_CREDIT_PASSPORT.syntheticDisclosure}
        </p>
      </div>

      {/* Main Score & Risk Tier Card */}
      <Card className="border-emerald-500/25">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Score & Tier */}
            <div className="flex items-center gap-5">
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-navy-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-400"
                    strokeDasharray="78, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-bold text-white leading-none block">
                    {DEMO_CREDIT_PASSPORT.score}
                  </span>
                  <span className="text-[10px] text-slate-500">/ 100</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold text-xs">
                    {DEMO_CREDIT_PASSPORT.riskTier}
                  </span>
                  <span className="text-xs text-slate-500">
                    As of {DEMO_CREDIT_PASSPORT.assessmentDate}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Strong repayment capacity
                </h3>
                <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
                  Consistently meets obligations ahead of schedule, backed by unbroken monthly salary credits and steady spending habits.
                </p>
              </div>
            </div>

            {/* Quick Metrics Capsule */}
            <div className="grid grid-cols-2 gap-3 min-w-[240px]">
              <div className="p-3 rounded-xl bg-navy-850 border border-navy-800">
                <span className="text-[11px] text-slate-500">On-Time Rate</span>
                <p className="text-base font-semibold text-emerald-400 mt-0.5">
                  {DEMO_CREDIT_PASSPORT.metrics.onTimeRate}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-navy-850 border border-navy-800">
                <span className="text-[11px] text-slate-500">Salary Regularity</span>
                <p className="text-base font-semibold text-white mt-0.5">
                  {DEMO_CREDIT_PASSPORT.metrics.salaryRegularity}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-navy-850 border border-navy-800">
                <span className="text-[11px] text-slate-500">Spending Volatility</span>
                <p className="text-base font-semibold text-emerald-400 mt-0.5">
                  {DEMO_CREDIT_PASSPORT.metrics.spendingStability}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-navy-850 border border-navy-800">
                <span className="text-[11px] text-slate-500">Savings Buffer</span>
                <p className="text-base font-semibold text-slate-200 mt-0.5">
                  {DEMO_CREDIT_PASSPORT.metrics.savingsBufferMonths} Months
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4 Financial Factors Breakdown Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>What shaped this score</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_CREDIT_PASSPORT.factors.map((factor) => {
            const isNegative = factor.rating === 'small_negative';
            const badgeClass = isNegative
              ? 'bg-amber-500/10 text-amber-300'
              : 'bg-emerald-500/10 text-emerald-300';

            return (
              <Card key={factor.id} className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isNegative ? (
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    <h4 className="text-sm font-semibold text-white">{factor.name}</h4>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${badgeClass}`}>
                    {factor.impactText}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-emerald-400 font-medium">{factor.metric}</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{factor.detail}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 12-Month Liquidity & Stability Trajectory Chart */}
      <Card>
        <CardHeader
          title="12-month stability trend"
          subtitle="Month-end balance vs. discretionary spending"
          icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
        />
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyStabilityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-navy-900 border border-navy-750 p-2.5 rounded-lg shadow-soft-lg text-xs">
                          <p className="text-white font-semibold">{label} 2026</p>
                          <p className="text-emerald-400 mt-1">Balance: ₹{payload[0].value?.toLocaleString('en-IN')}</p>
                          <p className="text-emerald-400">Spend: ₹{payload[1].value?.toLocaleString('en-IN')}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="balance" stroke="#10b981" fillOpacity={1} fill="url(#balanceGrad)" strokeWidth={2} name="Balance" />
                <Area type="monotone" dataKey="spend" stroke="#06b6d4" fillOpacity={1} fill="url(#spendGrad)" strokeWidth={1.5} strokeDasharray="3 3" name="Spend" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-slate-400">Month-end balance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-500" />
              <span className="text-slate-400">Spending (±8% band)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simulated Share With Lender via Account Aggregator Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share with a lender"
        subtitle="Consent-driven sharing via the RBI Account Aggregator framework"
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-navy-850 border border-navy-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Requesting lender</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                <span>HDFC Bank Digital Lending Portal</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Account Aggregator handle</span>
              <span className="font-mono text-emerald-400 font-semibold">aarav@anumati</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Data being shared</span>
              <span className="text-slate-300">Cash-flow health, salary regularity, spending volatility</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Consent expiry</span>
              <span className="text-slate-300">One-time fetch, expires in 30 minutes</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Payload preview</span>
            <pre className="text-[11px] font-mono text-emerald-300 p-2 bg-navy-950 rounded overflow-x-auto">
{JSON.stringify(
  {
    consentHandle: 'AA-CONSENT-99402-AARAV',
    creditScoreSynthetic: 78,
    riskClassification: 'Low Risk',
    salaryCreditMonthsCount: 12,
    onTimeBillPaymentRate: 0.96,
    lateEMICount: 1,
    verifiedBy: 'PayKavach Behavioral Cash-Flow Engine',
  },
  null,
  2
)}
            </pre>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-500 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
              <span>Signed by the AA node</span>
            </span>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={() => setShowShareModal(false)}>
                Cancel
              </Button>
              <Button
                variant="emerald"
                size="sm"
                leftIcon={<FileCheck className="w-4 h-4" />}
                onClick={() => {
                  setConsentGranted(true);
                  setShowShareModal(false);
                  alert('Consent granted — passport shared with the lender.');
                }}
              >
                {consentGranted ? 'Already Shared' : 'Approve & Share'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Explanation Modal */}
      <Modal
        isOpen={showExplainModal}
        onClose={() => setShowExplainModal(false)}
        title="How your score is calculated"
        subtitle="The 78/100 composite score, broken down"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            The Credit Passport looks at transaction velocity and obligation reliability, not a static legacy bureau score.
          </p>
          <div className="space-y-2 p-3 bg-navy-850 rounded-xl border border-navy-800">
            <div className="flex justify-between">
              <span className="text-slate-400">Base starting score</span>
              <span className="text-white font-semibold">50 pts</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>12/12 months salary credited</span>
              <span className="font-semibold">+15 pts</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>96% on-time obligations</span>
              <span className="font-semibold">+12 pts</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Low spending volatility (±8%)</span>
              <span className="font-semibold">+9 pts</span>
            </div>
            <div className="flex justify-between text-amber-400">
              <span>One late EMI in March</span>
              <span className="font-semibold">-8 pts</span>
            </div>
            <div className="pt-2 border-t border-navy-700 flex justify-between font-bold text-white text-sm">
              <span>Total score</span>
              <span className="text-emerald-400">78 / 100</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            This score can improve — steady salary credits and on-time rent over the next 90 days will raise it.
          </p>
        </div>
      </Modal>
    </div>
  );
};
