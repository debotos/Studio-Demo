import React from 'react'
import { Row, Col, Card, Statistic, Button, Tooltip, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { capitalize } from '../../utils/helpers'
import { routeHistory } from '../../app/App'
import * as dummyDataProvider from '../../utils/dummyData'
import vars from '../../config/vars'
import keys from '../../config/keys'

const statistics = dummyDataProvider.getStatistics()

export default function Dashboard() {
	const onSlideAction = () => {
		message.info('Please select a lesson to add slide under it!', 5)
		routeHistory.push(`/editor/lessons`)
	}

	return (
		<Container>
			<Row gutter={[24, 24]}>
				{statistics.map((item: any, index: number) => {
					const { type, total } = item
					const title = `Total ${capitalize(type)}s`

					const goToCreate = () => {
						if (type !== 'slide') {
							routeHistory.push(`/editor/${type}/${keys.createAction}`)
						} else {
							onSlideAction()
						}
					}

					return (
						<Col key={index} xs={24} sm={12} md={8}>
							<Card>
								<div style={{ display: 'flex' }}>
									<div style={{ flex: 1 }}>
										<Statistic title={title} value={total} />
									</div>
									<div style={{ width: 25, display: 'flex', justifyContent: 'flex-end' }}>
										<Tooltip color={vars.appPrimaryColor} title={`Create new ${type}`}>
											<AddButton onClick={goToCreate} />
										</Tooltip>
									</div>
								</div>
								{type !== 'slide' ? (
									<Button onClick={() => routeHistory.push(`/editor/${type}s`)} style={{ padding: 0 }} type='link'>
										View all {type}s
									</Button>
								) : (
									<Button />
								)}
							</Card>
						</Col>
					)
				})}
			</Row>
		</Container>
	)
}

const Container = styled.div`
	margin-top: 15px;
`
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
