import { persist, StoreApiWithPersist } from 'zustand/middleware'
import create, { SetState, GetState } from 'zustand'
import dayjs from 'dayjs'

import { Statistics } from '../interfaces/statistic'
import { LOCAL_STORAGE_KEY } from '../constants'
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
      /* STATE */
      selectedStats: 0,
      stats: [...initalStats],
      expenses: [],
      categories: [...initalCategories],

      /* ACTIONS */
      currentStats: () => get().stats[get().selectedStats],
      updateSelectedStats: (selectedStats: number) => set({ selectedStats }),
      updateCurrentStats: (currentStats: Statistics) => {
        const stats = get().stats
        stats[get().selectedStats] = currentStats
        set({ stats })
      },
      createStats: (stats: Statistics) => set({stats: [...get().stats, stats]}),
      deleteStats: (index: number) => {
        const stats = get().stats
        stats.splice(index, 1)
        set({ stats, selectedStats: stats.length - 1 })
      },

      createExpense: (expense: Expense) => set({expenses: [...get().expenses, expense]}),
      updateExpense: (expense: Expense, index: number) => {
        const expenses = get().expenses
        expenses[index] = expense
        set({ expenses: expenses })
      },
      deleteExpense: (index: number) => {
        const expenses = get().expenses
        expenses.splice(index, 1)
        set({ expenses })
      },
    }),
    {
      name: LOCAL_STORAGE_KEY,
    }
  )
)
