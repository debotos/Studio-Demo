import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import styled from 'styled-components'
import media from 'styled-media-query'
import {} from 'antd'

import './App.less'
import { AppHeader, headerHeight } from '../components/header/Header'
import getRoutes from './routes'

export const routeHistory = createBrowserHistory()

function App() {
	return (
		<>
			<Router history={routeHistory}>
				<AppHeader />
				<AppBody>
					<Switch>
						{getRoutes().map((route: any, idx: number) => {
							if (!route.component) return null
							return <Route key={idx} path={route.path} exact={route.exact} render={(props) => <route.component {...props} />} />
						})}
						<Redirect from='/' to='/dashboard' />
					</Switch>
				</AppBody>
			</Router>
		</>
	)
}

export default App

const AppBody = styled.div`
	height: 100%;
	min-height: calc(100vh - ${headerHeight + 'px'});
	padding: 40px;
	position: relative;
	width: 100%;
	${media.lessThan('medium')`
    /* screen width is less than 768px (medium) */
    padding: 25px;
  `}
	/* Override upper padding rules */
	padding-top: ${headerHeight + 20 + 'px'} !important;
`
