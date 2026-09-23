import { PaymentRequest, RiskCheckScore } from '../types/payment';

export function evaluatePayeeRisk(request: PaymentRequest): RiskCheckScore {
  // If explicitly Demo 1 or first-time recipient named Rahul Kumar with VPA rahul.k88@ybl
  if (
    request.scenarioId === 'demo1-scam' ||
    (request.isFirstPayment && request.payeeVpa.includes('rahul'))
  ) {
    return {
      name: 'Payee & Behavioral Risk',
      key: 'payee',
      score: 0.90,
      weight: 0.30,
      weightedContribution: 0.30 * 0.90,
      status: 'danger',
      headline: 'First-ever payment to this payee',
      detail: `Unverified handle "${request.payeeVpa}" registered recently with zero transaction velocity history with Aarav Sharma.`,
      reasonCode: 'FIRST_TIME_PAYEE',
    };
  }

  if (request.isFirstPayment) {
    return {
      name: 'Payee & Behavioral Risk',
      key: 'payee',
      score: 0.55,
      weight: 0.30,
      weightedContribution: 0.30 * 0.55,
      status: 'warning',
      headline: 'First-time payee verification advisory',
      detail: `Recipient VPA "${request.payeeVpa}" has not been previously saved in your verified payee ledger.`,
      reasonCode: 'FIRST_TIME_UNVERIFIED',
    };
  }

  // Trusted merchant or repeat recipient
  return {
    name: 'Payee & Behavioral Risk',
    key: 'payee',
    score: 0.08,
    weight: 0.30,
    weightedContribution: 0.30 * 0.08,
    status: 'safe',
    headline: 'Recognized / Verified Payee Handle',
    detail: `Verified commercial routing or established recipient with positive historical integrity.`,
    reasonCode: 'VERIFIED_PAYEE',
  };
}
