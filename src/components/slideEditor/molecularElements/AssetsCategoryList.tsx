import React from 'react'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { setSlideEditorState } from '../../../redux/slices/slideEditorStateSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { EditorPropsType } from '../SlideEditor'
import vars from '../../../config/vars'
import { getReactIcon } from '../../../utils/getReactIcon'

export type slideEditorAssetCategoryType = { key: string; label: string; icon: string }
export const slideEditorAssetCategories: slideEditorAssetCategoryType[] = [
	{ key: 'all', label: 'All', icon: 'im/ImImages' },
	{ key: 'family', label: 'Family', icon: 'bs/BsPeople' },
	{ key: 'kids', label: 'Kids', icon: 'bi/BiUser' },
	{ key: 'youth', label: 'Youth', icon: 'bi/BiUser' },
	{ key: 'shapes', label: 'Shapes', icon: 'fa/FaShapes' },
	{ key: 'icons', label: 'Icons', icon: 'ri/RiPenNibLine' },
	{ key: 'upload', label: 'Upload', icon: 'bs/BsUpload' },
]

export function AssetsCategoryList(props: EditorPropsType) {
	const categories = useSelector((state: RootState) => state.slideEditorState.assetCategories)
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
function Category(props: { data: slideEditorAssetCategoryType }) {
	const dispatch: AppDispatch = useDispatch()
	const { data } = props
	const { key, label, icon } = data
	const activeKey = useSelector((state: RootState) => state.slideEditorState.activeAssetCategoryKey)
	const active = activeKey === key

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
