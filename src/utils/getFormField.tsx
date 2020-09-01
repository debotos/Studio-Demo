import React from 'react'
import { Form, Input, Radio, Select, Checkbox, Switch, InputNumber } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

export function getFormField(fieldInfo: any, form: any, initialValues: any, isLastField: boolean) {
	if (!fieldInfo) return null

	const { label, key, type, placeholder, hasFeedback, options, validations, styles } = fieldInfo

	switch (type) {
		case 'checkbox': {
			return (
				<Form.Item
					key={key}
					name={key}
					label={label}
					validateFirst
					valuePropName={'checked'}
					rules={[...validations]}
					style={{ ...styles }}
				>
					<Checkbox />
				</Form.Item>
			)
		}
		case 'switch': {
			return (
				<Form.Item
					key={key}
					name={key}
					label={label}
					validateFirst
					valuePropName={'checked'}
					rules={[...validations]}
					style={{ ...styles }}
				>
					<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
				</Form.Item>
			)
		}
		case 'checkbox-group': {
			return (
				<Form.Item
					key={key}
					name={key}
					label={label}
					validateFirst
					rules={[...validations]}
					style={{ ...styles }}
					labelCol={{ span: 24 }}
				>
					<Checkbox.Group options={options} />
				</Form.Item>
			)
		}
		case 'radio': {
			return (
				<Form.Item
					key={key}
					name={key}
					label={label}
					validateFirst
					rules={[...validations]}
					style={{ ...styles }}
					labelCol={{ span: 24 }}
				>
					<Radio.Group options={options} />
				</Form.Item>
			)
		}
		case 'select': {
			return (
				<Form.Item
					key={key}
					name={key}
					label={label}
					validateFirst
					rules={[...validations]}
					labelCol={{ span: 24 }}
					style={{ ...styles }}
				>
					<Select
						placeholder={placeholder}
						allowClear
						showSearch
						filterOption={(input: string, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					>
						{options.map((option: any, index: number) => {
							const { label, value, disabled } = option
							return (
								<Select.Option key={index} value={value} disabled={disabled}>
									{label}
								</Select.Option>
							)
						})}
					</Select>
				</Form.Item>
			)
		}
		case 'textarea': {
			return (
				<Form.Item
					key={key}
					name={key}
					label={label}
					validateFirst
					rules={[...validations]}
					labelCol={{ span: 24 }}
					style={{ ...styles }}
				>
					<Input.TextArea allowClear placeholder={placeholder} rows={fieldInfo.rows || 4} />
				</Form.Item>
			)
		}

		case 'number': {
			return (
				<Form.Item
					key={key}
					name={key}
					label={label}
					validateFirst
					rules={[...validations]}
					labelCol={{ span: 24 }}
					style={{ ...styles }}
				>
					<InputNumber placeholder={placeholder} />
				</Form.Item>
			)
		}

		default: {
			return (
				<Form.Item
					key={key}
					name={key}
					label={label}
					labelCol={{ span: 24 }}
					rules={[...validations]}
					hasFeedback={hasFeedback}
					validateFirst
					style={{ ...styles }}
				>
					<Input placeholder={placeholder} type={type} allowClear />
				</Form.Item>
			)
		}
	}
}

export default getFormField
