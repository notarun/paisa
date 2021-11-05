import { useStore } from '../../store'

export const StatsCard = () => {
  const stats = useStore(state => state.stats)
  const expenses = useStore(state => state.expenses)

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title h5">Income</div>
        <div className="card-subtitle text-primary">₹ {stats.income}</div>

        <div className="card-title h5 mt-2">Total Expenses</div>
        <div className="card-subtitle text-error">₹ {expenses.map(e => e.amount).reduce((a, b) => a + b)}</div>

        <div className="card-title h5 mt-2">Total Remaining</div>
        <div className="card-subtitle text-success">₹ {stats.income - expenses.map(e => e.amount).reduce((a, b) => a + b)}</div>
      </div>
    </div>
  )
}
