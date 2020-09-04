import { createSlice } from '@reduxjs/toolkit'

import { EditorDataType } from '../store'
import { genTreeKey } from '../../utils/helpers'

type PayloadType = { id: string | number; type: EditorDataType; data: any }

const initialState: any = {}

/* Store tree data(example: subject -> level -> unit -> lesson -> slide) */
const treeDataSlice = createSlice({
	name: 'treeData',
	initialState,
	reducers: {
		setTreeData(treeData, { payload }) {
			const { id, type, data }: PayloadType = payload
			const key: string = genTreeKey(type, id)
			treeData[key] = data
		},
	},
})

export const { setTreeData } = treeDataSlice.actions

export default treeDataSlice.reducer
