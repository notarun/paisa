import { useState } from 'preact/hooks'

import { Expense } from '../../interfaces/expense'
import { ExpenseModal } from '../modals/expense'
import { useStore } from '../../store'

interface ExpenseRowProps extends Expense {
  showModal?: () => void;
  expenseIndex?: number;
}

const ExpenseRow = ({ description, category, amount, showModal, expenseIndex }: ExpenseRowProps) => (
  <tr>
    <td>{description}</td>
    <td><span className="chip">{category}</span></td>
    <td className="text-error">₹{amount}</td>
    <td>
      <button className="btn btn-link" onClick={() => showModal && showModal()}>
        <i className="icon icon-edit"></i>
      </button>
    </td>
  </tr>
)

export const ExpensesPanel = () => {
  const expenses = useStore(state => state.expenses)

  const [showModal, setShowModal] = useState(false)
  const [expenseModalIndex, setExpenseModalIndex] = useState<number | null>(null)

  const toggleModal = (show: boolean, index?: number) => {
    if (!show) {
      setExpenseModalIndex(null)
      setShowModal(false)
      return
    }

    if (index !== undefined) {
      setExpenseModalIndex(index)
      setShowModal(true)
      return
    }

    setExpenseModalIndex(null)
    setShowModal(true)
  }

  return (
    <>
      <table className="table">
        <tbody>
          {expenses.map((props, index) => (
            <ExpenseRow
              {...props}
              showModal={() => toggleModal(true, index)}
            />
          ))}
        </tbody>
      </table>

      <div className="sticky-bottom py-2">
        <button
          className="btn btn-primary btn-block"
          onClick={() => toggleModal(true)}
        >
          Add expense
        </button>
      </div>

      <ExpenseModal
        show={showModal}
        expenseModalIndex={expenseModalIndex}
        closeModal={() => toggleModal(false)}
      />
    </>
  )
}
