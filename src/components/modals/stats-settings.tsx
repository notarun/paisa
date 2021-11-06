import { useState, useEffect } from 'preact/hooks'
import dayjs from 'dayjs'

import { useStore } from '../../store'
import { BaseModal } from './base'

interface StatsSettingsModalProps {
  show: boolean;
  action: 'create' | 'update';
  closeModal: () => void;
}

export const StatsSettingsModal = ({ show, action, closeModal }: StatsSettingsModalProps) => {
  const today = dayjs().format('YYYY-MM-DD')

  const { updateCurrentStats, currentStats, createStats } = useStore(state => ({
    updateCurrentStats: state.updateCurrentStats,
    currentStats: state.currentStats,
    createStats: state.createStats,
  }))

  const formId = 'form-stats'
  const [income, setIncome] = useState('')
  const [toDate, setToDate] = useState('')
  const [fromDate, setFromDate] = useState('')

  const resetForm = () => {
    setIncome('0')
    setFromDate(dayjs().format('YYYY-MM-DD'))
    setToDate(dayjs().add(1, 'month').format('YYYY-MM-DD'))
  }

  const submit = (e: Event) => {
    e.preventDefault()

    const stats = {
      income: parseFloat(income),
      from: fromDate,
      to: toDate,
    }

    switch (action) {
      case 'create':
        createStats(stats)
        break

      case 'update':
        updateCurrentStats(stats)
        break

      default:
        throw 'Invalid action.'
    }

    closeModal()
  }

  useEffect(() => {
    if (!show) {
      resetForm()
      return
    }

    switch (action) {
      case 'create':
        break

      case 'update':
        const { income, from, to } = currentStats()
        setIncome(income.toString())
        setFromDate(from)
        setToDate(to)
        break

      default:
        throw 'Invalid action.'
    }
  }, [show, action])

  return (
    <BaseModal
      show={show}
      title="Income settings"
      formId={formId}
      closeModal={closeModal}
    >
      <form
        id={formId}
        className="form-group"
        onSubmit={e => submit(e)}
      >
        <label className="form-label" for="income">Income</label>
        <input
          id="income"
          type="number"
          value={income}
          onInput={e => setIncome((e.target as HTMLInputElement).value)}
          placeholder="Income"
          className="form-input"
          required
        />

        <label className="form-label" for="from">From</label>
        <input
          id="from"
          type="date"
          value={fromDate}
          onInput={e => setFromDate((e.target as HTMLInputElement).value)}
          placeholder="From Date"
          className="form-input"
          required
        />

        <label className="form-label" for="income">To</label>
        <input
          id="income"
          type="date"
          value={toDate}
          onInput={e => setToDate((e.target as HTMLInputElement).value)}
          placeholder="To Date"
          className="form-input"
          required
        />
      </form>
    </BaseModal>
  )
}
