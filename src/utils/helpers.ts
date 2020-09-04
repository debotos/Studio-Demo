import { EditorDataType } from '../redux/store'
import keys from '../config/keys'

export function getBase64(file: any) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
}

export const capitalize = (string: string = '') => string.trim().charAt(0).toUpperCase() + string.trim().slice(1)

export const isEmpty = (value: any) =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0)

export const genTreeKey = (type: EditorDataType, id: string | number) => `${type}.${id}`

/* Actually View & Edit route generate based on type */
export const getElementCardRoute = (data: any) => {
	const { type, id, subjectID, levelID, unitID, lessonID } = data

	let viewRoute
	let editRoute

	switch (type) {
		case 'subject':
			viewRoute = `/editor/${type}s/${keys.viewAction}/${id}`
			editRoute = `/editor/${type}s/${keys.editAction}/${id}`
			break
		case 'level':
			viewRoute = `/editor/${subjectID}/${type}s/${keys.viewAction}/${id}`
			editRoute = `/editor/${subjectID}/${type}s/${keys.editAction}/${id}`
			break
		case 'unit':
			viewRoute = `/editor/${subjectID}/${levelID}/${type}s/${keys.viewAction}/${id}`
			editRoute = `/editor/${subjectID}/${levelID}/${type}s/${keys.editAction}/${id}`
			break
		case 'lesson':
			viewRoute = `/editor/${subjectID}/${levelID}/${unitID}/${type}s/${keys.viewAction}/${id}`
			editRoute = `/editor/${subjectID}/${levelID}/${unitID}/${type}s/${keys.editAction}/${id}`
			break
		case 'slide':
			const route = `/editor/${subjectID}/${levelID}/${unitID}/${lessonID}/${type}/${id}`
			viewRoute = route
			editRoute = route
			break
		default:
			viewRoute = `/editor/${type}s/${keys.viewAction}/${id}`
			editRoute = `/editor/${type}s/${keys.editAction}/${id}`
			break
	}

	return { viewRoute, editRoute }
}
