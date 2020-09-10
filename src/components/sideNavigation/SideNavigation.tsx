import React, { useState, useEffect } from 'react'
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
import { setActiveItems } from '../../redux/slices/activeItemsSlice'
import { setTreeData } from '../../redux/slices/treeDataSlice'
import { genTreeKey, isEmpty } from '../../utils/helpers'
import { routeHistory } from '../../app/App'
import * as dummyDataProvider from '../../utils/dummyData'
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
		const val = !nav
		dispatch(setSettings({ sideNav: val }))
		localStorage.setItem(keys.sideNav, val.toString())
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

	const goHome = () => routeHistory.push('/')

	return (
		<NavigationDrawerHeadContainer align='middle' justify='space-between'>
			<Row align='middle'>
				<AppLogo src={Logo} alt='Ezilm Studio' onClick={goHome} style={{ marginLeft: -10 }} />
				<Divider />
				<Title onClick={goHome}>EZILM Studio</Title>
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
	const dispatch: AppDispatch = useDispatch()
	const subject = useSelector((state: RootState) => state.activeItems.subject)
	const subjectID = subject ? subject.id : ''
	const levels = useSelector((state: RootState) => state.treeData[genTreeKey('subject', subjectID)])

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = async () => {
		if (isEmpty(levels)) {
			// TODO: Get all the levels under this specific subject via ajax
			dispatch(setTreeData({ type: 'subject', id: subjectID, data: dummyDataProvider.getLevelsByParentID(subjectID) }))
		}
	}

	if (isEmpty(subject)) {
		return (
			<EmptyContainer nav={nav}>
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={<span>No subject is currently selected. You have to select a subject first!</span>}
				>
					<Button size='small' type='primary' onClick={() => routeHistory.push('/editor/subjects')}>
						Select a subject
					</Button>
				</Empty>
			</EmptyContainer>
		)
	}

	const title = subject.title || ''

	return (
		<Container>
			<SubjectTitle className='hide-native-scrollbar' nav={nav} onClick={() => routeHistory.push('/editor/subjects')}>
				{title}
			</SubjectTitle>
			<Content className='hide-native-scrollbar' nav={nav}>
				{!isEmpty(levels) ? (
					levels.map((level: any, index: number) => <Level key={index} data={level} subjectTitle={title} />)
				) : (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No level is created under this subject.</span>}>
						<Button
							size='small'
							type='primary'
							onClick={() =>
								routeHistory.push(
									`/editor/level/${keys.createAction}?subjectID=${subjectID}&subjectTitle=${encodeURIComponent(title)}`
								)
							}
						>
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
	cursor: pointer;
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
	// Vars
	const { data, location, subjectTitle } = props
	const { pathname } = location
	const { id, subjectID, title, unitCount, lessonCount } = data
	const path = `/editor/${subjectID}/levels/${keys.viewAction}/${id}`
	const checkActive = () => {
		if (pathname.includes(`${id}`)) return true
		return false
	}

	// State Hooks & vars
	const dispatch: AppDispatch = useDispatch()
	const level = useSelector((state: RootState) => state.activeItems.level)
	const units = useSelector((state: RootState) => state.treeData[genTreeKey('level', id)])
	const [expand, setExpand] = useState(checkActive())

	useEffect(() => {
		if (isEmpty(level)) {
			dispatch(setActiveItems({ level: data }))
		}
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		setExpand(checkActive())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	// Functions
	const getData = async () => {
		if (isEmpty(units)) {
			// TODO: Get all the units under this specific level via ajax
			dispatch(setTreeData({ type: 'level', id, data: dummyDataProvider.getUnitsByParentID(id) }))
		}
	}

	return (
		<>
			<LevelItem active={checkActive().toString()}>
				<div style={{ flex: 1 }}>
					<LevelTitle level={4} ellipsis={{ rows: 2 }} onClick={() => routeHistory.push(path)}>
						{title}
					</LevelTitle>
					<Typography.Text>
						{unitCount} Units | {lessonCount} Exercises
					</Typography.Text>
				</div>
				<LevelActionContainer>
					<LevelAction onClick={() => setExpand(!expand)}>
						{expand ? <FiChevronUp size={25} /> : <FiChevronDown size={25} />}
					</LevelAction>
				</LevelActionContainer>
			</LevelItem>
			{expand && (
				<UnitContainer>
					{!isEmpty(units) ? (
						units.map((unit: any, index: number) => (
							<Unit key={index} data={unit} subjectTitle={subjectTitle} levelTitle={title} />
						))
					) : (
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No unit is created under this level.</span>}>
							<Button
								size='small'
								type='primary'
								onClick={() =>
									routeHistory.push(
										`/editor/unit/${keys.createAction}?levelID=${id}&levelTitle=${encodeURIComponent(
											title
										)}&subjectID=${subjectID}`
									)
								}
							>
								Create a new unit
							</Button>
						</Empty>
					)}
				</UnitContainer>
			)}
		</>
	)
}
const Level = withRouter(LevelComponent)

const LevelItem: any = styled.div`
	display: flex;
	background-color: ${(props: any) => props.active === 'true' && 'lightcyan'};
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
	padding: 0;
`

/* Side Navigation Unit */
function UnitComponent(props: any) {
	// Vars
	const { data, location, levelTitle, subjectTitle } = props
	const { pathname } = location
	const { id, subjectID, levelID, title } = data
	const path = `/editor/${subjectID}/${levelID}/units/${keys.viewAction}/${id}`
	const checkActive = () => {
		if (pathname.includes(`${id}`)) return true
		return false
	}

	// State Hooks & vars
	const dispatch: AppDispatch = useDispatch()
	const unit = useSelector((state: RootState) => state.activeItems.unit)
	const lessons = useSelector((state: RootState) => state.treeData[genTreeKey('unit', id)])
	const [expand, setExpand] = useState(checkActive())

	useEffect(() => {
		if (isEmpty(unit)) {
			dispatch(setActiveItems({ unit: data }))
		}
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		setExpand(checkActive())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	// Functions
	const getData = async () => {
		if (isEmpty(lessons)) {
			// TODO: Get all the lessons under this specific unit via ajax
			dispatch(setTreeData({ type: 'unit', id, data: dummyDataProvider.getLessonsByParentID(id) }))
		}
	}

	return (
		<>
			<UnitItem active={checkActive().toString()}>
				<UnitTitle level={5} ellipsis={{ rows: 2 }} onClick={() => routeHistory.push(path)}>
					{title}
				</UnitTitle>

				<UnitAction onClick={() => setExpand(!expand)}>
					{expand ? <FiChevronUp size={25} /> : <FiChevronDown size={25} />}
				</UnitAction>
			</UnitItem>
			{expand && (
				<LessonContainer>
					{!isEmpty(lessons) ? (
						lessons.map((lesson: any, index: number) => <Lesson key={index} data={lesson} />)
					) : (
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No lesson is created under this unit.</span>}>
							<Button
								size='small'
								type='primary'
								onClick={() =>
									routeHistory.push(
										`/editor/unit/${keys.createAction}?unitID=${id}&unitTitle=${encodeURIComponent(
											title
										)}&levelID=${id}&levelTitle=${encodeURIComponent(
											levelTitle
										)}&subjectID=${subjectID}&subjectTitle=${encodeURIComponent(subjectTitle)}`
									)
								}
							>
								Create a new lesson
							</Button>
						</Empty>
					)}
				</LessonContainer>
			)}
		</>
	)
}
const Unit = withRouter(UnitComponent)

const UnitItem: any = styled.div`
	align-items: center;
	background-color: ${(props: any) => props.active === 'true' && 'lightcyan'};
	display: flex;
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
const UnitAction = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`
const LessonContainer = styled.div`
	margin: 0;
`

/* Side Navigation Lesson */
function LessonComponent(props: any) {
	const { data, location } = props
	const { pathname } = location
	const { id, title, subjectID, levelID, unitID, published } = data
	const path = `/editor/${subjectID}/${levelID}/${unitID}/lessons/${keys.viewAction}/${id}`

	const getIcon = () => {
		if (checkActive()) {
			return <CgShapeCircle color={'lime'} size={20} />
		} else if (published) {
			return <CgCheck color={'lime'} size={25} />
		} else {
			return <GoPrimitiveDot color={'#929eaa'} size={20} />
		}
	}

	const checkActive = () => {
		if (pathname.includes(`${id}`)) return true
		return false
	}

	return (
		<>
			<LessonItem active={checkActive().toString()}>
				<LessonIcon>{getIcon()}</LessonIcon>
				<LessonLabel
					active={checkActive().toString()}
					published={published.toString()}
					level={5}
					ellipsis={{ rows: 2 }}
					onClick={() => routeHistory.push(path)}
				>
					{title}
				</LessonLabel>
			</LessonItem>
		</>
	)
}
const Lesson = withRouter(LessonComponent)

const LessonItem: any = styled.div`
	align-items: center;
	background-color: ${(props: any) => props.active === 'true' && 'lightcyan'};
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
	opacity: ${(props: any) => (props.published === 'true' || props.active === 'true' ? 1 : 0.5)};
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
