import { PaymentRequest } from '../types/payment';

export interface DemoScenarioConfig {
  id: string;
  name: string;
  badge: string;
  badgeVariant: 'hold' | 'warn' | 'pass';
  description: string;
  request: PaymentRequest;
}

export const DEMO_SCENARIOS: DemoScenarioConfig[] = [
  {
    id: 'demo1-scam',
    name: 'Demo 1: Scam Intercept (Hospital Emergency)',
    badge: 'Expected: HOLD (94/100)',
    badgeVariant: 'hold',
    description: 'Impersonating "Mom" with AI voice clone asking for ₹20,000 urgently.',
    request: {
      payeeName: 'Rahul Kumar',
      payeeVpa: 'rahul.k88@ybl',
      amount: 20000,
      purpose: 'Hospital Medical Emergency',
      claimedRelation: 'Mom',
      contextMessage: "Beta, I'm in hospital, send ₹20,000 to this number right now, don't tell Papa",
      isFirstPayment: true,
      voiceNoteSimulated: true,
      voiceAiProbability: 91,
      scenarioId: 'demo1-scam',
    },
  },
  {
    id: 'demo2-cashflow',
    name: 'Demo 2: Cash-Flow Shortfall (Croma Purchase)',
    badge: 'Expected: WARN (-₹8,000)',
    badgeVariant: 'warn',
    description: 'Affordable today (₹48,500 balance), but leaves ₹8,000 deficit before rent & EMI.',
    request: {
      payeeName: 'Croma Electronics',
      payeeVpa: 'croma.retail@icici',
      amount: 30000,
      purpose: 'Smartphone Upgrade',
      claimedRelation: 'Merchant',
      contextMessage: 'Purchase of new smartphone during promotional sale at Croma store',
      isFirstPayment: false,
      voiceNoteSimulated: false,
      scenarioId: 'demo2-cashflow',
    },
  },
  {
    id: 'demo-safe',
    name: 'Safe Routine Payment (Society Maintenance)',
    badge: 'Expected: PASS (8/100)',
    badgeVariant: 'pass',
    description: 'Trusted recurring payee with sufficient liquidity.',
    request: {
      payeeName: 'Greenwood Society Maintenance',
      payeeVpa: 'greenwood.society@hdfc',
      amount: 2500,
      purpose: 'Monthly Maintenance Charges',
      claimedRelation: 'Housing Society',
      contextMessage: 'Society monthly maintenance bill for apartment 402',
      isFirstPayment: false,
      voiceNoteSimulated: false,
      scenarioId: 'custom',
    },
  },
];
