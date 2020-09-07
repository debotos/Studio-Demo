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

const type = 'subject'

export function SubjectsViewList(props: any) {
	const subjects = useSelector((state: RootState) => state.dataList.subjects)
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		setLoadingData(true)
		if (isEmpty(subjects)) {
			// TODO: Get subjects via ajax and set
			dispatch(setDataList({ type, data: dummyDataProvider.getSubjects() }))
		}
		setLoadingData(false)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	const breadcrumbItems: any[] = [{ name: 'Subjects', path: `/editor/subjects`, isLink: false }]

	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
			<div>
				{!isEmpty(subjects) && (
					<>
						<Typography.Title level={2}>Recently updated subjects...</Typography.Title>
						<Row>
							{subjects.slice(0, 2).map((item, index) => {
								return <ElementCard key={index} data={item} />
							})}
						</Row>
						<br />
					</>
				)}
				<Typography.Title level={2}>List of subjects</Typography.Title>
				<Row>
					<AddElementCard type={type} />
					{subjects.map((item, index) => {
						return <ElementCard key={index} data={item} />
					})}
				</Row>
			</div>
		</>
	)
}

export default SubjectsViewList
