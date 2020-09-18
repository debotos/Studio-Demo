import { Input } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'

import { EditorBodyPropsType } from '../EditorBody'

const commentsStore = [
	{ by: 'Debotos Das', at: '10 min ago', comment: 'Change with arabic text' },
	{ by: 'Ripon Das', at: '5 min ago', comment: 'Change with arabic text' },
	{ by: 'Akash Das', at: '2 min ago', comment: 'Change with arabic text' },
	{ by: 'Prince Das', at: '1 hour ago', comment: 'Change with arabic text' },
]

function EditorExtraAreaCommentView(props: EditorBodyPropsType) {
	/* Store it in local state and fetch every time because comment can update frequently */
	const [comments, setComments] = useState(commentsStore)
	const [comment, setComment] = useState<any>(null)

	const handleAddComment = (e: any) => {
		const newComment = { by: 'Debotos Das', at: 'Just now', comment: e.target.value }
		setComments([...comments, newComment])
		setComment(null)
	}

	return (
		<>
			{/* Don't enclose it with parent div/container to avoid scrolling issue */}
			<h3>Comments</h3>
			{comments.map((item, index) => {
				const { by, at, comment } = item
				return (
					<Comment key={index}>
						<strong>{by}</strong>
						<span>{at}</span>
						<p>{comment}</p>
					</Comment>
				)
			})}
			<Input.TextArea
				rows={2}
				onPressEnter={handleAddComment}
				onChange={(e: any) => setComment(e.target.value)}
				value={comment}
			/>
		</>
	)
}

export default EditorExtraAreaCommentView

const Comment = styled.div`
	span {
		margin-left: 10px;
		opacity: 0.8;
	}
`
