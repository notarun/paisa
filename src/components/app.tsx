import { useState } from 'preact/hooks'

import { CategoriesPanel } from './panels/categories'
import { ExpensesPanel } from './panels/expenses'
import { StatsCard } from './cards/stats'

interface TabComponentProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const TabComponent = ({ name, isActive, onClick }: TabComponentProps) => (
  <li className={`tab-item ${isActive && 'active'}`}>
    <a href="#" onClick={() => onClick()}>
      {name}
    </a>
  </li>
)

enum PanelTab {
  ExpensesTab = 'Expenses',
  CategoriesTab = 'Categories',
}

export const App = () => {
  const [activeTab, setActiveTab] = useState(PanelTab.ExpensesTab)

  return (
    <div className="container grid-xs pt-1">
      <StatsCard />
      <ul className="tab tab-block">
        {Object.keys(PanelTab).map(t => t as keyof typeof PanelTab).map(t => (
          <TabComponent
            name={PanelTab[t]}
            isActive={activeTab === PanelTab[t]}
            onClick={() => setActiveTab(PanelTab[t])}
          />
        ))}
      </ul>
      {activeTab === PanelTab.ExpensesTab && <ExpensesPanel/>}
      {activeTab === PanelTab.CategoriesTab && <CategoriesPanel/>}
    </div>
  )
}
