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

export const truncate = (input: string = '', length: number = 5) =>
	input.length > length ? `${input.substring(0, length)}...` : input
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

export const getCreateElementFormBreadcrumb = (queryVars: any, type: EditorDataType) => {
	let breadcrumbItems: any[] = []
	if (!isEmpty(queryVars)) {
		const subjectTitle = queryVars['subjectTitle']
		const subjectID = queryVars['subjectID']
		const levelTitle = queryVars['levelTitle']
		const levelID = queryVars['levelID']
		const unitTitle = queryVars['unitTitle']
		const unitID = queryVars['unitID']
		const lessonTitle = queryVars['lessonTitle']
		const lessonID = queryVars['lessonID']
		if (subjectTitle && subjectID) {
			breadcrumbItems = [
				...breadcrumbItems,
				{ name: 'Subjects', path: `/editor/subjects`, isLink: true },
				{ name: subjectTitle, path: `/editor/subjects/${keys.viewAction}/${subjectID}`, isLink: true },
			]
			if (levelTitle && levelID) {
				breadcrumbItems.push({
					name: levelTitle,
					path: `/editor/${subjectID}/levels/${keys.viewAction}/${levelID}`,
					isLink: true,
				})
				if (unitTitle && unitID) {
					breadcrumbItems.push({
						name: unitTitle,
						path: `/editor/${subjectID}/${levelID}/units/${keys.viewAction}/${unitID}`,
						isLink: true,
					})
					if (lessonTitle && lessonID) {
						breadcrumbItems.push({
							name: lessonTitle,
							path: `/editor/${subjectID}/${levelID}/${unitID}/lessons/${keys.viewAction}/${lessonID}`,
							isLink: true,
						})
					}
				}
			}
		}
	}
	breadcrumbItems.push({ name: `Create new ${type}`, path: `/editor/${type}/${keys.createAction}`, isLink: false })
	return breadcrumbItems
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

export const getContainer = (node: any, property: string = 'parentElement'): HTMLElement => node[property] ?? document.body
export const sortByIndex = (array: any[] = []) => array.sort((a, b) => a.index - b.index)
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
