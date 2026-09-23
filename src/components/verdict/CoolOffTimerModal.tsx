import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Timer, AlertTriangle, ShieldAlert, FastForward } from 'lucide-react';

interface CoolOffTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOverrideUnlocked: () => void;
}

export const CoolOffTimerModal: React.FC<CoolOffTimerModalProps> = ({
  isOpen,
  onClose,
  onOverrideUnlocked,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes = 600s
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSecondsRemaining(600);
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((sec) => sec - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFastForward = () => {
    setSecondsRemaining(3);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Mandatory 10-Minute Behavioral Cool-Off"
      subtitle="Psychological intervention against artificial urgency"
      maxWidth="md"
    >
      <div className="space-y-5 text-center py-2">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 shadow-glow-warn">
            <Timer className="w-8 h-8" />
          </div>
          <div className="text-4xl font-extrabold text-white font-mono tracking-wider">
            {formatTime(secondsRemaining)}
          </div>
          <span className="text-xs text-amber-400 font-medium mt-1">
            {secondsRemaining > 0 ? 'Cool-off active. Emergency panic fading.' : 'Cool-off period elapsed.'}
          </span>
        </div>

        {/* Psychological Context Box */}
        <div className="p-4 rounded-xl bg-navy-850 border border-navy-750 text-left space-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold font-mono">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Why is this cool-off required?</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Emergency extortion scams rely on the victim being in an active state of panic for the first 7 minutes. Taking 10 minutes breaks the social engineering loop and gives you time to call trusted family members directly.
          </p>
        </div>

        {/* Demo Fast-Forward Button for Judges */}
        {secondsRemaining > 5 && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleFastForward}
              className="text-xs px-3 py-1.5 rounded-lg bg-navy-800 text-cyan-400 hover:text-cyan-300 border border-navy-700 hover:border-cyan-500/30 flex items-center gap-1.5 transition-colors font-mono"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Fast-forward timer (Judge / Demo Presentation)</span>
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="secondary" size="md" onClick={onClose}>
            Back to Safety Verdict
          </Button>
          <Button
            variant="danger"
            size="md"
            disabled={secondsRemaining > 0}
            leftIcon={<ShieldAlert className="w-4 h-4" />}
            onClick={() => {
              onOverrideUnlocked();
              onClose();
            }}
          >
            {secondsRemaining > 0 ? `Wait (${secondsRemaining}s)` : 'Acknowledge Risk & Continue'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
