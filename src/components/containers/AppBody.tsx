import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import media from 'styled-media-query'

import getRoutes from '../../app/routes'
import vars from '../../config/vars'
import { RootState } from '../../redux/store'
import ScrollToTop from './ScrollToTop'

const { headerHeight } = vars

const mapStyles = (styles: any) => ({ opacity: styles.opacity, width: '100%', height: '100%' })
const bounceTransition = { atEnter: { opacity: 0 }, atLeave: { opacity: 0 }, atActive: { opacity: 1 } }

export function AppBody() {
	const nav = useSelector((state: RootState) => state.settings.sideNav)
	const bodyPadding = useSelector((state: RootState) => state.settings.bodyPadding)
	const routes = getRoutes()

	return (
		<Body nav={nav.toString()} bodyPadding={bodyPadding}>
			<ScrollToTop>
				<AnimatedSwitch
					atEnter={bounceTransition.atEnter}
					atLeave={bounceTransition.atLeave}
					atActive={bounceTransition.atActive}
					mapStyles={mapStyles}
					className='route-wrapper'
				>
					{routes.map((route: any, idx: number) => {
						if (!route.component) return null
						return <Route key={idx} path={route.path} exact={route.exact} render={(props) => <route.component {...props} />} />
					})}
					<Redirect from='/' to='/dashboard' />
				</AnimatedSwitch>
			</ScrollToTop>
		</Body>
	)
}

export default AppBody

const Body: any = styled.div`
	height: 100%;
	/* min-height: calc(100vh - ${headerHeight + 'px'}); */
	min-height: 100vh;
	padding: ${(props: any) => props.bodyPadding && `${props.bodyPadding}px`};
	position: relative;
	width: 100%;
	${(props: any) =>
		props.nav === 'pinned' &&
		css`
			display: flex;
			flex: 1;
			flex-direction: column;
		`}
	${media.lessThan('medium')`
    /* screen width is less than 768px (medium) */
    padding: 25px;
  `}
	/* Override upper padding rules */
	padding-top: ${headerHeight + 20 + 'px'} !important;
`
