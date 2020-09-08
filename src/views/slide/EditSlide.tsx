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
	const subjectID = match?.params?.subjectID
	const levelID = match?.params?.levelID
	const unitID = match?.params?.unitID
	const lessonID = match?.params?.lessonID
	const slideID = match?.params?.id
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)
	const subjects = useSelector((state: RootState) => state.dataList.subjects)
	const levels = useSelector((state: RootState) => state.dataList.levels)
	const units = useSelector((state: RootState) => state.dataList.units)
	const lessons = useSelector((state: RootState) => state.dataList.lessons)
	const [slideData, setSlideData] = useState({})

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		setLoadingData(true)
		// TODO: Get slide data via ajax and set
		const slide: any = dummyDataProvider.findSlideByID(slideID)
		setSlideData(slide)

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

	const { title: slideTitle, author, thumbnail } = slideData as any
	const initValues = {
		slide_name: slideTitle,
		author_name: author,
		subjectID,
		levelID,
		unitID,
		lessonID,
		image: [{ uid: shortid.generate(), name: 'Level image', url: thumbnail, uploaded: true }],
	}

	const metadata = {
		form_type: 'edit' as const,
		schema_for: 'slide' as const,
		label: 'Edit slide',
		initValues,
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

	let breadcrumbItems: any[] = []

	const subjectData = subjects.find((x: any) => x.id === subjectID)
	const levelData = levels.find((x: any) => x.id === levelID)
	const unitData = units.find((x: any) => x.id === unitID)
	const lessonData = lessons.find((x: any) => x.id === lessonID)
	if (subjectData) {
		breadcrumbItems = [
			...breadcrumbItems,
			{ name: 'Subjects', path: `/editor/subjects`, isLink: true },
			{ name: subjectData.title, path: `/editor/subjects/${keys.viewAction}/${subjectID}`, isLink: true },
		]
		if (levelData) {
			breadcrumbItems.push({
				name: levelData.title,
				path: `/editor/${subjectID}/levels/${keys.viewAction}/${levelID}`,
				isLink: true,
			})
			if (unitData) {
				breadcrumbItems.push({
					name: unitData.title,
					path: `/editor/${subjectID}/${levelID}/units/${keys.viewAction}/${unitID}`,
					isLink: true,
				})
				if (lessonData) {
					breadcrumbItems.push({
						name: lessonData.title,
						path: `/editor/${subjectID}/${levelID}/${unitID}/lessons/${keys.viewAction}/${lessonID}`,
						isLink: true,
					})
				}
			}
		}
	}
	breadcrumbItems.push({
		name: slideTitle,
		path: `/editor/${subjectID}/${levelID}/${unitID}/${lessonID}/slides/${keys.viewAction}/${slideID}`,
		isLink: true,
	})
	breadcrumbItems.push({ name: 'Edit', path: ``, isLink: false })

	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
			<AppForm metadata={metadata} />
		</>
	)
}
