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

/* View specific level means list of units under it */
export default function (props: any) {
	const { match } = props
	const levelID = match?.params?.id
	const subjectID = match?.params?.subjectID
	const activeSubjectInfo = useSelector((state: RootState) => state.activeItems.subject)
	const activeLevelInfo = useSelector((state: RootState) => state.activeItems.level)
	const levels = useSelector((state: RootState) => state.treeData[genTreeKey('subject', subjectID)])
	const units = useSelector((state: RootState) => state.treeData[genTreeKey('level', levelID)])
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)

	if (isEmpty(levelID) || isEmpty(subjectID)) {
		message.error('Invalid level chosen. Please select a valid level!')
		return null
	}

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [window.location.pathname])

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
		if (isEmpty(levels)) {
			// TODO: Get all the levels under this specific subject via ajax
			dispatch(setTreeData({ id: subjectID, type: 'subject', data: dummyDataProvider.getLevelsByParentID(subjectID) }))
		}
		if (isEmpty(units)) {
			// TODO: Get all the units under this specific level via ajax
			dispatch(setTreeData({ id: levelID, type: 'level', data: dummyDataProvider.getUnitsByParentID(levelID) }))
		}
		setLoadingData(false)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	const addRouteSuffix = `?subjectID=${subjectID}&subjectTitle=${encodeURIComponent(
		activeSubjectInfo.title
	)}&levelID=${levelID}&levelTitle=${encodeURIComponent(activeLevelInfo.title)}`

	if (isEmpty(units)) {
		return (
			<Row justify='center'>
				<Row>
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No unit is created under this level.</span>}>
						<Button
							size='small'
							type='primary'
							onClick={() => routeHistory.push(`/editor/unit/${keys.createAction}${addRouteSuffix}`)}
						>
							Create a new unit
						</Button>
					</Empty>
				</Row>
			</Row>
		)
	}

	return (
		<div>
			{!isEmpty(units) && (
				<>
					<Typography.Title level={2}>Recently updated units...</Typography.Title>
					<Row>
						{units.slice(0, 2).map((item: any, index: number) => {
							return <ElementCard key={index} data={item} />
						})}
					</Row>
					<br />
				</>
			)}
			<Typography.Title level={2}>List of units</Typography.Title>
			<Row>
				<AddElementCard type={'unit'} routeSuffix={addRouteSuffix} />
				{units.map((item: any, index: number) => {
					return <ElementCard key={index} data={item} />
				})}
			</Row>
		</div>
	)
}
