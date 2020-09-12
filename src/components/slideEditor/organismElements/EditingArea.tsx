import React from 'react'
import styled from 'styled-components'

import { EditorPropsType } from '../SlideEditor'
import { EditorSubToolBar } from '../molecularElements/EditorSubToolBar'

export default function EditingArea(props: EditorPropsType) {
	return (
		<Wrapper className='hide-native-scrollbar'>
			<EditorSubToolBar {...props} />
			<Container>
				<img alt='editor' width='100%' src='https://ezilmdev.s3.amazonaws.com/AR/L1/U99/E60/S001/AR_L1_U99_E60_S001-image1.png' />
			</Container>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`

const Container = styled.div`
	height: 100%;
	padding: 0 20px 15px 20px;
	width: 100%;
`
