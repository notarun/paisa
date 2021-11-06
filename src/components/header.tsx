import { StatsSettingsModal } from './modals/stats-settings'
import { useStore } from '../store'

interface HeaderProps {
  showModal: () => void;
}

export const Header = ({ showModal }: HeaderProps) => {
  const { stats, selectedStats, updateSelectedStats } = useStore(state => ({
    stats: state.stats,
    selectedStats: state.selectedStats,
    updateSelectedStats: state.updateSelectedStats,
  }))

  return (
    <>
      <header className="navbar mb-2">
        <section className="navbar-section">
          <div class="form-group">
            <select
              class="form-select"
              onChange={e => updateSelectedStats(parseInt((e.target as HTMLSelectElement).value))}
            >
              {stats.map((s, i) => (
                <option value={i} selected={i === selectedStats}>
                  {`${s.from} - ${s.to}`}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section className="navbar-section">
          <button
            className="btn btn-primary input-group-btn"
            onClick={() => showModal()}
          >
            <i className="icon icon-plus"></i>
          </button>
        </section>
      </header>
    </>
  )
}
