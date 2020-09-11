import React from 'react'
import styled from 'styled-components'

import vars from '../../../config/vars'
import { EditorPropsType } from '../SlideEditor'
import { SlidesList } from '../molecularElements/SlidesList'
import { AssetsCategoryList } from '../molecularElements/AssetsCategoryList'

export default function EditorSideBar(props: EditorPropsType) {
	return (
		<Container>
			{/* All slides list vertical scroll view */}
			<FirstContainer className='hide-native-scrollbar'>
				<SlidesList {...props} />
			</FirstContainer>

			{/* All assets categories vertical scroll view */}
			<SecondContainer className='hide-native-scrollbar app-box-shadow-right'>
				<AssetsCategoryList {...props} />
			</SecondContainer>

			{/* All assets vertical scroll view */}
			<ThirdContainer className='hide-native-scrollbar'>
				Esse fugiat pariatur ad Lorem et amet Lorem. Minim ut veniam officia ea magna mollit ex dolor proident pariatur occaecat
				do. Irure pariatur minim cillum mollit consectetur ad sunt ipsum quis do magna non velit. Dolor ullamco aliqua dolor sunt
				aliqua.
			</ThirdContainer>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	height: calc(100vh - ${vars.headerHeight + vars.editorToolBarHeight + 'px'});
	width: 100%;
`
const FirstContainer = styled.div`
	overflow-y: scroll;
	padding-top: 15px;
	padding-bottom: 10px;
	padding-right: 20px;
	width: ${vars.editorSideNavFirstContainerWidth + 'px'};
`
const SecondContainer = styled.div`
	margin-top: -2px;
	overflow-y: scroll;
	width: ${vars.editorSideNavSecondContainerWidth + 'px'};
`
const ThirdContainer = styled.div`
	overflow-y: scroll;
	width: ${vars.editorSideNavThirdContainerWidth + 'px'};
`
