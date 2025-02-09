import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ButtonSave, InputGlobal, MainContainer, Title } from '../../styles'
import { Options, StyledForm, Option } from './style'
import * as enums from '../../utils/enums/Task'
import { addNewTask } from '../../store/reducers/tasksR'

const Form = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(enums.Priority.NORMAL)

  const addTask = (e: FormEvent) => {
    e.preventDefault()

    dispatch(
      addNewTask({
        title,
        priority,
        description,
        status: enums.Status.PENDING
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Title> New Task</Title>
      <StyledForm onSubmit={addTask}>
        <InputGlobal
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <InputGlobal
          as={'textarea'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          id=""
        />
        <Options>
          {Object.values(enums.Priority).map((priority) => (
            <Option key={priority}>
              <input
                onChange={(e) => setPriority(e.target.value as enums.Priority)}
                value={priority}
                name="prioridade"
                type="radio"
                id={priority}
                defaultChecked={priority === enums.Priority.NORMAL}
              />{' '}
              <label htmlFor={priority}>{priority}</label>
            </Option>
          ))}
        </Options>
        <ButtonSave type="submit">Add</ButtonSave>
      </StyledForm>
    </MainContainer>
  )
}

export default Form
