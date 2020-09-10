import React from 'react'
import styled from 'styled-components'

import EditorSideBar from './EditorSideBar'
import EditingArea from './EditingArea'
import vars from '../../../config/vars'
import { Affix } from 'antd'

const { headerHeight, editorToolBarHeight } = vars

export interface EditorBodyPropsType {
	ids: any
}

export function EditorBody(props: EditorBodyPropsType) {
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
	padding-left: 30px;
	max-width: ${vars.editorSideNavWidth + 'px'};
`
const RightContent = styled.div`
	display: flex;
	flex: 1;
	height: 100%;
	padding: 15px 20px;
`
