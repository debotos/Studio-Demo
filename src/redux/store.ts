import { configureStore, combineReducers } from '@reduxjs/toolkit'

import settingsSlice from './slices/settingsSlice'

const rootReducer = combineReducers({ settings: settingsSlice })
export const store = configureStore({ reducer: rootReducer })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
