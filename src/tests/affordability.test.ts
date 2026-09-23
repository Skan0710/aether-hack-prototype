import { describe, it, expect } from 'vitest';
import { calculateAffordability } from '../utils/affordability';
import { INITIAL_DEMO_USER } from '../data/demoUser';

describe('Affordability Calculator & Cash-Flow Foresight', () => {
  it('correctly calculates Demo 2 ₹8,000 shortfall with Croma purchase', () => {
    const result = calculateAffordability({
      currentBalance: INITIAL_DEMO_USER.currentBalance, // 48,500
      paymentAmount: 30000,
      obligations: INITIAL_DEMO_USER.obligations, // 15,000 + 8,500 + 3,000 = 26,500
    });

    expect(result.currentBalance).toBe(48500);
    expect(result.paymentAmount).toBe(30000);
    expect(result.balanceAfterPayment).toBe(18500);
    expect(result.obligationsTotal).toBe(26500);
    expect(result.projectedBalance).toBe(-8000);
    expect(result.shortfall).toBe(8000);
    expect(result.isShortfall).toBe(true);
    expect(result.message).toBe(
      "You can afford this today, but rent and your EMI are due in 5 days — you'd be short by ₹8,000. Salary lands on the 1st: buy then, or split it?"
    );
  });

  it('correctly identifies safe payments with positive post-obligation liquidity', () => {
    const result = calculateAffordability({
      currentBalance: 48500,
      paymentAmount: 2000,
      obligations: INITIAL_DEMO_USER.obligations,
    });

    expect(result.isShortfall).toBe(false);
    expect(result.shortfall).toBe(0);
    expect(result.projectedBalance).toBe(48500 - 2000 - 26500); // 20,000
  });

  it('incorporates optional safety buffer when requested', () => {
    const result = calculateAffordability({
      currentBalance: 30000,
      paymentAmount: 5000,
      obligations: [{ id: '1', name: 'Bill', amount: 24000, dueDate: '3d', daysRemaining: 3, category: 'utility', isAutopay: false }],
      safetyBuffer: 1500,
    });

    // 30,000 - 5,000 - 24,000 - 1,500 = -500
    expect(result.projectedBalance).toBe(-500);
    expect(result.shortfall).toBe(500);
    expect(result.isShortfall).toBe(true);
  });
});
