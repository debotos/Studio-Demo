import React from 'react'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'

import { RootState } from '../../redux/store'

const homeRoute = { name: 'Home', path: '/', isLink: true }

export function Breadcrumb(props: any) {
	const breadcrumb = useSelector((state: RootState) => state.settings.breadcrumb)
	if (!breadcrumb) return null

	const { items = [] } = props

	return (
		<Container>
			<AntdBreadcrumb separator={<RightOutlined style={{ fontSize: '14px' }} />} style={{ fontSize: 15 }}>
				{[homeRoute, ...items].map((route: any, index: number) => {
					const { isLink, path, name } = route
					return (
						<AntdBreadcrumb.Item {...props} key={index}>
							{isLink ? <Link to={path}>{name}</Link> : name}
						</AntdBreadcrumb.Item>
					)
				})}
			</AntdBreadcrumb>
		</Container>
	)
}

export default Breadcrumb

const Container = styled.div`
	margin-bottom: 15px;
`
