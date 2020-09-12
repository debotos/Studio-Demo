import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import vars from '../../../config/vars'
import { EditorPropsType } from '../SlideEditor'
import { RootState } from '../../../redux/store'
import { EditorSlidesList } from '../molecularElements/EditorSlidesList'
import { EditorAssetsArea } from '../molecularElements/EditorAssetsArea'
import { EditorAssetsCategoryList } from '../molecularElements/EditorAssetsCategoryList'

export default function EditorSideBar(props: EditorPropsType) {
	const { showSlidesListUI, showEditorSideBarAssetCategoryUI, showEditorSideBarAssetViewerUI } = useSelector(
		(state: RootState) => state.slideEditorState
	)

	return (
		<Container>
			{/* All slides list vertical scroll view */}
			{showSlidesListUI && (
				<FirstContainer className='hide-native-scrollbar'>
					<EditorSlidesList {...props} />
				</FirstContainer>
			)}

			{/* All assets categories vertical scroll view */}
			{showEditorSideBarAssetCategoryUI && (
				<SecondContainer className='hide-native-scrollbar app-box-shadow-right'>
					<EditorAssetsCategoryList {...props} />
				</SecondContainer>
			)}

			{/* All assets vertical scroll view */}
			{showEditorSideBarAssetViewerUI && (
				<ThirdContainer className='hide-native-scrollbar'>
					<EditorAssetsArea {...props} />
				</ThirdContainer>
			)}
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
	margin: 15px 20px 0 20px;
	overflow-y: scroll;
	width: ${vars.editorSideNavThirdContainerWidth + 'px'};
`
