import React from 'react'
import { useSelector } from 'react-redux'

import { EditorImagePickupArea } from './EditorImagePickupArea'
import { EditorAudioPickupArea } from './EditorAudioPickupArea'
import { EditorVideoPickupArea } from './EditorVideoPickupArea'
import { EditorTextPickupArea } from './EditorTextPickupArea'
import { EditorSVGPickupArea } from './EditorSVGPickupArea'
import { RootState } from '../../../../../redux/store'
import { EditorPropsType } from '../../../SlideEditor'

export function EditorAssetsPickupArea(props: EditorPropsType) {
	const { activePrimaryAssetType } = useSelector((state: RootState) => state.slideEditorState)

	switch (activePrimaryAssetType) {
		case 'image':
			return <EditorImagePickupArea {...props} />
		case 'audio':
			return <EditorAudioPickupArea {...props} />
		case 'video':
			return <EditorVideoPickupArea {...props} />
		case 'text':
			return <EditorTextPickupArea {...props} />
		case 'svg':
			return <EditorSVGPickupArea {...props} />
		default:
			return null
	}
}
