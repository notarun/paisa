import { useState } from 'preact/hooks'

import { useStore } from '../../store'

interface AddExpenseModalProps {
  show: boolean
  closeModal: () => void
}

export const AddExpenseModal = ({ show, closeModal }: AddExpenseModalProps) => {
  const stats = useStore(state => state.stats)
  const updateIncome = useStore(state => state.updateIncome)

  const [form, setForm] = useState({ income: stats.income })

  return (
    <div className={`modal modal-lg ${show && 'active'}`}>
      <a className="modal-overlay" aria-label="Close" onClick={() => closeModal()}></a>
      <div className="modal-container">
        <div className="modal-header">
          <button className="btn btn-clear float-right" aria-label="Close" onClick={() => closeModal()}></button>
          <div className="modal-title h5">
            Add expense
          </div>
        </div>

        <div className="modal-body">
          <div className="content">
            <div className="form-group">
              <label className="form-label" for="income">Income</label>
              <input
                id="income"
                type="number"
                value={form.income}
                onInput={(e) => setForm({ income: parseFloat((e.target as HTMLInputElement).value) })}
                placeholder="Income"
                className="form-input" />
              </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-link" onClick={() => closeModal()}>Close</button>
          <button className="btn btn-primary" onClick={() => (updateIncome(form.income), closeModal())}>
            Update
          </button>
        </div>
      </div>
    </div>
  )
}
