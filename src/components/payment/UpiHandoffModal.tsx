import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { generateUpiUri, copyUpiVpa } from '../../utils/upiHandoff';
import { formatINR } from '../../utils/formatCurrency';
import { ExternalLink, Copy, Check, ShieldCheck, QrCode } from 'lucide-react';

interface UpiHandoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  vpa: string;
  payeeName: string;
  amount: number;
  onPaymentRecorded?: () => void;
}

export const UpiHandoffModal: React.FC<UpiHandoffModalProps> = ({
  isOpen,
  onClose,
  vpa,
  payeeName,
  amount,
  onPaymentRecorded,
}) => {
  const [copied, setCopied] = useState(false);
  const upiUri = generateUpiUri({ vpa, payeeName, amount });

  const handleCopy = async () => {
    const success = await copyUpiVpa(vpa);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLaunchUpi = () => {
    window.location.href = upiUri;
    if (onPaymentRecorded) onPaymentRecorded();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Standard UPI Payment Handoff"
      subtitle="Generating native NPCI UPI payment intent URI"
      maxWidth="md"
    >
      <div className="space-y-5 text-center py-1">
        {/* Payment Summary Box */}
        <div className="p-4 rounded-xl bg-navy-850 border border-navy-750 text-left space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-navy-800">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Payee Name</span>
              <p className="text-sm font-bold text-white">{payeeName}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Amount</span>
              <p className="text-lg font-bold text-emerald-400 font-mono">{formatINR(amount)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Payee UPI VPA</span>
              <p className="text-xs font-semibold text-slate-200 font-mono">{vpa}</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              onClick={handleCopy}
            >
              {copied ? 'Copied VPA' : 'Copy UPI ID'}
            </Button>
          </div>
        </div>

        {/* QR Code / Simulated Hand-off visualization */}
        <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 flex flex-col items-center justify-center space-y-2">
          <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
            <QrCode className="w-24 h-24 text-navy-950" />
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Scan using PhonePe / GPay / Paytm / BHIM
          </span>
        </div>

        {/* Generated Intent URI */}
        <div className="p-2.5 rounded-lg bg-navy-950 border border-navy-800 text-left">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">Generated NPCI URI:</span>
          <p className="text-[11px] font-mono text-emerald-400 break-all select-all">
            {upiUri}
          </p>
        </div>

        {/* Companion Safety Boundary */}
        <div className="p-3 rounded-lg bg-navy-850/60 border border-navy-800 text-left flex items-start gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Companion Boundary:</strong> PayKavach does not collect or request your UPI PIN or OTP. All transaction authorizations happen strictly within your verified banking app.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
          <Button variant="secondary" size="md" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="emerald"
            size="md"
            rightIcon={<ExternalLink className="w-4 h-4" />}
            onClick={handleLaunchUpi}
            className="w-full sm:w-auto"
          >
            Launch UPI App
          </Button>
        </div>
      </div>
    </Modal>
  );
};
