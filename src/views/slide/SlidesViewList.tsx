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

const type = 'slide'

export function SlidesViewList(props: any) {
	const slides = useSelector((state: RootState) => state.dataList.slides)
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		setLoadingData(true)
		if (isEmpty(slides)) {
			// TODO: Get slides via ajax and set
			dispatch(setDataList({ type, data: dummyDataProvider.getSlides() }))
		}
		setTimeout(() => setLoadingData(false), 1000)
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	const breadcrumbItems: any[] = [{ name: 'Slides', path: `/editor/slides`, isLink: false }]

	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
			<div>
				{!isEmpty(slides) && (
					<>
						<Typography.Title level={2}>Recently updated slides...</Typography.Title>
						<Row>
							{slides.slice(0, 2).map((item, index) => {
								return <ElementCard key={index} data={item} />
							})}
						</Row>
						<br />
					</>
				)}
				<Typography.Title level={2}>List of slides</Typography.Title>
				<Row>
					<AddElementCard type={type} />
					{slides.map((item, index) => {
						return <ElementCard key={index} data={item} />
					})}
				</Row>
			</div>
		</>
	)
}

export default SlidesViewList
