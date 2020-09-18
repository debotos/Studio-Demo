import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'

import './App.less'
import store from '../redux/store'
import AppHeader from '../components/header/Header'
import AppBody from '../components/containers/AppBody'
import AppMain from '../components/containers/AppMain'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import SideNavigation from '../components/sideNavigation/SideNavigation'

export const routeHistory = createBrowserHistory()

function App() {
	return (
		<>
			<ErrorBoundary>
				<Provider store={store}>
					<Router history={routeHistory}>
						<AppHeader />
						<AppMain>
							<SideNavigation />
							<AppBody />
						</AppMain>
					</Router>
				</Provider>
			</ErrorBoundary>
		</>
	)
}

export default App
