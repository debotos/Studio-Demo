import React, { useEffect } from 'react'
import { message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { setActiveItems } from '../../redux/slices/activeItemsSlice'

export default function (props: any) {
	const { match } = props
	const subjectID = match?.params?.id
	const subject = useSelector((state: RootState) => state.activeItems.subject)
	const dispatch: AppDispatch = useDispatch()

	if (!subjectID || subjectID === 'null' || subjectID === 'undefined') {
		message.error('Invalid subject chosen. Please select a valid subject!')
		return null
	}

	useEffect(() => {
		getData()
	})

	const getData = async () => {
		if (!subject) {
			// User came via direct url not via step by step navigation
			// TODO: Get subject info via ajax and set
			const activeSubjectData = { id: subjectID, title: `Subject ${subjectID}` }
			dispatch(setActiveItems({ subject: activeSubjectData }))
		}
		// TODO: Get all levels under this subject via ajax and set
	}

	return <div>View Subject ID: {subjectID} means list of levels under it.</div>
}
