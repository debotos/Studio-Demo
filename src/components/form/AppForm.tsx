import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col, Upload, Modal, Typography } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import { getFormField } from '../../utils/getFormField'
import { RootState } from '../../redux/store'
import { getBase64 } from '../../utils/helpers'

interface CProps {
	metadata: {
		label: string
		fields: any[]
		initValues?: any
	}
}

export function AppForm(props: CProps) {
	const { metadata } = props
	const { label, fields, initValues: initialValues } = metadata
	const [form] = Form.useForm()
	const sideNav = useSelector((state: RootState) => state.settings.sideNav)
	const sideNavPinned = sideNav === 'pinned'
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

	const fieldKeyList = fields.map((x: any) => x.key)
	const initialValuesArray = Object.keys(initialValues || {})

	const getCols = () => {
		let cols = { xs: 24, sm: 16, md: 12, lg: 9, xl: 8, xxl: 6 }
		if (sideNavPinned) {
			cols = { xs: 24, sm: 20, md: 16, lg: 13, xl: 10, xxl: 8 }
		}
		return cols
	}

	return (
		<>
			<Row justify='center'>
				<Col {...getCols()}>
					<Typography.Title level={2}>{label}</Typography.Title>
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
											// console.log('Upload event:', e)
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

export default AppForm
