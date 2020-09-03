import { configureStore, combineReducers } from '@reduxjs/toolkit'

import settingsSlice from './slices/settingsSlice'
import activeItemsSlice from './slices/activeItemsSlice'
import dataListSlice from './slices/dataListSlice'

const rootReducer = combineReducers({ settings: settingsSlice, activeItems: activeItemsSlice, dataList: dataListSlice })
export const store = configureStore({ reducer: rootReducer })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
