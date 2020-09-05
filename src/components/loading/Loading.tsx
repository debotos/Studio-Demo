import React from 'react'
import { Skeleton, Spin } from 'antd'

import LoadingSVG from '../../assets/loading.svg'

type LoadingProps = {
	color?: string
	msg?: string
	msgColor?: string
	opacity?: number
	spin?: boolean
	size?: 'small' | 'large' | 'default' | undefined // antd spin size
	bgColor?: string
}

/* Just a SVG animated image */
export default function Loading({ color, msg, msgColor }: LoadingProps) {
	return (
		<div style={{ marginTop: '-100px', textAlign: 'center' }}>
			<img src={LoadingSVG} alt='Loading...' />
			<p
				style={{
					textAlign: 'center',
					fontWeight: 'bold',
					fontSize: '15px',
					opacity: 0.8,
					margin: '15px 0',
					marginLeft: 10,
					color: msgColor && msgColor,
				}}
			>
				{msg}
			</p>
		</div>
	)
}

const fullScreenStyles: any = {
	position: 'fixed',
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	height: '100vh',
	width: '100vw',
	overflow: 'hidden',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}

/* props can be -> color, msg, msgColor, opacity */
export function LoadingCenter(props: LoadingProps) {
	return (
		<div
			style={{
				...fullScreenStyles,
				backgroundColor: props.bgColor ? props.bgColor : 'transparent',
				zIndex: 999999,
			}}
		>
			{props.spin ? <Spin size={props.size} /> : <Loading {...props} />}
		</div>
	)
}

/* props can be -> color, msg, msgColor, opacity */
export function LoadingOverlay(props: LoadingProps) {
	return (
		<div
			style={{
				...fullScreenStyles,
				backgroundColor: `rgba(0, 0, 0, ${props.opacity ? props.opacity : 0.6})`,
				zIndex: 999999 /* Above everything */,
			}}
		>
			<Loading {...props} />
		</div>
	)
}

export function LoadingSkeleton({ number = 1 }) {
	return (
		<>
			{Array(number)
				.fill(0)
				.map((item, index) => (
					<Skeleton active key={index} />
				))}
		</>
	)
}
