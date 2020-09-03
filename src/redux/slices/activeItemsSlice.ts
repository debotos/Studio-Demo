import { createSlice } from '@reduxjs/toolkit'

type SliceState = { subject: any; level: any; unit: any; lesson: any; slide: any }

const initialState: SliceState = { subject: null, level: null, unit: null, lesson: null, slide: null }

/* Store current active item data which is in display at that time */
const activeItemsSlice = createSlice({
	name: 'activeItems',
	initialState,
	reducers: {
		setActiveItems(activeItems, { payload }) {
			return { ...activeItems, ...payload }
		},
	},
})

export const { setActiveItems } = activeItemsSlice.actions

export default activeItemsSlice.reducer
