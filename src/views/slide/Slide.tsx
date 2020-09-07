import React from 'react'
import { Redirect } from 'react-router-dom'

import AddSlide from './AddSlide'
import EditSlide from './EditSlide'
import SlidesViewList from './SlidesViewList'
import ViewSlide from './ViewSlide'

import keys from '../../config/keys'

const redirectToRoot = <Redirect to='/editor/slides' />

export default function Slide(props: any) {
	const { params } = props.match
	const { action, id } = params

	// No 'action' means give the list
	if (!action) return <SlidesViewList {...props} />
	// 'action' exist and it's not 'create' action but no 'id' means user is trying to 'view'|'edit' without specifying the item
	if (action && action !== keys.createAction && !id) return redirectToRoot

	switch (action) {
		case keys.createAction:
			return <AddSlide {...props} />
		case keys.editAction:
			return <EditSlide {...props} />
		case keys.viewAction:
			return <ViewSlide {...props} />
		default:
			return redirectToRoot
	}
}
