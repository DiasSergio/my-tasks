import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Task from '../../models/Task'
import * as enums from '../../utils/enums/Task'

type TasksState = {
  itens: Task[]
}

const initialState: TasksState = {
  itens: [
    {
      id: 1,
      title: 'Book a car wash',
      priority: enums.Priority.URGENT,
      status: enums.Status.PENDING,
      description: ''
    },
    {
      id: 2,
      title: 'Book a flight to Ibiza',
      priority: enums.Priority.URGENT,
      status: enums.Status.COMPLETED,
      description: ''
    },
    {
      id: 3,
      title: 'Pay the energy bill',
      priority: enums.Priority.URGENT,
      status: enums.Status.COMPLETED,
      description: 'Due date: YESTERDAY'
    }
  ]
}

const tasksSlice = createSlice({
  name: 'tasks',
  // pode omitir a palavra initialState por ter o mesmo nome da constante 'initialState: initialState'
  initialState, // estado inicial, como é uma lista de tarefas, estado inicial é um array vazio.
  reducers: {
    // criamos a função (remover ou editar tarefa por exemplo)
    remove: (state, action: PayloadAction<number>) => {
      // funcao delete recebe o state que é o estado inicial e uma action que é
      // payloadaction que nesse caso será um numero pois será o id de uma task
      state.itens = state.itens.filter((task) => task.id !== action.payload)
      // state é inicialmente um array vazio e é feito um filter,
      // retornando todas as tarefas exceto a do id que está no payload action
    },
    edit: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.itens.findIndex((t) => t.id === action.payload.id)
      if (taskIndex >= 0) {
        state.itens[taskIndex] = action.payload
      }
    },
    addNewTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const checkExistentTask = state.itens.find(
        (task) =>
          task.title.toLowerCase() === action.payload.title.toLowerCase()
      )

      if (checkExistentTask || !action.payload.title) {
        alert('Please enter a valid title!')
      } else {
        const lastTask = state.itens[state.itens.length - 1]

        const newTask = {
          ...action.payload,
          id: lastTask ? lastTask.id + 1 : 1
        }
        state.itens.push(newTask)
      }
    },
    completeTask: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>
    ) => {
      const taskIndex = state.itens.findIndex((t) => t.id === action.payload.id)
      if (taskIndex >= 0) {
        state.itens[taskIndex].status = action.payload.completed
          ? enums.Status.COMPLETED
          : enums.Status.PENDING
      }
    }
  }
})

export const { remove, edit, addNewTask, completeTask } = tasksSlice.actions

export default tasksSlice.reducer
