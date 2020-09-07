import React from 'react'
import { Row } from 'antd'

export default function SlideEditor(props: any) {
	const { match } = props
	// const subjectID = match?.params?.subjectID
	// const levelID = match?.params?.levelID
	// const unitID = match?.params?.unitID
	const lessonID = match?.params?.lessonID
	const slideID = match?.params?.id

	return (
		<>
			<Row justify='center'>
				<div>
					<h2>Slide Editor</h2>

					<h3>List/Deck of slides under lesson {lessonID}</h3>

					<h3>Active slide item inside editor {slideID}</h3>
				</div>
			</Row>
		</>
	)
}
