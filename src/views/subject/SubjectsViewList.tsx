import React from 'react'
import { Row, Typography } from 'antd'

import { ElementCard } from '../../components/card/ElementCard'

export default function SubjectsViewList() {
	const recentUpdatedSubjects = Array(4).fill(0)
	const subjects = Array(10).fill(0)
	return (
		<div>
			<Typography.Title level={2}>Recently updated...</Typography.Title>
			<Row>
				{recentUpdatedSubjects.map((subject, index) => (
					<ElementCard key={index} id={index} />
				))}
			</Row>
			<br />
			<Typography.Title level={2}>Create new subject</Typography.Title>
			<Row>
				{subjects.map((subject, index) => (
					<ElementCard key={index} id={index} />
				))}
			</Row>
		</div>
	)
}
