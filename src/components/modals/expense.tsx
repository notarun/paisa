import { useState, useRef } from 'preact/hooks'
import * as dayjs from 'dayjs'

import { Expense } from '../../interfaces/expense'
import { useStore } from '../../store'
import { BaseModal } from './base'

interface ExpenseModalProps {
  action: 'add' | 'edit';
  show: boolean;
  closeModal: () => void;
}

export const ExpenseModal = ({ action, show, closeModal }: ExpenseModalProps) => {
  const { categories, addExpense } = useStore(state => ({
    addExpense: state.addExpense,
    categories: state.categories.map(c => c.name),
  }))

  const today = dayjs().format('YYYY-MM-DD')

  const formId = 'form-expense'
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(today)

  const submit = (e: Event) => {
    e.preventDefault()
    addExpense({ description, category, amount: parseFloat(amount), date })
    closeModal()

    // reset form
    setDescription('')
    setCategory('')
    setAmount('')
    setDate(today)
  }

  return (
    <BaseModal
      show={show}
      formId={formId}
      title={{ 'add': 'Add expense', 'edit': 'Edit expense' }[action]}
      closeModal={closeModal}
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
          onInput={e => setAmount((e.target as HTMLInputElement).value)}
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
