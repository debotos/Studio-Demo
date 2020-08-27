import React from 'react'
import styled from 'styled-components'
import { FiMenu } from 'react-icons/fi'
import { Row, Avatar } from 'antd'

import Logo from '../../assets/logo/ezilm-blue-logo.png'

export function AppHeader() {
	return (
		<header>
			<Container>
				<Row align='middle'>
					<FiMenu style={{ fontSize: 30, cursor: 'pointer' }} />
					<AppLogo src={Logo} alt='Ezilm Studio' />
					<Divider />
					<Title>EZILM Studio</Title>
				</Row>
				<Row align='middle'>
					<AppUser>KM</AppUser>
				</Row>
			</Container>
		</header>
	)
}

const Container = styled.div`
	align-items: center;
	border-bottom: 2px solid #eee;
	display: flex;
	height: 65px;
	justify-content: space-between;
	left: 0;
	position: fixed;
	padding: 5px 20px;
	right: 0;
	top: 0;
`
const AppLogo = styled.img`
	margin-bottom: 10px;
	margin-left: 20px;
	pointer-events: none;
	user-select: none;
`
const Divider = styled.div`
	background-color: #000;
	height: 30px;
	margin: 0 20px;
	margin-left: 16px;
	width: 2px;
`
const Title = styled.h1`
	font-size: 16px;
	margin: 0;
	pointer-events: none;
	user-select: none;
`
const AppUser = styled(Avatar)`
	background-color: #00a2ae;
	cursor: pointer;
	vertical-align: middle;
`
