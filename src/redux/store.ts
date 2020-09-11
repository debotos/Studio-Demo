import { configureStore, combineReducers } from '@reduxjs/toolkit'

import settingsSlice from './slices/settingsSlice'
import dataListSlice from './slices/dataListSlice'
import treeDataSlice from './slices/treeDataSlice'
import activeItemsSlice from './slices/activeItemsSlice'
import slideEditorStateSlice from './slices/slideEditorStateSlice'

const rootReducer = combineReducers({
	settings: settingsSlice,
	activeItems: activeItemsSlice,
	dataList: dataListSlice,
	treeData: treeDataSlice,
	slideEditorState: slideEditorStateSlice,
})

export type EditorDataType = 'subject' | 'level' | 'unit' | 'lesson' | 'slide'
export const store = configureStore({ reducer: rootReducer })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
