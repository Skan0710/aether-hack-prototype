export interface UpiIntentParams {
  vpa: string;
  payeeName: string;
  amount: number;
  transactionNote?: string;
}

/**
 * Generates a standard NPCI UPI payment intent URI.
 * Format: upi://pay?pa={VPA}&pn={PAYEE_NAME}&am={AMOUNT}&cu=INR
 */
export function generateUpiUri(params: UpiIntentParams): string {
  const { vpa, payeeName, amount, transactionNote = 'PayKavach Pre-Screened Payment' } = params;

  const queryParams = new URLSearchParams({
    pa: vpa.trim(),
    pn: payeeName.trim(),
    am: amount.toFixed(2),
    cu: 'INR',
    tn: transactionNote,
  });

  return `upi://pay?${queryParams.toString()}`;
}

export async function copyUpiVpa(vpa: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(vpa);
    return true;
  } catch (err) {
    console.error('Failed to copy UPI ID:', err);
    return false;
  }
}
