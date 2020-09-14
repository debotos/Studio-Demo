import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import styled from 'styled-components'
import { matchPath } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { GoScreenFull, GoScreenNormal } from 'react-icons/go'

import { AppDispatch, RootState } from '../../redux/store'
import { setActiveItems } from '../../redux/slices/activeItemsSlice'
import { setTreeData } from '../../redux/slices/treeDataSlice'
import * as dummyDataProvider from '../../utils/dummyData'
import { genTreeKey, isEmpty } from '../../utils/helpers'
import { LoadingCenter } from '../../components/loading/Loading'
import { setSettings } from '../../redux/slices/settingsSlice'
import SlideEditor from '../../components/slideEditor/SlideEditor'
import keys from '../../config/keys'

/* View specific slide means open slide editor for it */
export default function (props: any) {
	const { match } = props
	const subjectID = match?.params?.subjectID
	const levelID = match?.params?.levelID
	const unitID = match?.params?.unitID
	const lessonID = match?.params?.lessonID
	const slideID = match?.params?.id
	const activeSubjectInfo = useSelector((state: RootState) => state.activeItems.subject)
	const activeLevelInfo = useSelector((state: RootState) => state.activeItems.level)
	const activeUnitInfo = useSelector((state: RootState) => state.activeItems.unit)
	const activeLessonInfo = useSelector((state: RootState) => state.activeItems.lesson)
	const activeSlideInfo = useSelector((state: RootState) => state.activeItems.slide)
	const levels = useSelector((state: RootState) => state.treeData[genTreeKey('subject', subjectID)])
	const units = useSelector((state: RootState) => state.treeData[genTreeKey('level', levelID)])
	const lessons = useSelector((state: RootState) => state.treeData[genTreeKey('unit', unitID)])
	const slides = useSelector((state: RootState) => state.treeData[genTreeKey('lesson', lessonID)])
	const dispatch: AppDispatch = useDispatch()
	const fullScreenHandler = useFullScreenHandle()
	const [loadingData, setLoadingData] = useState(true)
	const [fullScreenBtnAlreadyClicked, setFullScreenBtnAlreadyClicked] = useState(false)

	if (isEmpty(subjectID) || isEmpty(levelID) || isEmpty(unitID) || isEmpty(lessonID) || isEmpty(slideID)) {
		message.error('Invalid slide chosen. Please select a valid slide!')
		return null
	}

	useEffect(() => {
		dispatch(setSettings({ slideEditor: true }))
		getData()
		return () => {
			dispatch(setSettings({ slideEditor: false }))
			const match = matchPath(window.location.pathname, {
				path: `/editor/:subjectID/:levelID/:unitID/:lessonID/slides/${keys.viewAction}/:id`,
			})
			const leaving = !match?.isExact
			console.log('Leaving slide editor:', leaving)
			if (leaving) {
				dispatch(setSettings({ bodyPadding: 40 }))
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [window.location.pathname])

	const getData = async () => {
		setLoadingData(true)
		// TODO: Get slide info via ajax and set
		const activeSlideData = dummyDataProvider.findSlideByID(slideID)
		dispatch(setActiveItems({ slide: activeSlideData }))

		if (isEmpty(activeSubjectInfo)) {
			// User came via direct url not via step by step navigation
			// TODO: Get parent subject info via ajax and set
			const activeSubjectData = dummyDataProvider.findSubjectByID(subjectID)
			dispatch(setActiveItems({ subject: activeSubjectData }))
		}
		if (isEmpty(activeLevelInfo)) {
			// User came via direct url not via step by step navigation
			// TODO: Get level info via ajax and set
			const activeLevelData = dummyDataProvider.findLevelByID(levelID)
			dispatch(setActiveItems({ level: activeLevelData }))
		}
		if (isEmpty(activeUnitInfo)) {
			// User came via direct url not via step by step navigation
			// TODO: Get level info via ajax and set
			const activeUnitData = dummyDataProvider.findUnitByID(unitID)
			dispatch(setActiveItems({ unit: activeUnitData }))
		}
		if (isEmpty(activeLessonInfo)) {
			// User came via direct url not via step by step navigation
			// TODO: Get lesson info via ajax and set
			const activeLessonData = dummyDataProvider.findLessonByID(lessonID)
			dispatch(setActiveItems({ lesson: activeLessonData }))
		}
		if (isEmpty(levels)) {
			// TODO: Get all the levels under this specific subject via ajax
			dispatch(setTreeData({ id: subjectID, type: 'subject', data: dummyDataProvider.getLevelsByParentID(subjectID) }))
		}
		if (isEmpty(units)) {
			// TODO: Get all the units under this specific level via ajax
			dispatch(setTreeData({ id: levelID, type: 'level', data: dummyDataProvider.getUnitsByParentID(levelID) }))
		}
		if (isEmpty(lessons)) {
			// TODO: Get all the lessons under this specific unit via ajax
			dispatch(setTreeData({ id: unitID, type: 'unit', data: dummyDataProvider.getLessonsByParentID(unitID) }))
		}
		if (isEmpty(slides)) {
			// TODO: Get all the slides under this specific unit via ajax
			dispatch(setTreeData({ id: lessonID, type: 'lesson', data: dummyDataProvider.getSlidesByParentID(lessonID) }))
		}
		setLoadingData(false)
	}

	const handleFullScreenViewer = () => {
		setFullScreenBtnAlreadyClicked(true)
		if (fullScreenHandler.active) {
			fullScreenHandler.exit()
		} else {
			fullScreenHandler.enter()
		}
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	const breadcrumbItems: any[] = [
		{ name: 'Subjects', path: `/editor/subjects`, isLink: true },
		{ name: activeSubjectInfo.title, path: `/editor/subjects/${keys.viewAction}/${subjectID}`, isLink: true },
		{ name: activeLevelInfo.title, path: `/editor/${subjectID}/levels/${keys.viewAction}/${levelID}`, isLink: true },
		{ name: activeUnitInfo.title, path: `/editor/${subjectID}/${levelID}/units/${keys.viewAction}/${unitID}`, isLink: true },
		{
			name: activeLessonInfo.title,
			path: `/editor/${subjectID}/${levelID}/${unitID}/lessons/${keys.viewAction}/${lessonID}`,
			isLink: true,
		},
		{ name: activeSlideInfo.title, path: ``, isLink: false },
	]

	const ids = { subjectID, levelID, unitID, lessonID, slideID }

	return (
		<>
			<FullScreen handle={fullScreenHandler}>
				<SlideEditor
					breadcrumbItems={breadcrumbItems}
					ids={ids}
					slides={slides}
					activeSlideInfo={activeSlideInfo}
					isFullScreen={fullScreenHandler.active}
					fullScreenBtnAlreadyClicked={fullScreenBtnAlreadyClicked}
				/>
				<FloatingButton className='app-box-shadow' onClick={handleFullScreenViewer}>
					{fullScreenHandler.active ? <GoScreenNormal size={25} /> : <GoScreenFull size={25} />}
				</FloatingButton>
			</FullScreen>
		</>
	)
}

const FloatingButton = styled.div`
	align-items: center;
	background-color: #fff;
	border-radius: 100%;
	bottom: 15px;
	cursor: pointer;
	color: #929eaa;
	display: flex;
	height: 40px;
	justify-content: space-evenly;
	right: 20px;
	position: fixed;
	padding: 0 10px;
	width: 40px;
	z-index: 99;
	&:hover {
		svg {
			opacity: 0.7;
		}
	}
`
