import React from 'react'
import { Redirect } from 'react-router-dom'

import AddSubject from './AddSubject'
import EditSubject from './EditSubject'
import SubjectsViewList from './SubjectsViewList'
import ViewSubject from './ViewSubject'

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
			return <EditSubject {...props} />
		case keys.viewAction:
			return <ViewSubject {...props} />
		default:
			return redirectToRoot
	}
}
