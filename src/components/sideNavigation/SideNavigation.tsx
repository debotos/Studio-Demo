import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Empty, Button, Row, Affix } from 'antd'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import { CgShapeCircle, CgCheck } from 'react-icons/cg'
import { GoPrimitiveDot } from 'react-icons/go'
import { PushpinTwoTone, PushpinOutlined } from '@ant-design/icons'

import Logo from '../../assets/logo/ezilm-blue-logo.png'
import { AppDispatch, RootState } from '../../redux/store'
import { AppLogo, Divider, Title } from '../header/Header'
import { setSettings } from '../../redux/slices/settingsSlice'
import { routeHistory } from '../../app/App'
import keys from '../../config/keys'
import vars from '../../config/vars'

const { headerHeight, sideNavWidth } = vars

/* Main Side Navigation */
interface CProps {}
export function SideNavigation(props: CProps) {
	const dispatch: AppDispatch = useDispatch()
	const nav = useSelector((state: RootState) => state.settings.sideNav)

	const handleMouseAction = () => {
		if (nav === 'pinned') return
		dispatch(setSettings({ sideNav: !nav }))
	}

	const getDrawerStyle = () => {
		if (nav === 'pinned') return {}
		return { transform: nav ? 'translateX(0)' : 'translateX(-100%)' }
	}

	const sideNavElement = (
		<>
			{/* Side Navigation Drawer for Tree View */}
			{nav !== 'pinned' && <HoverAreaToOpenNavigationDrawer onMouseEnter={handleMouseAction} />}
			<NavigationDrawer nav={nav.toString()} onMouseLeave={handleMouseAction} style={getDrawerStyle()}>
				{/* Navigation Drawer Header */}
				<NavigationDrawerHead />
				{/* Navigation Drawer Body */}
				<NavigationDrawerBody>
					<NavigationDrawerBodyContent nav={nav.toString()} />
				</NavigationDrawerBody>
			</NavigationDrawer>
		</>
	)

	return nav === 'pinned' ? <Affix offsetTop={0}>{sideNavElement}</Affix> : sideNavElement
}
export default SideNavigation

const PinAction: any = styled.span`
	align-items: center;
	border: 1px solid #eee;
	border-radius: 50%;
	background-color: ${(props: any) => props.pinned === 'pinned' && '#eee'};
	cursor: pointer;
	display: flex;
	font-size: 20px;
	height: 35px;
	justify-content: center;
	width: 35px;
	&:hover {
		background-color: #eee;
	}
`
const HoverAreaToOpenNavigationDrawer = styled.div`
	width: 10px;
	height: 100vh;
	position: fixed;
	z-index: 998; /* Ratio with NavigationDrawer */
	top: 0;
	left: 0;
	bottom: 0;
	background-color: transparent;
`
const NavigationDrawer: any = styled.div`
	background-color: #fff;
	height: 100%;
	min-height: 100vh;
	transition: transform 0.3s ease-out;
	width: ${sideNavWidth + 'px'};
	min-width: ${sideNavWidth + 'px'};
	max-width: ${sideNavWidth + 'px'};
	${(props: any) =>
		props.nav !== 'pinned' &&
		css`
			box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
			left: 0;
			position: fixed;
			top: 0;
			z-index: 999; /* Greater than all other custom element except 'LoadingOverlay' but lower than antd elements  */
		`}
`
const NavigationDrawerBody: any = styled.div`
	height: calc(100vh - ${headerHeight + 'px'});
	padding: 0 0;
	width: 100%;
`

/* Side Navigation Head */
export function NavigationDrawerHead(props: any) {
	const dispatch: AppDispatch = useDispatch()
	const nav = useSelector((state: RootState) => state.settings.sideNav)

	const handlePinning = () => {
		if (nav === 'pinned') {
			dispatch(setSettings({ sideNav: true }))
			localStorage.setItem(keys.sideNav, 'true')
		} else {
			dispatch(setSettings({ sideNav: 'pinned' }))
			localStorage.setItem(keys.sideNav, 'pinned')
		}
	}

	return (
		<NavigationDrawerHeadContainer align='middle' justify='space-between'>
			<Row align='middle'>
				<AppLogo src={Logo} alt='Ezilm Studio' style={{ marginLeft: -10 }} />
				<Divider />
				<Title>EZILM Studio</Title>
			</Row>
			<Row align='middle'>
				<PinAction onClick={handlePinning} pinned={nav.toString()}>
					{nav === 'pinned' ? <PushpinTwoTone /> : <PushpinOutlined />}
				</PinAction>
			</Row>
		</NavigationDrawerHeadContainer>
	)
}

