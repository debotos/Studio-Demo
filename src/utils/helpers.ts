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
	value === 'undefined' ||
	value === null ||
	value === 'null' ||
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
			viewRoute = `/editor/${subjectID}/${levelID}/${unitID}/${lessonID}/${type}s/${keys.viewAction}/${id}`
			editRoute = `/editor/${subjectID}/${levelID}/${unitID}/${lessonID}/${type}s/${keys.editAction}/${id}`
			break
		default:
			viewRoute = `/editor/${type}s/${keys.viewAction}/${id}`
			editRoute = `/editor/${type}s/${keys.editAction}/${id}`
			break
	}

	return { viewRoute, editRoute }
}

/**
 * Get all the URL parameters
 * @param  {String} search  By default window.location.search
 * @return {Object}         The URL parameters
 */
export const getAllQueryVariables = function (search?: string) {
	search = search ? search : window.location.search
	const params: any = new URLSearchParams(search)
	let paramObj: any = {}
	for (var value of params.keys()) {
		paramObj[value] = params.get(value)
	}
	console.log('Query variables: ', paramObj)
	return paramObj
}
