import React, { useEffect, useState } from 'react'
import { Row, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { setDataList, mergeDataList } from '../../redux/slices/dataListSlice'
import { ElementCard, AddElementCard } from '../../components/card/ElementCard'
import { isEmpty } from '../../utils/helpers'
import * as dummyDataProvider from '../../utils/dummyData'
import { LoadingCenter } from '../../components/loading/Loading'

const type = 'level'

export function LevelsViewList(props: any) {
	const levels = useSelector((state: RootState) => state.dataList.levels)
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		setLoadingData(true)
		if (isEmpty(levels)) {
			// TODO: Get levels via ajax and set
			dispatch(setDataList({ type, data: dummyDataProvider.getLevels() }))
		} else {
			// TODO: This request will happen in background as data is already there, we just need to pull latest data and merge
			dispatch(mergeDataList({ type, data: dummyDataProvider.getLevels() }))
		}
		setLoadingData(false)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	return (
		<div>
			{!isEmpty(levels) && (
				<>
					<Typography.Title level={2}>Recently updated levels...</Typography.Title>
					<Row>
						{levels.slice(0, 2).map((item, index) => {
							return <ElementCard key={index} data={item} />
						})}
					</Row>
					<br />
				</>
			)}
			<Typography.Title level={2}>List of levels</Typography.Title>
			<Row>
				<AddElementCard type={type} />
				{levels.map((item, index) => {
					return <ElementCard key={index} data={item} />
				})}
			</Row>
		</div>
	)
}

export default LevelsViewList
