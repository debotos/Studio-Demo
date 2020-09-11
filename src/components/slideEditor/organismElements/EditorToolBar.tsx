import React from 'react'
import styled from 'styled-components'
import { BsReverseLayoutTextWindowReverse, BsTextareaT, BsThreeDots } from 'react-icons/bs'
import { RiArrowDownSLine, RiVolumeUpLine, RiFileCopyLine } from 'react-icons/ri'
import { FiVideo } from 'react-icons/fi'
import { CgImage, CgStack, CgCheckO, CgMathPlus } from 'react-icons/cg'
import { MdMultilineChart } from 'react-icons/md'
import { BiRectangle, BiPaint } from 'react-icons/bi'
import { Row as AntRow, Switch } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import vars from '../../../config/vars'

const { editorSideNavWidth, editorToolBarHeight } = vars

interface CProps {
	ids: any
}

export function EditorToolBar(props: CProps) {
	return (
		<Container>
			<LeftContent>
				<IconBtn style={{ marginLeft: 0, marginRight: 5 }}>
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
					<CgImage size={25} />
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
			<RightContent>
				<Row justify='space-between' align='middle' style={{ width: '100%' }}>
					<Row align='middle'>
						<IconBtn style={{ marginLeft: 0, marginRight: 10 }}>
							<CgStack size={25} />
						</IconBtn>
						<Row align='middle'>
							<Label>My Items</Label>&nbsp;&nbsp;
							<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
						</Row>
					</Row>
					<Row align='middle'>
						<Row align='middle' style={{ color: '#52c41a', marginRight: 10 }}>
							<CgCheckO size={25} /> &nbsp;&nbsp; <Label>Saved</Label>
						</Row>
						<IconBtn>
							<CgMathPlus size={25} />
						</IconBtn>
						<IconBtn>
							<RiFileCopyLine size={25} />
						</IconBtn>
						<IconBtn style={{ marginRight: 0 }}>
							<BsThreeDots size={25} />
						</IconBtn>
					</Row>
				</Row>
			</RightContent>
		</Container>
	)
}

const Row = styled(AntRow)`
	height: 100%;
`
const Container = styled.div`
	align-items: center;
	background-color: #fff;
	border-bottom: 2px solid #eee;
	border-top: 2px solid #eee;
	display: flex;
	flex-wrap: wrap;
	height: ${editorToolBarHeight + 'px'};
`
const LeftContent = styled.div`
	align-items: center;
	border-right: 2px solid #eee;
	display: flex;
	height: 100%;
	justify-content: flex-start;
	padding-left: 30px;
	padding-right: 15px;
	width: ${editorSideNavWidth + 'px'};
`
const RightContent = styled.div`
	flex: 1;
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
const Label = styled.span`
	font-size: 15px;
	font-weight: 500;
	margin-top: -2px;
`
