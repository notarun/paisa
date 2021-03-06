import { Statistics } from './statistic'
import { Category } from './category'
import { Expense } from './expense'

export interface State {
  selectedStats: number;
  stats: Array<Statistics>;
  expenses: Array<Expense>;
  categories: Array<Category>;

  totalExpensesThisMonth: () => number;

  currentStats: () => Statistics;
  updateSelectedStats: (selectedStats: number) => void,
  updateCurrentStats: (stats: Statistics) => void;
  createStats: (stats: Statistics) => void;
  deleteStats: (index: number) => void;

  createExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense, index: number) => void;
  deleteExpense: (index: number) => void;
}
