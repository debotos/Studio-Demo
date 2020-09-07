import React, { useEffect, useState } from 'react'
import shortid from 'shortid'

import AppForm from '../../components/form/AppForm'
import { metadata } from './AddSubject'
import * as dummyDataProvider from '../../utils/dummyData'
import { LoadingCenter } from '../../components/loading/Loading'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import keys from '../../config/keys'

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

	const { title, author, thumbnail } = subjectData as any
	const initValues = {
		subject_name: title,
		author_name: author,
		image: [{ uid: shortid.generate(), name: 'Subject image', url: thumbnail, uploaded: true }],
	}

	const breadcrumbItems: any[] = [
		{ name: 'Subjects', path: `/editor/subjects`, isLink: true },
		{ name: title, path: `/editor/subjects/${keys.viewAction}/${subjectID}`, isLink: true },
		{ name: 'Edit', path: ``, isLink: false },
	]

	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
			<AppForm metadata={{ ...metadata, form_type: 'edit' as const, label: 'Edit subject', initValues }} />
		</>
	)
}
