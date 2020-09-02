import React from 'react'
import styled, { css } from 'styled-components'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/store'

export function AppMain({ children }: any) {
	const nav = useSelector((state: RootState) => state.settings.sideNav)
	return <Main nav={nav.toString()}>{children}</Main>
}

export default AppMain

const Main: any = styled.div`
	${(props: any) =>
		props.nav === 'pinned' &&
		css`
			display: flex;
		`}
`
