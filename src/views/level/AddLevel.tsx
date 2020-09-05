import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import AppForm from '../../components/form/AppForm'
import { setDataList, mergeDataList } from '../../redux/slices/dataListSlice'
import { getAllQueryVariables, isEmpty } from '../../utils/helpers'
import * as dummyDataProvider from '../../utils/dummyData'
import { LoadingCenter } from '../../components/loading/Loading'

export default function () {
	const initValues = getAllQueryVariables()
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)
	const subjects = useSelector((state: RootState) => state.dataList.subjects)

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		setLoadingData(true)
		if (isEmpty(subjects)) {
			// TODO: Get subjects via ajax and set
			dispatch(setDataList({ type: 'subject', data: dummyDataProvider.getSubjects() }))
		} else {
			// TODO: This request will happen in background as data is already there, we just need to pull latest data and merge
			dispatch(mergeDataList({ type: 'subject', data: dummyDataProvider.getSubjects() }))
		}
		setLoadingData(false)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	const metadata = {
		schema_for: 'level',
		label: 'Create new level',
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

	return (
		<>
			<AppForm metadata={metadata} />
		</>
	)
}
