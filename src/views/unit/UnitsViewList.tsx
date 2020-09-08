import React, { useEffect, useState } from 'react'
import { Row, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { setDataList } from '../../redux/slices/dataListSlice'
import { ElementCard, AddElementCard } from '../../components/card/ElementCard'
import { isEmpty } from '../../utils/helpers'
import * as dummyDataProvider from '../../utils/dummyData'
import { LoadingCenter } from '../../components/loading/Loading'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'

const type = 'unit'

export function UnitsViewList(props: any) {
	const units = useSelector((state: RootState) => state.dataList.units)
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		setLoadingData(true)
		if (isEmpty(units)) {
			// TODO: Get units via ajax and set
			dispatch(setDataList({ type, data: dummyDataProvider.getUnits() }))
		}
		setLoadingData(false)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	const breadcrumbItems: any[] = [{ name: 'Units', path: `/editor/units`, isLink: false }]

	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
			<div>
				{!isEmpty(units) && (
					<>
						<Typography.Title level={2}>Recently updated units...</Typography.Title>
						<Row>
							{units.slice(0, 2).map((item, index) => {
								return <ElementCard key={index} data={item} />
							})}
						</Row>
						<br />
					</>
				)}
				<Typography.Title level={2}>List of units</Typography.Title>
				<Row>
					<AddElementCard type={type} />
					{units.map((item, index) => {
						return <ElementCard key={index} data={item} />
					})}
				</Row>
			</div>
		</>
	)
}

export default UnitsViewList
