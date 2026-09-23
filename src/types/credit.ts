export interface CreditFactor {
  id: string;
  name: string;
  rating: 'strong_positive' | 'positive' | 'neutral' | 'small_negative';
  metric: string;
  impactText: string;
  detail: string;
}

export interface CreditPassportData {
  score: number; // 78
  maxScore: number; // 100
  riskTier: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  assessmentDate: string;
  factors: CreditFactor[];
  metrics: {
    salaryRegularity: string; // 12 of 12 months
    onTimeRate: number; // 96%
    spendingStability: string; // ±8% a month
    savingsBufferMonths: number; // 1.8 months
    latePaymentHistory: string; // One late EMI in March
  };
  syntheticDisclosure: string;
}
