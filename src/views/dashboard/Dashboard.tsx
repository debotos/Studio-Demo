import React from 'react'
import { Row, Col, Card, Statistic, Button, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { capitalize } from '../../utils/helpers'
import { routeHistory } from '../../app/App'
import * as dummyDataProvider from '../../utils/dummyData'
import vars from '../../config/vars'
import keys from '../../config/keys'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'

const statistics = dummyDataProvider.getStatistics()

export default function Dashboard() {
	const breadcrumbItems: any[] = [{ name: 'Dashboard', path: '/dashboard', isLink: false }]
	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
			<Container>
				<Row gutter={[24, 24]}>
					{statistics.map((item: any, index: number) => {
						const { type, total } = item
						const title = `Total ${capitalize(type)}s`

						return (
							<Col key={index} xs={24} sm={12} md={8}>
								<Card>
									<div style={{ display: 'flex' }}>
										<div style={{ flex: 1 }}>
											<Statistic title={title} value={total} />
										</div>
										<div style={{ width: 25, display: 'flex', justifyContent: 'flex-end' }}>
											<Tooltip color={vars.appPrimaryColor} title={`Create new ${type}`}>
												<AddButton onClick={() => routeHistory.push(`/editor/${type}/${keys.createAction}`)} />
											</Tooltip>
										</div>
									</div>
									<Button onClick={() => routeHistory.push(`/editor/${type}s`)} style={{ padding: 0 }} type='link'>
										View all {type}s
									</Button>
								</Card>
							</Col>
						)
					})}
				</Row>
			</Container>
		</>
	)
}

const Container = styled.div``
const AddButton = styled(PlusOutlined)`
	align-items: center;
	display: flex;
	cursor: pointer;
	border-radius: 100%;
	font-size: 15px;
	height: 25px;
	justify-content: center;
	width: 25px;
	&:hover {
		background-color: #eee;
	}
`
