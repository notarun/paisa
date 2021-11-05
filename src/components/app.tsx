import { useState } from 'preact/hooks';

import { StatsCard } from './cards/stats'
import { ExpensesPanel } from './panels/expenses'
import { CategoriesPanel } from './panels/categories'

enum PanelTab {
  ExpensesTab = 'Expenses',
  CategoriesTab = 'Categories',
}

export const App = () => {
  const [activeTab, setActiveTab] = useState(PanelTab.ExpensesTab)

  const tabs = Object.keys(PanelTab).map(tab => {
    const key = tab as keyof typeof PanelTab
    return (
      <li className={`tab-item ${activeTab === PanelTab[key] && 'active'}`}>
        <a href="#" onClick={() => setActiveTab(PanelTab[key])}>
          {PanelTab[key]}
        </a>
      </li>
    )
  })

  return (
    <div className="container grid-xs pt-1">
      <StatsCard />
      <ul className="tab tab-block">{ tabs }</ul>
      {activeTab === PanelTab.ExpensesTab && <ExpensesPanel/>}
      {activeTab === PanelTab.CategoriesTab && <CategoriesPanel/>}
    </div>
  )
}
