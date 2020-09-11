import React from 'react'
import styled from 'styled-components'
import { Affix } from 'antd'

import { EditorPropsType } from '../SlideEditor'
import EditorSideBar from './EditorSideBar'
import EditingArea from './EditingArea'
import vars from '../../../config/vars'

const { headerHeight, editorToolBarHeight } = vars

export function EditorBody(props: EditorPropsType) {
	return (
		<Container>
			<Affix offsetTop={headerHeight + editorToolBarHeight - 2}>
				<LeftContent>
					<EditorSideBar {...props} />
				</LeftContent>
			</Affix>
			<RightContent>
				<EditingArea {...props} />
			</RightContent>
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
	padding-left: 20px;
	max-width: ${vars.editorSideNavWidth + 'px'};
`
const RightContent = styled.div`
	display: flex;
	flex: 1;
	height: 100%;
	padding: 15px 20px;
`
