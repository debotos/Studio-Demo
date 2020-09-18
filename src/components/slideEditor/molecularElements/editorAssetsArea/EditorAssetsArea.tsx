import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../../../redux/store'
import { EditorPropsType } from '../../SlideEditor'
import { CurrentlyUsedAssetsArea } from './CurrentlyUsedAssetsArea'
import { EditorAssetsPickupArea } from './editorAssetsPickupArea/EditorAssetsPickupArea'

export function EditorAssetsArea(props: EditorPropsType) {
	const { showCurrentlyUsedAssetsUI } = useSelector((state: RootState) => state.slideEditorState)

	if (showCurrentlyUsedAssetsUI) return <CurrentlyUsedAssetsArea {...props} />
	return <EditorAssetsPickupArea {...props} />
}
