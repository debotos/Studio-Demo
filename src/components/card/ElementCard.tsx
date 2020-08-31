import React from 'react'
import styled from 'styled-components'

interface CProps {
	id: string | number
}

export function ElementCard(props: CProps) {
	return (
		<>
			<Container>
				<div></div>
				<div></div>
				<div></div>
			</Container>
		</>
	)
}

const Container = styled.div`
	align-items: center;
	border: 2px solid #eee;
	border-radius: 3px;
	display: flex;
	flex-direction: column;
	height: 270px;
	justify-content: space-between;
	margin-right: 20px;
	margin-bottom: 20px;
	padding: 15px;
	width: 270px;
`

export default ElementCard
