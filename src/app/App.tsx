import React from 'react'
import { Button, Input } from 'antd'

import './App.less'

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
				<Button size='small'>Submit</Button>
				<Button size='small' type='primary'>
					Submit
				</Button>
				<Input />
			</header>
		</div>
	)
}

export default App
