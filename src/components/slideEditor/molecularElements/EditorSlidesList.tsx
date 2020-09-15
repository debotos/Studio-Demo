import React from 'react'
import { Image } from 'antd'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { setActiveItems } from '../../../redux/slices/activeItemsSlice'
import { setTreeData } from '../../../redux/slices/treeDataSlice'
import { sortByIndex, truncate } from '../../../utils/helpers'
import FallbackImage from '../../../assets/fallback.png'
import { AppDispatch } from '../../../redux/store'
import { EditorPropsType } from '../SlideEditor'
import { routeHistory } from '../../../app/App'
import vars from '../../../config/vars'
import keys from '../../../config/keys'

export function EditorSlidesList(props: EditorPropsType) {
	const { slides, ids } = props
	const { subjectID, levelID, unitID, lessonID, slideID } = ids
	const dispatch: AppDispatch = useDispatch()

	const handleSlideClick = (slide: any) => {
		const { id } = slide
		const type = 'slide'
		dispatch(setActiveItems({ [type]: slide }))
		routeHistory.push(`/editor/${subjectID}/${levelID}/${unitID}/${lessonID}/${type}s/${keys.viewAction}/${id}`)
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

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId={`editor-slides-in-lesson-${lessonID}`}>
				{(provided) => (
					<Container ref={provided.innerRef} {...provided.droppableProps}>
						{slides.map((slide, i) => {
							const serial = (i + 1 + '').padStart(2, '0')
							const { id, title, thumbnail, index } = slide
							const active = id === slideID
							return (
								<Draggable key={id} draggableId={id} index={index}>
									{(provided) => (
										<SlideItem
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											active={active.toString()}
											onClick={() => handleSlideClick(slide)}
										>
											<Serial>{serial}</Serial>
											<SlideDetails>
												<ImageContainer active={active.toString()}>
													<Img src={thumbnail} alt={title} fallback={FallbackImage} preview={false} />
												</ImageContainer>
												<Title>{truncate(title, 40)}</Title>
											</SlideDetails>
										</SlideItem>
									)}
								</Draggable>
							)
						})}
						{provided.placeholder}
					</Container>
				)}
			</Droppable>
		</DragDropContext>
	)
}

const Container: any = styled.div`
	height: 100%;
	width: 100%;
`
const SlideItem: any = styled.div`
	align-items: center;
	cursor: pointer;
	display: flex;
	margin-bottom: 10px;
	transition: font-weight 0.2s ease-in-out;
	&:hover {
		p {
			text-decoration: underline;
		}
	}
	${(props: any) =>
		props.active === 'true' &&
		css`
			font-weight: bold;
		`}
`
const Serial = styled.span`
	padding-bottom: 30px;
	width: 25px;
`
const SlideDetails = styled.div`
	display: inline;
	flex: 1;
	flex-direction: column;
`
const ImageContainer: any = styled.div`
	border: 2px solid #eee;
	min-width: 100%;
	max-width: 100%;
	height: ${vars.editorSlidesListImageHeight + 'px'};
	position: relative;
	transition: border 0.2s ease-in-out;
	&:hover {
		border-color: ${vars.editorActiveColor};
	}
	${(props: any) =>
		props.active === 'true' &&
		css`
			border-color: ${vars.editorActiveColor};
		`}
`
export const Img: any = styled(Image)`
	width: 100%;
	height: 100%;
	img {
		width: 100%;
		height: 100%;
		object-fit: fill;
	}
`
const Title = styled.p`
	cursor: pointer !important;
	height: 36px;
	margin: 5px 0 0 0;
	text-align: center;
`
