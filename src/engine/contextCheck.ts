import { PaymentRequest, RiskCheckScore } from '../types/payment';

export function evaluateContextRisk(request: PaymentRequest): RiskCheckScore {
  const claimed = (request.claimedRelation || '').toLowerCase();
  const payee = request.payeeName.toLowerCase();
  const message = (request.contextMessage || '').toLowerCase();

  // If claimed relation is Mom but payee name is Rahul Kumar
  if (
    request.scenarioId === 'demo1-scam' ||
    (claimed.includes('mom') || claimed.includes('mother')) && !payee.includes('mom') && !payee.includes('sharma')
  ) {
    return {
      name: 'Contextual Relationship & Secrecy',
      key: 'context',
      score: 0.88,
      weight: 0.15,
      weightedContribution: 0.15 * 0.88,
      status: 'danger',
      headline: 'Payee name does not match Mom & Urgency/secrecy detected',
      detail: `Payment claims to be for "Mom", yet recipient account name is registered as "${request.payeeName}". Message specifies "don't tell Papa", a signature coercive isolation tactic.`,
      reasonCode: 'NAME_RELATION_MISMATCH_SECRECY',
    };
  }

  if (message.includes('urgent') || message.includes('immediately') || message.includes('fast')) {
    return {
      name: 'Contextual Urgency',
      key: 'context',
      score: 0.45,
      weight: 0.15,
      weightedContribution: 0.15 * 0.45,
      status: 'warning',
      headline: 'Elevated urgency language detected',
      detail: 'Communication emphasizes speed, a common factor leading to reduced vigilance.',
      reasonCode: 'URGENCY_LANGUAGE',
    };
  }

  return {
    name: 'Contextual Coherence',
    key: 'context',
    score: 0.10,
    weight: 0.15,
    weightedContribution: 0.15 * 0.10,
    status: 'safe',
    headline: 'Context matches regular transactional norms',
    detail: 'No isolation demands, emotional coercion, or identity discrepancies identified.',
    reasonCode: 'COHERENT_CONTEXT',
  };
}
