import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col, Upload, Modal } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { getFormField } from '../../utils/getFormField'
import { getBase64 } from '../../utils/helpers'

const metadata = {
	schema_for: 'subject',
	label: 'Create Subject',
	initial_values: {},
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

export default function AddSubject() {
	const [form] = Form.useForm()
	const [, forceUpdate] = useState()
	const [previewImageTitle, setPreviewImageTitle] = useState('')
	const [previewImage, setPreviewImage] = useState(undefined)
	const [imagePreviewModal, setImagePreviewModal] = useState(false)
	const [imageFileList, setImageFileList] = useState([])
	const [afterTodo, setAfterTodo] = useState('exit') // 'exit' || 'continue'

	// To disable submit button at the beginning.
	useEffect(() => forceUpdate({}), [])

	const onFinish = (values: any) => {
		console.log('Finish:', values)
		console.log('AfterTodo:', afterTodo)
	}

	const handleImagePreview = async (file: any) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj)
		}
		setPreviewImage(file.url || file.preview)
		setPreviewImageTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
		setImagePreviewModal(true)
	}

	const checkFieldsError = () => !!form.getFieldsError().filter(({ errors }) => errors.length).length

	const { label, fields, initial_values: initialValues } = metadata
	const fieldKeyList = fields.map((x) => x.key)
	const initialValuesArray = Object.keys(initialValues || {})

	return (
		<>
			<Row justify='center'>
				<Col xs={24} sm={16} md={12} lg={9} xl={7} xxl={5}>
					<Form
						form={form}
						name={label.toLowerCase().split(' ').join('_')}
						layout='horizontal'
						onFinish={onFinish}
						initialValues={initialValues}
						scrollToFirstError={true}
					>
						{fields.map((field: any, index: number) => {
							const { label, key, has_feedback: hasFeedback } = field
							const validations = field.validations || []
							const styles = { marginBottom: 5 } // Apply on every form item

							if (field.type === 'upload-image') {
								return (
									<Form.Item
										key={key}
										name={key}
										label={label}
										labelCol={{ span: 24 }}
										rules={[...validations]}
										hasFeedback={hasFeedback}
										getValueFromEvent={(e) => {
											console.log('Upload event:', e)
											if (Array.isArray(e)) {
												return e
											}
											return e && e.fileList
										}}
										validateFirst
										valuePropName='fileList'
										style={{ ...styles }}
									>
										<Upload
											accept='image/png, image/jpeg, image/jpg'
											listType='picture-card'
											fileList={imageFileList}
											onPreview={handleImagePreview}
											onChange={({ fileList }: any) => setImageFileList(fileList)}
											beforeUpload={(file, fileList) => {
												// console.log(file, fileList)
												return false /* To stop the default upload behavior */
											}}
										>
											{imageFileList.length >= 1 ? null : <UploadOutlined style={{ fontSize: 35 }} />}
										</Upload>
									</Form.Item>
								)
							}
							const fieldInfo = { ...field, hasFeedback, validations, styles }
							return getFormField(fieldInfo, form, initialValues, index + 1 === fields.length)
						})}
						<Form.Item shouldUpdate={true} style={{ marginTop: 20 }}>
							{() => {
								const isFieldsNotTouched = !form.isFieldsTouched(
									fieldKeyList.filter((key: any) => !initialValuesArray.includes(key))
								)
								const haveFieldsError = checkFieldsError()

								// console.log({ isFieldsNotTouched, haveFieldsError })
								const disabled = isFieldsNotTouched || haveFieldsError

								return (
									<>
										<Button
											disabled={disabled}
											htmlType='submit'
											onClick={() => setAfterTodo('continue')}
											style={{ marginRight: 10, marginBottom: 10 }}
											shape='round'
											type='primary'
										>
											Continue...
										</Button>
										<Button
											disabled={disabled}
											htmlType='submit'
											onClick={() => setAfterTodo('exit')}
											style={{ marginBottom: 10 }}
											shape='round'
										>
											Save and exit
										</Button>
									</>
								)
							}}
						</Form.Item>
					</Form>
				</Col>
			</Row>
			<Modal
				visible={imagePreviewModal}
				title={`${previewImageTitle}`}
				footer={null}
				onCancel={() => setImagePreviewModal(false)}
				width='90vw'
			>
				<img alt={previewImageTitle} style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</>
	)
}
