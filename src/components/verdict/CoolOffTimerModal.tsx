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

  const progress = ((600 - secondsRemaining) / 600) * 100;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="10-minute cool-off"
      subtitle="A short pause before you send money under pressure"
      maxWidth="md"
    >
      <div className="space-y-5 text-center py-2">
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28 flex items-center justify-center mb-1">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-navy-800"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-400 transition-all duration-1000 ease-linear"
                strokeDasharray={`${progress}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <Timer className="w-4 h-4 text-amber-400 mb-1" />
              <span className="text-2xl font-bold text-white tabular-nums">
                {formatTime(secondsRemaining)}
              </span>
            </div>
          </div>
          <span className="text-xs text-slate-400 mt-1">
            {secondsRemaining > 0 ? 'Take a breath — the urgency will pass.' : 'Cool-off complete.'}
          </span>
        </div>

        {/* Psychological Context Box */}
        <div className="p-4 rounded-xl bg-navy-850 border border-navy-800 text-left space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Why this matters</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Emergency scams rely on panic in the first few minutes. Ten minutes is usually enough time to call someone you trust and check if the request is real.
          </p>
        </div>

        {/* Demo Fast-Forward Button for Judges */}
        {secondsRemaining > 5 && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleFastForward}
              className="text-xs px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Fast-forward (demo mode)</span>
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="secondary" size="md" onClick={onClose}>
            Back to Verdict
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
            {secondsRemaining > 0 ? `Wait (${secondsRemaining}s)` : 'Continue Anyway'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
