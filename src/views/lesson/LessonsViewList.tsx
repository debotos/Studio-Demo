import React, { useEffect, useState } from 'react'
import { Row, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { setDataList, mergeDataList } from '../../redux/slices/dataListSlice'
import { ElementCard, AddElementCard } from '../../components/card/ElementCard'
import { isEmpty } from '../../utils/helpers'
import * as dummyDataProvider from '../../utils/dummyData'
import { LoadingCenter } from '../../components/loading/Loading'

const type = 'lesson'

export function LessonsViewList(props: any) {
	const lessons = useSelector((state: RootState) => state.dataList.lessons)
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		setLoadingData(true)
		if (isEmpty(lessons)) {
			// TODO: Get lessons via ajax and set
			dispatch(setDataList({ type, data: dummyDataProvider.getLessons() }))
		} else {
			// TODO: This request will happen in background as data is already there, we just need to pull latest data and merge
			dispatch(mergeDataList({ type, data: dummyDataProvider.getLessons() }))
		}
		setLoadingData(false)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	return (
		<div>
			{!isEmpty(lessons) && (
				<>
					<Typography.Title level={2}>Recently updated...</Typography.Title>
					<Row>
						{lessons.slice(0, 2).map((item, index) => {
							return <ElementCard key={index} data={item} />
						})}
					</Row>
					<br />
				</>
			)}
			<Typography.Title level={2}>Create new lesson</Typography.Title>
			<Row>
				<AddElementCard type={type} />
				{lessons.map((item, index) => {
					return <ElementCard key={index} data={item} />
				})}
			</Row>
		</div>
	)
}

export default LessonsViewList
