import { UserProfile } from '../types/user';

export const INITIAL_DEMO_USER: UserProfile = {
  name: 'Aarav Sharma',
  handle: 'aarav@okaxis',
  accountNumberMasked: '•••• 4092',
  currentBalance: 48500,
  salaryDate: 1, // 1st of every month
  salaryCreditedMonths: '12 of 12 months',
  obligations: [
    {
      id: 'ob-1',
      name: 'House Rent',
      amount: 15000,
      dueDate: 'Due in 5 days',
      daysRemaining: 5,
      category: 'rent',
      isAutopay: true,
    },
    {
      id: 'ob-2',
      name: 'HDFC Personal Loan EMI',
      amount: 8500,
      dueDate: 'Due in 5 days',
      daysRemaining: 5,
      category: 'emi',
      isAutopay: true,
    },
    {
      id: 'ob-3',
      name: 'Electricity & Mobile Bills',
      amount: 3000,
      dueDate: 'Due in 5 days',
      daysRemaining: 5,
      category: 'utility',
      isAutopay: false,
    },
  ],
  creditPassportScore: 78,
  language: 'en',
};
