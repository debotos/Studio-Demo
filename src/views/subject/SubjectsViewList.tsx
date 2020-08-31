import React from 'react'
import { Row, Typography } from 'antd'

import { ElementCard, AddElementCard } from '../../components/card/ElementCard'

const type = 'subject'

export default function SubjectsViewList() {
	const recentUpdatedSubjects = Array(4).fill(0)
	const subjects = Array(10).fill(0)
	return (
		<div>
			<Typography.Title level={2}>Recently updated...</Typography.Title>
			<Row>
				{recentUpdatedSubjects.map((subject, index) => (
					<ElementCard key={index} id={index} type={type} title={`Subject ${index}`} thumbnail='https://picsum.photos/100/100' />
				))}
			</Row>
			<br />
			<Typography.Title level={2}>Create new subject</Typography.Title>
			<Row>
				<AddElementCard type={type} />
				{subjects.map((subject, index) => (
					<ElementCard key={index} id={index} type={type} title={`Subject ${index}`} thumbnail='https://picsum.photos/100/100' />
				))}
			</Row>
		</div>
	)
}
