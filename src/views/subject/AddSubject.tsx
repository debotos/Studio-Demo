import React from 'react'

import AppForm from '../../components/form/AppForm'
import { getAllQueryVariables } from '../../utils/helpers'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import keys from '../../config/keys'

export const metadata = {
	form_type: 'create' as const,
	schema_for: 'subject' as const,
	label: 'Create Subject',
	fields: [
		{
			label: 'Subject name',
			key: 'subject_name',
			type: 'text',
			placeholder: 'Subject name',
			has_feedback: true,
			validations: [
				{ whitespace: true, required: true, message: 'Subject name is required' },
				{ min: 2, message: 'Minimum length is 2' },
				{ max: 50, message: 'Max value length is 50' },
			],
		},
		{
			label: 'Author name',
			key: 'author_name',
			type: 'text',
			placeholder: 'Author name',
			has_feedback: true,
			validations: [],
		},
		{
			label: 'Upload image',
			key: 'image',
			type: 'upload-image',
			has_feedback: true,
			validations: [],
		},
	],
}

export default function () {
	const initValues = getAllQueryVariables()

	const breadcrumbItems: any[] = [{ name: 'Create new subject', path: `/editor/subject/${keys.createAction}`, isLink: false }]

	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
			<AppForm metadata={{ ...metadata, initValues }} />
		</>
	)
}