const NavigationDrawerHeadContainer: any = styled(Row)`
	padding: 6px 15px 6px 25px;
	width: ${sideNavWidth + 'px'};
	min-width: ${sideNavWidth + 'px'};
	max-width: ${sideNavWidth + 'px'};
`

/* Side Navigation Body Content */
function NavigationDrawerBodyContent(props: any) {
	const { nav } = props
	const subjectIsSelected = true
	if (!subjectIsSelected) {
		return (
			<EmptyContainer nav={nav}>
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={<span>No subject is currently selected. You have to select a subject first!</span>}
				>
					<Button size='small' type='primary' onClick={() => routeHistory.push('/editor/subjects')}>
						See all subjects
					</Button>
				</Empty>
			</EmptyContainer>
		)
	}
	const levels = Array(10).fill(0) || []
	return (
		<Container>
			<SubjectTitle className='hide-native-scrollbar' nav={nav}>
				English Content
			</SubjectTitle>
			<Content className='hide-native-scrollbar' nav={nav}>
				{levels.length > 0 ? (
					levels.map((_, index) => <Level key={index} index={index + 1} subjectID={1} id={index + 1} />)
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
`
const EmptyContainer: any = styled.div`
	align-items: center;
	border-top: 2px solid #eee;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	padding-top: ${-headerHeight + 'px'};
	padding: 20px;
	${(props: any) =>
		props.nav === 'pinned' &&
		css`
			border-right: 2px solid #eee;
		`}
`
const SubjectTitle: any = styled.div`
	background-color: #252322e3;
	color: #fff;
	font-size: 20px;
	font-weight: 500;
	height: ${titleHeight + 'px'};
	overflow-x: scroll;
	padding: 0 15px;
	text-align: center;
	white-space: nowrap;
	${(props: any) =>
		props.nav === 'pinned' &&
		css`
			margin-top: 2px;
		`}
`
const Content: any = styled.div`
	height: calc(100vh - ${headerHeight + titleHeight + 'px'});
	overflow-y: scroll;
	${(props: any) =>
		props.nav === 'pinned' &&
		css`
			border-right: 2px solid #eee;
		`}
`

/* Side Navigation Level */
function LevelComponent(props: any) {
	const { subjectID, id, location } = props
	const path = `/editor/${subjectID}/levels/${keys.viewAction}/${id}`

	const checkActive = () => {
		// Also have to check parentID and expand parent too
		// For that have to integrate redux
		const { pathname } = location
		if (pathname.includes(path)) {
			return true
		}
		return false
	}

	const [expand, setExpand] = useState(checkActive())

	return (
		<>
			<LevelItem>
				<div style={{ flex: 1 }}>
					<LevelTitle level={4} ellipsis={{ rows: 2 }} onClick={() => routeHistory.push(path)}>
						Grade {id}: The Joy of English
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
							<Unit key={index} index={index + 1} subjectID={subjectID} levelID={id} id={index + 1} />
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

/* Side Navigation Unit */
function UnitComponent(props: any) {
	const { index, subjectID, levelID, id, location } = props
	const path = `/editor/${subjectID}/${levelID}/units/${keys.viewAction}/${id}`

	const checkActive = () => {
		// Also have to check parentID and expand parent too
		// For that have to integrate redux
		const { pathname } = location
		if (pathname.includes(path)) {
			return true
		}
		return false
	}

	const [expand, setExpand] = useState(checkActive())

	return (
		<>
			<UnitItem>
				<UnitTitle level={5} ellipsis={{ rows: 2 }} onClick={() => routeHistory.push(path)}>
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
							<Lesson key={index} index={index + 1} subjectID={subjectID} levelID={levelID} unitID={id} id={index + 1} />
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

/* Side Navigation Lesson */
function LessonComponent(props: any) {
	const { index, id, subjectID, levelID, unitID, location } = props
	const path = `/editor/${subjectID}/${levelID}/${unitID}/lessons/${keys.viewAction}/${id}`

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
		if (pathname.includes(path)) {
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
					onClick={() => routeHistory.push(path)}
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
