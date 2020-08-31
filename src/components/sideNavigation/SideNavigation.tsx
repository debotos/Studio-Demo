import React, { useState } from 'react'
import styled from 'styled-components'
import { Typography, Empty, Button } from 'antd'
import { FiPlus, FiChevronUp, FiChevronDown } from 'react-icons/fi'
import { CgShapeCircle, CgCheck } from 'react-icons/cg'
import { GoPrimitiveDot } from 'react-icons/go'

import { routeHistory } from '../../app/App'
import keys from '../../config/keys'

interface CProps {
	close: () => void
	headerHeight: number
}

export function SideNavigation(props: CProps) {
	const subjectIsSelected = true
	if (!subjectIsSelected) {
		return (
			<EmptyContainer headerHeight={props.headerHeight || 65}>
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={<span>No subject is currently selected. You have to select a subject first!</span>}
				>
					<Button size='small' type='primary' onClick={() => routeHistory.push('/editor/subject')}>
						See all subjects
					</Button>
				</Empty>
			</EmptyContainer>
		)
	}
	const levels = Array(10).fill(0) || []
	return (
		<Container>
			<Title className='hide-native-scrollbar'>English Content</Title>
			<Content className='hide-native-scrollbar' headerHeight={props.headerHeight || 65}>
				{levels.length > 0 ? (
					levels.map((_, index) => <Level key={index} index={index + 1} />)
				) : (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No level is created under this subject.</span>}>
						<Button size='small' type='primary' onClick={() => routeHistory.push(`/editor/level/${keys.createAction}`)}>
							Create a new level
						</Button>
					</Empty>
				)}
			</Content>
		</Container>
	)
}

const titleHeight = 35
const Container: any = styled.div`
	height: 100%;
	width: 100%;
	margin-top: -2px; /* To hide the bottom border of SideNavigation Header */
`
const EmptyContainer: any = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	margin-top: ${(props: any) => `${-props.headerHeight + 'px'}`};
	padding: 20px;
`
const Title = styled.div`
	background-color: #252322e3;
	color: #fff;
	font-size: 20px;
	font-weight: 500;
	height: ${titleHeight + 'px'};
	overflow-x: scroll;
	padding: 0 15px;
	text-align: center;
	white-space: nowrap;
`
const Content: any = styled.div`
	height: ${(props: any) => `calc(100vh - ${props.headerHeight + titleHeight + 'px'})`};
	overflow-y: scroll;
`

function Level(props: any) {
	const [expand, setExpand] = useState(false)

	const { index } = props

	return (
		<>
			<LevelItem active={index === 1 && 'true'}>
				<div style={{ flex: 1 }}>
					<Typography.Title level={4} ellipsis={{ rows: 2 }}>
						Grade 1: The Joy of English
					</Typography.Title>
					<Typography.Text>100 Units | 700 Exercises</Typography.Text>
				</div>
				<LevelActionContainer>
					<LevelAction onClick={() => setExpand(!expand)}>
						{expand ? <FiChevronUp size={25} /> : <FiChevronDown size={25} />}
					</LevelAction>
					<LevelAction className='side-nav-unit-add-action' style={{ display: 'none' }}>
						<FiPlus size={20} onClick={() => routeHistory.push(`/editor/unit/${keys.createAction}`)} />
					</LevelAction>
				</LevelActionContainer>
			</LevelItem>
			{expand && (
				<UnitContainer>
					{Array(10)
						.fill(0)
						.map((_, index) => (
							<Unit key={index} index={index + 1} />
						))}
				</UnitContainer>
			)}
		</>
	)
}

const LevelItem: any = styled.div`
	display: flex;
	border-left: ${(props: any) => props.active === 'true' && '5px solid lime'};
	border-bottom: 2px solid #eee;
	justify-content: space-between;
	padding: 15px;
	&:hover {
		.side-nav-unit-add-action {
			display: block !important;
		}
	}
`
const LevelActionContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 55px;
	width: 25px;
`
const LevelAction = styled.div`
	cursor: pointer;
	text-align: center;
`
const UnitContainer = styled.div`
	border-bottom: 2px solid #eee;
	padding: 15px;
`

function Unit(props: any) {
	const { index } = props
	return (
		<>
			<UnitItem>
				<div style={{ flex: 1 }}>
					<Typography.Title level={5} ellipsis={{ rows: 2 }} style={{ fontSize: 16 }}>
						<UnitLabel active={index === 1 && 'true'}>Unit 1:</UnitLabel>&nbsp; Demonstrative Pronounce 1
					</Typography.Title>
				</div>
				<UnitAction className='side-nav-lesson-add-action'>
					<FiPlus onClick={() => routeHistory.push(`/editor/lesson/${keys.createAction}`)} style={{ marginTop: 2 }} size={20} />
				</UnitAction>
			</UnitItem>
			<LessonContainer>
				{Array(10)
					.fill(0)
					.map((_, index) => (
						<Lesson key={index} index={index + 1} id={index} />
					))}
			</LessonContainer>
		</>
	)
}

const UnitItem = styled.div`
	display: flex;
	padding: 5px;
	&:hover {
		.side-nav-lesson-add-action {
			display: block !important;
		}
	}
`
const UnitLabel: any = styled.span`
	color: ${(props: any) => props.active === 'true' && 'lime'};
`
const UnitAction = styled.div`
	display: none;
	cursor: pointer;
	width: 25px;
	text-align: center;
`
const LessonContainer = styled.div`
	padding-left: 30px;
`

function Lesson(props: any) {
	const { index, id } = props

	const getIcon = () => {
		if (index < 5) {
			return <CgCheck color={'lime'} size={30} />
		} else if (index < 6) {
			return <CgShapeCircle color={'lime'} size={20} />
		} else {
			return <GoPrimitiveDot color={'#929eaa'} size={20} />
		}
	}
	return (
		<>
			<LessonItem>
				<span style={{ minWidth: 30, textAlign: 'center' }}>{getIcon()}</span>
				<LessonLabel
					active={index === 5 ? 'true' : 'false'}
					completed={index < 5 ? 'true' : 'false'}
					level={5}
					ellipsis={{ rows: 2 }}
					onClick={() => routeHistory.push(`/editor/lesson/${keys.viewAction}/${id}`)}
				>
					Skip - counting stories
				</LessonLabel>
			</LessonItem>
		</>
	)
}

const LessonItem = styled.div`
	align-items: center;
	display: flex;
	padding: 0;
`
const LessonLabel: any = styled(Typography.Title)`
	cursor: pointer;
	color: ${(props: any) => props.active === 'true' && 'lime !important'};
	opacity: ${(props: any) => (props.completed === 'true' || props.active === 'true' ? 1 : 0.5)};
	font-size: 15px;
	font-weight: 500;
	margin: 0;
	margin-left: 5px;
	&:hover {
		text-decoration: underline;
	}
`
