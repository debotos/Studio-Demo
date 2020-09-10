import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Affix } from 'antd'

import { AppDispatch } from '../../redux/store'
import { setSettings } from '../../redux/slices/settingsSlice'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import { EditorToolBar } from './molecularElements/EditorToolBar'
import { EditorBody } from './molecularElements/EditorBody'
import vars from '../../config/vars'

interface CProps {
	breadcrumbItems: any[]
	ids: any
}

export default function SlideEditor(props: any) {
	const { ids, breadcrumbItems } = props
	const dispatch: AppDispatch = useDispatch()

	useEffect(() => {
		dispatch(setSettings({ bodyPadding: 0 }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<Breadcrumb items={breadcrumbItems} />
			<Affix offsetTop={vars.headerHeight - 2}>
				<EditorToolBar ids={ids} />
			</Affix>
			<EditorBody ids={ids} />
		</div>
	)
}
