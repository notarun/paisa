import { useReducer } from 'preact/hooks'

import { useStore } from '../../store'
import { BaseModal } from './base'

const UPDATE_INPUT = (_state: string, e: Event) => (e.target as HTMLInputElement).value;

interface StatsSettingsModalProps {
  show: boolean;
  closeModal: () => void;
}

export const StatsSettingsModal = ({ show, closeModal }: StatsSettingsModalProps) => {
  const { updateIncome, initialIncome } = useStore(state => ({
    updateIncome: state.updateIncome,
    initialIncome: state.stats.income
  }))

  const formId = "form-stats"
  const [income, setIncome] = useReducer(UPDATE_INPUT, initialIncome.toString())

  const submit = (e: Event) =>
    (e.preventDefault(), updateIncome(parseFloat(income)), closeModal())

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
        onSubmit={(e) => submit(e)}
      >
        <label className="form-label" for="income">Income</label>
        <input
          id="income"
          type="number"
          value={income}
          onInput={setIncome}
          placeholder="Income"
          className="form-input"
          required
        />
      </form>
    </BaseModal>
  )
}
