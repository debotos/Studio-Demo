import React from 'react'
import { Col, Row } from 'antd'
import styled from 'styled-components'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

import { EditorPropsType } from '../../SlideEditor'
import vars from '../../../../config/vars'

const { editorActiveColor } = vars

export function CurrentlyUsedAssetsArea(props: EditorPropsType) {
	const showIcon = <AiOutlineEye size={25} color={editorActiveColor} />
	const hideIcon = <AiOutlineEyeInvisible size={25} />

	return (
		<Container>
			<Content span={24}>
				<Header align='middle'>
					<Col flex={1}>
						<Title>Asset name</Title>
					</Col>
					<Col span={8}>
						<Row justify='end' align='middle'>
							<Title>Visibility</Title>
						</Row>
					</Col>
				</Header>
				{Array(20)
					.fill(0)
					.map((_, i) => {
						return (
							<AssetItem align='middle' key={i}>
								<Col flex={1}>
									<AssetName>Asset name</AssetName>
								</Col>
								<Col span={8}>
									<Row justify='end' align='middle'>
										<ShowHideBtn>{true ? showIcon : hideIcon}</ShowHideBtn>
									</Row>
								</Col>
							</AssetItem>
						)
					})}
			</Content>
		</Container>
	)
}

const Container = styled(Row)``
const Content = styled(Col)``
const Header = styled(Row)`
	border-bottom: 2px solid #eee;
	margin-bottom: 5px;
	padding-bottom: 5px;
`
const Title = styled.h3`
	cursor: pointer;
	font-size: 15px;
	font-weight: bolder;
	margin: 0;
	opacity: 0.6;
	padding: 0;
`
const AssetItem = styled(Row)`
	padding: 4px 0;
`
const AssetName: any = styled.p`
	font-size: 15px;
	font-weight: ${(props: any) => props.active === 'true' && '600'};
	margin: 0;
	padding: 0;
`
const ShowHideBtn = styled.span`
	align-items: center;
	cursor: pointer;
	display: flex;
	justify-content: center;
`
