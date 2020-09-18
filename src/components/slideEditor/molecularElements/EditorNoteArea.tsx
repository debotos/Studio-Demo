import React from 'react'
import { Input } from 'antd'
import styled from 'styled-components'

import vars from '../../../config/vars'

function EditorNoteArea() {
	return (
		<Container>
			<Input.TextArea allowClear bordered={false} name='slide-editor-note' style={{ width: '100%', height: '100%' }} />
		</Container>
	)
}

export default EditorNoteArea

const Container = styled.div`
	border-top: 2px solid #eee;
	height: ${vars.editorNoteAreaHeight + 'px'};
	textarea[name='slide-editor-note'] {
		resize: none;
	}
`
