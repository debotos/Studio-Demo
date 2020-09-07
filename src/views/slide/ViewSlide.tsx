import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { setActiveItems } from '../../redux/slices/activeItemsSlice'
import { setTreeData } from '../../redux/slices/treeDataSlice'
import * as dummyDataProvider from '../../utils/dummyData'
import { genTreeKey, isEmpty } from '../../utils/helpers'
import { LoadingCenter } from '../../components/loading/Loading'
import SlideEditor from '../../components/slideEditor/SlideEditor'

/* View specific slide means open slide editor for it */
export default function (props: any) {
	const { match } = props
	const subjectID = match?.params?.subjectID
	const levelID = match?.params?.levelID
	const unitID = match?.params?.unitID
	const lessonID = match?.params?.lessonID
	const slideID = match?.params?.id
	const activeSubjectInfo = useSelector((state: RootState) => state.activeItems.subject)
	const activeLevelInfo = useSelector((state: RootState) => state.activeItems.level)
	const activeUnitInfo = useSelector((state: RootState) => state.activeItems.unit)
	const activeLessonInfo = useSelector((state: RootState) => state.activeItems.lesson)
	const activeSlideInfo = useSelector((state: RootState) => state.activeItems.slide)
	const levels = useSelector((state: RootState) => state.treeData[genTreeKey('subject', subjectID)])
	const units = useSelector((state: RootState) => state.treeData[genTreeKey('level', levelID)])
	const lessons = useSelector((state: RootState) => state.treeData[genTreeKey('unit', unitID)])
	const slides = useSelector((state: RootState) => state.treeData[genTreeKey('lesson', lessonID)])
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)

	if (isEmpty(subjectID) || isEmpty(levelID) || isEmpty(unitID) || isEmpty(lessonID) || isEmpty(slideID)) {
		message.error('Invalid slide chosen. Please select a valid slide!')
		return null
	}

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		setLoadingData(true)
		if (isEmpty(activeSubjectInfo)) {
			// User came via direct url not via step by step navigation
			// TODO: Get parent subject info via ajax and set
			const activeSubjectData = dummyDataProvider.findSubjectByID(subjectID)
			dispatch(setActiveItems({ subject: activeSubjectData }))
		}
		if (isEmpty(activeLevelInfo)) {
			// User came via direct url not via step by step navigation
			// TODO: Get level info via ajax and set
			const activeLevelData = dummyDataProvider.findLevelByID(levelID)
			dispatch(setActiveItems({ level: activeLevelData }))
		}
		if (isEmpty(activeUnitInfo)) {
			// User came via direct url not via step by step navigation
			// TODO: Get level info via ajax and set
			const activeUnitData = dummyDataProvider.findUnitByID(unitID)
			dispatch(setActiveItems({ unit: activeUnitData }))
		}
		if (isEmpty(activeLessonInfo)) {
			// User came via direct url not via step by step navigation
			// TODO: Get lesson info via ajax and set
			const activeLessonData = dummyDataProvider.findLessonByID(unitID)
			dispatch(setActiveItems({ lesson: activeLessonData }))
		}
		if (isEmpty(activeSlideInfo)) {
			// User came via direct url not via step by step navigation
			// TODO: Get slide info via ajax and set
			const activeSlideData = dummyDataProvider.findSlideByID(unitID)
			dispatch(setActiveItems({ slide: activeSlideData }))
		}
		if (isEmpty(levels)) {
			// TODO: Get all the levels under this specific subject via ajax
			dispatch(setTreeData({ id: subjectID, type: 'subject', data: dummyDataProvider.getLevelsByParentID(subjectID) }))
		}
		if (isEmpty(units)) {
			// TODO: Get all the units under this specific level via ajax
			dispatch(setTreeData({ id: levelID, type: 'level', data: dummyDataProvider.getUnitsByParentID(levelID) }))
		}
		if (isEmpty(lessons)) {
			// TODO: Get all the lessons under this specific unit via ajax
			dispatch(setTreeData({ id: unitID, type: 'unit', data: dummyDataProvider.getLessonsByParentID(unitID) }))
		}
		if (isEmpty(slides)) {
			// TODO: Get all the slides under this specific unit via ajax
			dispatch(setTreeData({ id: lessonID, type: 'lesson', data: dummyDataProvider.getSlidesByParentID(lessonID) }))
		}
		setLoadingData(false)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	return <SlideEditor {...props} />
}
