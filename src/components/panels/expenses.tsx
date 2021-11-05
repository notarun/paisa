import { Expense } from '../../interfaces/expense'
import { useStore } from '../../store'

interface ExpenseRowProps extends Expense {}

const ExpenseRow = ({ description, category, amount }: ExpenseRowProps) => (
  <tr>
    <td>{description}</td>
    <td><span class="chip">{category}</span></td>
    <td class="text-error">₹{amount}</td>
  </tr>
)

export const ExpensesPanel = () => {
  const expenses = useStore(state => state.expenses)

  return (
    <>
      <table class="table">
        <tbody>
          {expenses.map(e => <ExpenseRow
            description={e.description}
            category={e.category}
            amount={e.amount}
          />)}
        </tbody>
      </table>
    </>
  )
}
