import React from 'react'
import { Redirect } from 'react-router-dom'

import AddLevel from './AddLevel'
import EditLevel from './EditLevel'
import LevelsViewList from './LevelsViewList'
import ViewLevel from './ViewLevel'

import keys from '../../config/keys'

const redirectToRoot = <Redirect to='/editor/level' />

export default function Level(props: any) {
	const { params } = props.match
	const { action, id } = params

	// No 'action' means give the list
	if (!action) return <LevelsViewList {...props} />
	// 'action' exist but no 'id' means user is trying to 'view'|'edit' without specifying the item
	if (action && !id) return redirectToRoot

	switch (action) {
		case keys.createAction:
			return <AddLevel {...props} />
		case keys.editAction:
			return <EditLevel {...props} />
		case keys.viewAction:
			return <ViewLevel {...props} />
		default:
			return redirectToRoot
	}
}
