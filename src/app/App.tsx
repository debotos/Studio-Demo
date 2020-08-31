import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import styled from 'styled-components'
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
	padding: 20px;
	padding-top: ${headerHeight + 20 + 'px'};
	position: relative;
	width: 100%;
`
