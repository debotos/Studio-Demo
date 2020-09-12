import React from 'react'
import styled from 'styled-components'
import { Affix, Tooltip } from 'antd'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'

import { setSlideEditorState } from '../../../redux/slices/slideEditorStateSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { EditorPropsType } from '../SlideEditor'
import EditorSideBar from './EditorSideBar'
import EditingArea from './EditingArea'
import vars from '../../../config/vars'

const { headerHeight, editorToolBarHeight, editorActiveColor } = vars

export function EditorBody(props: EditorPropsType) {
	const dispatch: AppDispatch = useDispatch()
	const { showEditorSideBar, showSlidesListUI, showEditorSideBarAssetCategoryUI, showEditorSideBarAssetViewerUI } = useSelector(
		(state: RootState) => state.slideEditorState
	)
	const hideSideBar =
		!showEditorSideBar || (!showSlidesListUI && !showEditorSideBarAssetCategoryUI && !showEditorSideBarAssetViewerUI)

	const showIcon = <AiOutlineEye size={25} color={editorActiveColor} />
	const hideIcon = <AiOutlineEyeInvisible size={25} />

	return (
		<Container>
			{!hideSideBar && (
				<Affix offsetTop={headerHeight + editorToolBarHeight - 2}>
					<LeftContent>
						<EditorSideBar {...props} />
					</LeftContent>
				</Affix>
			)}
			<RightContent>
				<EditingArea {...props} />
			</RightContent>

			{/* Hide/Show Controls */}
			<FloatingContainer className='app-box-shadow'>
				<Tooltip color={editorActiveColor} placement='topLeft' title={showEditorSideBar ? 'Hide sidebar' : 'Show sidebar'}>
					<IconBtn onClick={() => dispatch(setSlideEditorState({ showEditorSideBar: !showEditorSideBar }))}>
						{showEditorSideBar ? showIcon : hideIcon}
					</IconBtn>
				</Tooltip>
				{showEditorSideBar && (
					<>
						<Tooltip color={editorActiveColor} placement='top' title={showSlidesListUI ? 'Hide slides' : 'Show slides'}>
							<IconBtn onClick={() => dispatch(setSlideEditorState({ showSlidesListUI: !showSlidesListUI }))}>
								{showSlidesListUI ? showIcon : hideIcon}
							</IconBtn>
						</Tooltip>
						<Tooltip
							color={editorActiveColor}
							placement='top'
							title={showEditorSideBarAssetCategoryUI ? 'Hide asset categories' : 'Show asset categories'}
						>
							<IconBtn
								onClick={() =>
									dispatch(setSlideEditorState({ showEditorSideBarAssetCategoryUI: !showEditorSideBarAssetCategoryUI }))
								}
							>
								{showEditorSideBarAssetCategoryUI ? showIcon : hideIcon}
							</IconBtn>
						</Tooltip>
						<Tooltip
							color={editorActiveColor}
							placement='topRight'
							title={showEditorSideBarAssetViewerUI ? 'Hide assets' : 'Show assets'}
						>
							<IconBtn
								onClick={() => dispatch(setSlideEditorState({ showEditorSideBarAssetViewerUI: !showEditorSideBarAssetViewerUI }))}
							>
								{showEditorSideBarAssetViewerUI ? showIcon : hideIcon}
							</IconBtn>
						</Tooltip>
					</>
				)}
			</FloatingContainer>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	height: 100%;
`
const LeftContent = styled.div`
	border-right: 2px solid #eee;
	display: flex;
	height: 100%;
	padding-left: ${vars.editorSideNavPaddingLeft + 'px'};
	width: max-content;
	max-width: ${vars.editorSideNavWidth + 'px'};
`
const RightContent = styled.div`
	display: flex;
	flex: 1;
	height: 100%;
	padding: 0;
`
const FloatingContainer = styled.div`
	align-items: center;
	background-color: #fff;
	border-radius: 35px;
	bottom: 15px;
	display: flex;
	height: 40px;
	justify-content: space-evenly;
	left: 20px;
	position: fixed;
	padding: 0 10px;
	z-index: 99;
`
const IconBtn: any = styled.span`
	align-items: center;
	cursor: pointer;
	display: flex;
	margin: 0 5px;
	justify-content: center;
	&:hover {
		opacity: 0.7;
	}
`
