import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  Settings as SettingsIcon,
  Trash2,
  RotateCcw,
  Shield,
  Lock,
  Cpu,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to delete all local payment screening records?')) {
      storageService.clearHistory();
      showNotice('All local screening history deleted.');
    }
  };

  const handleResetDemo = () => {
    if (confirm('Reset prototype state to initial demo seed (Aarav Sharma, ₹48,500)?')) {
      storageService.resetDemoData();
      showNotice('Demo state restored to original seed.');
      setTimeout(() => window.location.reload(), 800);
    }
  };

  const showNotice = (msg: string) => {
    setStatusNotice(msg);
    setTimeout(() => setStatusNotice(null), 3500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
          <SettingsIcon className="w-4 h-4" />
          <span>PREFERENCES & SYSTEM TRANSPARENCY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Settings & Privacy
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage local demo state, review privacy boundaries, and inspect simulation safeguards.
        </p>
      </div>

      {statusNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusNotice}</span>
        </div>
      )}

      {/* Product Boundaries & Privacy Disclosures */}
      <Card className="border-navy-750">
        <CardHeader
          title="Product Boundaries & Technical Transparency"
          subtitle="Honest disclosure of prototype mechanisms versus production architecture"
          icon={<Shield className="w-5 h-5 text-emerald-400" />}
        />
        <CardContent className="space-y-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-navy-850 border border-navy-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Zero Credential Collection Policy</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              PayKavach never asks for, reads, or stores your UPI PIN, banking passwords, SMS OTPs, or debit card credentials. Payment execution is strictly handed off to official NPCI-licensed UPI applications.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-850 border border-navy-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Companion Architecture: No Simulated OS Blocking</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              PayKavach is designed as an advisory pre-payment companion. It cannot directly intercept, freeze, or cancel bank transactions inside third-party apps like Google Pay or PhonePe. It advises before you launch payment.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-850 border border-navy-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Deterministic Synthetic Models</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              The AI risk scoring, acoustic voice clone probability, and Credit Passport are deterministic demo models configured for hackathon demonstration. No paid external AI APIs or live bank accounts are required to run this prototype.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Demo State Management & Reset */}
      <Card className="border-navy-750">
        <CardHeader
          title="Demo State Management"
          subtitle="Manage locally stored browser data and reset demonstration parameters"
          icon={<RotateCcw className="w-5 h-5 text-amber-400" />}
        />
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-navy-850 border border-navy-800 gap-3">
            <div>
              <h4 className="text-sm font-semibold text-white">Reset Demo User Seed</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Restores Aarav Sharma profile, ₹48,500 balance, and initial 3 obligations.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RotateCcw className="w-4 h-4" />}
              onClick={handleResetDemo}
            >
              Reset Demo Seed
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 gap-3">
            <div>
              <h4 className="text-sm font-semibold text-rose-300">Delete Local History</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Removes all payment screenings and verdicts stored in this browser's LocalStorage.
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={handleClearHistory}
            >
              Clear Screening History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
