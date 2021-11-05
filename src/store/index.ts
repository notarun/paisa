import create from 'zustand'

import { State } from '../interfaces/state'

export const useStore = create<State>(set => ({
  stats: {
    income: 10000,
  },
  expenses: [
    { description: 'Petrol', category: 'Needs', amount: 1000 },
    { description: 'Apartment Rent', category: 'Needs', amount: 5000 },
  ],
  categories: [
    { name: 'Savings/Investments', percentage: 20 },
    { name: 'Needs', percentage: 50 },
    { name: 'Wants', percentage: 30 },
  ],
  updateIncome: (income: number) => set({stats: {income}})
}))
