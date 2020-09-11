import React from 'react'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'

import { setActiveItems } from '../../../redux/slices/activeItemsSlice'
import { EditorPropsType } from '../SlideEditor'
import { truncate } from '../../../utils/helpers'
import { routeHistory } from '../../../app/App'
import { AppDispatch } from '../../../redux/store'
import vars from '../../../config/vars'
import keys from '../../../config/keys'

export function SlidesList(props: EditorPropsType) {
	const { slides, ids } = props
	const { subjectID, levelID, unitID, lessonID, slideID } = ids
	const dispatch: AppDispatch = useDispatch()

	const handleSlideClick = (slide: any) => {
		const { id } = slide
		const type = 'slide'
		dispatch(setActiveItems({ [type]: slide }))
		routeHistory.push(`/editor/${subjectID}/${levelID}/${unitID}/${lessonID}/${type}s/${keys.viewAction}/${id}`)
	}

	return (
		<>
			{/* Don't enclose it with parent element like 'div' for scrolling purpose */}
			{slides.map((slide, index) => {
				const serial = (index + 1 + '').padStart(2, '0')
				const { id, title, thumbnail } = slide
				const active = id === slideID
				return (
					<SlideItem active={active.toString()} key={index} onClick={() => handleSlideClick(slide)}>
						<Serial>{serial}</Serial>
						<SlideDetails>
							<ImageContainer active={active.toString()}>
								<Img src={thumbnail} alt={title} />
							</ImageContainer>
							<Title>{truncate(title, 40)}</Title>
						</SlideDetails>
					</SlideItem>
				)
			})}
		</>
	)
}

const SlideItem: any = styled.div`
	align-items: center;
	cursor: pointer;
	display: flex;
	margin-bottom: 15px;
	transition: all 0.2s ease-in;
	&:hover {
		font-weight: bold;
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
	min-width: 161px;
	max-width: 161px;
	height: ${vars.editorSlidesListImageHeight + 'px'};
	position: relative;
	transition: all 0.2s ease-in;
	&:hover {
		border-color: ${vars.editorActiveColor};
	}
	${(props: any) =>
		props.active === 'true' &&
		css`
			border-color: ${vars.editorActiveColor};
		`}
`
const Img = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	/* Or */
	/* Center */
	/* display: block;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%); */
`
const Title = styled.p`
	margin: 5px 0 0 0;
	text-align: center;
`
