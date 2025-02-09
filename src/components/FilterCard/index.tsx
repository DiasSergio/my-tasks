import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'
import { changeFilter } from '../../store/reducers/filter'
import * as enums from '../../utils/enums/Task'
import { RootReducer } from '../../store'

export type Props = {
  priority: string
  criterio: 'prioridade' | 'all' | 'status'
  value?: enums.Priority | enums.Status
}

const FilterCard = ({ priority, criterio, value }: Props) => {
  const dispatch = useDispatch()
  const { filters, tasks } = useSelector((state: RootReducer) => state)

  const verifyActiveOrNot = () => {
    const sameCriterio = filters.criterio === criterio
    const sameFilter = filters.value === value

    return sameCriterio && sameFilter
  }

  const countTasks = () => {
    if (criterio === 'all') return tasks.itens.length
    if (criterio === 'prioridade') {
      return tasks.itens.filter((item) => item.priority === value).length
    }
    if (criterio === 'status') {
      return tasks.itens.filter((item) => item.status === value).length
    }
  }

  const active = verifyActiveOrNot()
  const counter = countTasks()

  const filter = () => {
    dispatch(
      changeFilter({
        criterio,
        value
      })
    )
  }

  return (
    <S.Card active={active} onClick={filter}>
      <S.Counter>{counter}</S.Counter>
      <S.Label>{priority}</S.Label>
    </S.Card>
  )
}

export default FilterCard
