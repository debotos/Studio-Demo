import React from 'react'
import { Row, Typography } from 'antd'

import { ElementCard, AddElementCard } from '../../components/card/ElementCard'
import keys from '../../config/keys'

const type = 'subject'

export default function SubjectsViewList() {
	const recentUpdatedSubjects = Array(4).fill(0)
	const subjects = Array(10).fill(0)

	return (
		<div>
			<Typography.Title level={2}>Recently updated...</Typography.Title>
			<Row>
				{recentUpdatedSubjects.map((subject, index) => {
					const id = index + 1
					const viewRoute = `/editor/subjects/${keys.viewAction}/${id}`
					const editRoute = `/editor/subjects/${keys.editAction}/${id}`
					const data = { title: `Subject ${id}`, thumbnail: 'https://picsum.photos/100/100', viewRoute, editRoute }

					return <ElementCard key={index} id={id} type={type} data={data} />
				})}
			</Row>
			<br />
			<Typography.Title level={2}>Create new subject</Typography.Title>
			<Row>
				<AddElementCard type={type} />
				{subjects.map((subject, index) => {
					const id = index + 1
					const viewRoute = `/editor/subjects/${keys.viewAction}/${id}`
					const editRoute = `/editor/subjects/${keys.editAction}/${id}`
					const data = { title: `Subject ${id}`, thumbnail: 'https://picsum.photos/100/100', viewRoute, editRoute }

					return <ElementCard key={index} id={id} type={type} data={data} />
				})}
			</Row>
		</div>
	)
}
