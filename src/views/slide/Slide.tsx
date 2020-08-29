import React from 'react'

export default function Slide(props: any) {
	const { id, slideID } = props.match.params
	if (!slideID) return <div>List/Deck of slides</div>
	return <div>List/Deck of slides & open slide editor for {id}</div>
}
