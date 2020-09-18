import React, { useEffect, useState } from 'react'
import { Col, Row, Select, Tooltip } from 'antd'
import Search from 'antd/lib/input/Search'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineColumnWidth } from 'react-icons/ai'
import { FiColumns } from 'react-icons/fi'

import { setSlideEditorState } from '../../../../../redux/slices/slideEditorStateSlice'
import { LoadingSkeleton, LoadingImagesSkeleton } from '../../../../loading/Loading'
import { slideEditorAssetCategoryItemType } from '../../EditorAssetsCategoryList'
import { getContainer, isEmpty, sleep } from '../../../../../utils/helpers'
import ImageLoadingGIF from '../../../../../assets/image-loading.svg'
import { AppDispatch, RootState } from '../../../../../redux/store'
import FallbackImage from '../../../../../assets/fallback.png'
import { EditorPropsType } from '../../../SlideEditor'
import vars from '../../../../../config/vars'
import { Img } from '../../EditorSlidesList'

type ColType = 'one' | 'two'
export type slideEditorAssetSubCategoryType = { key: string; label: string; value: string }

export function EditorImagePickupArea(props: EditorPropsType) {
	const _isMounted = React.useRef(false)
	const dispatch: AppDispatch = useDispatch()
	const { assetCategories, activePrimaryAssetType } = useSelector((state: RootState) => state.slideEditorState)
	const categories: slideEditorAssetCategoryItemType[] = assetCategories[activePrimaryAssetType]
	const { allAssets, activeAssetCategoryKey } = useSelector((state: RootState) => state.slideEditorState)
	const currentCategories = allAssets?.[activePrimaryAssetType] || {}
	const currentAssets = currentCategories?.[activeAssetCategoryKey] || []
	const [col, setCol] = useState<ColType>('two')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		_isMounted.current = true
		if (isEmpty(currentAssets)) {
			getCurrentAssets()
		}
		return () => {
			_isMounted.current = false
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activePrimaryAssetType, activeAssetCategoryKey])

	const getCurrentAssets = async () => {
		// TODO: Ajax to get the asset for current active category
		setLoading(true)
		const dummyData = Array(10)
			.fill(0)
			.map((x, i) => ({
				id: i,
				name: `Asset ${i}`,
				url: `https://picsum.photos/${i * 10 * activeAssetCategoryKey.length}/${i * 10 * activeAssetCategoryKey.length}`,
			}))
		await sleep(2000)
		dispatch(
			setSlideEditorState({
				allAssets: { ...allAssets, [activePrimaryAssetType]: { ...currentCategories, [activeAssetCategoryKey]: dummyData } },
			})
		)
		_isMounted.current && setLoading(false)
	}

	const handleSearch = (value: any) => {
		console.log(value)
	}

	const handleSelect = (value: any) => {
		console.log(value)
		dispatch(setSlideEditorState({ activeAssetCategoryKey: value }))
	}

	const colSpan = col === 'one' ? 24 : 12

	if (loading) {
		return (
			<>
				<LoadingSkeleton number={1} size='small' />
				<LoadingImagesSkeleton number={12} span={colSpan} />
			</>
		)
	}

	return (
		<>
			{/* Don't enclose it with parent element like 'div' for scrolling purpose */}
			<Row justify='end' align='middle' style={{ marginBottom: 5 }}>
				<span style={{ fontWeight: 'bold', opacity: 0.7 }}>View:</span>
				<Tooltip color={vars.appPrimaryColor} getPopupContainer={getContainer} placement='top' title={'One column'}>
					<IconBtn style={{ margin: '0 7px' }} active={(col === 'one').toString()} onClick={() => setCol('one')}>
						<AiOutlineColumnWidth size={20} />
					</IconBtn>
				</Tooltip>
				<Tooltip color={vars.appPrimaryColor} getPopupContainer={getContainer} placement='top' title={'Two column'}>
					<IconBtn active={(col === 'two').toString()} onClick={() => setCol('two')}>
						<FiColumns size={20} />
					</IconBtn>
				</Tooltip>
			</Row>
			<Search placeholder='Search' onSearch={handleSearch} />
			<Select
				getPopupContainer={getContainer}
				onChange={handleSelect}
				value={activeAssetCategoryKey}
				style={{ width: '100%', margin: '10px 0' }}
			>
				{categories.map((item, index) => {
					const { key, label } = item
					return (
						<Select.Option key={key} value={key}>
							{label}
						</Select.Option>
					)
				})}
			</Select>
			<Row gutter={[5, 5]}>
				{currentAssets?.map((asset, index) => {
					return (
						<Col span={colSpan} key={index}>
							<Asset data={asset} col={col} colSpan={colSpan} />
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

	const placeholder = (
		<PlaceholderImage>
			<img src={ImageLoadingGIF} alt={`Loading ${name}`} />
		</PlaceholderImage>
	)
	return (
		<ImageContainer onClick={handleClick} col={col}>
			<Img src={url} alt={name} fallback={FallbackImage} preview={false} placeholder={placeholder} />
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
const PlaceholderImage = styled.div`
	align-items: center;
	background-color: #eee;
	display: flex;
	height: 100%;
	opacity: 0.8;
	justify-content: center;
	width: 100%;
	img {
		height: 30px;
		width: 30px;
	}
`
