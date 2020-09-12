import React from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'
import { IoIosDesktop } from 'react-icons/io'

export function RequireDesktop() {
	return (
		<Container>
			<Typography.Title level={2}>Sorry, editor is not supported in low resolution.</Typography.Title>
			<IoIosDesktop size={300} />
			<Typography.Title level={4}>Please switch to desktop/laptop!</Typography.Title>
		</Container>
	)
}

const Container = styled.div`
	align-items: center;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	left: 0;
	min-height: 100vh;
	min-width: 100vw;
	margin-top: -50px;
	position: fixed;
	padding: 20px;
	right: 0;
	top: 0;
	text-align: center;
	z-index: -999;
`
