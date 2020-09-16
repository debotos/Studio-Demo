import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { BsReverseLayoutTextWindowReverse, BsTextareaT, BsThreeDots } from 'react-icons/bs'
import { RiArrowDownSLine, RiVolumeUpLine, RiFileCopyLine, RiShareBoxLine } from 'react-icons/ri'
import { FiVideo, FiTrash2 } from 'react-icons/fi'
import { ImImage } from 'react-icons/im'
import { CgStack, CgCheckO, CgMathPlus } from 'react-icons/cg'
import { MdMultilineChart, MdWallpaper } from 'react-icons/md'
import { BiRectangle, BiPaint } from 'react-icons/bi'
import { Popover, Row as AntRow, Switch, Tooltip } from 'antd'
import { TooltipPlacement } from 'antd/lib/tooltip'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'

import { setSlideEditorState } from '../../../redux/slices/slideEditorStateSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import vars from '../../../config/vars'
import { EditorPropsType } from '../SlideEditor'
import { getContainer } from '../../../utils/helpers'

const { editorSideNavWidth, editorToolBarHeight, appPrimaryColor, editorActiveColor } = vars

interface CProps extends EditorPropsType {
	toolbarAffixed: boolean
}

export function EditorToolBar(props: CProps) {
	const { toolbarAffixed, isFullScreen } = props
	const dispatch: AppDispatch = useDispatch()
	const { showCurrentlyUsedAssetsUI } = useSelector((state: RootState) => state.slideEditorState)
	const toolBarContainerElement = useRef<any>(null)

	const getLocalContainer = (node: HTMLElement) => getContainer(node.parentElement)
	const getToolBarTooltipContainer = (node: HTMLElement) =>
		isFullScreen ? getContainer(node.parentElement) : getContainer(toolBarContainerElement)
	const getTooltipPlacement = (): TooltipPlacement => (isFullScreen ? 'bottom' : 'top')

	const morePopupContent = (
		<MorePopupContainer>
			<Tooltip color={appPrimaryColor} getPopupContainer={getLocalContainer} placement='left' title={'Share'}>
				<IconBtn popup>
					<RiShareBoxLine size={25} />
				</IconBtn>
			</Tooltip>
			<Tooltip color={appPrimaryColor} getPopupContainer={getLocalContainer} placement='left' title={'Delete slide'}>
				<IconBtn popup>
					<FiTrash2 size={25} />
				</IconBtn>
			</Tooltip>
		</MorePopupContainer>
	)

	return (
		<Container affixed={toolbarAffixed.toString()} ref={toolBarContainerElement}>
			<LeftContent>
				<IconBtn style={{ marginLeft: 0, marginRight: 0 }}>
					<BsReverseLayoutTextWindowReverse size={25} />
					<RiArrowDownSLine size={15} />
				</IconBtn>
				<IconBtn>
					<RiVolumeUpLine size={25} />
				</IconBtn>
				<IconBtn>
					<FiVideo size={25} />
				</IconBtn>
				<IconBtn>
					<MdWallpaper size={25} />
				</IconBtn>
				<IconBtn>
					<ImImage size={24} />
				</IconBtn>
				<IconBtn>
					<BiPaint size={25} />
				</IconBtn>
				<IconBtn>
					<MdMultilineChart size={25} />
				</IconBtn>
				<IconBtn>
					<BiRectangle size={25} />
				</IconBtn>
				<IconBtn style={{ marginRight: 0 }}>
					<BsTextareaT size={25} />
				</IconBtn>
			</LeftContent>
			<RightContent>
				<Row justify='space-between' align='middle' style={{ width: '100%' }}>
					<Row align='middle'>
						<Tooltip
							color={appPrimaryColor}
							getPopupContainer={getToolBarTooltipContainer}
							placement={getTooltipPlacement()}
							title={'Assets'}
						>
							<IconBtn
								style={{ marginLeft: 0, marginRight: 10, color: showCurrentlyUsedAssetsUI && editorActiveColor }}
								onClick={() => {
									dispatch(setSlideEditorState({ showCurrentlyUsedAssetsUI: !showCurrentlyUsedAssetsUI }))
								}}
							>
								<CgStack size={25} />
							</IconBtn>
						</Tooltip>
						<Row align='middle'>
							<Label>My Items</Label>&nbsp;&nbsp;
							<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
						</Row>
					</Row>
					<Row align='middle'>
						<Row align='middle' style={{ color: '#52c41a', marginRight: 10 }}>
							<CgCheckO size={25} /> &nbsp;&nbsp; <Label>Saved</Label>
						</Row>
						<IconBtn>
							<CgMathPlus size={25} />
						</IconBtn>
						<IconBtn>
							<RiFileCopyLine size={25} />
						</IconBtn>
						<Popover
							overlayClassName='slide-editor-toolbar-more-btn-popup'
							content={morePopupContent}
							getPopupContainer={getContainer}
							placement='bottom'
							trigger='click'
						>
							<IconBtn style={{ marginRight: 0 }}>
								<BsThreeDots size={25} />
							</IconBtn>
						</Popover>
					</Row>
				</Row>
			</RightContent>
		</Container>
	)
}

const Row = styled(AntRow)`
	height: 100%;
`
const Container: any = styled.div`
	align-items: center;
	background-color: #fff;
	border-bottom: 2px solid #eee;
	display: flex;
	flex-wrap: wrap;
	height: ${editorToolBarHeight + 'px'};
	${(props: any) =>
		props.affixed !== 'true' &&
		css`
			border-top: 2px solid #eee;
		`}
`
const LeftContent = styled.div`
	align-items: center;
	border-right: 2px solid #eee;
	display: flex;
	height: 100%;
	justify-content: flex-start;
	padding-left: 30px;
	padding-right: 15px;
	width: ${editorSideNavWidth + 'px'};
`
const RightContent = styled.div`
	flex: 1;
	height: 100%;
	padding-left: 15px;
	padding-right: 30px;
`
export const IconBtn: any = styled.span`
	align-items: center;
	cursor: pointer;
	display: flex;
	font-size: 15px;
	height: 100%;
	justify-content: center;
	padding: 0 10px;
	opacity: 0.7;
	transition: background-color 0.2s ease-in-out;
	&:hover {
		opacity: 1;
		background-color: #0000001f;
	}
	${(props: any) =>
		props.hasOwnProperty('simple') &&
		css`
			&:hover {
				background-color: #fff;
			}
		`}
	${(props: any) =>
		props.hasOwnProperty('popup') &&
		css`
			&:hover {
				background-color: #fff;
				padding: 0 5px;
			}
		`}
`
export const SVGIcon = styled.span`
	border: 2px solid #929eaa;
	border-radius: 3px;
	cursor: pointer;
	font-size: 12px;
	height: 24px;
	margin: 0;
	padding: 2px;
	text-transform: uppercase;
`
const Label = styled.span`
	font-size: 15px;
	font-weight: 500;
	margin-top: -2px;
`
const MorePopupContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: max-content;
	justify-content: space-between;
	min-height: 60px;
	width: 30px;
	& {
		span {
			margin: 0;
		}
		span:not(:last-child) {
			margin-bottom: 10px;
		}
	}
`
