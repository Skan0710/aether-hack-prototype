import { PaymentRequest, RiskCheckScore } from '../types/payment';

export function evaluateVoiceRisk(request: PaymentRequest): RiskCheckScore {
  if (request.voiceNoteSimulated) {
    const probability = request.voiceAiProbability ?? 91;
    const score = probability / 100; // e.g. 0.91

    return {
      name: 'Voice-Clone Risk',
      key: 'voice',
      score,
      weight: 0.20,
      weightedContribution: 0.20 * score,
      status: score >= 0.8 ? 'danger' : score >= 0.4 ? 'warning' : 'safe',
      headline: `Voice note is ${probability}% likely AI-generated`,
      detail: `Synthetic frequency harmonics and vocoder phase irregularities detected in incoming audio note. High confidence neural voice mimicry.`,
      reasonCode: `AI_VOICE_CLONE_${probability}`,
    };
  }

  return {
    name: 'Voice-Clone Risk',
    key: 'voice',
    score: 0.0,
    weight: 0.20,
    weightedContribution: 0.0,
    status: 'safe',
    headline: 'No Voice Note Attached',
    detail: 'Standard manual transaction without simulated or real audio media.',
    reasonCode: 'NO_VOICE_NOTE',
  };
}
