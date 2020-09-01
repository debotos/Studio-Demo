import React, { useState } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Typography, Empty, Button } from 'antd'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
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
			<SubjectTitle className='hide-native-scrollbar'>English Content</SubjectTitle>
			<Content className='hide-native-scrollbar' headerHeight={props.headerHeight || 65}>
				{levels.length > 0 ? (
					levels.map((_, index) => <Level key={index} index={index + 1} id={index + 1} />)
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
const SubjectTitle = styled.div`
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

function LevelComponent(props: any) {
	const { id, location } = props

	const checkActive = () => {
		// Also have to check parentID and expand parent too
		// For that have to integrate redux
		const { pathname } = location
		if (pathname.includes(`/editor/level/${keys.viewAction}/${id}`)) {
			return true
		}
		return false
	}

	const [expand, setExpand] = useState(checkActive())

	return (
		<>
			<LevelItem>
				<div style={{ flex: 1 }}>
					<LevelTitle
						level={4}
						ellipsis={{ rows: 2 }}
						onClick={() => routeHistory.push(`/editor/level/${keys.viewAction}/${id}`)}
					>
						Grade 1: The Joy of English
					</LevelTitle>
					<Typography.Text>100 Units | 700 Exercises</Typography.Text>
				</div>
				<LevelActionContainer>
					<LevelAction onClick={() => setExpand(!expand)}>
						{expand ? <FiChevronUp size={25} /> : <FiChevronDown size={25} />}
					</LevelAction>
				</LevelActionContainer>
			</LevelItem>
			{expand && (
				<UnitContainer>
					{Array(10)
						.fill(0)
						.map((_, index) => (
							<Unit key={index} index={index + 1} id={index + 1} />
						))}
				</UnitContainer>
			)}
		</>
	)
}

const Level = withRouter(LevelComponent)

const LevelItem: any = styled.div`
	display: flex;
	border-left: ${(props: any) => props.active === 'true' && '5px solid lime'};
	border-bottom: 2px solid #eee;
	justify-content: space-between;
	padding: 15px;
	&:hover {
		background-color: lightcyan;
	}
`
const LevelTitle: any = styled(Typography.Title)`
	cursor: pointer;
	&:hover {
		text-decoration: underline;
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
	padding: 5px 0;
`

function UnitComponent(props: any) {
	const { index, id, location } = props

	const checkActive = () => {
		// Also have to check parentID and expand parent too
		// For that have to integrate redux
		const { pathname } = location
		if (pathname.includes(`/editor/unit/${keys.viewAction}/${id}`)) {
			return true
		}
		return false
	}

	const [expand, setExpand] = useState(checkActive())

	return (
		<>
			<UnitItem>
				<UnitTitle level={5} ellipsis={{ rows: 2 }} onClick={() => routeHistory.push(`/editor/unit/${keys.viewAction}/${id}`)}>
					<UnitLabel>Unit {index}:</UnitLabel>&nbsp; Demonstrative Pronounce {index}
				</UnitTitle>

				<UnitAction onClick={() => setExpand(!expand)}>
					{expand ? <FiChevronUp size={25} /> : <FiChevronDown size={25} />}
				</UnitAction>
			</UnitItem>
			{expand && (
				<LessonContainer>
					{Array(10)
						.fill(0)
						.map((_, index) => (
							<Lesson key={index} index={index + 1} id={index + 1} />
						))}
				</LessonContainer>
			)}
		</>
	)
}

const Unit = withRouter(UnitComponent)

const UnitItem = styled.div`
	display: flex;
	align-items: center;
	margin: 0;
	padding: 10px 15px;
	&:hover {
		background-color: lightcyan;
	}
`
const UnitTitle: any = styled(Typography.Title)`
	cursor: pointer;
	flex: 1;
	font-size: 16px;
	margin: 0 !important;
	&:hover {
		text-decoration: underline;
	}
`
const UnitLabel: any = styled.span`
	color: ${(props: any) => props.active === 'true' && 'lime'};
`
const UnitAction = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`
const LessonContainer = styled.div``

function LessonComponent(props: any) {
	const { index, id, location } = props

	const getIcon = () => {
		if (checkActive()) {
			return <CgShapeCircle color={'lime'} size={20} />
		} else if (index < 5) {
			return <CgCheck color={'lime'} size={25} />
		} else {
			return <GoPrimitiveDot color={'#929eaa'} size={20} />
		}
	}

	const checkActive = () => {
		// Also have to check parentID and expand parent too
		// For that have to integrate redux
		const { pathname } = location
		if (pathname.includes(`/editor/lesson/${keys.viewAction}/${id}`)) {
			return true
		}
		return false
	}

	return (
		<>
			<LessonItem>
				<LessonIcon>{getIcon()}</LessonIcon>
				<LessonLabel
					active={checkActive().toString()}
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

const Lesson = withRouter(LessonComponent)

const LessonItem = styled.div`
	align-items: center;
	display: flex;
	padding: 5px 0;
	padding-left: 37px;
	&:hover {
		background-color: lightcyan;
	}
`
const LessonLabel: any = styled(Typography.Title)`
	cursor: pointer;
	color: ${(props: any) => props.active === 'true' && 'lime !important'};
	opacity: ${(props: any) => (props.completed === 'true' || props.active === 'true' ? 1 : 0.5)};
	font-size: 15px;
	font-weight: 500;
	margin: 0 !important;
	margin-left: 5px;
	&:hover {
		text-decoration: underline;
	}
`
const LessonIcon = styled.span`
	align-items: center;
	display: flex;
	min-width: 30px;
	justify-content: center;
`
