import { CreditPassportData } from '../types/credit';

export const DEMO_CREDIT_PASSPORT: CreditPassportData = {
  score: 78,
  maxScore: 100,
  riskTier: 'Low Risk',
  assessmentDate: 'September 2026',
  metrics: {
    salaryRegularity: '12 of 12 months',
    onTimeRate: 96,
    spendingStability: '±8% a month',
    savingsBufferMonths: 1.8,
    latePaymentHistory: 'One late EMI in March',
  },
  factors: [
    {
      id: 'f-1',
      name: 'Salary Regularity',
      rating: 'strong_positive',
      metric: '12 of 12 months credited',
      impactText: 'Strong Positive (+28 pts)',
      detail: 'Consistent monthly primary payroll deposit verified on the 1st of every month without interruption over the past 365 days.',
    },
    {
      id: 'f-2',
      name: 'Essential Bills & Rent Discipline',
      rating: 'positive',
      metric: '96% on-time payment rate',
      impactText: 'Positive (+24 pts)',
      detail: 'High reliability across housing rent, electricity utility bills, and telecom obligations over past 24 cycles.',
    },
    {
      id: 'f-3',
      name: 'Monthly Spending Stability',
      rating: 'positive',
      metric: '±8% monthly variation',
      impactText: 'Positive (+18 pts)',
      detail: 'Expenditure volatility is low and well-bounded. Absence of reckless lifestyle spikes maintains predictable liquidity.',
    },
    {
      id: 'f-4',
      name: 'Prior Loan Repayment Incident',
      rating: 'small_negative',
      metric: 'One late EMI in March',
      impactText: 'Small Negative (-8 pts)',
      detail: 'Single 4-day delayed EMI clearance recorded in March (remedied immediately). Curtailed penalty due to prompt cure.',
    },
  ],
  syntheticDisclosure:
    'Synthetic Demo Assessment: PayKavach Credit Passport represents an explainable behavioral cash-flow model derived from mock transaction streams. It is NOT an official credit score from TransUnion CIBIL, Experian, CRIF, or Equifax, and is not an official lender guarantee.',
};
