import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './reducers/tasksR'
import filterReducer from './reducers/filter'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    filters: filterReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>
