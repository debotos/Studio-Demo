import { createSlice } from '@reduxjs/toolkit'

import {
	slideEditorAssetCategoryItemPrimaryType,
	slideEditorAssetsPrimaryTypes,
	slideEditorAssetCategoriesType,
	slideEditorAssetCategories,
} from '../../components/slideEditor/molecularElements/EditorAssetsCategoryList'

type AllAssets = Record<slideEditorAssetCategoryItemPrimaryType, Record<string, any[]>>

type SliceState = {
	showEditorSideBar: boolean
	showSlidesListUI: boolean
	showEditorSideBarAssetCategoryUI: boolean
	showEditorSideBarAssetViewerUI: boolean
	showToolbarTopBorder: boolean
	showCurrentlyUsedAssetsUI: boolean
	assetCategories: slideEditorAssetCategoriesType
	activePrimaryAssetType: slideEditorAssetCategoryItemPrimaryType
	activeAssetCategoryKey: string
	allAssets: AllAssets
	currentlyUsedAssets: any[]
	editorExtraAreaActiveTemplate: 'comment' | 'image-properties' | 'text-properties' | 'template-properties' | 'animation' | null
}

const activePrimaryAssetType: slideEditorAssetCategoryItemPrimaryType = slideEditorAssetsPrimaryTypes[0]
const allAssetsSkeleton: any = {}
slideEditorAssetsPrimaryTypes.forEach((type: slideEditorAssetCategoryItemPrimaryType) => (allAssetsSkeleton[type] = []))
const allAssets: AllAssets = allAssetsSkeleton

const initialState: SliceState = {
	showEditorSideBar: true,
	showSlidesListUI: true,
	showEditorSideBarAssetCategoryUI: true,
	showEditorSideBarAssetViewerUI: true,
	showToolbarTopBorder: false,
	showCurrentlyUsedAssetsUI: false,
	assetCategories: slideEditorAssetCategories,
	activePrimaryAssetType,
	activeAssetCategoryKey: slideEditorAssetCategories[activePrimaryAssetType]?.[0]?.key,
	allAssets,
	currentlyUsedAssets: [],
	editorExtraAreaActiveTemplate: null,
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
