import React from 'react'
import { Redirect } from 'react-router-dom'

import AddSubject from './AddSubject'
import EditAndViewSubject from './EditAndViewSubject'
import SubjectsViewList from './SubjectsViewList'

import keys from '../../config/keys'

const redirectToRoot = <Redirect to='/editor/subject' />

export default function Subject(props: any) {
	const { params } = props.match
	const { action, id } = params

	// No 'action' means give the list
	if (!action) return <SubjectsViewList {...props} />
	// 'action' exist but no 'id' means user is trying to 'view'|'edit' without specifying the item
	if (action && !id) return redirectToRoot

	switch (action) {
		case keys.createAction:
			return <AddSubject {...props} />
		case keys.editAction:
		case keys.viewAction:
			return <EditAndViewSubject {...props} />
		default:
			return redirectToRoot
	}
}
