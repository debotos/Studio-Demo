import React, { useEffect, useState } from 'react'
import shortid from 'shortid'
import { useSelector, useDispatch } from 'react-redux'

import AppForm from '../../components/form/AppForm'
import * as dummyDataProvider from '../../utils/dummyData'
import { LoadingCenter } from '../../components/loading/Loading'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import keys from '../../config/keys'
import { isEmpty } from '../../utils/helpers'
import { RootState, AppDispatch } from '../../redux/store'
import { setDataList } from '../../redux/slices/dataListSlice'

export default function (props: any) {
	const { match } = props
	const levelID = match?.params?.id
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)
	const subjects = useSelector((state: RootState) => state.dataList.subjects)
	const [levelData, setLevelData] = useState({})

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		setLoadingData(true)
		// TODO: Get level data via ajax and set
		const level: any = dummyDataProvider.findLevelByID(levelID)
		setLevelData(level)
		if (isEmpty(subjects)) {
			// TODO: Get subjects via ajax and set
			dispatch(setDataList({ type: 'subject', data: dummyDataProvider.getSubjects() }))
		}
		setLoadingData(false)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	const { title: levelTitle, author, thumbnail, subjectID } = levelData as any
	const initValues = {
		level_name: levelTitle,
		author_name: author,
		subjectID,
		image: [{ uid: shortid.generate(), name: 'Level image', url: thumbnail, uploaded: true }],
	}

	const metadata = {
		form_type: 'edit' as const,
		schema_for: 'level' as const,
		label: 'Edit level',
		initValues,
		fields: [
			{
				label: 'Level name',
				key: 'level_name',
				type: 'text',
				placeholder: 'Level name',
				has_feedback: true,
				validations: [
					{ whitespace: true, required: true, message: 'Level name is required' },
					{ min: 2, message: 'Minimum length is 2' },
					{ max: 50, message: 'Max value length is 50' },
				],
			},
			{
				label: 'Subject associated with',
				key: 'subjectID',
				type: 'select',
				placeholder: 'Select subject',
				has_feedback: true,
				options: subjects ? subjects.map((x) => ({ label: x.title, value: x.id, disabled: false })) : [],
				validations: [{ whitespace: true, required: true, message: 'Subject is required' }],
			},
			{
				label: 'Author name',
				key: 'author_name',
				type: 'text',
				placeholder: 'Author name',
				has_feedback: true,
				validations: [],
			},
			{
				label: 'Upload image',
				key: 'image',
				type: 'upload-image',
				has_feedback: true,
				validations: [],
			},
		],
	}

	let breadcrumbItems: any[] = []

	const subjectData = subjects.find((x: any) => x.id === subjectID)
	if (subjectData) {
		const subjectTitle = subjectData.title
		breadcrumbItems = [
			...breadcrumbItems,
			{ name: 'Subjects', path: `/editor/subjects`, isLink: true },
			{ name: subjectTitle, path: `/editor/subjects/${keys.viewAction}/${subjectID}`, isLink: true },
		]
	}
	breadcrumbItems.push({ name: levelTitle, path: `/editor/${subjectID}/levels/${keys.viewAction}/${levelID}`, isLink: true })
	breadcrumbItems.push({ name: 'Edit', path: ``, isLink: false })

	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
			<AppForm metadata={metadata} />
		</>
	)
}
