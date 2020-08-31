import React, { useState } from 'react'
import styled from 'styled-components'
import { FiMoreHorizontal } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { RiFileCopyLine, RiShareBoxFill, RiPencilLine, RiDeleteBinLine, RiCloseCircleLine } from 'react-icons/ri'
import { Row, Typography, Avatar } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'

import { routeHistory } from '../../app/App'
import keys from '../../config/keys'
import { str } from '../../app/routes'

interface CProps {
	id: string | number
	title: string
	thumbnail: string | undefined
	type: string
}

export function ElementCard(props: CProps) {
	const [showActions, setShowActions] = useState(false)
	const { id, title, type, thumbnail } = props

	const handleClick = (e: any, action: string) => {
		e.stopPropagation()
		console.log('Action:', action)
		switch (action) {
			case 'navigate':
				routeHistory.push(`/editor/${type}/${keys.viewAction}/${id}`)
				return
			case 'toggle':
				setShowActions(!showActions)
				return
			case 'copy':
				console.log('copy action!')
				return
			case 'share':
				console.log('share action!')
				return
			case 'edit':
				routeHistory.push(`/editor/${type}/${keys.editAction}/${id}`)
				return
			case 'delete':
				console.log('delete action!')
				return
			default:
				routeHistory.push(`/editor/${type}/${keys.viewAction}/${id}`)
				return
		}
	}

	return (
		<>
			<Container onClick={(e) => handleClick(e, 'navigate')}>
				<ActionsContainer justify='end'>
					{showActions ? (
						<ActionsWrapper>
							<ActionItem>
								<RiFileCopyLine size={25} onClick={(e) => handleClick(e, 'copy')} />
							</ActionItem>
							<ActionItem>
								<RiShareBoxFill size={25} onClick={(e) => handleClick(e, 'share')} />
							</ActionItem>
							<ActionItem>
								<RiPencilLine size={25} onClick={(e) => handleClick(e, 'edit')} />
							</ActionItem>
							<ActionItem>
								<RiDeleteBinLine size={25} onClick={(e) => handleClick(e, 'delete')} />
							</ActionItem>
							<ActionItem>
								<RiCloseCircleLine size={25} onClick={(e) => handleClick(e, 'toggle')} />
							</ActionItem>
						</ActionsWrapper>
					) : (
						<MoreButton onClick={(e) => handleClick(e, 'toggle')} size={30} />
					)}
				</ActionsContainer>

				<div>
					<Avatar icon={<FileImageOutlined />} size={100} src={thumbnail} style={{ border: '1px solid #eee' }} />
				</div>

				<Row align='middle' justify='center' style={{ height: 55 }}>
					<Title level={4} ellipsis={{ rows: 2 }}>
						<span onClick={(e) => handleClick(e, 'navigate')}>{title}</span>
					</Title>
				</Row>
			</Container>
		</>
	)
}

const Container = styled.div`
	align-items: center;
	border: 2px solid #eee;
	border-radius: 3px;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	height: 260px;
	justify-content: space-between;
	margin-right: 30px;
	margin-bottom: 30px;
	padding: 15px;
	width: 260px;
	&:hover {
		box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
	}
`
const MoreButton = styled(FiMoreHorizontal)`
	cursor: pointer;
	margin-top: -10px;
`
const ActionsContainer = styled(Row)`
	height: 30px;
	width: 100%;
`
const ActionsWrapper = styled.div`
	align-items: center;
	display: flex;
	justify-content: flex-end;
	height: 100%;
	width: 100%;
`
const ActionItem = styled.span`
	cursor: pointer;
	padding: 0 5px;
`
const Title = styled(Typography.Title)`
	cursor: pointer;
	margin: 0;
	text-align: center;
	&:hover {
		text-decoration: underline;
	}
`

export default ElementCard

export function AddElementCard(props: { type: string }) {
	const { type } = props
	return (
		<Container onClick={() => routeHistory.push(`/editor/${type}/${keys.createAction}`)}>
			<Row align='middle' justify='center' style={{ height: '100%' }}>
				<GoPlus size={100} />
				<Title level={3} ellipsis={{ rows: 2 }}>
					Create New {str(type)}
				</Title>
			</Row>
		</Container>
	)
}
