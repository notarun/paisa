import { StatsSettingsModal } from '../modals/stats-settings'
import { useStore } from '../../store'

interface IncomeCardProps {
  showModal: () => void;
}

export const IncomeCard = ({ showModal }: IncomeCardProps) => {
  const { currentStats, totalExpenses } = useStore(state => ({
    currentStats: state.currentStats,
    totalExpenses: state.expenses.map(e => e.amount).reduce((a, b) => a + b, 0),
  }))

  return (
    <>
      <div className="card">
        <div className="card-header">
          <button
            className="btn btn-link float-right"
            onClick={() => showModal()}
          >
            <i className="icon icon-edit"></i>
          </button>

          <div className="card-title h5 mt-2">
            Income
          </div>
          <div className="card-subtitle text-primary">
            ₹ {currentStats().income}
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
            ₹ {currentStats().income - totalExpenses}
          </div>
        </div>
      </div>
    </>
  )
}
