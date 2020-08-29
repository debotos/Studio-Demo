import React from 'react'
import { Redirect } from 'react-router-dom'

import AddLesson from './AddLesson'
import EditLesson from './EditLesson'
import LessonsViewList from './LessonsViewList'
import Slide from '../slide/Slide'

import keys from '../../config/keys'

const redirectToRoot = <Redirect to='/editor/lesson' />

export default function Lesson(props: any) {
	const { params } = props.match
	const { action, id } = params

	// No 'action' means give the list
	if (!action) return <LessonsViewList {...props} />
	// 'action' exist but no 'id' means user is trying to 'view'|'edit' without specifying the item
	if (action && !id) return redirectToRoot

	switch (action) {
		case keys.createAction:
			return <AddLesson {...props} />
		case keys.editAction:
			return <EditLesson {...props} />
		case keys.viewAction:
			return <Slide {...props} />
		default:
			return redirectToRoot
	}
}
