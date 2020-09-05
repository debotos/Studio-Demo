import React, { useEffect, useState } from 'react'

import AppForm from '../../components/form/AppForm'
import { metadata } from './AddSubject'
import * as dummyDataProvider from '../../utils/dummyData'
import { LoadingCenter } from '../../components/loading/Loading'

export default function (props: any) {
	const { match } = props
	const subjectID = match?.params?.id
	const [loadingData, setLoadingData] = useState(true)
	const [subjectData, setSubjectData] = useState({})

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		setLoadingData(true)
		// TODO: Get subject data via ajax and set
		const subject: any = dummyDataProvider.findSubjectByID(subjectID)
		setSubjectData(subject)
		setLoadingData(false)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	const { title, thumbnail } = subjectData as any
	const initValues = { subject_name: title } // TODO:START: passing image is causing error

	return (
		<>
			<AppForm metadata={{ ...metadata, label: 'Edit subject', initValues }} />
		</>
	)
}
