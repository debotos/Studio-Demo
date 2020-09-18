import React from 'react'

import { Apology } from '../apology/Apology'

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
	constructor(props: any) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	componentDidCatch(error: any, errorInfo: any) {
		// Log the error to an error reporting service
		this.logErrorToMyService(error, errorInfo)
	}

	logErrorToMyService = (error: any, errorInfo: any) => {
		console.log(error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			// Render any custom fallback UI
			return <Apology />
		}

		return this.props.children
	}
}

export default ErrorBoundary
