import React from 'react'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { setSlideEditorState } from '../../../redux/slices/slideEditorStateSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { EditorPropsType } from '../SlideEditor'
import vars from '../../../config/vars'
import { getReactIcon } from '../../../utils/getReactIcon'

export type slideEditorAssetCategoryItemPrimaryType = 'image' | 'audio' | 'video' | 'svg' | 'text'
export type slideEditorAssetCategoryItemType = { key: string; label: string; icon: string }
export type slideEditorAssetCategoriesType = Record<slideEditorAssetCategoryItemPrimaryType, slideEditorAssetCategoryItemType[]>

export const slideEditorAssetsPrimaryTypes: slideEditorAssetCategoryItemPrimaryType[] = ['image', 'audio', 'video', 'svg', 'text']
export const slideEditorAssetCategories: slideEditorAssetCategoriesType = {
	image: [
		{ key: 'all', label: 'All', icon: 'im/ImImages' },
		{ key: 'family', label: 'Family', icon: 'bs/BsPeople' },
		{ key: 'kids', label: 'Kids', icon: 'bi/BiUser' },
		{ key: 'youth', label: 'Youth', icon: 'bi/BiUser' },
		{ key: 'shapes', label: 'Shapes', icon: 'fa/FaShapes' },
		{ key: 'icons', label: 'Icons', icon: 'ri/RiPenNibLine' },
		{ key: 'upload', label: 'Upload', icon: 'bs/BsUpload' },
	],
	audio: [
		{ key: 'all', label: 'All', icon: 'im/RiVolumeUpLine' },
		{ key: 'arabic', label: 'Arabic', icon: 'bs/RiVolumeUpLine' },
		{ key: 'english', label: 'English', icon: 'bi/RiVolumeUpLine' },
		{ key: 'tune', label: 'Tune', icon: 'bi/RiVolumeUpLine' },
	],
	video: [
		{ key: 'all', label: 'All', icon: 'im/FiVideo' },
		{ key: 'arabic', label: 'Arabic', icon: 'bs/FiVideo' },
		{ key: 'english', label: 'English', icon: 'bi/FiVideo' },
	],
	svg: [
		{ key: 'all', label: 'All', icon: 'im/MdWallpaper' },
		{ key: 'transparent', label: 'Transparent', icon: 'bs/MdWallpaper' },
		{ key: 'cartoon', label: 'Cartoon', icon: 'bi/MdWallpaper' },
	],
	text: [
		{ key: 'all', label: 'All', icon: 'im/BsTextareaT' },
		{ key: 'arabic', label: 'Arabic', icon: 'bs/BsTextareaT' },
		{ key: 'english', label: 'English', icon: 'bi/BsTextareaT' },
		{ key: 'quran', label: 'Quran', icon: 'bi/BsTextareaT' },
	],
}

export function EditorAssetsCategoryList(props: EditorPropsType) {
	const { assetCategories, activePrimaryAssetType } = useSelector((state: RootState) => state.slideEditorState)
	const categories: slideEditorAssetCategoryItemType[] = assetCategories[activePrimaryAssetType]

	return (
		<>
			{/* Don't enclose it with parent element like 'div' for scrolling purpose */}
			{categories.map((category, index) => {
				return <Category key={index} data={category} />
			})}
		</>
	)
}

/* Single Category */
function Category(props: { data: slideEditorAssetCategoryItemType }) {
	const dispatch: AppDispatch = useDispatch()
	const { data } = props
	const { key, label, icon } = data
	const { activeAssetCategoryKey: activeKey, showCurrentlyUsedAssetsUI } = useSelector(
		(state: RootState) => state.slideEditorState
	)

	const active = activeKey === key && !showCurrentlyUsedAssetsUI

	const handleClick = () => {
		if (!active) {
			dispatch(setSlideEditorState({ activeAssetCategoryKey: key }))
		}
	}

	return (
		<CategoryItem active={active.toString()} onClick={handleClick}>
			{getReactIcon(icon, 25)}
			<span>{label}</span>
		</CategoryItem>
	)
}

const CategoryItem: any = styled.div`
	align-items: center;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	height: 80px;
	justify-content: center;
	transition: all 0.2s ease-in;
	width: 100%;
	span {
		font-weight: 500;
		font-size: 15px;
		margin-top: 5px;
	}
	&:hover {
		color: #fff;
		background-color: ${vars.editorActiveColor};
	}
	${(props: any) =>
		props.active === 'true' &&
		css`
			color: #fff;
			background-color: ${vars.editorActiveColor};
		`}
`
