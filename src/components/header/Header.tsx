import React, { useState } from 'react'
import styled from 'styled-components'
import { FiMenu, FiXCircle } from 'react-icons/fi'
import { Row, Avatar } from 'antd'

import Logo from '../../assets/logo/ezilm-blue-logo.png'
import { SideNavigation } from '../sideNavigation/SideNavigation'

export function AppHeader() {
	const [navigation, setNavigation] = useState(false)

	return (
		<>
			<header>
				<Container>
					<Row align='middle'>
						<FiMenu
							style={{ fontSize: 30, cursor: 'pointer' }}
							onClick={() => setNavigation(true)}
						/>
						<AppLogo src={Logo} alt='Ezilm Studio' />
						<Divider />
						<Title>EZILM Studio</Title>
					</Row>
					<Row align='middle'>
						<AppUser>KM</AppUser>
					</Row>
				</Container>
			</header>
			{/* Side Navigation Drawer for Tree View */}
			<HoverAreaToOpenNavigationDrawer onMouseEnter={() => setNavigation(true)} />
			<NavigationDrawer
				style={{ transform: navigation ? 'translateX(0)' : 'translateX(-100%)' }}
				onMouseLeave={() => setNavigation(false)}
			>
				{/* Navigation Drawer Header */}
				<Row
					align='middle'
					justify='space-between'
					style={{ padding: '6px 15px 6px 25px', borderBottom: '2px solid #eee' }}
				>
					<Row align='middle'>
						<AppLogo src={Logo} alt='Ezilm Studio' style={{ marginLeft: -10 }} />
						<Divider />
						<Title>EZILM Studio</Title>
					</Row>
					<Row align='middle'>
						<FiXCircle
							style={{ fontSize: 25, cursor: 'pointer' }}
							onClick={() => setNavigation(false)}
						/>
					</Row>
				</Row>
				{/* Navigation Drawer Body */}
				<NavigationDrawerBody className='hide-native-scrollbar'>
					<SideNavigation close={() => setNavigation(false)} />
				</NavigationDrawerBody>
			</NavigationDrawer>
		</>
	)
}

const headerHeight = 65
const Container = styled.div`
	align-items: center;
	border-bottom: 2px solid #eee;
	display: flex;
	height: ${headerHeight + 'px'};
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
const NavigationDrawer = styled.div`
	background-color: #fff;
	box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
		0 9px 28px 8px rgba(0, 0, 0, 0.05);
	height: 100%;
	left: 0;
	min-width: 330px;
	max-width: 100vw;
	min-height: 100vh;
	position: fixed;
	top: 0;
	transition: all 0.3s ease-out;
	width: max-content;
	z-index: 999;
`
const NavigationDrawerBody = styled.div`
	height: calc(100vh - ${headerHeight + 'px'});
	overflow-y: scroll;
	padding: 0 25px;
	width: 100%;
`