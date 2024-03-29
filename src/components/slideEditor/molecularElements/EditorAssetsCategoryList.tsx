import React from 'react'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { setSlideEditorState } from '../../../redux/slices/slideEditorStateSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { getReactIcon } from '../../../utils/getReactIcon'
import { truncate } from '../../../utils/helpers'
import { EditorPropsType } from '../SlideEditor'
import vars from '../../../config/vars'

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
		{ key: 'all', label: 'All', icon: 'ri/RiVolumeUpLine' },
		{ key: 'arabic', label: 'Arabic', icon: 'ri/RiVolumeUpLine' },
		{ key: 'english', label: 'English', icon: 'ri/RiVolumeUpLine' },
		{ key: 'tune', label: 'Tune', icon: 'ri/RiVolumeUpLine' },
	],
	video: [
		{ key: 'all', label: 'All', icon: 'fi/FiVideo' },
		{ key: 'arabic', label: 'Arabic', icon: 'fi/FiVideo' },
		{ key: 'english', label: 'English', icon: 'fi/FiVideo' },
	],
	svg: [
		{ key: 'all', label: 'All', icon: 'md/MdWallpaper' },
		{ key: 'transparent', label: 'Transparent', icon: 'md/MdWallpaper' },
		{ key: 'cartoon', label: 'Cartoon', icon: 'md/MdWallpaper' },
	],
	text: [
		{ key: 'all', label: 'All', icon: 'bs/BsTextareaT' },
		{ key: 'arabic', label: 'Arabic', icon: 'bs/BsTextareaT' },
		{ key: 'english', label: 'English', icon: 'bs/BsTextareaT' },
		{ key: 'quran', label: 'Quran', icon: 'bs/BsTextareaT' },
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
			<span>{truncate(label, 7)}</span>
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
