import React from 'react'
import { Row, Col, Card, Statistic, Button } from 'antd'

import { capitalize } from '../../utils/helpers'
import { routeHistory } from '../../app/App'

const statistics = [
	{ type: 'subject', total: 10 },
	{ type: 'level', total: 100 },
	{ type: 'unit', total: 1000 },
	{ type: 'lesson', total: 10000 },
	{ type: 'slide', total: 100000 },
]

export default function Dashboard() {
	return (
		<div>
			<Row gutter={[24, 24]}>
				{statistics.map((item: any, index: number) => {
					const { type, total } = item
					const title = `Total ${capitalize(type)}s`

					return (
						<Col key={index} xs={24} sm={12} md={8}>
							<Card>
								<Statistic title={title} value={total} />
								<Button onClick={() => routeHistory.push(`/editor/${type}s`)} style={{ padding: 0 }} type='link'>
									View all {type}s
								</Button>
							</Card>
						</Col>
					)
				})}
			</Row>
		</div>
	)
}
