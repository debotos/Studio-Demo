import React, { useEffect, useState } from 'react'
import { message, Typography, Row, Empty, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { setActiveItems } from '../../redux/slices/activeItemsSlice'
import { setTreeData } from '../../redux/slices/treeDataSlice'
import * as dummyDataProvider from '../../utils/dummyData'
import ElementCard, { AddElementCard } from '../../components/card/ElementCard'
import { genTreeKey, isEmpty } from '../../utils/helpers'
import { routeHistory } from '../../app/App'
import keys from '../../config/keys'
import { LoadingCenter } from '../../components/loading/Loading'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'

/* View specific unit means list of lessons under it */
export default function (props: any) {
	const { match } = props
	const unitID = match?.params?.id
	const levelID = match?.params?.levelID
	const subjectID = match?.params?.subjectID
	const activeSubjectInfo = useSelector((state: RootState) => state.activeItems.subject)
	const activeLevelInfo = useSelector((state: RootState) => state.activeItems.level)
	const activeUnitInfo = useSelector((state: RootState) => state.activeItems.unit)
	const levels = useSelector((state: RootState) => state.treeData[genTreeKey('subject', subjectID)])
	const units = useSelector((state: RootState) => state.treeData[genTreeKey('level', levelID)])
	const lessons = useSelector((state: RootState) => state.treeData[genTreeKey('unit', unitID)])
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)

	if (isEmpty(subjectID) || isEmpty(levelID) || isEmpty(unitID)) {
		message.error('Invalid unit chosen. Please select a valid unit!')
		return null
	}

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [window.location.pathname])

	const getData = async () => {
		setLoadingData(true)
		// TODO: Get level info via ajax and set
		const activeUnitData = dummyDataProvider.findUnitByID(unitID)
		dispatch(setActiveItems({ unit: activeUnitData }))

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

	const addRouteSuffix = `?subjectID=${subjectID}&subjectTitle=${encodeURIComponent(
		activeSubjectInfo.title
	)}&levelID=${levelID}&levelTitle=${encodeURIComponent(activeLevelInfo.title)}&unitID=${unitID}&unitTitle=${encodeURIComponent(
		activeUnitInfo.title
	)}`

	if (isEmpty(lessons)) {
		return (
			<Row justify='center'>
				<Row>
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No lesson is created under this unit.</span>}>
						<Button
							size='small'
							type='primary'
							onClick={() => routeHistory.push(`/editor/lesson/${keys.createAction}${addRouteSuffix}`)}
						>
							Create a new lesson
						</Button>
					</Empty>
				</Row>
			</Row>
		)
	}

	const breadcrumbItems: any[] = [
		{ name: 'Subjects', path: `/editor/subjects`, isLink: true },
		{ name: activeSubjectInfo.title, path: `/editor/subjects/${keys.viewAction}/${subjectID}`, isLink: true },
		{ name: activeLevelInfo.title, path: `/editor/${subjectID}/levels/${keys.viewAction}/${levelID}`, isLink: true },
		{ name: activeUnitInfo.title, path: ``, isLink: false },
	]

	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
			<div>
				{!isEmpty(lessons) && (
					<>
						<Typography.Title level={2}>Recently updated lessons...</Typography.Title>
						<Row>
							{lessons.slice(0, 2).map((item: any, index: number) => {
								return <ElementCard key={index} data={item} />
							})}
						</Row>
						<br />
					</>
				)}
				<Typography.Title level={2}>List of lessons</Typography.Title>
				<Row>
					<AddElementCard type={'lesson'} routeSuffix={addRouteSuffix} />
					{lessons.map((item: any, index: number) => {
						return <ElementCard key={index} data={item} />
					})}
				</Row>
			</div>
		</>
	)
}
