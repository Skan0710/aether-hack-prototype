import { describe, it, expect } from 'vitest';
import { computeFusedRisk } from '../engine/riskFusion';
import { determineVerdict } from '../engine/verdictPolicy';

describe('Decision Policy & Risk Fusion Engine', () => {
  it('correctly calculates weighted fused risk formula', () => {
    // 0.35*script + 0.30*payee + 0.20*voice + 0.15*context
    const inputs = {
      scriptScore: 0.94,
      payeeScore: 0.90,
      voiceScore: 0.91,
      contextScore: 0.88,
    };
    const fused = computeFusedRisk(inputs);
    // 0.94*0.35 = 0.329
    // 0.90*0.30 = 0.270
    // 0.91*0.20 = 0.182
    // 0.88*0.15 = 0.132
    // Sum = 0.913
    expect(fused).toBeCloseTo(0.913, 2);
  });

  it('enforces Demo 1 HOLD verdict with 94/100 and all five required reasons', () => {
    const decision = determineVerdict({
      fusedRisk: 0.94,
      voiceScore: 0.91,
      isFirstTimePayee: true,
      isCashFlowShortfall: false,
      scores: [0.94, 0.90, 0.91, 0.88],
      isDemo1: true,
    });

    expect(decision.verdict).toBe('HOLD');
    expect(decision.scoreOutOf100).toBe(94);
    expect(decision.reasons).toHaveLength(5);
    expect(decision.reasons).toContain('Voice note is 91% likely AI-generated');
    expect(decision.reasons).toContain('First-ever payment to this payee');
    expect(decision.reasons).toContain('Payee name does not match Mom');
    expect(decision.reasons).toContain('Urgency and secrecy detected');
    expect(decision.reasons).toContain('Script matches 94% of known hospital-emergency scams');
    expect(decision.recommendedAction).toBe('Call Mom on her saved number before paying.');
  });

  it('triggers HOLD when voice score >= 0.80 on first-time payee', () => {
    const decision = determineVerdict({
      fusedRisk: 0.65,
      voiceScore: 0.85,
      isFirstTimePayee: true,
      isCashFlowShortfall: false,
      scores: [0.2, 0.5, 0.85, 0.3],
    });

    expect(decision.verdict).toBe('HOLD');
    expect(decision.priorityApplied).toBe('HOLD');
  });

  it('triggers WARN when cash-flow shortfall exists', () => {
    const decision = determineVerdict({
      fusedRisk: 0.20,
      voiceScore: 0.0,
      isFirstTimePayee: false,
      isCashFlowShortfall: true,
      shortfallAmount: 8000,
      scores: [0.05, 0.05, 0.0, 0.10],
      isDemo2: true,
    });

    expect(decision.verdict).toBe('WARN');
    expect(decision.priorityApplied).toBe('WARN');
    expect(decision.reasons[0]).toContain('short by ₹8,000');
  });

  it('triggers ASK when checks disagree strongly (max - min > 0.50)', () => {
    const decision = determineVerdict({
      fusedRisk: 0.35,
      voiceScore: 0.0,
      isFirstTimePayee: false,
      isCashFlowShortfall: false,
      scores: [0.70, 0.10, 0.0, 0.05], // max(0.70) - min(0.0) = 0.70 > 0.50
    });

    expect(decision.verdict).toBe('ASK');
    expect(decision.priorityApplied).toBe('ASK');
  });

  it('defaults to PASS for clean low-risk parameters', () => {
    const decision = determineVerdict({
      fusedRisk: 0.10,
      voiceScore: 0.0,
      isFirstTimePayee: false,
      isCashFlowShortfall: false,
      scores: [0.10, 0.10, 0.0, 0.10],
    });

    expect(decision.verdict).toBe('PASS');
  });

  it('verifies priority order: HOLD overrides WARN and ASK', () => {
    // Both high fused risk (HOLD) and cash-flow shortfall (WARN) and high disagreement (ASK)
    const decision = determineVerdict({
      fusedRisk: 0.85,
      voiceScore: 0.85,
      isFirstTimePayee: true,
      isCashFlowShortfall: true,
      shortfallAmount: 5000,
      scores: [0.95, 0.20, 0.85, 0.90],
    });

    expect(decision.verdict).toBe('HOLD');
  });
});
