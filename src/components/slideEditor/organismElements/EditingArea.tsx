import React from 'react'
import styled from 'styled-components'

import { EditorSubToolBar } from '../molecularElements/EditorSubToolBar'
import EditorNoteArea from '../molecularElements/EditorNoteArea'
import { EditorPropsType } from '../SlideEditor'
import vars from '../../../config/vars'

const { headerHeight, editorSubToolBarHeight, editorToolBarHeight, editorNoteAreaHeight } = vars

export default function EditingArea(props: EditorPropsType) {
	const { isFullScreen } = props
	const offsetTop = isFullScreen
		? editorToolBarHeight + editorSubToolBarHeight + editorNoteAreaHeight
		: headerHeight + editorToolBarHeight + editorSubToolBarHeight + editorNoteAreaHeight

	return (
		<Wrapper className='hide-native-scrollbar'>
			<EditorSubToolBar {...props} />
			<Container offsetTop={offsetTop}>
				<img
					alt='editor'
					width='100%'
					height='100%'
					src='https://ezilmdev.s3.amazonaws.com/AR/L1/U99/E60/S001/AR_L1_U99_E60_S001-image1.png'
				/>
			</Container>
			<EditorNoteArea />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`
const Container: any = styled.div`
	height: ${(props: any) => `calc(100vh - ${props.offsetTop + 'px'})`};
	max-height: ${(props: any) => `calc(100vh - ${props.offsetTop + 'px'})`};
	min-height: ${(props: any) => `calc(100vh - ${props.offsetTop + 'px'})`};
	padding: 0 20px 15px 20px;
	width: 100%;
`
