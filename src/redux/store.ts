import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user.slice'

export interface AppStore {
  user: any
}

export const store = configureStore<AppStore>({
  reducer: {
    user: userSlice
  }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
