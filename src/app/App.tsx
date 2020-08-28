import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import styled from 'styled-components'
import {} from 'antd'

import './App.less'
import { AppHeader, headerHeight } from '../components/header/Header'
import getRoutes from './routes'

import { LoaderOverlay } from '../components/loading/Loading'
export const routeHistory = createBrowserHistory()

function App() {
	return <LoaderOverlay />
	return (
		<>
			<Router history={routeHistory}>
				<AppHeader />
				<AppBody>
					<Switch>
						{getRoutes().map((route: any, idx: number) => {
							return (
								route.component && (
									<Route
										key={idx}
										path={route.path}
										exact={route.exact}
										render={(props) => <route.component {...props} />}
									/>
								)
							)
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
	margin-top: ${headerHeight + 'px'};
	position: relative;
	width: 100%;
`
