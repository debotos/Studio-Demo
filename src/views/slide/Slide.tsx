import React, { useEffect, useState } from 'react'
import { message, Row } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { setActiveItems } from '../../redux/slices/activeItemsSlice'
import { setTreeData } from '../../redux/slices/treeDataSlice'
import * as dummyDataProvider from '../../utils/dummyData'
import { genTreeKey, isEmpty } from '../../utils/helpers'
import { LoadingCenter } from '../../components/loading/Loading'

export default function (props: any) {
	const { match } = props

	const id = match?.params?.id
	const subjectID = match?.params?.subjectID
	const levelID = match?.params?.levelID
	const unitID = match?.params?.unitID
	const lessonID = id ? id : match?.params?.lessonID
	const slideID = match?.params?.slideID

	const activeSubjectInfo = useSelector((state: RootState) => state.activeItems.subject)
	const activeLevelInfo = useSelector((state: RootState) => state.activeItems.level)
	const activeUnitInfo = useSelector((state: RootState) => state.activeItems.unit)
	const levels = useSelector((state: RootState) => state.treeData[genTreeKey('subject', subjectID)])
	const units = useSelector((state: RootState) => state.treeData[genTreeKey('level', levelID)])
	const lessons = useSelector((state: RootState) => state.treeData[genTreeKey('unit', unitID)])
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)

	if (isEmpty(subjectID) || isEmpty(levelID) || isEmpty(unitID)) {
		message.error('Invalid slide/lesson chosen. Please select a valid slide/lesson!')
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
		setLoadingData(false)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	return (
		<>
			<Row justify='center'>
				<div>
					<h2>Slide Editor</h2>

					<h3>List/Deck of slides under lesson {lessonID}</h3>

					{slideID && <h3>Active slide item inside editor {slideID}</h3>}
				</div>
			</Row>
		</>
	)
}
