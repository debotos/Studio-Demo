import React from 'react'
import { Col, Row, Select } from 'antd'
import Search from 'antd/lib/input/Search'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { setSlideEditorState } from '../../../redux/slices/slideEditorStateSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import FallbackImage from '../../../assets/fallback.png'
import { EditorPropsType } from '../SlideEditor'
import { Img } from './EditorSlidesList'
import vars from '../../../config/vars'

export type slideEditorAssetSubCategoryType = { key: string; label: string; value: string }
export const slideEditorAssetSubCategories: slideEditorAssetSubCategoryType[] = [
	{ key: 'all', label: 'All', value: 'all' },
	{ key: 'transparent', label: 'Transparent', value: 'transparent' },
]

export function EditorAssetsArea(props: EditorPropsType) {
	const dispatch: AppDispatch = useDispatch()
	const subCategories = useSelector((state: RootState) => state.slideEditorState.assetSubCategories)
	const activeAssetSubCategoryKey = useSelector((state: RootState) => state.slideEditorState.activeAssetSubCategoryKey)
	const assets = useSelector((state: RootState) => state.slideEditorState.assets)

	const handleSearch = (value: any) => {
		console.log(value)
	}

	const handleSelect = (value: any) => {
		console.log(value)
		dispatch(setSlideEditorState({ activeAssetSubCategoryKey: value }))
	}

	return (
		<>
			{/* Don't enclose it with parent element like 'div' for scrolling purpose */}
			<Search placeholder='Search' onSearch={handleSearch} />
			<Select onChange={handleSelect} value={activeAssetSubCategoryKey} style={{ width: '100%', margin: '10px 0' }}>
				{subCategories.map((item, index) => {
					const { label, value } = item
					return (
						<Select.Option key={index} value={value}>
							{label}
						</Select.Option>
					)
				})}
			</Select>
			<Row gutter={[5, 5]}>
				{assets.map((asset, index) => {
					return (
						<Col span={12} key={index}>
							<Asset data={asset} />
						</Col>
					)
				})}
			</Row>
		</>
	)
}

/* Single Asset */
function Asset(props: any) {
	const { data } = props
	const { id, name, url } = data

	const handleClick = () => {
		console.log('Clicked on asset id:', id)
	}

	return (
		<ImageContainer onClick={handleClick}>
			<Img src={url} alt={name} fallback={FallbackImage} preview={false} />
		</ImageContainer>
	)
}

const ImageContainer: any = styled.div`
	border: 2px solid #eee;
	cursor: pointer;
	width: 100%;
	min-width: 105px;
	height: 90px;
	position: relative;
	transition: all 0.2s ease-in;
	&:hover {
		border-color: ${vars.editorActiveColor};
	}
	${(props: any) =>
		props.active === 'true' &&
		css`
			border-color: ${vars.editorActiveColor};
		`}
`
