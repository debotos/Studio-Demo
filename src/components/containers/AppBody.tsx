import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import media from 'styled-media-query'

import getRoutes from '../../app/routes'
import vars from '../../config/vars'
import { RootState } from '../../redux/store'
import ScrollToTop from './ScrollToTop'

const { headerHeight } = vars

export function AppBody() {
	const nav = useSelector((state: RootState) => state.settings.sideNav)
	const routes = getRoutes()

	return (
		<Body nav={nav.toString()}>
			<ScrollToTop>
				<Switch>
					{routes.map((route: any, idx: number) => {
						if (!route.component) return null
						return <Route key={idx} path={route.path} exact={route.exact} render={(props) => <route.component {...props} />} />
					})}

					<Redirect from='/' to='/dashboard' />
				</Switch>
			</ScrollToTop>
		</Body>
	)
}

export default AppBody

const Body: any = styled.div`
	height: 100%;
	/* min-height: calc(100vh - ${headerHeight + 'px'}); */
	min-height: 100vh;
	padding: 40px;
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
