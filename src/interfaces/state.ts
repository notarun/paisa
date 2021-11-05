import { Statistics } from './statistic'
import { Category } from './category'
import { Expense } from './expense'

export interface State {
  stats: Statistics
  expenses: Array<Expense>
  categories: Array<Category>
}
