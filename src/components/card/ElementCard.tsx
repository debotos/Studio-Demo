import React, { useState } from 'react'
import { RiFileCopyLine, RiShareBoxFill, RiPencilLine, RiDeleteBinLine, RiCloseCircleLine } from 'react-icons/ri'
import { Row, Typography, Avatar } from 'antd'
import styled from 'styled-components'
import { FiMoreHorizontal } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { useDispatch } from 'react-redux'
import { FileImageOutlined } from '@ant-design/icons'

import { routeHistory } from '../../app/App'
import keys from '../../config/keys'
import { AppDispatch } from '../../redux/store'
import { capitalize, getElementCardRoute } from '../../utils/helpers'
import { setActiveItems } from '../../redux/slices/activeItemsSlice'
import vars from '../../config/vars'

interface CProps {
	data: {
		id: string | number
		type: string
		title: string
		thumbnail?: string
	}
	variation?: 'slide' | 'normal'
	provided?: any
}

export function ElementCard(props: CProps) {
	const dispatch: AppDispatch = useDispatch()
	const { data, variation = 'normal', provided = {} } = props
	const { innerRef, draggableProps = {}, dragHandleProps = {} } = provided
	const { viewRoute, editRoute } = getElementCardRoute(data)
	const { id, type, title, thumbnail } = data

	const [showActions, setShowActions] = useState(false)

	const setAsActive = () => dispatch(setActiveItems({ [type]: data }))

	const handleClick = (e: any, action: string) => {
		e.stopPropagation()
		console.log(`'${action}' action for '${type}' with id '${id}'`)
		switch (action) {
			case 'navigate':
				setAsActive()
				viewRoute && routeHistory.push(viewRoute)
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
				editRoute && routeHistory.push(editRoute)
				return
			case 'delete':
				console.log('delete action!')
				return
			default:
				setAsActive()
				viewRoute && routeHistory.push(viewRoute)
				return
		}
	}

	const cardActions = (
		<ActionsContainer justify='end' className={`app-element-card-actions-container${showActions ? ' active' : ''}`}>
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
				<MoreButton onClick={(e) => handleClick(e, 'toggle')} size={30} className='app-element-card-actions-more' />
			)}
		</ActionsContainer>
	)

	if (variation === 'slide') {
		return (
			<SlideCardWrapper ref={innerRef} {...draggableProps} {...dragHandleProps} onClick={(e: any) => handleClick(e, 'navigate')}>
				<SlideCardImageContainer>
					<SlideCardActionsWrapper>{cardActions}</SlideCardActionsWrapper>
					<SlideImage src={thumbnail} alt={title} />
				</SlideCardImageContainer>
				<Row align='middle' justify='center' style={{ height: 35 }}>
					<Title level={4} ellipsis={{ rows: 2 }}>
						<span onClick={(e) => handleClick(e, 'navigate')}>{title}</span>
					</Title>
				</Row>
			</SlideCardWrapper>
		)
	}

	return (
		<>
			<Container ref={innerRef} {...draggableProps} {...dragHandleProps} onClick={(e: any) => handleClick(e, 'navigate')}>
				{cardActions}
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

export default React.memo(ElementCard)

const Container = styled.div`
	align-items: center;
	background: #fff;
	border: 2px solid #eee;
	border-radius: 3px;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	height: ${vars.elementCardHeight + 'px'};
	justify-content: space-between;
	margin-right: 30px;
	margin-bottom: 30px;
	padding: 15px;
	width: ${vars.elementCardWidth + 'px'};
	&:hover {
		box-shadow: ${vars.appBoxShadow};
	}
`
const SlideCardWrapper = styled.div`
	align-items: center;
	background: #fff;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	margin-right: 30px;
	margin-bottom: 15px;
	min-width: ${vars.slideCardWidth + 'px'};
	max-width: ${vars.slideCardWidth + 'px'};
	h4 {
		margin-top: 5px;
		font-size: 12px;
		font-weight: 500;
		opacity: 0.8;
	}
	&:hover {
		text-decoration: underline;
	}
`
const SlideCardImageContainer = styled.div`
	min-height: ${vars.slideCardImageHeight + 'px'};
	max-height: ${vars.slideCardImageHeight + 'px'};
	position: relative;
	width: 100%;
	&:hover {
		box-shadow: ${vars.appBoxShadow};
	}
`
const SlideImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: fill;
`
const SlideCardActionsWrapper = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	.app-element-card-actions-container {
		color: #fff;
		height: 100%;
		padding: 10px;
		width: 100%;
		transition: all 0.3s ease-in-out;
		.app-element-card-actions-more {
			background: #47525dcf;
			border-radius: 100%;
			box-shadow: ${vars.appBoxShadow};
			margin-top: -5px;
			margin-right: -4px;
			padding: 2px;
		}
	}
	.app-element-card-actions-container.active {
		background: #47525dba;
	}
`
const MoreButton = styled(FiMoreHorizontal)`
	cursor: pointer;
	margin-top: -10px;
	&:hover {
		opacity: 0.7;
	}
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
	&:hover {
		opacity: 0.7;
	}
`
const Title = styled(Typography.Title)`
	cursor: pointer;
	margin: 0;
	text-align: center;
	&:hover {
		text-decoration: underline;
	}
`

export function AddElementCard(props: { type: string; routeSuffix?: string }) {
	const { type, routeSuffix = '' } = props

	const handleClick = () => routeHistory.push(`/editor/${type}/${keys.createAction}${routeSuffix}`)

	const getContent = (level: 3 | 5 | 1 | 2 | 4 | undefined = 3, iconSize = 130, rows = 2) => (
		<AddElementCardContent>
			<div>
				<GoPlus size={iconSize} />
			</div>
			<Title level={level} ellipsis={{ rows }}>
				Create New {capitalize(type)}
			</Title>
		</AddElementCardContent>
	)

	if (type === 'slide') {
		return <SlideAddElementCard onClick={handleClick}>{getContent(5, 70)}</SlideAddElementCard>
	}
	return <Container onClick={handleClick}>{getContent()}</Container>
}

const SlideAddElementCard = styled(SlideCardWrapper)`
	border: 2px solid #eee;
	min-height: ${vars.slideCardImageHeight + 'px'};
	max-height: ${vars.slideCardImageHeight + 'px'};
	&:hover {
		box-shadow: ${vars.appBoxShadow};
	}
`
const AddElementCardContent = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-around;
`
