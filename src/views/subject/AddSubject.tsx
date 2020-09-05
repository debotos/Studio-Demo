import React from 'react'

import AppForm from '../../components/form/AppForm'
import { getAllQueryVariables } from '../../utils/helpers'

export const metadata = {
	schema_for: 'subject',
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

	return (
		<>
			<AppForm metadata={{ ...metadata, initValues }} />
		</>
	)
}
