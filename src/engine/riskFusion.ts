export interface FusionInputs {
  scriptScore: number;
  payeeScore: number;
  voiceScore: number;
  contextScore: number;
}

export function computeFusedRisk(inputs: FusionInputs): number {
  const { scriptScore, payeeScore, voiceScore, contextScore } = inputs;
  const weighted =
    scriptScore * 0.35 +
    payeeScore * 0.30 +
    voiceScore * 0.20 +
    contextScore * 0.15;

  return Math.min(1.0, Math.max(0.0, weighted));
}
