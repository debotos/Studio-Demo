import { createSlice } from '@reduxjs/toolkit'

import { EditorDataType } from '../store'

type SliceState = { subjects: any[]; levels: any[]; units: any[]; lessons: any[]; slides: any[] }
type KeyType = 'subjects' | 'levels' | 'units' | 'lessons' | 'slides'
type PayloadType = { type: EditorDataType; data: any }

const initialState: SliceState = { subjects: [], levels: [], units: [], lessons: [], slides: [] }

/* Store the list of data items */
const dataListSlice = createSlice({
	name: 'dataList',
	initialState,
	reducers: {
		setDataList(state, { payload }) {
			console.log('DataList set called: ', payload)
			const { type, data }: PayloadType = payload
			const key = (type + 's') as KeyType
			state[key] = data
		},
		appendDataList(state, { payload }) {
			console.log('DataList append called: ', payload)
			const { type, data }: PayloadType = payload
			const key = (type + 's') as KeyType
			state[key] = [...state[key], ...data]
		},
		mergeDataList(state, { payload }) {
			console.log('DataList merge called: ', payload)
			const { type, data }: PayloadType = payload
			const key = (type + 's') as KeyType
			const currentData = state[key]
			const currentDataKeys = currentData.map((x) => x.id)
			const newDataKeys = data.map((x: any) => x.id)
			const newItemKeys = newDataKeys.filter((x: string | number) => !currentDataKeys.includes(x)) // Exactly new items inside 'data'
			const deletedItemKeys = currentDataKeys.filter((x: string | number) => !newDataKeys.includes(x)) // Deleted from current state
			const dataAfterDelete = currentData.filter((x: any) => !deletedItemKeys.includes(x.id))
			const newItems = data.filter((x: any) => newItemKeys.includes(x.id))
			state[key] = [...newItems, ...dataAfterDelete]
		},
		addDataListItem(state, { payload }) {
			console.log('DataList Item add called: ', payload)
			const { type, data }: PayloadType = payload
			const key = (type + 's') as KeyType
			state[key].unshift(data)
		},
		updateDataListItem(state, { payload }) {
			console.log('DataList Item update called: ', payload)
			const { type, data }: PayloadType = payload
			const key = (type + 's') as KeyType
			state[key] = state[key].map((item: any) => {
				if (item.id === data.id) return { ...item, ...data }
				return item
			})
		},
		deleteDataListItem(state, { payload }) {
			console.log('DataList Item delete called: ', payload)
			const { type, data }: PayloadType = payload
			const key = (type + 's') as KeyType
			state[key] = state[key].filter((item: any) => item.id !== data.id)
		},
	},
})

export const { setDataList, appendDataList, mergeDataList, updateDataListItem, deleteDataListItem } = dataListSlice.actions

export default dataListSlice.reducer
