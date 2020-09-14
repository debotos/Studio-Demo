import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Affix } from 'antd'

import { setSettings } from '../../redux/slices/settingsSlice'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import { EditorToolBar } from './organismElements/EditorToolBar'
import { EditorBody } from './organismElements/EditorBody'
import { RequireDesktop } from '../device/RequireDesktop'
import { Desktop, Mobile } from '../device/Device'
import { AppDispatch } from '../../redux/store'
import vars from '../../config/vars'

export interface EditorPropsType {
	breadcrumbItems: any[]
	ids: any
	activeSlideInfo: any
	slides: any[]
	isFullScreen: boolean
	fullScreenBtnAlreadyClicked: boolean
}

export default function SlideEditor(props: EditorPropsType) {
	const { breadcrumbItems, isFullScreen, fullScreenBtnAlreadyClicked } = props
	const dispatch: AppDispatch = useDispatch()
	const [toolbarAffixed, setToolbarAffixed] = useState<boolean>(false)
	const bodyElementRef = useRef<any>(null)

	useEffect(() => {
		dispatch(setSettings({ bodyPadding: 0 }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Scroll up to hide breadcrumb when full screen mode exit
	useEffect(() => {
		// To prevent scrolling at the first time when landing on editor
		if (isFullScreen !== fullScreenBtnAlreadyClicked) {
			bodyElementRef?.current &&
				window.scrollTo({
					top: bodyElementRef.current.offsetTop,
					behavior: 'smooth', // optional
				})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFullScreen])

	const toolBar = <EditorToolBar {...props} toolbarAffixed={toolbarAffixed} />

	return (
		<>
			<Desktop editor={true}>
				{!isFullScreen && <Breadcrumb items={breadcrumbItems} />}
				{isFullScreen ? (
					toolBar
				) : (
					<Affix offsetTop={vars.headerHeight + 0.1} onChange={(val) => setToolbarAffixed(!!val)}>
						{toolBar}
					</Affix>
				)}
				<EditorBody {...props} bodyElementRef={bodyElementRef} />
			</Desktop>
			<Mobile editor={true}>
				<RequireDesktop />
			</Mobile>
		</>
	)
}
