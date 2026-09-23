import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { PhoneOff, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';

interface MomVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

export const MomVerificationModal: React.FC<MomVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerified,
}) => {
  const [callState, setCallState] = useState<'dialing' | 'connected' | 'ended'>('dialing');

  const startCall = () => {
    setCallState('dialing');
    setTimeout(() => setCallState('connected'), 1200);
  };

  React.useEffect(() => {
    if (isOpen) {
      startCall();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Simulated Direct Out-of-Band Verification"
      subtitle="Dialing saved contact from secure personal address book"
      maxWidth="md"
    >
      <div className="space-y-5 text-center py-2">
        {/* Caller Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-glow-pass">
              Mom
            </div>
            {callState === 'connected' && (
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-navy-900 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </span>
            )}
          </div>
          <h4 className="text-lg font-bold text-white mt-3">Mom (Sunita Sharma)</h4>
          <p className="text-xs text-slate-400 font-mono">+91 98201 12345 • Saved Contact</p>
        </div>

        {/* Call Status Badge */}
        <div className="flex justify-center">
          {callState === 'dialing' && (
            <span className="text-xs px-3 py-1 rounded-full bg-navy-800 text-cyan-400 border border-navy-700 animate-pulse font-mono">
              Dialing secure number...
            </span>
          )}
          {callState === 'connected' && (
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Connected (00:08)
            </span>
          )}
        </div>

        {/* Live Audio / Call Transcript */}
        {callState === 'connected' && (
          <div className="p-4 rounded-xl bg-navy-850 border border-emerald-500/30 text-left space-y-2 animate-in fade-in">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold font-mono">
              <UserCheck className="w-4 h-4" />
              <span>Real Voice Transcript (Verified Contact):</span>
            </div>
            <p className="text-sm text-slate-200 italic leading-relaxed bg-navy-900/60 p-3 rounded-lg border border-navy-800">
              "Aarav beta? I am sitting at home having evening tea with your chachi! What hospital? I never sent any message or asked for ₹20,000! Do NOT send any money, it is a complete scam!"
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mom confirmed safe. Fraudulent voice clone impersonation confirmed.</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="danger"
            size="md"
            leftIcon={<PhoneOff className="w-4 h-4" />}
            onClick={onClose}
          >
            End Call
          </Button>
          {callState === 'connected' && (
            <Button
              variant="emerald"
              size="md"
              leftIcon={<ShieldCheck className="w-4 h-4" />}
              onClick={() => {
                onVerified();
                onClose();
              }}
              className="shadow-glow-pass"
            >
              Confirm Scam Blocked & Cancel
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
