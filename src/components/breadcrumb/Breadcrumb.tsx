import React from 'react'
import { Breadcrumb as AntdBreadcrumb, Tooltip } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'

import { RootState } from '../../redux/store'
import { truncate } from '../../utils/helpers'
import vars from '../../config/vars'

const homeRoute = { name: 'Home', path: '/', isLink: true }

export function Breadcrumb(props: any) {
	const breadcrumb = useSelector((state: RootState) => state.settings.breadcrumb)
	const bodyPadding = useSelector((state: RootState) => state.settings.bodyPadding)
	if (!breadcrumb) return null

	const { items = [] } = props

	return (
		<Container bodyPadding={bodyPadding}>
			<AntdBreadcrumb separator={<RightOutlined style={{ fontSize: '14px' }} />} style={{ fontSize: 15 }}>
				{[homeRoute, ...items].map((route: any, index: number) => {
					const { isLink, path, name, tooltip = true } = route
					const truncatedLabel = truncate(name, 20)

					const label = tooltip ? (
						<Tooltip key={index} color={vars.appPrimaryColor} placement='top' title={name}>
							<span>{truncatedLabel}</span>
						</Tooltip>
					) : (
						truncatedLabel
					)

					return (
						<AntdBreadcrumb.Item {...props} key={index}>
							{isLink ? <Link to={path}>{label}</Link> : label}
						</AntdBreadcrumb.Item>
					)
				})}
			</AntdBreadcrumb>
		</Container>
	)
}

export default Breadcrumb

const Container: any = styled.div`
	margin-bottom: ${(props: any) => (props.bodyPadding === 0 ? '20px' : '15px')};
	padding: ${(props: any) => props.bodyPadding === 0 && '0 30px'};
`
