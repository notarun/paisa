import { StatsSettingsModal } from './modals/stats-settings'
import { LOCAL_STORAGE_KEY } from '../constants'
import { useStore } from '../store'

interface HeaderProps {
  showModal: () => void;
}

export const Header = ({ showModal }: HeaderProps) => {
  const {
    stats,
    selectedStats,
    updateSelectedStats,
  } = useStore(state => ({
    stats: state.stats,
    selectedStats: state.selectedStats,
    updateSelectedStats: state.updateSelectedStats,
  }))

  const downloadState = () => {
    const data = new Blob(
      [JSON.stringify(localStorage.getItem(LOCAL_STORAGE_KEY))],
      {type: 'text/json'}
    )
    const url = window.URL.createObjectURL(data)

    const a = document.createElement('a')
    a.setAttribute('download', `${Date.now()}.paisa.backup.json`)
    a.href = url
    a.click()
  }

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
            className="btn btn-primary input-group-btn mr-2"
            onClick={() => downloadState()}
          >
            <i className="icon icon-download"></i>
          </button>
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
