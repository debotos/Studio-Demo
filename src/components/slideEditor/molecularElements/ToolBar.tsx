import React from 'react'
import styled from 'styled-components'
import { BsReverseLayoutTextWindowReverse, BsTextareaT, BsThreeDots } from 'react-icons/bs'
import { RiArrowDownSLine, RiVolumeUpLine, RiFileCopyLine } from 'react-icons/ri'
import { FiVideo } from 'react-icons/fi'
import { CgImage, CgStack, CgCheckO, CgMathPlus } from 'react-icons/cg'
import { MdMultilineChart } from 'react-icons/md'
import { BiRectangle, BiPaint } from 'react-icons/bi'

interface CProps {
	ids: any
}

export function EditorToolBar(props: CProps) {
	return (
		<Container>
			<LeftContent>
				<IconBtn style={{ marginLeft: 0 }}>
					<BsReverseLayoutTextWindowReverse size={25} />
					<RiArrowDownSLine size={15} />
				</IconBtn>
				<IconBtn>
					<RiVolumeUpLine size={25} />
				</IconBtn>
				<IconBtn>
					<FiVideo size={25} />
				</IconBtn>
				<IconBtn>
					<SVGIcon>SVG</SVGIcon>
				</IconBtn>
				<IconBtn>
					<BiPaint size={25} />
				</IconBtn>
				<IconBtn>
					<MdMultilineChart size={25} />
				</IconBtn>
				<IconBtn>
					<BiRectangle size={25} />
				</IconBtn>
				<IconBtn style={{ marginRight: 0 }}>
					<BsTextareaT size={25} />
				</IconBtn>
			</LeftContent>
			<RightContent>Right Container</RightContent>
		</Container>
	)
}

const Container = styled.div`
	align-items: center;
	border-bottom: 2px solid #eee;
	border-top: 2px solid #eee;
	display: flex;
	height: 50px;
`
const LeftContent = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	height: 100%;
	justify-content: flex-start;
	padding-left: 30px;
	padding-right: 15px;
`
const RightContent = styled(LeftContent)`
	flex: 2;
	border-left: 2px solid #eee;
	height: 100%;
	padding-left: 15px;
	padding-right: 30px;
`
const IconBtn = styled.span`
	align-items: center;
	cursor: pointer;
	display: flex;
	font-size: 15px;
	height: 100%;
	justify-content: center;
	margin: 0 10px;
	opacity: 0.7;
	&:hover {
		opacity: 1;
	}
`
const SVGIcon = styled.span`
	border: 2px solid #929eaa;
	border-radius: 3px;
	cursor: pointer;
	font-size: 12px;
	height: 24px;
	margin: 0;
	padding: 2px;
	text-transform: uppercase;
`
