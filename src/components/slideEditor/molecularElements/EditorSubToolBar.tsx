import React, { useState } from 'react'
import { Row, Col, Typography, Affix } from 'antd'
import { BiMessageDetail, BiMinus, BiPlus } from 'react-icons/bi'
import { RiArrowGoBackLine, RiArrowGoForwardLine, RiSlideshow3Line } from 'react-icons/ri'
import styled from 'styled-components'

import { IconBtn } from '../organismElements/EditorToolBar'
import { EditorPropsType } from '../SlideEditor'
import vars from '../../../config/vars'

export function EditorSubToolBar(props: EditorPropsType) {
	const { activeSlideInfo } = props
	const { title } = activeSlideInfo
	const [affixed, setAffixed] = useState<boolean>(false)

	return (
		<Affix offsetTop={vars.headerHeight + vars.editorToolBarHeight - 2} onChange={(val) => setAffixed(!!val)}>
			<Container justify='space-between' align='middle' className={affixed ? 'app-box-shadow-bottom' : ''}>
				<Col flex={1}>
					<Title level={3}>{title}</Title>
				</Col>
				<Col>
					<Row>
						<IconBtn>
							<RiArrowGoBackLine size={25} />
						</IconBtn>
						<IconBtn>
							<RiArrowGoForwardLine size={25} />
						</IconBtn>
						<IconBtn>
							<BiMessageDetail size={25} />
						</IconBtn>
						<IconBtn>
							<RiSlideshow3Line size={25} />
						</IconBtn>
						<IconBtn>
							<BiMinus size={25} />
						</IconBtn>
						<Percentage>80%</Percentage>
						<IconBtn>
							<BiPlus size={25} />
						</IconBtn>
					</Row>
				</Col>
			</Container>
		</Affix>
	)
}

const Container = styled(Row)`
	background-color: #fff;
	height: ${vars.editorSubToolBarHeight + 'px'};
	padding: 0 20px;
`
const Title = styled(Typography.Title)`
	margin: 0 !important;
	padding: 0 !important;
`
const Percentage = styled.span`
	font-size: 15px;
	font-weight: bold;
`
