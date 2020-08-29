import React from 'react'
import loadable from '@loadable/component'

import { LoadingCenter } from '../components/loading/Loading'

const loadableOptions = { fallback: <LoadingCenter /> }

// React code splitting
const Dashboard = loadable(() => import('../views/dashboard/Dashboard'), loadableOptions)
const Subject = loadable(() => import('../views/subject/Subject'), loadableOptions)
const Level = loadable(() => import('../views/level/Level'), loadableOptions)
const Unit = loadable(() => import('../views/unit/Unit'), loadableOptions)
const Lesson = loadable(() => import('../views/lesson/Lesson'), loadableOptions)
const Slide = loadable(() => import('../views/slide/Slide'), loadableOptions)

const str = (string: string = '') => string.trim().charAt(0).toUpperCase() + string.trim().slice(1)

const getRoutes = (action = '', id = '', name = '') => [
	/* General */
	{ path: '/', exact: true, name: 'Home' },
	{ path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
	/* Editors */
	// Subject
	{ path: '/editor/subjects', exact: true, name: 'Subjects', component: Subject },
	{ path: `/editor/subjects/:action`, exact: true, name: str(`${action} new subject`), component: Subject },
	{ path: `/editor/subjects/:action/:id`, exact: true, name: `${name}`, component: Subject },

	{ path: '/editor/levels', exact: true, name: 'Level', component: Level },
	{ path: '/editor/units', exact: true, name: 'Unit', component: Unit },
	{ path: '/editor/lessons', exact: true, name: 'Lesson', component: Lesson },
	{ path: '/editor/slides', exact: true, name: 'Slide', component: Slide },
]

export default getRoutes