export interface TranslationDictionary {
  appName: string;
  tagline: string;
  dashboard: string;
  checkPayment: string;
  creditPassport: string;
  history: string;
  settings: string;
  availableBalance: string;
  checkAPayment: string;
  verdictPass: string;
  verdictWarn: string;
  verdictHold: string;
  verdictAsk: string;
  disclaimer: string;
  consentTitle: string;
  resetDemo: string;
  clearHistory: string;
}

export const translations: Record<'en' | 'hi', TranslationDictionary> = {
  en: {
    appName: 'PayKavach',
    tagline: 'The AI that asks why before you pay.',
    dashboard: 'Dashboard',
    checkPayment: 'Check Payment',
    creditPassport: 'Credit Passport',
    history: 'Payment History',
    settings: 'Settings & Privacy',
    availableBalance: 'Available Balance',
    checkAPayment: 'Check a Payment Now',
    verdictPass: 'SAFE • PASS',
    verdictWarn: 'WARN • CAUTION',
    verdictHold: 'HOLD • SCAM INTERCEPT',
    verdictAsk: 'ASK • CLARIFICATION',
    disclaimer: 'PayKavach is a companion financial shield. It does not block or execute bank transactions.',
    consentTitle: 'Account Aggregator & Privacy Consent',
    resetDemo: 'Reset Demo State to Initial Seed',
    clearHistory: 'Delete Local Screening History',
  },
  hi: {
    appName: 'पे-कवच (PayKavach)',
    tagline: 'वह AI जो भुगतान करने से पहले आपसे पूछता है क्यों।',
    dashboard: 'डैशबोर्ड',
    checkPayment: 'भुगतान की जाँच करें',
    creditPassport: 'क्रेडिट पासपोर्ट',
    history: 'भुगतान इतिहास',
    settings: 'सेटिंग्स और गोपनीयता',
    availableBalance: 'उपलब्ध शेष राशि',
    checkAPayment: 'भुगतान की अभी जाँच करें',
    verdictPass: 'सुरक्षित • पास',
    verdictWarn: 'चेतावनी • सतर्कता',
    verdictHold: 'रोकें • फ्रॉड का खतरा',
    verdictAsk: 'पूछें • स्पष्टीकरण',
    disclaimer: 'पे-कवच एक वित्तीय सुरक्षा साथी है। यह बैंक लेनदेन को सीधे ब्लॉक या प्रोसेस नहीं करता है।',
    consentTitle: 'अकाउंट एग्रीगेटर एवं गोपनीयता सहमति',
    resetDemo: 'डेमो स्थिति को प्रारंभिक रीसेट करें',
    clearHistory: 'स्थानीय जाँच इतिहास मिटाएं',
  },
};
