import { useState, useEffect } from 'preact/hooks'

import { StatsSettingsModal } from '../modals/stats-settings'
import { useStore } from '../../store'

export const StatsCard = () => {
  const { income, totalExpenses } = useStore(state => ({
    income: state.stats.income,
    totalExpenses: state.expenses.map(e => e.amount).reduce((a, b) => a + b, 0),
  }))

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="card">
        <div className="card-header">
          <button className="btn btn-link float-right" onClick={() => setShowModal(true)}>
            <i className="icon icon-edit"></i>
          </button>

          <div className="card-title h5">
            Income
          </div>
          <div className="card-subtitle text-primary">
            ₹ {income}
          </div>

          <div className="card-title h5 mt-2">
            Total Expenses
          </div>
          <div className="card-subtitle text-error">
            ₹ {totalExpenses}
          </div>

          <div className="card-title h5 mt-2">
            Total Remaining
          </div>
          <div className="card-subtitle text-success">
            ₹ {income - totalExpenses}
          </div>
        </div>
      </div>

      <StatsSettingsModal show={showModal} closeModal={() => setShowModal(false)}/>
    </>
  )
}
