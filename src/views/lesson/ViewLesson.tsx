import React, { useEffect, useState } from 'react'
import { message, Typography, Row, Empty, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import keys from '../../config/keys'
import { routeHistory } from '../../app/App'
import { genTreeKey, isEmpty, sortByIndex } from '../../utils/helpers'
import { AppDispatch, RootState } from '../../redux/store'
import * as dummyDataProvider from '../../utils/dummyData'
import { setTreeData } from '../../redux/slices/treeDataSlice'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import { LoadingCenter } from '../../components/loading/Loading'
import { setActiveItems } from '../../redux/slices/activeItemsSlice'
import ElementCard, { AddElementCard } from '../../components/card/ElementCard'

/* View specific lesson means list of slides under it */
export default function (props: any) {
	const { match } = props
	const subjectID = match?.params?.subjectID
	const levelID = match?.params?.levelID
	const unitID = match?.params?.unitID
	const lessonID = match?.params?.id
	const activeSubjectInfo = useSelector((state: RootState) => state.activeItems.subject)
	const activeLevelInfo = useSelector((state: RootState) => state.activeItems.level)
	const activeUnitInfo = useSelector((state: RootState) => state.activeItems.unit)
	const activeLessonInfo = useSelector((state: RootState) => state.activeItems.lesson)
	const levels = useSelector((state: RootState) => state.treeData[genTreeKey('subject', subjectID)])
	const units = useSelector((state: RootState) => state.treeData[genTreeKey('level', levelID)])
	const lessons = useSelector((state: RootState) => state.treeData[genTreeKey('unit', unitID)])
	const slides = useSelector((state: RootState) => state.treeData[genTreeKey('lesson', lessonID)])
	const dispatch: AppDispatch = useDispatch()
	const [loadingData, setLoadingData] = useState(true)

	if (isEmpty(subjectID) || isEmpty(levelID) || isEmpty(unitID) || isEmpty(lessonID)) {
		message.error('Invalid lesson chosen. Please select a valid lesson!')
		return null
	}

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [window.location.pathname])

	const getData = async () => {
		setLoadingData(true)
		// TODO: Get lesson info via ajax and set
		const activeLessonData = dummyDataProvider.findLessonByID(lessonID)
		dispatch(setActiveItems({ lesson: activeLessonData }))

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
			dispatch(setTreeData({ id: lessonID, type: 'lesson', data: sortByIndex(dummyDataProvider.getSlidesByParentID(lessonID)) }))
		}
		setLoadingData(false)
	}

	const onDragEnd = (result: any) => {
		const { source, destination, draggableId } = result
		if (!destination) return
		if (destination.droppableId === source.droppableId && destination.index === source.index) return
		const itemUpdated = slides.find(({ id }: any) => id === draggableId)
		const itemAffected = slides.find(({ index }: any) => index === destination.index)
		if (!itemUpdated || !itemAffected) return

		// Update state
		const updatedSlides = slides.map((slide: any) => {
			if (slide.id === itemUpdated.id) return { ...itemUpdated, index: destination.index }
			if (slide.id === itemAffected.id) return { ...itemAffected, index: source.index }
			return slide
		})
		dispatch(setTreeData({ id: lessonID, type: 'lesson', data: sortByIndex(updatedSlides) }))
		// TODO: Ajax req to save in server
	}

	if (loadingData) {
		return <LoadingCenter msg='Data loading...' />
	}

	const addRouteSuffix = `?subjectID=${subjectID}&subjectTitle=${encodeURIComponent(
		activeSubjectInfo?.title
	)}&levelID=${levelID}&levelTitle=${encodeURIComponent(activeLevelInfo?.title)}&unitID=${unitID}&unitTitle=${encodeURIComponent(
		activeUnitInfo?.title
	)}&lessonID=${lessonID}&lessonTitle=${encodeURIComponent(activeLessonInfo?.title)}`

	if (isEmpty(slides)) {
		return (
			<Row justify='center'>
				<Row>
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No slide is created under this lesson.</span>}>
						<Button
							size='small'
							type='primary'
							onClick={() => routeHistory.push(`/editor/slide/${keys.createAction}${addRouteSuffix}`)}
						>
							Create a new slide
						</Button>
					</Empty>
				</Row>
			</Row>
		)
	}

	const breadcrumbItems: any[] = [
		{ name: 'Subjects', path: `/editor/subjects`, isLink: true },
		{ name: activeSubjectInfo.title, path: `/editor/subjects/${keys.viewAction}/${subjectID}`, isLink: true },
		{ name: activeLevelInfo.title, path: `/editor/${subjectID}/levels/${keys.viewAction}/${levelID}`, isLink: true },
		{ name: activeUnitInfo.title, path: `/editor/${subjectID}/${levelID}/units/${keys.viewAction}/${unitID}`, isLink: true },
		{ name: activeLessonInfo.title, path: ``, isLink: false },
	]

	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
			<div>
				{!isEmpty(slides) && (
					<>
						<Typography.Title level={2}>Recently updated slides...</Typography.Title>
						<Row>
							{slides.slice(0, 2).map((item: any, index: number) => {
								return <ElementCard key={index} data={item} variation='slide' />
							})}
						</Row>
						<br />
					</>
				)}
				<Typography.Title level={2}>List of slides</Typography.Title>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId={`slides-in-lesson-${lessonID}`}>
						{(provided) => (
							<Row ref={provided.innerRef} {...provided.droppableProps}>
								<AddElementCard type={'slide'} routeSuffix={addRouteSuffix} />
								{slides.map((item: any) => {
									const { index, id } = item
									return (
										<Draggable key={id} draggableId={id} index={index}>
											{(provided) => <ElementCard data={item} variation='slide' provided={provided} />}
										</Draggable>
									)
								})}
								{provided.placeholder}
							</Row>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</>
	)
}
