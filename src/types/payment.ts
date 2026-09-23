export type VerdictStatus = 'PASS' | 'WARN' | 'HOLD' | 'ASK';

export interface RiskCheckScore {
  name: string;
  key: 'script' | 'payee' | 'voice' | 'context' | 'cashFlow';
  score: number; // 0 to 1
  weight: number;
  weightedContribution: number;
  status: 'safe' | 'warning' | 'danger';
  headline: string;
  detail: string;
  reasonCode: string;
}

export interface CashFlowDetail {
  currentBalance: number;
  paymentAmount: number;
  obligationsTotal: number;
  safetyBuffer: number;
  projectedBalance: number;
  shortfall: number;
  isShortfall: boolean;
  upcomingObligations: Array<{ name: string; amount: number; daysRemaining: number }>;
}

export interface PaymentVerdict {
  id: string;
  timestamp: string;
  verdict: VerdictStatus;
  fusedRiskScore: number; // 0 - 100
  title: string;
  explanation: string;
  plainLanguageReasons: string[];
  reasonCodes: string[];
  recommendedAction: string;
  matchedPlaybook?: {
    name: string;
    similarity: number; // e.g. 94%
    tactics: string[];
  };
  checks: {
    script: RiskCheckScore;
    payee: RiskCheckScore;
    voice: RiskCheckScore;
    context: RiskCheckScore;
    cashFlow?: CashFlowDetail;
  };
  payeeDetails: {
    name: string;
    vpa: string;
    isFirstTime: boolean;
    claimedRelation?: string;
  };
  amount: number;
  purpose: string;
  contextMessage?: string;
  hasVoiceSimulation?: boolean;
  voiceAiProbability?: number; // e.g. 91%
  userActionTaken?: 'paid' | 'cancelled' | 'verified' | 'cool_off' | 'remind_1st' | 'pending';
  askQuestion?: {
    id: string;
    question: string;
    options: Array<{
      id: string;
      label: string;
      riskImpact: 'reduces' | 'increases' | 'neutral';
      nextVerdict: VerdictStatus;
    }>;
  };
}

export interface PaymentRequest {
  payeeName: string;
  payeeVpa: string;
  amount: number;
  purpose: string;
  contextMessage?: string;
  isFirstPayment?: boolean;
  claimedRelation?: string;
  voiceNoteSimulated?: boolean;
  voiceAiProbability?: number;
  scenarioId?: 'demo1-scam' | 'demo2-cashflow' | 'custom';
}
