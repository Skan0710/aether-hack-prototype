import { PaymentVerdict } from '../types/payment';

const STORAGE_KEYS = {
  HISTORY: 'paykavach_payment_history',
  LANGUAGE: 'paykavach_user_language',
  CURRENT_VERDICT: 'paykavach_active_verdict',
};

export const storageService = {
  getHistory(): PaymentVerdict[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading history from localStorage', e);
      return [];
    }
  },

  saveVerdict(verdict: PaymentVerdict): void {
    try {
      const history = this.getHistory();
      // Prepend the new verdict
      const updated = [verdict, ...history.filter((v) => v.id !== verdict.id)];
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
      localStorage.setItem(STORAGE_KEYS.CURRENT_VERDICT, JSON.stringify(verdict));
    } catch (e) {
      console.error('Error saving verdict to localStorage', e);
    }
  },

  getCurrentVerdict(): PaymentVerdict | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_VERDICT);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  getVerdictById(id: string): PaymentVerdict | undefined {
    const history = this.getHistory();
    const found = history.find((v) => v.id === id);
    if (found) return found;

    const current = this.getCurrentVerdict();
    if (current && current.id === id) return current;
    return undefined;
  },

  updateVerdictAction(id: string, action: PaymentVerdict['userActionTaken']): void {
    try {
      const history = this.getHistory();
      const updated = history.map((v) => (v.id === id ? { ...v, userActionTaken: action } : v));
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));

      const current = this.getCurrentVerdict();
      if (current && current.id === id) {
        current.userActionTaken = action;
        localStorage.setItem(STORAGE_KEYS.CURRENT_VERDICT, JSON.stringify(current));
      }
    } catch (e) {
      console.error('Error updating verdict action', e);
    }
  },

  clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_VERDICT);
    } catch (e) {
      console.error('Error clearing history', e);
    }
  },

  resetDemoData(): void {
    this.clearHistory();
    localStorage.removeItem(STORAGE_KEYS.LANGUAGE);
  },

  getLanguage(): 'en' | 'hi' {
    return (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as 'en' | 'hi') || 'en';
  },

  setLanguage(lang: 'en' | 'hi'): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  },
};
