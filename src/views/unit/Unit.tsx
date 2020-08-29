import React from 'react'
import { Redirect } from 'react-router-dom'

import AddUnit from './AddUnit'
import EditUnit from './EditUnit'
import UnitsViewList from './UnitsViewList'
import ViewUnit from './ViewUnit'

import keys from '../../config/keys'

const redirectToRoot = <Redirect to='/editor/unit' />

export default function Unit(props: any) {
	const { params } = props.match
	const { action, id } = params

	// No 'action' means give the list
	if (!action) return <UnitsViewList {...props} />
	// 'action' exist but no 'id' means user is trying to 'view'|'edit' without specifying the item
	if (action && !id) return redirectToRoot

	switch (action) {
		case keys.createAction:
			return <AddUnit {...props} />
		case keys.editAction:
			return <EditUnit {...props} />
		case keys.viewAction:
			return <ViewUnit {...props} />
		default:
			return redirectToRoot
	}
}
