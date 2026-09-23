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
      <div className="max-w-2xl mx-auto p-8 text-center space-y-4 kavach-card">
        <ShieldAlert className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">No Verdict Found</h2>
        <p className="text-sm text-slate-400">
          No payment check data was found for this reference. Run a pre-check analysis first.
        </p>
        <Button variant="emerald" onClick={() => navigate('/check')}>
          Go to Payment Pre-Check
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
      <div className="p-4 rounded-xl bg-navy-850 border border-cyan-500/30 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">
            Recommended Action
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
      <Card className="border-navy-750">
        <CardHeader
          title="Screened Transaction Snapshot"
          subtitle="Submitted parameters before opening UPI application"
          icon={<Receipt className="w-5 h-5 text-emerald-400" />}
        />
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-navy-850 border border-navy-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Payee Name</span>
              <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{verdict.payeeDetails.name}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-850 border border-navy-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">UPI Handle (VPA)</span>
              <div className="text-sm font-semibold text-white font-mono flex items-center gap-1.5">
                <AtSign className="w-3.5 h-3.5 text-slate-400" />
                <span>{verdict.payeeDetails.vpa}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-850 border border-navy-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Amount</span>
              <div className="text-base font-bold text-white font-mono">
                {formatINR(verdict.amount)}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-850 border border-navy-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">History / Relation</span>
              <div className="text-xs font-semibold text-slate-200">
                {verdict.payeeDetails.isFirstTime ? 'First-Time Recipient' : 'Known Contact'}
                {verdict.payeeDetails.claimedRelation && ` • Claimed "${verdict.payeeDetails.claimedRelation}"`}
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
      <Card className="border-navy-700 bg-navy-900/90 shadow-2xl">
        <CardHeader
          title="User Action & Companion Protection Handoff"
          subtitle="PayKavach advises; your personal decision determines next steps"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
          action={
            feedbackStatus && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono capitalize">
                Status: {feedbackStatus}
              </span>
            )
          }
        />
        <CardContent className="space-y-4">
          {/* Boundary Notice */}
          <div className="p-3 rounded-xl bg-navy-850 border border-navy-800 text-xs text-slate-300 flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Companion Boundary:</strong> PayKavach does not block bank accounts or auto-cancel UPI transfers. Safe transactions generate standard UPI intents.
            </p>
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
                  className="shadow-glow-pass w-full"
                >
                  Call Mom Now (Verified Number)
                </Button>

                {/* 2. 10-Minute Cool-Off */}
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Timer className="w-5 h-5" />}
                  onClick={() => setShowCoolOffModal(true)}
                  className="w-full"
                >
                  Continue After 10-Min Cool-Off
                </Button>
              </div>

              {/* Cancel Payment Action */}
              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-navy-800 gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  leftIcon={<XCircle className="w-4 h-4" />}
                  onClick={() => handleAction('cancelled', 'Payment check marked as Cancelled. Fraud avoided!')}
                >
                  Cancel Payment (Avoid Scam)
                </Button>
                {coolOffCompleted && (
                  <span className="text-xs text-amber-400 font-mono">
                    Cool-off period elapsed. Risk override unlocked.
                  </span>
                )}
              </div>
            </div>
          )}

          {verdict.verdict === 'WARN' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="warning"
                size="lg"
                leftIcon={<Timer className="w-5 h-5" />}
                onClick={() => handleAction('remind_1st', 'Reminder scheduled for the 1st of the month after salary credit.')}
              >
                Remind Me on the 1st
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
                className="shadow-glow-pass w-full sm:w-auto"
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
