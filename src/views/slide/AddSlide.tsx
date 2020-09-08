import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import AppForm from '../../components/form/AppForm'
import { setDataList } from '../../redux/slices/dataListSlice'
import { getAllQueryVariables, isEmpty, getCreateElementFormBreadcrumb } from '../../utils/helpers'
import * as dummyDataProvider from '../../utils/dummyData'
import { LoadingCenter } from '../../components/loading/Loading'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'

export default function () {
	const queryVars = getAllQueryVariables()
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)
	const subjects = useSelector((state: RootState) => state.dataList.subjects)
	const levels = useSelector((state: RootState) => state.dataList.levels)
	const units = useSelector((state: RootState) => state.dataList.units)
	const lessons = useSelector((state: RootState) => state.dataList.lessons)

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		setLoadingData(true)
		if (isEmpty(subjects)) {
			// TODO: Get subjects via ajax and set
			dispatch(setDataList({ type: 'subject', data: dummyDataProvider.getSubjects() }))
		}
		if (isEmpty(levels)) {
			// TODO: Get levels via ajax and set
			dispatch(setDataList({ type: 'level', data: dummyDataProvider.getLevels() }))
		}
		if (isEmpty(units)) {
			// TODO: Get units via ajax and set
			dispatch(setDataList({ type: 'unit', data: dummyDataProvider.getUnits() }))
		}
		if (isEmpty(lessons)) {
			// TODO: Get lessons via ajax and set
			dispatch(setDataList({ type: 'lesson', data: dummyDataProvider.getLessons() }))
		}
		setLoadingData(false)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	const metadata = {
		form_type: 'create' as const,
		schema_for: 'slide' as const,
		label: 'Create new slide',
		initValues: queryVars,
		fields: [
			{
				label: 'Slide name',
				key: 'slide_name',
				type: 'text',
				placeholder: 'Slide name',
				has_feedback: true,
				validations: [
					{ whitespace: true, required: true, message: 'Slide name is required' },
					{ min: 2, message: 'Minimum length is 2' },
					{ max: 100, message: 'Max value length is 100' },
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
				label: 'Level associated with',
				key: 'levelID',
				type: 'select',
				placeholder: 'Select level',
				has_feedback: true,
				options: levels ? levels.map((x) => ({ label: x.title, value: x.id, disabled: false })) : [],
				validations: [{ whitespace: true, required: true, message: 'Level is required' }],
			},
			{
				label: 'Unit associated with',
				key: 'unitID',
				type: 'select',
				placeholder: 'Select unit',
				has_feedback: true,
				options: units ? units.map((x) => ({ label: x.title, value: x.id, disabled: false })) : [],
				validations: [{ whitespace: true, required: true, message: 'Unit is required' }],
			},
			{
				label: 'Lesson associated with',
				key: 'lessonID',
				type: 'select',
				placeholder: 'Select lesson',
				has_feedback: true,
				options: lessons ? lessons.map((x) => ({ label: x.title, value: x.id, disabled: false })) : [],
				validations: [{ whitespace: true, required: true, message: 'Lesson is required' }],
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

	let breadcrumbItems: any[] = getCreateElementFormBreadcrumb(queryVars, 'slide')

	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
			<AppForm metadata={metadata} />
		</>
	)
}
