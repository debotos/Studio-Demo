import React, { useEffect } from 'react'
import { Row, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { setDataList, mergeDataList } from '../../redux/slices/dataListSlice'
import { ElementCard, AddElementCard } from '../../components/card/ElementCard'
import keys from '../../config/keys'
import { isEmpty } from '../../utils/helpers'

const type = 'subject'
const dummyData = Array(10)
	.fill(0)
	.map((_, index) => {
		const id = index + 1
		const viewRoute = `/editor/subjects/${keys.viewAction}/${id}`
		const editRoute = `/editor/subjects/${keys.editAction}/${id}`
		const data = { id, type, title: `Subject ${id}`, thumbnail: 'https://picsum.photos/100/100', viewRoute, editRoute }
		return data
	})

export function SubjectsViewList(props: any) {
	const subjects = useSelector((state: RootState) => state.dataList.subjects)
	const dispatch: AppDispatch = useDispatch()

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		if (isEmpty(subjects)) {
			// TODO: Get subjects via ajax and set
			dispatch(setDataList({ type, data: dummyData }))
		} else {
			// TODO: This request will happen in background as data is already there, we just need to pull latest data and merge
			dispatch(mergeDataList({ type, data: dummyData }))
		}
	}

	return (
		<div>
			<Typography.Title level={2}>Recently updated...</Typography.Title>
			<Row>
				{subjects.slice(0, 4).map((subject, index) => {
					return <ElementCard key={index} data={subject} />
				})}
			</Row>
			<br />
			<Typography.Title level={2}>Create new subject</Typography.Title>
			<Row>
				<AddElementCard type={type} />
				{subjects.map((subject, index) => {
					return <ElementCard key={index} data={subject} />
				})}
			</Row>
		</div>
	)
}

export default SubjectsViewList
