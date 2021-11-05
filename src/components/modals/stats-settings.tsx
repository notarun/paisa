import { useState } from 'preact/hooks'

import { BaseModal } from './base'
import { useStore } from '../../store'

interface StatsSettingsModalProps {
  show: boolean;
  closeModal: () => void;
}

export const StatsSettingsModal = ({ show, closeModal }: StatsSettingsModalProps) => {
  const stats = useStore(state => state.stats)
  const updateIncome = useStore(state => state.updateIncome)

  const [form, setForm] = useState({ income: stats.income })

  return (
    <BaseModal
      show={show}
      title="Income settings"
      closeModal={closeModal}
      onSubmit={() => (updateIncome(form.income), closeModal())}
    >
      <div className="form-group">
        <label className="form-label" for="income">Income</label>
        <input
          id="income"
          type="number"
          value={form.income}
          onInput={(e) => setForm({ income: parseFloat((e.target as HTMLInputElement).value) })}
          placeholder="Income"
          className="form-input"
        />
      </div>
    </BaseModal>
  )
}
