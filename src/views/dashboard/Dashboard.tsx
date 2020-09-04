import React from 'react'
import { Row, Col, Card, Statistic, Button } from 'antd'

import { capitalize } from '../../utils/helpers'
import { routeHistory } from '../../app/App'
import * as dummyDataProvider from '../../utils/dummyData'

const statistics = dummyDataProvider.getStatistics()

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
