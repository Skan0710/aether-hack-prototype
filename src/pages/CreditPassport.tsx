import React, { useState } from 'react';
import { DEMO_CREDIT_PASSPORT } from '../data/creditPassportData';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import {
  Award,
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
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
            <Award className="w-4 h-4" />
            <span>EXPLAINABLE CASH-FLOW FINANCIAL PASSPORT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Credit Passport
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Alternative creditworthiness derived transparently from cash-flow health, payroll regularity, and obligation discipline.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            leftIcon={<HelpCircle className="w-4 h-4" />}
            onClick={() => setShowExplainModal(true)}
          >
            See Full Explanation
          </Button>
          <Button
            variant="emerald"
            size="md"
            leftIcon={<Share2 className="w-4 h-4" />}
            onClick={() => setShowShareModal(true)}
            className="shadow-glow-pass"
          >
            Share With Lender via AA
          </Button>
        </div>
      </div>

      {/* Synthetic Disclosure Warning */}
      <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Synthetic Demo Assessment:</strong> {DEMO_CREDIT_PASSPORT.syntheticDisclosure}
        </p>
      </div>

      {/* Main Score & Risk Tier Card */}
      <Card className="border-emerald-500/30 bg-gradient-to-r from-navy-900 via-navy-850 to-emerald-950/20 shadow-glow-pass">
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
                  <span className="text-3xl font-extrabold text-white font-mono leading-none block">
                    {DEMO_CREDIT_PASSPORT.score}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">/ 100</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs font-mono">
                    {DEMO_CREDIT_PASSPORT.riskTier}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Evaluation Period: {DEMO_CREDIT_PASSPORT.assessmentDate}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Strong Cash-Flow Repayment Capacity
                </h3>
                <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                  Demonstrated ability to meet routine obligations ahead of schedule, supported by unbroken monthly salary credits and strict spending discipline.
                </p>
              </div>
            </div>

            {/* Quick Metrics Capsule */}
            <div className="grid grid-cols-2 gap-3 min-w-[240px]">
              <div className="p-3 rounded-xl bg-navy-850/80 border border-navy-750">
                <span className="text-[10px] text-slate-400 uppercase font-mono">On-Time Rate</span>
                <p className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  {DEMO_CREDIT_PASSPORT.metrics.onTimeRate}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-navy-850/80 border border-navy-750">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Salary Regularity</span>
                <p className="text-base font-bold text-white font-mono mt-0.5">
                  {DEMO_CREDIT_PASSPORT.metrics.salaryRegularity}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-navy-850/80 border border-navy-750">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Spending Volatility</span>
                <p className="text-base font-bold text-cyan-400 font-mono mt-0.5">
                  {DEMO_CREDIT_PASSPORT.metrics.spendingStability}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-navy-850/80 border border-navy-750">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Savings Buffer</span>
                <p className="text-base font-bold text-slate-200 font-mono mt-0.5">
                  {DEMO_CREDIT_PASSPORT.metrics.savingsBufferMonths} Months
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4 Financial Factors Breakdown Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Core Evaluated Behavioral Factors</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_CREDIT_PASSPORT.factors.map((factor) => {
            const isNegative = factor.rating === 'small_negative';
            const badgeClass = isNegative
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';

            return (
              <Card key={factor.id} className="p-4 border-navy-750 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isNegative ? (
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    <h4 className="text-sm font-semibold text-white">{factor.name}</h4>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-medium border ${badgeClass}`}>
                    {factor.impactText}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{factor.metric}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{factor.detail}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 12-Month Liquidity & Stability Trajectory Chart */}
      <Card className="border-navy-750">
        <CardHeader
          title="12-Month Cash-Flow Stability & Discipline Trajectory"
          subtitle="Simulated monthly balance floor vs discretionary spending bounds"
          icon={<TrendingUp className="w-5 h-5 text-cyan-400" />}
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
                        <div className="bg-navy-900 border border-navy-750 p-2.5 rounded-lg shadow-xl text-xs font-mono">
                          <p className="text-white font-bold">{label} 2026</p>
                          <p className="text-emerald-400 mt-1">Month-End Balance: ₹{payload[0].value?.toLocaleString('en-IN')}</p>
                          <p className="text-cyan-400">Total Spend: ₹{payload[1].value?.toLocaleString('en-IN')}</p>
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
              <span className="text-slate-300">Month-End Liquidity Floor</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-slate-300">Discretionary Outflow (Bounded ±8%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simulated Share With Lender via Account Aggregator Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Simulated Account Aggregator (AA) Sharing"
        subtitle="Consent-driven financial data sharing under RBI AA Framework"
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-navy-850 border border-navy-750 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono">Financial Information User (FIU):</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-cyan-400" />
                <span>HDFC Bank Digital Lending Portal</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono">Account Aggregator Handle:</span>
              <span className="font-mono text-emerald-400 font-semibold">aarav@anumati</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono">Shared Data Scope:</span>
              <span className="text-slate-200">Cash-Flow Health, Salary Regularity, 12M Outflow Volatility</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono">Consent Expiry:</span>
              <span className="text-slate-200">1 Time Fetch (Expires in 30 minutes)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Simulated JSON Payload:</span>
            <pre className="text-[11px] font-mono text-cyan-300 p-2 bg-navy-950 rounded overflow-x-auto">
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
            <span className="text-slate-400 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cryptographically signed by AA node</span>
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
                  alert('Consent Granted! Synthetic Credit Passport payload transmitted to lender endpoint.');
                }}
              >
                {consentGranted ? 'Consent Already Transmitted' : 'Approve & Transmit Consent'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Explanation Modal */}
      <Modal
        isOpen={showExplainModal}
        onClose={() => setShowExplainModal(false)}
        title="Credit Passport Mathematical Methodology"
        subtitle="How the 78/100 composite score is derived"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            The PayKavach Credit Passport evaluates transaction velocity and obligation reliability rather than static legacy bureau scores.
          </p>
          <div className="space-y-2 p-3 bg-navy-850 rounded-xl border border-navy-750">
            <div className="flex justify-between font-mono">
              <span>1. Base Starting Score:</span>
              <span className="text-white font-semibold">50 pts</span>
            </div>
            <div className="flex justify-between font-mono text-emerald-400">
              <span>2. 12/12 Months Salary:</span>
              <span className="font-semibold">+15 pts</span>
            </div>
            <div className="flex justify-between font-mono text-emerald-400">
              <span>3. 96% On-Time Obligations:</span>
              <span className="font-semibold">+12 pts</span>
            </div>
            <div className="flex justify-between font-mono text-emerald-400">
              <span>4. Low Spending Volatility (±8%):</span>
              <span className="font-semibold">+9 pts</span>
            </div>
            <div className="flex justify-between font-mono text-amber-400">
              <span>5. Late EMI Penalty (March):</span>
              <span className="font-semibold">-8 pts</span>
            </div>
            <div className="pt-2 border-t border-navy-700 flex justify-between font-mono font-bold text-white text-sm">
              <span>Total Composite Score:</span>
              <span className="text-emerald-400">78 / 100</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            This transparent breakdown provides borrowers with clear agency: timely rent and steady payroll receipts can rehabilitate creditworthiness within 90 days.
          </p>
        </div>
      </Modal>
    </div>
  );
};
