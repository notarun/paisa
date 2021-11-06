import { useState } from 'preact/hooks'

import { Expense } from '../../interfaces/expense'
import { ExpenseModal } from '../modals/expense'
import { useStore } from '../../store'

interface ExpenseRowProps extends Expense {}

const ExpenseRow = ({ description, category, amount }: ExpenseRowProps) => (
  <tr>
    <td>{description}</td>
    <td><span className="chip">{category}</span></td>
    <td className="text-error">₹{amount}</td>
    {
      // FIXME: implement `edit expense`
      // <td>
      //   <button className="btn btn-link">
      //   <i className="icon icon-edit"></i>
      //   </button>
      // </td>
    }
  </tr>
)

export const ExpensesPanel = () => {
  const expenses = useStore(state => state.expenses)

  const [showModal, setShowModal] = useState(false)
  const [modalAction, setShowAction] = useState('add')

  return (
    <>
      <table className="table">
        <tbody>
          {expenses.map(props => <ExpenseRow {...props}/>)}
        </tbody>
      </table>

      <div className="sticky-bottom py-2">
        <button
          className="btn btn-primary btn-block"
          onClick={() => (setShowAction('add'), setShowModal(true))}
        >
          Add expense
        </button>
      </div>

      <ExpenseModal
        show={showModal}
        action={modalAction as 'add' | 'edit'}
        closeModal={() => setShowModal(false)}
      />
    </>
  )
}
