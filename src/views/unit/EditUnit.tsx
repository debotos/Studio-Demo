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
	const unitID = match?.params?.id
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)
	const subjects = useSelector((state: RootState) => state.dataList.subjects)
	const levels = useSelector((state: RootState) => state.dataList.levels)
	const [unitData, setUnitData] = useState({})

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		setLoadingData(true)
		// TODO: Get unit data via ajax and set
		const unit: any = dummyDataProvider.findUnitByID(unitID)
		setUnitData(unit)
		if (isEmpty(subjects)) {
			// TODO: Get subjects via ajax and set
			dispatch(setDataList({ type: 'subject', data: dummyDataProvider.getSubjects() }))
		}
		if (isEmpty(levels)) {
			// TODO: Get levels via ajax and set
			dispatch(setDataList({ type: 'level', data: dummyDataProvider.getLevels() }))
		}
		setLoadingData(false)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	const { title: unitTitle, author, thumbnail } = unitData as any
	const initValues = {
		unit_name: unitTitle,
		author_name: author,
		subjectID,
		levelID,
		image: [{ uid: shortid.generate(), name: 'Level image', url: thumbnail, uploaded: true }],
	}

	const metadata = {
		form_type: 'edit' as const,
		schema_for: 'unit' as const,
		label: 'Edit unit',
		initValues,
		fields: [
			{
				label: 'Unit name',
				key: 'unit_name',
				type: 'text',
				placeholder: 'Unit name',
				has_feedback: true,
				validations: [
					{ whitespace: true, required: true, message: 'Unit name is required' },
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
				label: 'Level associated with',
				key: 'levelID',
				type: 'select',
				placeholder: 'Select level',
				has_feedback: true,
				options: levels ? levels.map((x) => ({ label: x.title, value: x.id, disabled: false })) : [],
				validations: [{ whitespace: true, required: true, message: 'Level is required' }],
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
	if (subjectData) {
		const subjectTitle = subjectData.title
		breadcrumbItems = [
			...breadcrumbItems,
			{ name: 'Subjects', path: `/editor/subjects`, isLink: true },
			{ name: subjectTitle, path: `/editor/subjects/${keys.viewAction}/${subjectID}`, isLink: true },
		]
		if (levelData) {
			const levelTitle = levelData.title
			breadcrumbItems.push({ name: levelTitle, path: `/editor/${subjectID}/levels/${keys.viewAction}/${levelID}`, isLink: true })
		}
	}
	breadcrumbItems.push({
		name: unitTitle,
		path: `/editor/${subjectID}/${levelID}/units/${keys.viewAction}/${unitID}`,
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
