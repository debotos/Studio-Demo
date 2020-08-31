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

export const str = (string: string = '') => string.trim().charAt(0).toUpperCase() + string.trim().slice(1)

const getRoutes = (action = '', id = '', name = '') => [
	/* General */
	{ path: '/', exact: true, name: 'Home' },
	{ path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
	/* Editors */
	// Subject
	{ path: '/editor/subject', exact: true, name: 'Subjects', component: Subject },
	{ path: `/editor/subject/:action`, exact: true, name: str(`${action} new subject`), component: Subject },
	{ path: `/editor/subject/:action/:id`, exact: true, name: `${name}`, component: Subject },
	// Level
	{ path: '/editor/level', exact: true, name: 'Levels', component: Level },
	{ path: `/editor/level/:action`, exact: true, name: str(`${action} new level`), component: Level },
	{ path: `/editor/level/:action/:id`, exact: true, name: `${name}`, component: Level },
	// Unit
	{ path: '/editor/unit', exact: true, name: 'Units', component: Unit },
	{ path: `/editor/unit/:action`, exact: true, name: str(`${action} new unit`), component: Unit },
	{ path: `/editor/unit/:action/:id`, exact: true, name: `${name}`, component: Unit },
	// Lesson
	{ path: '/editor/lesson', exact: true, name: 'Lessons', component: Lesson },
	{ path: `/editor/lesson/:action`, exact: true, name: str(`${action} new lesson`), component: Lesson },
	{ path: `/editor/lesson/:action/:id`, exact: true, name: `${name}`, component: Lesson },
	{ path: `/editor/lesson/:id/slide/:slideID`, exact: true, name: `${name}`, component: Slide },
]

export default getRoutes
