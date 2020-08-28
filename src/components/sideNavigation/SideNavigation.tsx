import React from 'react'
import { Tree } from 'antd'
import styled from 'styled-components'

import treeData from './sideNavData.json'

interface CProps {
	close: () => void
}

export function SideNavigation(props: CProps) {
	const handleOnSelect = (_: any, event: any) => {
		const { node } = event
		const { key, type } = node
		console.log({ type, key })
	}
	return <SideNavTree onSelect={handleOnSelect} showLine treeData={treeData} />
}

const SideNavTree: any = styled(Tree)`
	font-size: 15px;
	font-weight: 500;
	padding: 15px 0;
	user-select: none;
`
