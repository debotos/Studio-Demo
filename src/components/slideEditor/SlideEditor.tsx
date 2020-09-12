import React, { useEffect } from 'react'
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
}

export default function SlideEditor(props: EditorPropsType) {
	const { breadcrumbItems } = props
	const dispatch: AppDispatch = useDispatch()

	useEffect(() => {
		dispatch(setSettings({ bodyPadding: 0 }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Desktop editor={true}>
				<Breadcrumb items={breadcrumbItems} />
				<Affix offsetTop={vars.headerHeight - 2}>
					<EditorToolBar {...props} />
				</Affix>
				<EditorBody {...props} />
			</Desktop>
			<Mobile editor={true}>
				<RequireDesktop />
			</Mobile>
		</>
	)
}
