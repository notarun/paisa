import { Category } from '../../interfaces/category'
import { percentageValue } from '../../utils'
import { useStore } from '../../store'

interface CategoryRowProps extends Category {
  amount: number;
  isActive?: boolean;
}

const CategoryRow = ({ name, percentage, amount, isActive }: CategoryRowProps) => (
  <tr className={`${isActive && 'active text-bold'}`}>
    <td>{name}</td>
    <td>{percentage}%</td>
    <td>₹ {amount}</td>
  </tr>
)

export const CategoriesPanel = () => {
  const { income, categories } = useStore(state => ({
    income: state.currentStats().income,
    categories: state.categories,
  }))

  const sum = (a: number, b: number) => a + b

  const totalPercentage = categories.map(c => c.percentage).reduce(sum, 0)
  const totalAmount = categories.map(c => percentageValue(c.percentage, income)).reduce(sum, 0)

  return (
    <>
      <table className="table">
        <tbody>
          {categories.map(({ name, percentage }) => (
            <CategoryRow
              name={name}
              percentage={percentage}
              amount={percentageValue(percentage, income)}
            />
          ))}

          <CategoryRow
            name="Total"
            isActive={true}
            amount={totalAmount}
            percentage={totalPercentage}
          />
        </tbody>
      </table>
    </>
  )
}
