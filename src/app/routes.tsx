import React from 'react'
import loadable from '@loadable/component'

import { LoadingCenter } from '../components/loading/Loading'
import { capitalize } from '../utils/helpers'

const loadableOptions = { fallback: <LoadingCenter msg='Component loading...' /> }

// React code splitting
const Dashboard = loadable(() => import('../views/dashboard/Dashboard'), loadableOptions)
const Subject = loadable(() => import('../views/subject/Subject'), loadableOptions)
const Level = loadable(() => import('../views/level/Level'), loadableOptions)
const Unit = loadable(() => import('../views/unit/Unit'), loadableOptions)
const Lesson = loadable(() => import('../views/lesson/Lesson'), loadableOptions)
const Slide = loadable(() => import('../views/slide/Slide'), loadableOptions)

const getRoutes = (action = '', id = '', name = '') => [
	/* General */
	{ path: '/', exact: true, name: 'Home' },
	{ path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
	/* Editors */
	// Subject
	{ path: '/editor/subjects', exact: true, name: 'Subjects', component: Subject },
	{ path: `/editor/subject/:action`, exact: true, name: capitalize(`${action} new subject`), component: Subject },
	{ path: `/editor/subjects/:action/:id`, exact: true, name: `${name}`, component: Subject },
	// Level
	{ path: '/editor/levels', exact: true, name: 'Levels', component: Level },
	{ path: `/editor/level/:action`, exact: true, name: capitalize(`${action} new level`), component: Level },
	{ path: `/editor/:subjectID/levels/:action/:id`, exact: true, name: `${name}`, component: Level },
	// Unit
	{ path: '/editor/units', exact: true, name: 'Units', component: Unit },
	{ path: `/editor/unit/:action`, exact: true, name: capitalize(`${action} new unit`), component: Unit },
	{ path: `/editor/:subjectID/:levelID/units/:action/:id`, exact: true, name: `${name}`, component: Unit },
	// Lesson
	{ path: '/editor/lessons', exact: true, name: 'Lessons', component: Lesson },
	{ path: `/editor/lesson/:action`, exact: true, name: capitalize(`${action} new lesson`), component: Lesson },
	{ path: `/editor/:subjectID/:levelID/:unitID/lessons/:action/:id`, exact: true, name: `${name}`, component: Lesson },
	// Slide
	{ path: '/editor/slides', exact: true, name: 'Slides', component: Slide },
	{ path: `/editor/slide/:action`, exact: true, name: capitalize(`${action} new slide`), component: Slide },
	{ path: `/editor/:subjectID/:levelID/:unitID/:lessonID/slides/:action/:id`, exact: true, name: `${name}`, component: Slide },
]

export default getRoutes
