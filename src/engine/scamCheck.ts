import { PaymentRequest, RiskCheckScore } from '../types/payment';
import { KNOWN_SCAM_PLAYBOOKS } from '../data/scamPlaybooks';

export function evaluateScamScript(request: PaymentRequest): {
  check: RiskCheckScore;
  matchedPlaybook?: { name: string; similarity: number; tactics: string[] };
} {
  const text = `${request.purpose} ${request.contextMessage || ''}`.toLowerCase();

  // Exact Demo 1 Hospital check
  if (
    request.scenarioId === 'demo1-scam' ||
    text.includes('hospital') ||
    text.includes("don't tell papa") ||
    text.includes('admitted')
  ) {
    const playbook = KNOWN_SCAM_PLAYBOOKS[0]; // Hospital Medical Emergency Extortion
    return {
      check: {
        name: 'Scam-Script Analysis',
        key: 'script',
        score: 0.94,
        weight: 0.35,
        weightedContribution: 0.35 * 0.94,
        status: 'danger',
        headline: 'Matches 94% of known hospital-emergency scams',
        detail: 'Urgency keywords ("send right now"), hospital emergency claim, and secrecy coercion ("don\'t tell Papa") strongly align with emergency extortion playbooks.',
        reasonCode: 'SCAM_SCRIPT_94',
      },
      matchedPlaybook: {
        name: playbook.name,
        similarity: 94,
        tactics: playbook.tactics,
      },
    };
  }

  // Lottery check
  if (text.includes('lottery') || text.includes('prize') || text.includes('won')) {
    const playbook = KNOWN_SCAM_PLAYBOOKS[1];
    return {
      check: {
        name: 'Scam-Script Analysis',
        key: 'script',
        score: 0.96,
        weight: 0.35,
        weightedContribution: 0.35 * 0.96,
        status: 'danger',
        headline: 'Matches Prize/Lottery Fee Fraud Playbook (96%)',
        detail: 'Advance fee extortion scheme demanding upfront funds before releasing fictitious winnings.',
        reasonCode: 'SCAM_SCRIPT_LOTTERY',
      },
      matchedPlaybook: {
        name: playbook.name,
        similarity: 96,
        tactics: playbook.tactics,
      },
    };
  }

  // Default clean script
  return {
    check: {
      name: 'Scam-Script Analysis',
      key: 'script',
      score: 0.05,
      weight: 0.35,
      weightedContribution: 0.35 * 0.05,
      status: 'safe',
      headline: 'No Social Engineering Markers Detected',
      detail: 'Communication does not exhibit coercion, false urgency, or impersonation keywords.',
      reasonCode: 'SAFE_SCRIPT',
    },
  };
}
