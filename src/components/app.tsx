import { useState, useEffect } from 'preact/hooks'
import Splide from '@splidejs/splide';

import { CategoriesPanel } from './panels/categories'
import { ExpensesPanel } from './panels/expenses'
import { CategoryCard } from './cards/category'
import { IncomeCard } from './cards/income'

interface TabComponentProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const TabComponent = ({ name, isActive, onClick }: TabComponentProps) => (
  <li className={`tab-item ${isActive && 'active'}`}>
    <a className="cursor-pointer" onClick={() => onClick()}>
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

  useEffect(() => {
    setTimeout(() => new Splide('.splide', {
      arrows: false,
    }).mount(), 0)
  }, [])

  return (
    <div className="container grid-xs pt-1">
      <div className="splide">
        <div className="splide__track">
          <ul className="splide__list">
            <li className="splide__slide"><IncomeCard /></li>
            <li className="splide__slide"><CategoryCard /></li>
          </ul>
        </div>
      </div>

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
