import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { PaymentVerdict, VerdictStatus } from '../types/payment';
import { VerdictScoreHeader } from '../components/verdict/VerdictScoreHeader';
import { ScamPlaybookBanner } from '../components/verdict/ScamPlaybookBanner';
import { ReasonsList } from '../components/verdict/ReasonsList';
import { CheckBreakdownGrid } from '../components/verdict/CheckBreakdownGrid';
import { MomVerificationModal } from '../components/verdict/MomVerificationModal';
import { CoolOffTimerModal } from '../components/verdict/CoolOffTimerModal';
import { AskQuestionWidget } from '../components/verdict/AskQuestionWidget';
import { CashFlowVisualizer } from '../components/verdict/CashFlowVisualizer';
import { UpiHandoffModal } from '../components/payment/UpiHandoffModal';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { formatINR } from '../utils/formatCurrency';
import {
  ShieldAlert,
  PhoneCall,
  Timer,
  XCircle,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Receipt,
  User,
  AtSign,
  Info,
} from 'lucide-react';

export const Verdict: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [verdict, setVerdict] = useState<PaymentVerdict | null>(null);
  const [showMomCallModal, setShowMomCallModal] = useState(false);
  const [showCoolOffModal, setShowCoolOffModal] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [coolOffCompleted, setCoolOffCompleted] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const found = storageService.getVerdictById(id);
      if (found) {
        setVerdict(found);
        setFeedbackStatus(found.userActionTaken || null);
        return;
      }
    }
    const current = storageService.getCurrentVerdict();
    if (current) {
      setVerdict(current);
      setFeedbackStatus(current.userActionTaken || null);
    }
  }, [id]);

  if (!verdict) {
    return (
      <div className="max-w-md mx-auto p-8 text-center space-y-4 kavach-card">
        <ShieldAlert className="w-10 h-10 text-slate-500 mx-auto" />
        <h2 className="text-lg font-semibold text-white">No result found</h2>
        <p className="text-sm text-slate-400">
          Run a payment check first to see a verdict here.
        </p>
        <Button variant="emerald" onClick={() => navigate('/check')}>
          Check a Payment
        </Button>
      </div>
    );
  }

  const handleAction = (action: PaymentVerdict['userActionTaken'], statusMessage: string) => {
    if (!verdict) return;
    storageService.updateVerdictAction(verdict.id, action);
    setFeedbackStatus(action || null);
    alert(statusMessage);
  };

  const handleAskResolution = (newVerdict: VerdictStatus, newExplanation: string) => {
    if (!verdict) return;
    const updated: PaymentVerdict = {
      ...verdict,
      verdict: newVerdict,
      fusedRiskScore: newVerdict === 'PASS' ? 12 : 88,
      explanation: newExplanation,
    };
    storageService.saveVerdict(updated);
    setVerdict(updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner with Verdict & Score */}
      <VerdictScoreHeader
        verdict={verdict.verdict}
        score={verdict.fusedRiskScore}
        title={verdict.title}
        explanation={verdict.explanation}
      />

      {/* Matched Scam Playbook Banner (for Demo 1 / Scam checks) */}
      {verdict.matchedPlaybook && (
        <ScamPlaybookBanner playbook={verdict.matchedPlaybook} />
      )}

      {/* Recommended Action Box */}
      <div className="p-4 rounded-xl bg-navy-850 border border-navy-800 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-medium text-slate-500">
            Recommended action
          </span>
          <p className="text-sm text-white font-medium mt-0.5">
            {verdict.recommendedAction}
          </p>
        </div>
      </div>

      {/* Plain Language Reasons & Reason Codes */}
      <ReasonsList
        verdict={verdict.verdict}
        reasons={verdict.plainLanguageReasons}
        reasonCodes={verdict.reasonCodes}
      />

      {/* Sub-Engine Check Breakdown */}
      <CheckBreakdownGrid checks={verdict.checks} />

      {/* Cash Flow Foresight Visualizer if present */}
      {verdict.checks.cashFlow && (
        <CashFlowVisualizer cashFlow={verdict.checks.cashFlow} />
      )}

      {/* Transaction & Payee Context Card */}
      <Card>
        <CardHeader
          title="Transaction details"
          subtitle="What you submitted for this check"
          icon={<Receipt className="w-5 h-5 text-emerald-400" />}
        />
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-navy-850 border border-navy-800 space-y-1">
              <span className="text-[11px] text-slate-500">Payee</span>
              <div className="text-sm font-medium text-white flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>{verdict.payeeDetails.name}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-850 border border-navy-800 space-y-1">
              <span className="text-[11px] text-slate-500">UPI ID</span>
              <div className="text-sm font-medium text-white flex items-center gap-1.5">
                <AtSign className="w-3.5 h-3.5 text-slate-500" />
                <span>{verdict.payeeDetails.vpa}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-850 border border-navy-800 space-y-1">
              <span className="text-[11px] text-slate-500">Amount</span>
              <div className="text-base font-semibold text-white">
                {formatINR(verdict.amount)}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-850 border border-navy-800 space-y-1">
              <span className="text-[11px] text-slate-500">Relationship</span>
              <div className="text-xs font-medium text-slate-300">
                {verdict.payeeDetails.isFirstTime ? 'First-time recipient' : 'Known contact'}
                {verdict.payeeDetails.claimedRelation && ` · Claimed "${verdict.payeeDetails.claimedRelation}"`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive ASK flow if verdict is ASK */}
      {verdict.verdict === 'ASK' && (
        <AskQuestionWidget onAnswerSelected={handleAskResolution} />
      )}

      {/* Action Decision Area */}
      <Card>
        <CardHeader
          title="What would you like to do?"
          subtitle="PayKavach advises — the decision is always yours"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
          action={
            feedbackStatus && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 capitalize">
                {feedbackStatus.replace('_', ' ')}
              </span>
            )
          }
        />
        <CardContent className="space-y-4">
          {/* Boundary Notice */}
          <div className="p-3 rounded-xl bg-navy-850 border border-navy-800 text-xs text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p>PayKavach doesn't block your bank account or auto-cancel transfers — it only advises before you pay.</p>
          </div>

          {/* Conditional Action Buttons */}
          {verdict.verdict === 'HOLD' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Call Mom Now */}
                <Button
                  variant="emerald"
                  size="lg"
                  leftIcon={<PhoneCall className="w-5 h-5" />}
                  onClick={() => setShowMomCallModal(true)}
                  className="w-full"
                >
                  Call Mom Now
                </Button>

                {/* 2. 10-Minute Cool-Off */}
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Timer className="w-5 h-5" />}
                  onClick={() => setShowCoolOffModal(true)}
                  className="w-full"
                >
                  10-Minute Cool-Off
                </Button>
              </div>

              {/* Cancel Payment Action */}
              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-navy-800 gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  leftIcon={<XCircle className="w-4 h-4" />}
                  onClick={() => handleAction('cancelled', 'Payment cancelled. Fraud avoided!')}
                >
                  Cancel Payment
                </Button>
                {coolOffCompleted && (
                  <span className="text-xs text-amber-400">
                    Cool-off complete — override unlocked.
                  </span>
                )}
              </div>
            </div>
          )}

          {verdict.verdict === 'WARN' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="emerald"
                size="lg"
                leftIcon={<Timer className="w-5 h-5" />}
                onClick={() => handleAction('remind_1st', 'Reminder scheduled for the 1st of the month after salary credit.')}
              >
                Remind Me on the 1st (Recommended)
              </Button>
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => {
                  handleAction('paid', 'Proceeding with simulated UPI handoff despite deficit warning.');
                  setShowUpiModal(true);
                }}
              >
                Pay Anyway
              </Button>
            </div>
          )}

          {verdict.verdict === 'PASS' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>All 4 security models verified safe. Ready for UPI launch.</span>
              </div>
              <Button
                variant="emerald"
                size="lg"
                rightIcon={<ExternalLink className="w-4 h-4" />}
                onClick={() => {
                  setShowUpiModal(true);
                  handleAction('paid', 'Initiating UPI intent handoff.');
                }}
                className="w-full sm:w-auto"
              >
                Open UPI App ({formatINR(verdict.amount)})
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* UPI Handoff Modal */}
      <UpiHandoffModal
        isOpen={showUpiModal}
        onClose={() => setShowUpiModal(false)}
        vpa={verdict.payeeDetails.vpa}
        payeeName={verdict.payeeDetails.name}
        amount={verdict.amount}
      />

      {/* Mom Verification Modal */}
      <MomVerificationModal
        isOpen={showMomCallModal}
        onClose={() => setShowMomCallModal(false)}
        onVerified={() => {
          handleAction('verified', 'Verified with Mom! Impersonation fraud prevented.');
        }}
      />

      {/* Cool-Off Timer Modal */}
      <CoolOffTimerModal
        isOpen={showCoolOffModal}
        onClose={() => setShowCoolOffModal(false)}
        onOverrideUnlocked={() => {
          setCoolOffCompleted(true);
          handleAction('cool_off', '10-minute cool-off completed. User consciously evaluated emergency.');
        }}
      />
    </div>
  );
};
