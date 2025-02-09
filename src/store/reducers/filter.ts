import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as enums from '../../utils/enums/Task'

type FilterState = {
  termo?: string
  criterio: 'prioridade' | 'status' | 'all'
  value?: enums.Priority | enums.Status
}

const initialState: FilterState = {
  termo: '',
  criterio: 'all'
}

const filterSlice = createSlice({
  name: 'filter',
  // initialState: initialState,
  initialState,
  reducers: {
    changeTermo: (state, action: PayloadAction<string>) => {
      state.termo = action.payload
    },
    changeFilter: (state, action: PayloadAction<FilterState>) => {
      state.criterio = action.payload.criterio
      state.value = action.payload.value
    }
  }
})

export const { changeTermo, changeFilter } = filterSlice.actions
export default filterSlice.reducer
