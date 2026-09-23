import { PaymentRequest, PaymentVerdict } from '../types/payment';
import { storageService } from './storageService';

export const paymentService = {
  async analyzePayment(request: PaymentRequest): Promise<PaymentVerdict> {
    // Simulated processing delay to showcase AI inspection
    await new Promise((resolve) => setTimeout(resolve, 600));

    const id = `chk-${Date.now()}`;
    const timestamp = new Date().toISOString();

    // Default structure (will be powered by full risk engine in Commit 4 & 5)
    let verdict: PaymentVerdict;

    if (request.scenarioId === 'demo1-scam' || request.payeeVpa === 'rahul.k88@ybl') {
      verdict = {
        id,
        timestamp,
        verdict: 'HOLD',
        fusedRiskScore: 94,
        title: 'High-Risk Impersonation Scam Intercepted',
        explanation: 'Payment held due to critical voice clone probability, unverified first-time recipient, and high match with emergency extortion playbooks.',
        plainLanguageReasons: [
          'Voice note is 91% likely AI-generated',
          'First-ever payment to this payee',
          'Payee name does not match Mom',
          'Urgency and secrecy detected',
          'Script matches 94% of known hospital-emergency scams',
        ],
        reasonCodes: ['AI_VOICE_CLONE_91', 'FIRST_TIME_PAYEE', 'IDENTITY_MISMATCH', 'URGENCY_PRESSURE', 'SCAM_SCRIPT_94'],
        recommendedAction: 'Call Mom on her saved number before paying.',
        matchedPlaybook: {
          name: 'Hospital Medical Emergency Extortion',
          similarity: 94,
          tactics: ['Family Impersonation', 'Urgency Coercion', 'Third-Party Mule VPA', 'Secrecy Demand'],
        },
        checks: {
          script: {
            name: 'Scam-Script Analysis',
            key: 'script',
            score: 0.94,
            weight: 0.35,
            weightedContribution: 0.329,
            status: 'danger',
            headline: 'Hospital Emergency Extortion Match (94%)',
            detail: 'Matches known pressure playbooks coercing urgent funds while demanding secrecy.',
            reasonCode: 'SCAM_SCRIPT_94',
          },
          payee: {
            name: 'Payee & Behavioral Risk',
            key: 'payee',
            score: 0.90,
            weight: 0.30,
            weightedContribution: 0.27,
            status: 'danger',
            headline: 'Unverified First-Time Payee (Rahul Kumar)',
            detail: 'Account created recently, zero prior transaction history with Aarav Sharma.',
            reasonCode: 'FIRST_TIME_PAYEE',
          },
          voice: {
            name: 'Voice-Clone Risk',
            key: 'voice',
            score: 0.91,
            weight: 0.20,
            weightedContribution: 0.182,
            status: 'danger',
            headline: 'Synthetic Voice Detected (91% AI probability)',
            detail: 'Acoustic artifact analysis indicates voice synthesized using neural TTS/voice-cloning.',
            reasonCode: 'AI_VOICE_CLONE_91',
          },
          context: {
            name: 'Contextual Relationship',
            key: 'context',
            score: 0.88,
            weight: 0.15,
            weightedContribution: 0.132,
            status: 'danger',
            headline: 'Relationship Conflict: Claimed "Mom" vs Payee "Rahul"',
            detail: 'Message instructs "don\'t tell Papa" indicating high psychological manipulation.',
            reasonCode: 'IDENTITY_MISMATCH',
          },
        },
        payeeDetails: {
          name: request.payeeName,
          vpa: request.payeeVpa,
          isFirstTime: true,
          claimedRelation: 'Mom',
        },
        amount: request.amount,
        purpose: request.purpose,
        contextMessage: request.contextMessage,
        hasVoiceSimulation: true,
        voiceAiProbability: 91,
        userActionTaken: 'pending',
      };
    } else if (request.scenarioId === 'demo2-cashflow' || request.amount === 30000) {
      verdict = {
        id,
        timestamp,
        verdict: 'WARN',
        fusedRiskScore: 48,
        title: 'Cash-Flow Shortfall Foresight Warning',
        explanation: "You can afford this today, but rent and your EMI are due in 5 days — you'd be short by ₹8,000. Salary lands on the 1st: buy then, or split it?",
        plainLanguageReasons: [
          'Purchase leaves insufficient balance for scheduled obligations',
          'Rent (₹15,000) and EMI (₹8,500) due in 5 days',
          'Projected deficit of ₹8,000 before salary credit on 1st',
        ],
        reasonCodes: ['CASH_FLOW_SHORTFALL_8K', 'MANDATORY_OBLIGATION_AT_RISK'],
        recommendedAction: 'Postpone purchase to 1st of month or use merchant zero-cost EMI split.',
        checks: {
          script: {
            name: 'Scam-Script Analysis',
            key: 'script',
            score: 0.05,
            weight: 0.35,
            weightedContribution: 0.0175,
            status: 'safe',
            headline: 'Verified Commercial Merchant',
            detail: 'No scam patterns detected in merchant invoice intent.',
            reasonCode: 'SAFE_SCRIPT',
          },
          payee: {
            name: 'Payee & Behavioral Risk',
            key: 'payee',
            score: 0.05,
            weight: 0.30,
            weightedContribution: 0.015,
            status: 'safe',
            headline: 'Reputable Retailer (Croma Electronics)',
            detail: 'Verified merchant VPA with high trust volume.',
            reasonCode: 'VERIFIED_MERCHANT',
          },
          voice: {
            name: 'Voice-Clone Risk',
            key: 'voice',
            score: 0.0,
            weight: 0.20,
            weightedContribution: 0.0,
            status: 'safe',
            headline: 'No Voice Input Provided',
            detail: 'Direct in-store or website POS interaction.',
            reasonCode: 'NO_VOICE',
          },
          context: {
            name: 'Contextual Relationship',
            key: 'context',
            score: 0.10,
            weight: 0.15,
            weightedContribution: 0.015,
            status: 'safe',
            headline: 'Routine Electronics Purchase',
            detail: 'Discretionary lifestyle spending.',
            reasonCode: 'SAFE_CONTEXT',
          },
          cashFlow: {
            currentBalance: 48500,
            paymentAmount: 30000,
            obligationsTotal: 26500,
            safetyBuffer: 1000,
            projectedBalance: -8000,
            shortfall: 8000,
            isShortfall: true,
            upcomingObligations: [
              { name: 'House Rent', amount: 15000, daysRemaining: 5 },
              { name: 'HDFC Personal Loan EMI', amount: 8500, daysRemaining: 5 },
              { name: 'Electricity & Mobile Bills', amount: 3000, daysRemaining: 5 },
            ],
          },
        },
        payeeDetails: {
          name: request.payeeName,
          vpa: request.payeeVpa,
          isFirstTime: false,
        },
        amount: request.amount,
        purpose: request.purpose,
        contextMessage: request.contextMessage,
        hasVoiceSimulation: false,
        userActionTaken: 'pending',
      };
    } else {
      // General Safe / Custom verdict
      verdict = {
        id,
        timestamp,
        verdict: 'PASS',
        fusedRiskScore: 12,
        title: 'Payment Evaluated as Safe',
        explanation: 'All safety indicators verified. Legitimate payee profile, clear context, and ample post-payment liquidity buffer.',
        plainLanguageReasons: [
          'Payee matches known safe commercial / personal patterns',
          'Sufficient liquidity preserved for upcoming bills',
          'Zero social engineering or impersonation signals detected',
        ],
        reasonCodes: ['SAFE_PAYEE', 'HEALTHY_BUFFER', 'NO_SCAM_MARKERS'],
        recommendedAction: 'Proceed with standard UPI payment intent.',
        checks: {
          script: {
            name: 'Scam-Script Analysis',
            key: 'script',
            score: 0.10,
            weight: 0.35,
            weightedContribution: 0.035,
            status: 'safe',
            headline: 'No Social Engineering Markers',
            detail: 'Context is clean of coercion or phishing scripts.',
            reasonCode: 'SAFE_SCRIPT',
          },
          payee: {
            name: 'Payee & Behavioral Risk',
            key: 'payee',
            score: 0.12,
            weight: 0.30,
            weightedContribution: 0.036,
            status: 'safe',
            headline: 'Standard Banking VPA',
            detail: 'VPA handles resolve to valid routing bank.',
            reasonCode: 'VALID_VPA',
          },
          voice: {
            name: 'Voice-Clone Risk',
            key: 'voice',
            score: 0.0,
            weight: 0.20,
            weightedContribution: 0.0,
            status: 'safe',
            headline: 'No Synthetic Voice Artifacts',
            detail: 'Clean audio or direct text payment.',
            reasonCode: 'SAFE_AUDIO',
          },
          context: {
            name: 'Contextual Relationship',
            key: 'context',
            score: 0.15,
            weight: 0.15,
            weightedContribution: 0.0225,
            status: 'safe',
            headline: 'Consistent Spending Profile',
            detail: 'Payment magnitude fits Aarav’s past transaction window.',
            reasonCode: 'PROFILE_FIT',
          },
          cashFlow: {
            currentBalance: 48500,
            paymentAmount: request.amount,
            obligationsTotal: 26500,
            safetyBuffer: 1000,
            projectedBalance: 48500 - request.amount - 26500 - 1000,
            shortfall: 0,
            isShortfall: false,
            upcomingObligations: [
              { name: 'House Rent', amount: 15000, daysRemaining: 5 },
              { name: 'HDFC Personal Loan EMI', amount: 8500, daysRemaining: 5 },
              { name: 'Electricity & Mobile Bills', amount: 3000, daysRemaining: 5 },
            ],
          },
        },
        payeeDetails: {
          name: request.payeeName,
          vpa: request.payeeVpa,
          isFirstTime: request.isFirstPayment || false,
        },
        amount: request.amount,
        purpose: request.purpose,
        contextMessage: request.contextMessage,
        hasVoiceSimulation: false,
        userActionTaken: 'pending',
      };
    }

    storageService.saveVerdict(verdict);
    return verdict;
  },
};
