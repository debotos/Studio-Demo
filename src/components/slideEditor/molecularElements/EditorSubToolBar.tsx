import React from 'react'
import { Row, Col, Typography, Tooltip } from 'antd'
import { BiMessageDetail, BiMinus, BiPlus } from 'react-icons/bi'
import { RiArrowGoBackLine, RiArrowGoForwardLine, RiSlideshow3Line } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { setSlideEditorState } from '../../../redux/slices/slideEditorStateSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { IconBtn } from '../organismElements/EditorToolBar'
import { getContainer, truncate } from '../../../utils/helpers'
import { EditorPropsType } from '../SlideEditor'
import vars from '../../../config/vars'

export function EditorSubToolBar(props: EditorPropsType) {
	const dispatch: AppDispatch = useDispatch()
	const { activeSlideInfo } = props
	const { title } = activeSlideInfo
	const { editorExtraAreaActiveTemplate: currentActiveTemplate } = useSelector((state: RootState) => state.slideEditorState)

	return (
		<Container align='middle' justify='space-between'>
			<Tooltip color={vars.appPrimaryColor} getPopupContainer={getContainer} placement={'topLeft'} title={title}>
				<Col flex={1}>
					<Title level={3}>{truncate(title, 23)}</Title>
				</Col>
			</Tooltip>
			<Col>
				<Row className='hide-native-scrollbar' style={{ marginLeft: 20, minWidth: 305, flexWrap: 'nowrap' }}>
					<IconBtn simple>
						<RiArrowGoBackLine size={25} />
					</IconBtn>
					<IconBtn simple>
						<RiArrowGoForwardLine size={25} />
					</IconBtn>
					<IconBtn simple style={{ color: currentActiveTemplate === 'comment' && vars.editorActiveColor }}>
						<BiMessageDetail
							size={25}
							onClick={() =>
								dispatch(
									setSlideEditorState({ editorExtraAreaActiveTemplate: currentActiveTemplate !== 'comment' ? 'comment' : null })
								)
							}
						/>
					</IconBtn>
					<IconBtn simple>
						<RiSlideshow3Line size={25} />
					</IconBtn>
					<IconBtn simple>
						<BiMinus size={25} />
					</IconBtn>
					<Percentage>80%</Percentage>
					<IconBtn simple>
						<BiPlus size={25} />
					</IconBtn>
				</Row>
			</Col>
		</Container>
	)
}

const Container: any = styled(Row)`
	background-color: #fff;
	flex-wrap: nowrap;
	height: ${vars.editorSubToolBarHeight + 'px'};
	min-height: ${vars.editorSubToolBarHeight + 'px'};
	max-height: ${vars.editorSubToolBarHeight + 'px'};
	overflow-x: scroll;
	padding: 0 10px 0 20px;
`
const Title = styled(Typography.Title)`
	margin: 0 !important;
	padding: 0 !important;
	white-space: nowrap;
`
const Percentage = styled.span`
	font-size: 15px;
	font-weight: bold;
`
