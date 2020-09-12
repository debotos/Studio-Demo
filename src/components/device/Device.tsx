import { useMediaQuery } from 'react-responsive'

const hideSlideEditorAt = 1224

const Desktop = ({ children, editor }: any) => {
	const isDesktop = useMediaQuery({ minWidth: editor ? hideSlideEditorAt : 992 })
	return isDesktop ? children : null
}

const Mobile = ({ children, editor }: any) => {
	const isMobile = useMediaQuery({ maxWidth: editor ? hideSlideEditorAt - 1 : 767 })
	return isMobile ? children : null
}

export { Desktop, Mobile }
