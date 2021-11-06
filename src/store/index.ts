import { persist, StoreApiWithPersist } from 'zustand/middleware'
import create, { SetState, GetState } from 'zustand'

import { Expense } from '../interfaces/expense'
import { State } from '../interfaces/state'

const initalCategories = [
  { name: 'Savings/Investments', percentage: 20 },
  { name: 'Needs', percentage: 50 },
  { name: 'Wants', percentage: 30 },
]

export const useStore = create<State>(
  // @ts-ignore
  persist(
    (set, get) => ({
      stats: { income: 0 },
      expenses: [],
      categories: [...initalCategories],
      updateIncome: (income: number) => set({stats: {income}}),
      addExpense: (expense: Expense) => set({expenses: [...get().expenses, expense]}),
      updateExpense: (expense: Expense, index: number) => {
        const expenses = get().expenses
        expenses[index] = expense
        set({expenses: expenses})
      },
    }),
    {
      name: 'paisa/storage',
    }
  )
)
