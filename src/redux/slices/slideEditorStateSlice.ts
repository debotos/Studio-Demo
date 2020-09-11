import { createSlice } from '@reduxjs/toolkit'

import {
	slideEditorAssetCategoryType,
	slideEditorAssetCategories,
} from '../../components/slideEditor/molecularElements/AssetsCategoryList'

type SliceState = { assetCategories: slideEditorAssetCategoryType[]; activeAssetCategoryKey: string }

const initialState: SliceState = {
	assetCategories: slideEditorAssetCategories,
	activeAssetCategoryKey: slideEditorAssetCategories[0].key,
}

/* Central State for slide editor */
const slideEditorStateSlice = createSlice({
	name: 'slideEditorState',
	initialState,
	reducers: {
		setSlideEditorState(slideEditorState, { payload }) {
			return { ...slideEditorState, ...payload }
		},
	},
})

export const { setSlideEditorState } = slideEditorStateSlice.actions

export default slideEditorStateSlice.reducer
