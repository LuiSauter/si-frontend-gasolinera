import { createSlice } from '@reduxjs/toolkit'

const UserEmptyState: any = {} as any

export const userSlice = createSlice({
  name: 'user',
  initialState: UserEmptyState,
  reducers: {
    createUser: (_state, action) => {
      return action.payload
    },
    modifyUser: (state, action) => {
      const formattedData = { ...state, ...action.payload }
      return formattedData
    },
    resetUser: () => {
      return UserEmptyState
    }
  }
})

// Action creators are generated for each case reducer function
export const { createUser, modifyUser, resetUser } = userSlice.actions

export default userSlice.reducer
