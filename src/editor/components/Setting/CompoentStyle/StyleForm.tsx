import { useComponentConfigStore } from '@/editor/store/compoentsConfig';
import useComponentsStore from '@/editor/store/components';
import debounce from '@/utils/debounce';
import renderFormElement from '@/utils/renderFormElement';
import { Divider, Form } from 'antd';
import { AggregationColor } from 'antd/es/color-picker/color';
import { CSSProperties, useEffect } from 'react';
const StyleForm = () => {
	const [form] = Form.useForm();
	const { curComponent, curComponentId, updateComponentStyle } =
		useComponentsStore();
	const { componentConfig } = useComponentConfigStore();
	useEffect(() => {
		form.resetFields();
		const data = form.getFieldsValue();
		form.setFieldsValue({
			...data,
			...curComponent?.props,
			...curComponent?.styles,
		});
	}, [form, curComponent]);

	const getRgb = (color: string) => {
		const temp = color as unknown as AggregationColor;
		return temp.toCssString();
	};

	const valueChange = debounce((changeValues: CSSProperties) => {
		console.log(changeValues);
		if (changeValues.backgroundColor) {
			changeValues.backgroundColor = getRgb(changeValues.backgroundColor);
		}
		if (changeValues.color) changeValues.color = getRgb(changeValues.color);
		if (curComponentId) updateComponentStyle(curComponentId, changeValues);
	}, 200);

	if (!curComponentId && !curComponent) return null;

	return (
		<div>
			<Divider orientation="left" style={{ borderColor: '#1890ff' }}>
				基础样式
			</Divider>
			<Form
				form={form}
				onValuesChange={valueChange}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 14 }}
			>
				{curComponent &&
					componentConfig[curComponent.name].styleSetter?.map((setter) => {
						return (
							<Form.Item
								key={setter.name}
								name={setter.name}
								label={setter.label}
							>
								{renderFormElement(setter)}
							</Form.Item>
						);
					})}
			</Form>
		</div>
	);
};

export default StyleForm;
