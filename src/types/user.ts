export interface Obligation {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  daysRemaining: number;
  category: 'rent' | 'emi' | 'utility' | 'subscription';
  isAutopay: boolean;
}

export interface UserProfile {
  name: string;
  handle: string;
  accountNumberMasked: string;
  currentBalance: number;
  salaryDate: number; // 1st of month
  salaryCreditedMonths: string; // "12 of 12 months"
  obligations: Obligation[];
  creditPassportScore: number;
  language: 'en' | 'hi';
}
