import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import * as enums from '../../utils/enums/Task'

import { remove, edit, completeTask } from '../../store/reducers/tasksR'
import TaskClass from '../../models/Task'
import { Button, ButtonSave } from '../../styles'

type Props = TaskClass

const Task = ({
  title,
  priority,
  status,
  description: initialDescription,
  id
}: Props) => {
  const dispatch = useDispatch()
  // dispatch para realizar alteraçoes no estado
  const [isEditing, setIsEditing] = useState(false)
  // alteração dos botões
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (initialDescription.length > 0) {
      setDescription(initialDescription)
    }
  }, [initialDescription])

  function cancelEditting() {
    setIsEditing(false)
    setDescription(initialDescription)
  }

  function saveEditting() {
    dispatch(
      edit({
        title,
        priority,
        status,
        description,
        id
      })
    )
    setIsEditing(false)
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      completeTask({
        id,
        completed: e.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={title}>
        <input
          type="checkbox"
          id={title}
          checked={status === enums.Status.COMPLETED}
          onChange={changeTaskStatus}
        />
        <S.Title>
          {isEditing && <em>Editting:</em>}
          {title}
        </S.Title>
      </label>
      <S.Tag parameter="priority" priority={priority}>
        {priority}
      </S.Tag>
      <S.Tag parameter="status" status={status}>
        {status}
      </S.Tag>
      <S.Description
        disabled={!isEditing}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <S.ActionsBar>
        {isEditing ? (
          <>
            <ButtonSave onClick={saveEditting}>Save</ButtonSave>
            <S.ButtonCancelRemove onClick={cancelEditting}>
              Cancel
            </S.ButtonCancelRemove>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <S.ButtonCancelRemove onClick={() => dispatch(remove(id))}>
              Delete
            </S.ButtonCancelRemove>
          </>
        )}
      </S.ActionsBar>
    </S.Card>
  )
}

export default Task
