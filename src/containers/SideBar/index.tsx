import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootReducer } from '../../store'
import { changeTermo } from '../../store/reducers/filter'
import FilterCard from '../../components/FilterCard'

import * as S from './styles'
import * as enums from '../../utils/enums/Task'
import { Button, InputGlobal } from '../../styles'

type Props = {
  showFilters: boolean
}

const SideBar = ({ showFilters }: Props) => {
  const dispatch = useDispatch()
  const { termo } = useSelector((state: RootReducer) => state.filters)

  const navigate = useNavigate()

  return (
    <S.Aside>
      <div>
        {showFilters ? (
          <>
            <InputGlobal
              type="text"
              placeholder="Search"
              value={termo}
              onChange={(e) => dispatch(changeTermo(e.target.value))}
            />
            <S.Filters>
              <FilterCard
                value={enums.Status.PENDING}
                criterio="status"
                priority="pending"
              />
              <FilterCard
                value={enums.Status.COMPLETED}
                criterio="status"
                priority="done"
              />
              <FilterCard
                value={enums.Priority.URGENT}
                criterio="prioridade"
                priority="urgent"
              />
              <FilterCard
                value={enums.Priority.IMPORTANT}
                criterio="prioridade"
                priority="important"
              />
              <FilterCard
                value={enums.Priority.NORMAL}
                criterio="prioridade"
                priority="normal"
              />
              <FilterCard criterio="all" priority="all" />
            </S.Filters>
          </>
        ) : (
          <Button type="button" onClick={() => navigate('/')}>
            {' '}
            Task list{' '}
          </Button>
        )}
      </div>
    </S.Aside>
  )
}
export default SideBar
