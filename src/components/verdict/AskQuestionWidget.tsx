import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { HelpCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { VerdictStatus } from '../../types/payment';

interface AskQuestionWidgetProps {
  onAnswerSelected: (newVerdict: VerdictStatus, explanation: string) => void;
}

export const AskQuestionWidget: React.FC<AskQuestionWidgetProps> = ({ onAnswerSelected }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleApply = (optionId: string) => {
    setSelectedOption(optionId);
    if (optionId === 'opt-verified') {
      onAnswerSelected(
        'PASS',
        'User confirmed personal out-of-band verification. Ambiguity resolved with direct confirmation.'
      );
    } else {
      onAnswerSelected(
        'HOLD',
        'User confirmed payment was prompted solely by an unverified urgent digital message without out-of-band contact.'
      );
    }
  };

  return (
    <Card className="border-blue-500/30 bg-blue-950/10">
      <CardHeader
        title="Interactive Verification Required (ASK Policy)"
        subtitle="Conflicting signals detected. Clarify context to determine final recommendation."
        icon={<HelpCircle className="w-5 h-5 text-blue-400" />}
      />
      <CardContent className="space-y-4">
        <p className="text-sm font-semibold text-white">
          Did you personally speak with the recipient through a trusted, known phone number or in person before initiating this transfer?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleApply('opt-verified')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedOption === 'opt-verified'
                ? 'border-emerald-500 bg-emerald-500/10'
                : 'border-navy-800 bg-navy-850 hover:border-navy-700'
            }`}
          >
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>YES, PERSONALLY VERIFIED</span>
            </div>
            <p className="text-xs text-slate-300">
              I called their known number or met them directly. The payment purpose and VPA were confirmed.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleApply('opt-unverified')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedOption === 'opt-unverified'
                ? 'border-rose-500 bg-rose-500/10'
                : 'border-navy-800 bg-navy-850 hover:border-navy-700'
            }`}
          >
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>NO, ONLY RECEIVED A MESSAGE</span>
            </div>
            <p className="text-xs text-slate-300">
              I received an urgent message/link and haven't verified with them directly over a trusted channel.
            </p>
          </button>
        </div>

        {selectedOption && (
          <div className="pt-2 text-xs text-blue-300 flex items-center justify-between">
            <span>Verdict dynamically updated based on your input.</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedOption(null)}
            >
              Reset Clarification
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
