import { Category } from '../../interfaces/category'
import { percentageValue } from '../../utils'
import { useStore } from '../../store'

interface CategoryRowProps extends Category {
  amount: number
  isActive?: boolean
}

const CategoryRow = ({ name, percentage, amount, isActive }: CategoryRowProps) => (
  <tr className={`${isActive && 'active text-bold'}`}>
    <td>{name}</td>
    <td>{percentage}%</td>
    <td>₹ {amount}</td>
  </tr>
)

export const CategoriesPanel = () => {
  const income = useStore(state => state.stats.income)
  const categories = useStore(state => state.categories)

  return (
    <table class="table">
      <tbody>
        {categories.map(c => <CategoryRow
          name={c.name}
          percentage={c.percentage}
          amount={percentageValue(c.percentage, income)} />)}

        <CategoryRow
          name="Total"
          percentage={categories.map(c => c.percentage).reduce((a, b) => a + b)}
          amount={categories.map(c => percentageValue(c.percentage, income)).reduce((a, b) => a + b)}
          isActive={true}/>
      </tbody>
    </table>
  )
}
