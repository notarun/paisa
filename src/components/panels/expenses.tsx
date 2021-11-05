import { Expense } from '../../interfaces/expense'
import { useStore } from '../../store'

interface ExpenseRowProps extends Expense {}

const ExpenseRow = ({ description, category, amount }: ExpenseRowProps) => (
  <tr>
    <td>{description}</td>
    <td><span className="chip">{category}</span></td>
    <td className="text-error">₹{amount}</td>
  </tr>
)

export const ExpensesPanel = () => {
  const expenses = useStore(state => state.expenses)

  return (
    <>
      <table className="table">
        <tbody>
          {expenses.map(({ description, category, amount }) => (
            <ExpenseRow
              description={description}
              category={category}
              amount={amount}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}
