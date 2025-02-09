import { RootReducer } from '../../store'

import Task from '../../components/Task'

import { useSelector } from 'react-redux'
import { MainContainer, Title } from '../../styles'

const TaskList = () => {
  const { itens } = useSelector((state: RootReducer) => state.tasks)
  const { termo, criterio, value } = useSelector(
    (state: RootReducer) => state.filters
  )

  const filterTasks = () => {
    let filteredTasks = itens

    const checkCriterioAndStatus = () => {
      if (criterio === 'prioridade') {
        filteredTasks = filteredTasks.filter((item) => item.priority === value)
      } else if (criterio === 'status') {
        filteredTasks = filteredTasks.filter((item) => item.status === value)
      }

      return filteredTasks
    }

    if (termo !== undefined) {
      filteredTasks = itens.filter(
        (item) => item.title.toLowerCase().search(termo.toLowerCase()) >= 0
      )
      checkCriterioAndStatus()

      return filteredTasks
    } else return checkCriterioAndStatus()
  }

  const showFilteredResults = (quantity: number) => {
    let message = ''

    const complement =
      termo !== undefined && termo.length > 0 ? `and "${termo}"` : ''

    if (criterio === 'all') {
      message = `${quantity} task(s) tagged as: all ${complement}`
    } else {
      message = `${quantity} task(s) tagged as: "${`${value}`}" ${complement}`
    }

    return message
  }

  const tasks = filterTasks()
  const message = showFilteredResults(tasks.length)

  return (
    <MainContainer>
      <Title as={'p'}>{message}</Title>
      <ul>
        {filterTasks().map((t) => (
          <li key={t.title}>
            <Task
              id={t.id}
              description={t.description}
              title={t.title}
              status={t.status}
              priority={t.priority}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default TaskList
