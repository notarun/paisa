import { useState } from 'preact/hooks'

import { useStore } from '../../store'

export const CategoryCard = () => {
  const { categories, expenses } = useStore(state => ({
    expenses: state.expenses,
    categories: state.categories,
  }))

  return (
    <div className="card">
      <div className="card-header">
        {categories.map(({ name, percentage }) => (
          <>
            <div className="card-title h5 mt-2">
              {name}
            </div>
            <div className="card-subtitle text-error">
              ₹ {expenses
                  .filter(e => e.category === name)
                  .map(e => e.amount)
                  .reduce((a, b) => a + b, 0)}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
