import React, { useState } from 'react'
import { Col, Row, Select, Tooltip } from 'antd'
import Search from 'antd/lib/input/Search'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineColumnWidth } from 'react-icons/ai'
import { FiColumns } from 'react-icons/fi'

import { setSlideEditorState } from '../../../redux/slices/slideEditorStateSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import FallbackImage from '../../../assets/fallback.png'
import { EditorPropsType } from '../SlideEditor'
import { Img } from './EditorSlidesList'
import vars from '../../../config/vars'

type ColType = 'one' | 'two'
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
	const [col, setCol] = useState<ColType>('two')

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
			<Row justify='end' align='middle' style={{ marginBottom: 5 }}>
				<span style={{ fontWeight: 'bold', opacity: 0.7 }}>View:</span>
				<Tooltip color={vars.appPrimaryColor} placement='top' title={'One column'}>
					<IconBtn style={{ margin: '0 7px' }} active={(col === 'one').toString()} onClick={() => setCol('one')}>
						<AiOutlineColumnWidth size={20} />
					</IconBtn>
				</Tooltip>
				<Tooltip color={vars.appPrimaryColor} placement='top' title={'Two column'}>
					<IconBtn active={(col === 'two').toString()} onClick={() => setCol('two')}>
						<FiColumns size={20} />
					</IconBtn>
				</Tooltip>
			</Row>
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
						<Col span={col === 'one' ? 24 : 12} key={index}>
							<Asset data={asset} col={col} />
						</Col>
					)
				})}
			</Row>
		</>
	)
}

const IconBtn: any = styled.span`
	align-items: center;
	display: flex;
	color: ${(props: any) => props.active === 'true' && vars.editorActiveColor};
	cursor: pointer;
	opacity: 0.7;
	&:hover {
		opacity: 1;
	}
`

/* Single Asset */
function Asset(props: any) {
	const { data, col } = props
	const { id, name, url } = data

	const handleClick = () => {
		console.log('Clicked on asset id:', id)
	}

	return (
		<ImageContainer onClick={handleClick} col={col}>
			<Img src={url} alt={name} fallback={FallbackImage} preview={false} />
		</ImageContainer>
	)
}

const ImageContainer: any = styled.div`
	border: 2px solid #eee;
	cursor: pointer;
	width: 100%;
	min-width: 105px;
	height: ${(props: any) => (props.col === 'one' ? 'auto' : '90px')};
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
