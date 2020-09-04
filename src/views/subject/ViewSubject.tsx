import React, { useEffect } from 'react'
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

/* View specific subject means list of levels under it */
export default function (props: any) {
	const { match } = props
	const subjectID = match?.params?.id
	const activeSubjectInfo = useSelector((state: RootState) => state.activeItems.subject)
	const levels = useSelector((state: RootState) => state.treeData[genTreeKey('subject', subjectID)])
	const dispatch: AppDispatch = useDispatch()

	if (!subjectID || subjectID === 'null' || subjectID === 'undefined') {
		message.error('Invalid subject chosen. Please select a valid subject!')
		return null
	}

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		if (isEmpty(activeSubjectInfo)) {
			// User came via direct url not via step by step navigation
			// TODO: Get subject info via ajax and set
			const activeSubjectData = dummyDataProvider.findSubjectByID(subjectID)
			dispatch(setActiveItems({ subject: activeSubjectData }))
		}
		if (isEmpty(levels)) {
			// TODO: Get all the levels under this specific subject via ajax
			dispatch(setTreeData({ id: subjectID, type: 'subject', data: dummyDataProvider.getLevelsByParentID(subjectID) }))
		}
	}

	if (isEmpty(levels)) {
		return (
			<Row justify='center'>
				<Row>
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No level is created under this subject.</span>}>
						<Button
							size='small'
							type='primary'
							onClick={() =>
								routeHistory.push(
									`/editor/level/${keys.createAction}?subjectID=${subjectID}&subjectTitle=${encodeURIComponent(
										activeSubjectInfo.title
									)}`
								)
							}
						>
							Create a new level
						</Button>
					</Empty>
				</Row>
			</Row>
		)
	}

	return (
		<div>
			{!isEmpty(levels) && (
				<>
					<Typography.Title level={2}>Recently updated...</Typography.Title>
					<Row>
						{levels.slice(0, 2).map((item: any, index: number) => {
							return <ElementCard key={index} data={item} />
						})}
					</Row>
					<br />
				</>
			)}
			<Typography.Title level={2}>Create new level</Typography.Title>
			<Row>
				<AddElementCard type={'level'} />
				{levels.map((item: any, index: number) => {
					return <ElementCard key={index} data={item} />
				})}
			</Row>
		</div>
	)
}
