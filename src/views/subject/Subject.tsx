import React from 'react'
import { Redirect } from 'react-router-dom'

import AddSubject from './AddSubject'
import EditAndViewSubject from './EditAndViewSubject'
import SubjectsViewList from './SubjectsViewList'

import keys from '../../config/keys'

export default function Subject(props: any) {
	const { params } = props.match
	const { action } = params

	if (!action) return <SubjectsViewList {...props} />

	switch (action) {
		case keys.createAction:
			return <AddSubject {...props} />
		case keys.editAction:
		case keys.viewAction:
			return <EditAndViewSubject {...props} />
		default:
			return <Redirect to='/editor/subjects' />
	}
}
