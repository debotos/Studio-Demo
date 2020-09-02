import React from 'react'

export default function (props: any) {
	const { match } = props

	return <div>View Subject ID: {match?.params?.id} means list of levels under it.</div>
}
