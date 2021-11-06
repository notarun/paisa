import { useState, useEffect } from 'preact/hooks'
import dayjs from 'dayjs'

import { Expense } from '../../interfaces/expense'
import { useStore } from '../../store'
import { BaseModal } from './base'

interface ExpenseModalProps {
  show: boolean;
  expenseIndex: number | null;
  closeModal: () => void;
}

export const ExpenseModal = ({ show, expenseIndex, closeModal }: ExpenseModalProps) => {
  const today = dayjs().format('YYYY-MM-DD')

  const {
    expenses,
    categories,
    createExpense,
    updateExpense,
    deleteExpense,
  } = useStore(state => ({
    expenses: state.expenses,
    categories: state.categories.map(c => c.name),
    createExpense: state.createExpense,
    updateExpense: state.updateExpense,
    deleteExpense: state.deleteExpense,
  }))

  const formId = 'form-expense'
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(today)

  const [modalTitle, setModalTitle] = useState('')

  const resetForm = () => {
    setDescription('')
    setCategory('')
    setAmount(0)
    setDate(today)
  }

  useEffect(() => {
    if (!show) {
      resetForm()
      return
    }

    if (expenseIndex !== null) {
      const expense = expenses[expenseIndex]

      setDescription(expense.description)
      setCategory(expense.category)
      setAmount(expense.amount)
      setDate(expense.date)

      setModalTitle('Edit expense')
    } else {
      setModalTitle('Add expense')
    }
  }, [show])

  const submit = (e: Event) => {
    e.preventDefault()

    const expense = {
      description,
      category,
      amount,
      date,
    }

    if (expenseIndex !== null) {
      updateExpense(expense, expenseIndex)
    } else {
      createExpense(expense)
    }

    resetForm()
    closeModal()
  }

  return (
    <BaseModal
      show={show}
      formId={formId}
      title={modalTitle}
      closeModal={closeModal}
      deleteResource={
        expenseIndex !== null
          ? () => deleteExpense(expenseIndex)
          : undefined
      }
    >
      <form
        id={formId}
        className="form-group"
        onSubmit={(e) => submit(e)}
      >
        <label className="form-label" for="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onInput={e => setDescription((e.target as HTMLInputElement).value)}
          placeholder="Description"
          className="form-input"
          required
        />

        <label className="form-label" for="category">Category</label>
        <select
          id="category"
          className="form-select"
          value={category}
          onChange={e => setCategory((e.target as HTMLSelectElement).value)}
          required
        >
          {categories.map(category => <option>{category}</option>)}
        </select>

        <label className="form-label" for="amount">Amount</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onInput={e => setAmount(parseFloat((e.target as HTMLInputElement).value))}
          placeholder="Amount"
          className="form-input"
          required
        />

        <label className="form-label" for="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onInput={e => setDate((e.target as HTMLInputElement).value)}
          placeholder="Date"
          className="form-input"
          required
        />
      </form>
    </BaseModal>
  )
}
