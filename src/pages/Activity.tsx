import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { PaymentVerdict, VerdictStatus } from '../types/payment';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { VerdictBadge } from '../components/ui/Badge';
import { formatINR } from '../utils/formatCurrency';
import {
  History,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  Filter,
  Check,
  XCircle,
  UserCheck,
} from 'lucide-react';

export const Activity: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<PaymentVerdict[]>([]);
  const [filter, setFilter] = useState<'ALL' | VerdictStatus>('ALL');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    let items = storageService.getHistory();
    // If empty in LocalStorage, seed with initial realistic demo records
    if (items.length === 0) {
      const seedItems: PaymentVerdict[] = [
        {
          id: 'seed-h1',
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
          verdict: 'PASS',
          fusedRiskScore: 12,
          title: 'Safe Routine Transfer',
          explanation: 'Greenwood Society monthly maintenance charges verified against recurring address history.',
          plainLanguageReasons: ['Verified housing society account', 'Ample post-payment balance'],
          reasonCodes: ['PASS_KNOWN_MERCHANT'],
          recommendedAction: 'Proceed with UPI intent',
          checks: {
            script: { name: 'Scam-Script', key: 'script', score: 0.05, weight: 0.35, weightedContribution: 0.017, status: 'safe', headline: 'Clean', detail: 'Clean', reasonCode: 'SAFE' },
            payee: { name: 'Payee Risk', key: 'payee', score: 0.1, weight: 0.3, weightedContribution: 0.03, status: 'safe', headline: 'Known', detail: 'Known', reasonCode: 'SAFE' },
            voice: { name: 'Voice Risk', key: 'voice', score: 0.0, weight: 0.2, weightedContribution: 0.0, status: 'safe', headline: 'None', detail: 'None', reasonCode: 'SAFE' },
            context: { name: 'Context', key: 'context', score: 0.1, weight: 0.15, weightedContribution: 0.015, status: 'safe', headline: 'Routine', detail: 'Routine', reasonCode: 'SAFE' },
          },
          payeeDetails: { name: 'Greenwood Society', vpa: 'greenwood.society@hdfc', isFirstTime: false },
          amount: 2500,
          purpose: 'Monthly Maintenance',
          userActionTaken: 'paid',
        },
        {
          id: 'seed-h2',
          timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
          verdict: 'HOLD',
          fusedRiskScore: 94,
          title: 'Hospital Emergency Extortion Scam Intercepted',
          explanation: 'Fraudulent voice note impersonating Mom requesting urgent ₹20,000 to unrelated VPA.',
          plainLanguageReasons: [
            'Voice note is 91% likely AI-generated',
            'First-ever payment to this payee',
            'Payee name does not match Mom',
            'Urgency and secrecy detected',
            'Script matches 94% of known hospital-emergency scams',
          ],
          reasonCodes: ['VOICE_AI_91', 'FIRST_TIME_PAYEE', 'SCAM_SCRIPT_94'],
          recommendedAction: 'Call Mom on her saved number before paying.',
          checks: {
            script: { name: 'Scam-Script', key: 'script', score: 0.94, weight: 0.35, weightedContribution: 0.329, status: 'danger', headline: '94% Match', detail: 'Extortion', reasonCode: 'SCAM_SCRIPT_94' },
            payee: { name: 'Payee Risk', key: 'payee', score: 0.90, weight: 0.3, weightedContribution: 0.27, status: 'danger', headline: 'First Time', detail: 'Unverified', reasonCode: 'FIRST_TIME' },
            voice: { name: 'Voice Risk', key: 'voice', score: 0.91, weight: 0.2, weightedContribution: 0.182, status: 'danger', headline: '91% AI', detail: 'Clone', reasonCode: 'VOICE_91' },
            context: { name: 'Context', key: 'context', score: 0.88, weight: 0.15, weightedContribution: 0.132, status: 'danger', headline: 'Mismatch', detail: 'Secrecy', reasonCode: 'SECRECY' },
          },
          payeeDetails: { name: 'Rahul Kumar', vpa: 'rahul.k88@ybl', isFirstTime: true, claimedRelation: 'Mom' },
          amount: 20000,
          purpose: 'Medical Emergency',
          userActionTaken: 'cancelled',
        },
      ];
      seedItems.forEach((item) => storageService.saveVerdict(item));
      items = seedItems;
    }
    setHistory(items);
  };

  const handleUpdateStatus = (
    e: React.MouseEvent,
    id: string,
    action: PaymentVerdict['userActionTaken']
  ) => {
    e.stopPropagation();
    storageService.updateVerdictAction(id, action);
    loadHistory();
  };

  const filteredHistory = history.filter((item) => {
    if (filter === 'ALL') return true;
    return item.verdict === filter;
  });

  const getVerdictIcon = (v: VerdictStatus) => {
    switch (v) {
      case 'HOLD':
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case 'WARN':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'ASK':
        return <HelpCircle className="w-5 h-5 text-blue-400" />;
      case 'PASS':
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
            <History className="w-4 h-4" />
            <span>LOCAL TRANSACTION AUDIT LOG</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Payment Screening History
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Persistent ledger of AI pre-payment screenings, generated verdicts, and user feedback actions.
          </p>
        </div>
        <Button
          variant="emerald"
          size="md"
          leftIcon={<ShieldCheck className="w-4 h-4" />}
          onClick={() => navigate('/check')}
        >
          Check New Payment
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-navy-900 border border-navy-800 rounded-xl">
        <span className="text-xs font-mono text-slate-400 px-3 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </span>
        {(['ALL', 'PASS', 'WARN', 'HOLD', 'ASK'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all ${
              filter === tab
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-navy-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* History Items List */}
      <Card className="border-navy-750">
        <CardHeader
          title={`Screened Payments (${filteredHistory.length})`}
          subtitle="Click on any screening record to review the complete multi-model verdict"
        />
        <CardContent className="space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <History className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-sm font-medium text-slate-300">
                No payment checks match the selected filter.
              </p>
              <Button variant="outline" size="sm" onClick={() => setFilter('ALL')}>
                Reset Filters
              </Button>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/verdict/${item.id}`)}
                className="p-4 rounded-xl bg-navy-850 hover:bg-navy-800 border border-navy-800 hover:border-navy-700 transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Icon, Payee, Date */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-navy-800 border border-navy-750 flex items-center justify-center shrink-0">
                    {getVerdictIcon(item.verdict)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {item.payeeDetails.name}
                      </h4>
                      <VerdictBadge verdict={item.verdict} size="sm" />
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {item.payeeDetails.vpa} • {new Date(item.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                      {item.explanation}
                    </p>
                  </div>
                </div>

                {/* Right: Amount & Feedback Actions */}
                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-navy-800">
                  <div className="text-left md:text-right">
                    <span className="text-base font-bold text-white font-mono block">
                      {formatINR(item.amount)}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Risk {item.fusedRiskScore}/100
                    </span>
                  </div>

                  {/* Feedback Chips */}
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      title="Mark as Paid"
                      onClick={(e) => handleUpdateStatus(e, item.id, 'paid')}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        item.userActionTaken === 'paid'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-navy-800 text-slate-400 border-navy-700 hover:text-white'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Mark as Cancelled"
                      onClick={(e) => handleUpdateStatus(e, item.id, 'cancelled')}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        item.userActionTaken === 'cancelled'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-navy-800 text-slate-400 border-navy-700 hover:text-white'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Mark as Verified"
                      onClick={(e) => handleUpdateStatus(e, item.id, 'verified')}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        item.userActionTaken === 'verified'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : 'bg-navy-800 text-slate-400 border-navy-700 hover:text-white'
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-400 transition-all hidden sm:block" />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
