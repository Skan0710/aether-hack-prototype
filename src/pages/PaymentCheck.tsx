import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Scan,
  User,
  AtSign,
  IndianRupee,
  FileText,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { DemoScenarioSelector } from '../components/payment/DemoScenarioSelector';
import { VoiceNoteSimulator } from '../components/payment/VoiceNoteSimulator';
import { DEMO_SCENARIOS, DemoScenarioConfig } from '../data/demoScenarios';
import { paymentService } from '../services/paymentService';
import { PaymentRequest } from '../types/payment';

export const PaymentCheck: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Form State
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [payeeName, setPayeeName] = useState('');
  const [payeeVpa, setPayeeVpa] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [purpose, setPurpose] = useState('');
  const [contextMessage, setContextMessage] = useState('');
  const [claimedRelation, setClaimedRelation] = useState('');
  const [isFirstPayment, setIsFirstPayment] = useState(false);
  const [voiceNoteSimulated, setVoiceNoteSimulated] = useState(false);
  const [voiceAiProbability, setVoiceAiProbability] = useState(91);

  // Status & Validation
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-fill from URL query param
  useEffect(() => {
    const scenarioQuery = searchParams.get('scenario');
    if (scenarioQuery) {
      const match = DEMO_SCENARIOS.find((s) => s.id === scenarioQuery);
      if (match) {
        applyScenario(match);
      }
    }
  }, [searchParams]);

  const applyScenario = (scenario: DemoScenarioConfig) => {
    setSelectedScenarioId(scenario.id);
    const req = scenario.request;
    setPayeeName(req.payeeName);
    setPayeeVpa(req.payeeVpa);
    setAmount(req.amount);
    setPurpose(req.purpose);
    setContextMessage(req.contextMessage || '');
    setClaimedRelation(req.claimedRelation || '');
    setIsFirstPayment(!!req.isFirstPayment);
    setVoiceNoteSimulated(!!req.voiceNoteSimulated);
    setVoiceAiProbability(req.voiceAiProbability || 91);
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!payeeName.trim()) newErrors.payeeName = 'Payee name is required';
    if (!payeeVpa.trim()) {
      newErrors.payeeVpa = 'UPI ID (VPA) is required';
    } else if (!payeeVpa.includes('@')) {
      newErrors.payeeVpa = 'Enter a valid UPI ID (e.g., name@bank)';
    }
    if (!amount || amount <= 0) {
      newErrors.amount = 'Enter a valid payment amount';
    }
    if (!purpose.trim()) newErrors.purpose = 'Payment purpose is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsAnalyzing(true);
    setScanStep('Inspecting scam script playbooks...');
    await new Promise((r) => setTimeout(r, 250));
    setScanStep('Evaluating neural voice acoustic markers...');
    await new Promise((r) => setTimeout(r, 250));
    setScanStep('Calculating cash-flow shortfall foresight...');
    await new Promise((r) => setTimeout(r, 250));

    const request: PaymentRequest = {
      payeeName,
      payeeVpa,
      amount: Number(amount),
      purpose,
      contextMessage,
      claimedRelation: claimedRelation || undefined,
      isFirstPayment,
      voiceNoteSimulated,
      voiceAiProbability: voiceNoteSimulated ? voiceAiProbability : undefined,
      scenarioId: (selectedScenarioId as any) || 'custom',
    };

    try {
      const verdict = await paymentService.analyzePayment(request);
      navigate(`/verdict/${verdict.id}`);
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
    }
  };

  const quickAmounts = [500, 2000, 15000, 20000, 30000];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
            <Scan className="w-4 h-4" />
            <span>AI PRE-PAYMENT SCREENING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Payment Pre-Check
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Evaluate risks across scam scripts, synthetic voice clones, payee reputation, and cash-flow obligations before opening your UPI app.
          </p>
        </div>
      </div>

      {/* Predefined Scenarios Selector */}
      <DemoScenarioSelector selectedId={selectedScenarioId} onSelect={applyScenario} />

      {/* Main Pre-Check Form */}
      <form onSubmit={handleAnalyze}>
        <Card className="border-navy-750 shadow-xl overflow-hidden">
          <CardHeader
            title="Payment Details & Context"
            subtitle="Enter transaction parameters for multi-model AI inspection"
            icon={<ShieldAlert className="w-5 h-5 text-emerald-400" />}
            action={
              selectedScenarioId && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
                  Autofilled from {selectedScenarioId}
                </span>
              )
            }
          />
          <CardContent className="space-y-5">
            {/* Payee Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Payee Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Payee Name</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Kumar or Croma Electronics"
                  value={payeeName}
                  onChange={(e) => setPayeeName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border ${
                    errors.payeeName ? 'border-rose-500' : 'border-navy-700 focus:border-emerald-500'
                  } text-white placeholder-slate-400 text-sm focus:outline-none transition-colors`}
                />
                {errors.payeeName && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.payeeName}</span>
                  </p>
                )}
              </div>

              {/* Payee VPA / UPI ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <AtSign className="w-3.5 h-3.5 text-slate-400" />
                  <span>Payee UPI ID (VPA)</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. rahul.k88@ybl or croma.retail@icici"
                  value={payeeVpa}
                  onChange={(e) => setPayeeVpa(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border font-mono ${
                    errors.payeeVpa ? 'border-rose-500' : 'border-navy-700 focus:border-emerald-500'
                  } text-white placeholder-slate-400 text-sm focus:outline-none transition-colors`}
                />
                {errors.payeeVpa && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.payeeVpa}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Amount & Quick Chips */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                <span>Payment Amount (₹)</span>
                <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-mono text-base">₹</span>
                <input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                  className={`w-full pl-8 pr-4 py-2.5 rounded-xl bg-navy-850 border font-mono text-lg font-semibold ${
                    errors.amount ? 'border-rose-500' : 'border-navy-700 focus:border-emerald-500'
                  } text-white placeholder-slate-400 focus:outline-none transition-colors`}
                />
              </div>
              {errors.amount && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.amount}</span>
                </p>
              )}
              {/* Quick Amount Selectors */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] text-slate-400">Quick amounts:</span>
                {quickAmounts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q)}
                    className="px-2.5 py-1 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-mono border border-navy-700 transition-colors"
                  >
                    ₹{q.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* Purpose & Claimed Relationship */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Payment Purpose</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hospital Emergency or Electronics Store"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border ${
                    errors.purpose ? 'border-rose-500' : 'border-navy-700 focus:border-emerald-500'
                  } text-white placeholder-slate-400 text-sm focus:outline-none transition-colors`}
                />
                {errors.purpose && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.purpose}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Claimed Relationship / Source</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Optional</span>
                </label>
                <input
                  type="text"
                  placeholder='e.g. "Mom", "Landlord", "Store Merchant"'
                  value={claimedRelation}
                  onChange={(e) => setClaimedRelation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border border-navy-700 focus:border-emerald-500 text-white placeholder-slate-400 text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Context Message (Voice Transcript or Chat context) */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Accompanying Message or Context</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Scam Script Check</span>
              </label>
              <textarea
                rows={2}
                placeholder="Paste the message, chat text, or call reason accompanying this payment request..."
                value={contextMessage}
                onChange={(e) => setContextMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border border-navy-700 focus:border-emerald-500 text-white placeholder-slate-400 text-sm focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Checkbox: First-time payee */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-navy-850/60 border border-navy-800">
              <input
                type="checkbox"
                id="firstTimePayee"
                checked={isFirstPayment}
                onChange={(e) => setIsFirstPayment(e.target.checked)}
                className="w-4 h-4 text-emerald-600 bg-navy-800 border-navy-700 rounded focus:ring-emerald-500"
              />
              <label htmlFor="firstTimePayee" className="text-xs text-slate-300 cursor-pointer">
                <span className="font-semibold text-white">First-time payment to this payee</span>
                <span className="text-slate-400 ml-1.5">
                  (Triggers elevated verification for unverified VPAs)
                </span>
              </label>
            </div>

            {/* Voice Note Simulator */}
            <VoiceNoteSimulator
              enabled={voiceNoteSimulated}
              onToggle={(enabled) => setVoiceNoteSimulated(enabled)}
              probability={voiceAiProbability}
              transcription={
                contextMessage || "Beta, I'm in hospital, send ₹20,000 to this number right now, don't tell Papa"
              }
            />

            {/* Analysis Progress Overlay (when active) */}
            {isAnalyzing && (
              <div className="p-4 rounded-xl bg-navy-850 border border-emerald-500/40 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>PayKavach Multi-Model Neural Risk Engine</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Evaluating...</span>
                </div>
                <p className="text-xs text-slate-200 font-mono">{scanStep}</p>
                <div className="w-full bg-navy-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-1.5 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero banking credentials or UPI PIN requested</span>
              </div>
              <Button
                type="submit"
                size="lg"
                variant="emerald"
                isLoading={isAnalyzing}
                leftIcon={<Scan className="w-5 h-5" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-glow-pass"
              >
                Analyze Payment Before Paying
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
