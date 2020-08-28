import React from 'react'
import { Skeleton, Spin } from 'antd'

import LoadingSVG from '../../assets/loading.svg'

/* Just a SVG animated image */
export default function Loading({ color, msg, msgColor }: any) {
	return (
		<div style={{ marginTop: '-100px' }}>
			<img src={LoadingSVG} alt='Loading...' />
			<p
				style={{
					textAlign: 'center',
					fontWeight: 'bold',
					fontSize: '15px',
					opacity: 0.8,
					margin: '0 10px',
					color: msgColor ? msgColor : '#fff',
				}}
			>
				{msg}
			</p>
		</div>
	)
}

/* props can be -> color, msg, msgColor, opacity */
export function LoadingCenter(props: any) {
	return (
		<div
			style={{
				height: '100vh',
				width: '100vw',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: props.bgColor ? props.bgColor : 'transparent',
				zIndex: 999999,
			}}
		>
			{props.spin ? <Spin size={props.size} /> : <Loading {...props} />}
		</div>
	)
}

/* props can be -> color, msg, msgColor, opacity */
export function LoaderOverlay(props: any) {
	return (
		<div
			style={{
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
				backgroundColor: `rgba(0, 0, 0, ${props.opacity ? props.opacity : 0.7})`,
				zIndex: 999999,
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
