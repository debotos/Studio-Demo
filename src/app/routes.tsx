import React from 'react'
import loadable from '@loadable/component'

import { LoadingCenter } from '../components/loading/Loading'

const loadableOptions = { fallback: <LoadingCenter /> }

// React code splitting
const Dashboard = loadable(() => import('../views/dashboard/Dashboard'), loadableOptions)
const Subject = loadable(() => import('../views/subject/Subject'), loadableOptions)
const Level = loadable(() => import('../views/level/Level'), loadableOptions)
const Unit = loadable(() => import('../views/unit/Unit'), loadableOptions)
const Exercise = loadable(() => import('../views/exercise/Exercise'), loadableOptions)
const Slide = loadable(() => import('../views/slide/Slide'), loadableOptions)

const getRoutes = () => [
	// General
	{ path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
	// Editors
	{ path: '/editor/subject', exact: true, name: 'Subject', component: Subject },
	{ path: '/editor/level', exact: true, name: 'Level', component: Level },
	{ path: '/editor/unit', exact: true, name: 'Unit', component: Unit },
	{ path: '/editor/exercise', exact: true, name: 'Exercise', component: Exercise },
	{ path: '/editor/slide', exact: true, name: 'Slide', component: Slide },
]

export default getRoutes
