import { createSlice } from '@reduxjs/toolkit'

import {
	slideEditorAssetCategoryType,
	slideEditorAssetCategories,
} from '../../components/slideEditor/molecularElements/EditorAssetsCategoryList'
import {
	slideEditorAssetSubCategoryType,
	slideEditorAssetSubCategories,
} from '../../components/slideEditor/molecularElements/editorAssetsArea/EditorAssetsPickupArea'

type AllAssets = { [key: string]: any[] }

type SliceState = {
	showEditorSideBar: boolean
	showSlidesListUI: boolean
	showEditorSideBarAssetCategoryUI: boolean
	showEditorSideBarAssetViewerUI: boolean
	showToolbarTopBorder: boolean
	showCurrentlyUsedAssetsUI: boolean
	assetCategories: slideEditorAssetCategoryType[]
	activeAssetCategoryKey: string
	assetSubCategories: slideEditorAssetSubCategoryType[]
	activeAssetSubCategoryKey: string
	assets: AllAssets
	currentlyUsedAssets: any[]
}

const initialState: SliceState = {
	showEditorSideBar: true,
	showSlidesListUI: true,
	showEditorSideBarAssetCategoryUI: true,
	showEditorSideBarAssetViewerUI: true,
	showToolbarTopBorder: false,
	showCurrentlyUsedAssetsUI: false,
	assetCategories: slideEditorAssetCategories,
	activeAssetCategoryKey: slideEditorAssetCategories[0].key,
	assetSubCategories: slideEditorAssetSubCategories,
	activeAssetSubCategoryKey: slideEditorAssetSubCategories[0].key,
	assets: {},
	currentlyUsedAssets: [],
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
