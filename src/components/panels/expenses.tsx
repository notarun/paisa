import { createPortal } from 'preact/compat'
import { useState } from 'preact/hooks'
import dayjs from 'dayjs'

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
  const { expenses } = useStore(state => ({
    expenses: state.expenses.filter(
      e => dayjs(e.date).isBetween(
        state.currentStats().from,
        state.currentStats().to,
        null,
        '[]'
      )
    )
  }))

  const [showModal, setShowModal] = useState(false)
  const [expenseIndex, setExpenseIndex] = useState<number | null>(null)

  const toggleModal = (show: boolean, index?: number) => {
    if (!show) {
      setExpenseIndex(null)
      setShowModal(false)
      return
    }

    if (index !== undefined) {
      setExpenseIndex(index)
      setShowModal(true)
      return
    }

    setExpenseIndex(null)
    setShowModal(true)
  }

  const modalsContainer = document.getElementById('modals');

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

      {createPortal(
        <ExpenseModal
          show={showModal}
          expenseIndex={expenseIndex}
          closeModal={() => toggleModal(false)}
        />,
        modalsContainer!
      )}
    </>
  )
}
