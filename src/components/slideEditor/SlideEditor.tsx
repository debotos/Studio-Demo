import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../redux/store'
import { setSettings } from '../../redux/slices/settingsSlice'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import { EditorToolBar } from './molecularElements/ToolBar'
import { EditorSideBar } from './molecularElements/SideBar'

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
		<>
			<Breadcrumb items={breadcrumbItems} />
			<EditorToolBar ids={ids} />
			<EditorSideBar ids={ids} />
		</>
	)
}
