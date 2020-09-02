import React from 'react'
import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { FiMenu } from 'react-icons/fi'
import { Row, Avatar } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import Logo from '../../assets/logo/ezilm-blue-logo.png'
import { AppDispatch, RootState } from '../../redux/store'
import { setSettings } from '../../redux/slices/settingsSlice'
import { NavigationDrawerHead } from '../sideNavigation/SideNavigation'
import vars from '../../config/vars'

const { headerHeight } = vars

export function AppHeader() {
	const dispatch: AppDispatch = useDispatch()
	const sideNav = useSelector((state: RootState) => state.settings.sideNav)

	const getOverrideStyle = () => {
		const pinned = sideNav === 'pinned'
		return { display: pinned ? 'block' : 'none', transform: pinned ? 'translateX(0)' : 'translateX(-100%)' }
	}

	return (
		<>
			<Container nav={sideNav.toString()}>
				<div>
					{/* This will override the actual header left portion */}
					<div style={getOverrideStyle()}>
						<NavigationDrawerHead />
					</div>

					{/* Actual header left portion */}
					{sideNav === false && (
						<LeftRow align='middle'>
							<FiMenu style={{ fontSize: 30, cursor: 'pointer' }} onClick={() => dispatch(setSettings({ sideNav: true }))} />
							<AppLogo src={Logo} alt='Ezilm Studio' />
							<Divider />
							<Title>EZILM Studio</Title>
						</LeftRow>
					)}
				</div>

				<RightRow align='middle'>
					<AppUser>KM</AppUser>
				</RightRow>
			</Container>
		</>
	)
}

export default AppHeader

const Container: any = styled.header`
	align-items: center;
	background: #fff;
	border-bottom: 2px solid #eee;
	display: flex;
	height: ${headerHeight + 'px'};
	justify-content: space-between;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 997; /* Ratio with hover open area of NavigationDrawer */
	${(props: any) =>
		props.nav === 'pinned' &&
		css`
			padding-left: 0;
		`}
`
const LeftRow = styled(Row)`
	padding: 5px 0 5px 20px;
`
const RightRow = styled(Row)`
	padding: 5px 20px 5px 0;
`
export const AppLogo = styled.img`
	margin-bottom: 10px;
	margin-left: 20px;
	pointer-events: none;
	user-select: none;
`
export const Divider = styled.div`
	background-color: #000;
	height: 30px;
	margin: 0 20px;
	margin-left: 16px;
	width: 2px;
	${media.lessThan('small')`
    /* screen width is less than 450px (small) */
   display: none;
  `}
`
export const Title = styled.h1`
	font-size: 16px;
	margin: 0;
	pointer-events: none;
	user-select: none;
	${media.lessThan('small')`
    /* screen width is less than 450px (small) */
   display: none;
  `}
`
const AppUser = styled(Avatar)`
	background-color: #00a2ae;
	cursor: pointer;
	vertical-align: middle;
`
