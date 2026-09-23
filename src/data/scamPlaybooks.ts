export interface ScamPlaybook {
  id: string;
  name: string;
  pattern: string[];
  severity: number;
  tactics: string[];
  description: string;
}

export const KNOWN_SCAM_PLAYBOOKS: ScamPlaybook[] = [
  {
    id: 'hospital-emergency',
    name: 'Hospital Medical Emergency Extortion',
    pattern: ['hospital', 'doctor', 'accident', 'operation', 'admitted', 'icu', 'emergency', 'send right now', 'papa'],
    severity: 0.94,
    tactics: [
      'Family Impersonation',
      'Artificial Medical Urgency',
      'Third-Party Intermediary VPA',
      'Secrecy Demand ("don\'t tell Papa")',
    ],
    description: 'Fraudsters impersonate close relatives claiming sudden hospital admission to induce panic-driven money transfers to an unrelated VPA.',
  },
  {
    id: 'lottery-prize',
    name: 'Lottery / Prize Processing Fee Scam',
    pattern: ['congratulations', 'won', 'lottery', 'processing fee', 'claim', 'lucky draw'],
    severity: 0.96,
    tactics: ['False Reward', 'Advance Fee Fraud', 'Counter-Strike VPA'],
    description: 'Promises large cash windfall in exchange for immediate UPI deposit or clearance fee.',
  },
  {
    id: 'kyc-electricity',
    name: 'Urgent Electricity Disconnection / KYC Scam',
    pattern: ['electricity', 'power disconnect', 'tonight', 'bill unpaid', 'kyc expire', 'call electricity officer'],
    severity: 0.92,
    tactics: ['Infrastructure Threat', 'Time Pressure', 'Fake Customer Support'],
    description: 'Claims residential electricity will be severed at 9:30 PM unless a test payment is sent via an unverified link.',
  },
];
