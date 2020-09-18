import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { EditorBodyPropsType } from '../EditorBody'
import { RootState } from '../../../../redux/store'
import vars from '../../../../config/vars'
import EditorExtraAreaCommentView from './EditorExtraAreaCommentView'

function EditorExtraArea(props: EditorBodyPropsType) {
	const { isFullScreen } = props
	const offsetTop = isFullScreen ? vars.editorToolBarHeight + 'px' : vars.headerHeight + vars.editorToolBarHeight + 'px'
	const { editorExtraAreaActiveTemplate: currentActiveTemplate } = useSelector((state: RootState) => state.slideEditorState)
	if (!currentActiveTemplate) return null

	let view

	switch (currentActiveTemplate) {
		case 'comment':
			view = <EditorExtraAreaCommentView {...props} />
			break

		default:
			view = null
			break
	}

	return <Container offsetTop={offsetTop}>{view}</Container>
}

export default EditorExtraArea

const Container: any = styled.div`
	background-color: #fff;
	border-left: 2px solid #eee;
	height: ${(props: any) => `calc(100vh - ${props.offsetTop})`};
	min-width: ${vars.editorExtraAreaWidth + 'px'};
	max-width: ${vars.editorExtraAreaWidth + 'px'};
	overflow-y: scroll;
	padding: 12px;
`
