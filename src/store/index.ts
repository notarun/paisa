import { persist, StoreApiWithPersist } from 'zustand/middleware'
import create, { SetState, GetState } from 'zustand'
import dayjs from 'dayjs'

import { Statistics } from '../interfaces/statistic'
import { Expense } from '../interfaces/expense'
import { State } from '../interfaces/state'

const initalCategories = [
  { name: 'Savings/Investments', percentage: 20 },
  { name: 'Needs', percentage: 50 },
  { name: 'Wants', percentage: 30 },
]

const initalStats = [
  {
    income: 0,
    from: dayjs().format('YYYY-MM-DD'),
    to: dayjs().add(1, 'month').format('YYYY-MM-DD'),
  }
]

export const useStore = create<State>(
  // @ts-ignore
  persist(
    (set, get) => ({
      // state
      selectedStats: 0,
      stats: [...initalStats],
      expenses: [],
      categories: [...initalCategories],

      // actions
      currentStats: () => get().stats[get().selectedStats],
      createStats: (stats: Statistics) => set({stats: [...get().stats, stats]}),
      updateSelectedStats: (selectedStats: number) => set({ selectedStats }),
      updateCurrentStats: (currentStats: Statistics) => {
        const stats = get().stats
        stats[get().selectedStats] = currentStats
        set({ stats })
      },

      createExpense: (expense: Expense) => set({expenses: [...get().expenses, expense]}),
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
