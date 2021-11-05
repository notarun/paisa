import { useState } from 'preact/hooks'

import { StatsSettingsModal } from '../modals/stats-settings'
import { useStore } from '../../store'

export const StatsCard = () => {
  const stats = useStore(state => state.stats)
  const expenses = useStore(state => state.expenses)

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="card">
        <div className="card-header">
          <button className="btn btn-link float-right" onClick={() => setShowModal(true)}>
            <i className="icon icon-edit"></i>
          </button>

          <div className="card-title h5">Income</div>
          <div className="card-subtitle text-primary">₹ {stats.income}</div>

          <div className="card-title h5 mt-2">Total Expenses</div>
          <div className="card-subtitle text-error">₹ {expenses.map(e => e.amount).reduce((a, b) => a + b)}</div>

          <div className="card-title h5 mt-2">Total Remaining</div>
          <div className="card-subtitle text-success">₹ {stats.income - expenses.map(e => e.amount).reduce((a, b) => a + b)}</div>
        </div>
      </div>

      <StatsSettingsModal show={showModal} closeModal={() => setShowModal(false)}/>
    </>
  )
}
