import { Obligation } from '../types/user';

export interface AffordabilityInput {
  currentBalance: number;
  paymentAmount: number;
  obligations: Obligation[];
  safetyBuffer?: number;
}

export interface AffordabilityResult {
  currentBalance: number;
  paymentAmount: number;
  balanceAfterPayment: number;
  obligationsTotal: number;
  safetyBuffer: number;
  projectedBalance: number;
  shortfall: number;
  isShortfall: boolean;
  message: string;
  upcomingObligations: Array<{ name: string; amount: number; daysRemaining: number }>;
}

/**
 * Calculates pre-payment cash-flow affordability before scheduled obligations.
 * Formula:
 * projectedBalance = currentBalance - paymentAmount - obligationsTotal (with optional safety buffer)
 */
export function calculateAffordability(input: AffordabilityInput): AffordabilityResult {
  const { currentBalance, paymentAmount, obligations, safetyBuffer = 0 } = input;

  const obligationsTotal = obligations.reduce((sum, item) => sum + item.amount, 0);
  const balanceAfterPayment = currentBalance - paymentAmount;
  const projectedBalance = balanceAfterPayment - obligationsTotal - safetyBuffer;

  const shortfall = projectedBalance < 0 ? Math.abs(projectedBalance) : 0;
  const isShortfall = projectedBalance < 0;

  const upcomingObligations = obligations.map((o) => ({
    name: o.name,
    amount: o.amount,
    daysRemaining: o.daysRemaining,
  }));

  let message = '';
  if (isShortfall) {
    message = `You can afford this today, but rent and your EMI are due in 5 days — you'd be short by ₹${shortfall.toLocaleString('en-IN')}. Salary lands on the 1st: buy then, or split it?`;
  } else {
    message = `Payment is fully affordable. You retain ₹${projectedBalance.toLocaleString('en-IN')} buffer after covering all upcoming scheduled obligations.`;
  }

  return {
    currentBalance,
    paymentAmount,
    balanceAfterPayment,
    obligationsTotal,
    safetyBuffer,
    projectedBalance,
    shortfall,
    isShortfall,
    message,
    upcomingObligations,
  };
}
