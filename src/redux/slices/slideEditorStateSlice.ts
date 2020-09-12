import { createSlice } from '@reduxjs/toolkit'

import {
	slideEditorAssetCategoryType,
	slideEditorAssetCategories,
} from '../../components/slideEditor/molecularElements/EditorAssetsCategoryList'
import {
	slideEditorAssetSubCategoryType,
	slideEditorAssetSubCategories,
} from '../../components/slideEditor/molecularElements/EditorAssetsArea'

type SliceState = {
	showEditorSideBar: boolean
	showSlidesListUI: boolean
	showEditorSideBarAssetCategoryUI: boolean
	showEditorSideBarAssetViewerUI: boolean
	assetCategories: slideEditorAssetCategoryType[]
	activeAssetCategoryKey: string
	assetSubCategories: slideEditorAssetSubCategoryType[]
	activeAssetSubCategoryKey: string
	assets: any[]
}

const initialState: SliceState = {
	showEditorSideBar: true,
	showSlidesListUI: true,
	showEditorSideBarAssetCategoryUI: true,
	showEditorSideBarAssetViewerUI: true,
	assetCategories: slideEditorAssetCategories,
	activeAssetCategoryKey: slideEditorAssetCategories[0].key,
	assetSubCategories: slideEditorAssetSubCategories,
	activeAssetSubCategoryKey: slideEditorAssetSubCategories[0].key,
	assets: Array(50)
		.fill(0)
		.map((x, i) => ({ id: i, name: `Asset ${i}`, url: 'https://picsum.photos/100/100' })),
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
