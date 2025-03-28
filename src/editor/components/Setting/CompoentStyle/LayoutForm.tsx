import { useComponentConfigStore } from '@/editor/store/compoentsConfig';
import useComponentsStore from '@/editor/store/components';
import renderFormElement from '@/utils/renderFormElement';
import { Divider, Form } from 'antd';
import { CSSProperties, useEffect } from 'react';

const LayoutForm = () => {
	const [form] = Form.useForm();
	const { curComponent, curComponentId, updateComponentStyle } =
		useComponentsStore();
	const { componentConfig } = useComponentConfigStore();
	useEffect(() => {
		form.resetFields();
		const data = form.getFieldsValue();
		form.setFieldsValue({ ...data, ...curComponent?.styles });
	}, [curComponent, form]);

	if (!curComponent || !curComponentId) return null;
	const valueChange = (changeValues: CSSProperties) => {
		if (curComponentId) updateComponentStyle(curComponentId, changeValues);
	};

	return (
		<div>
			<Divider orientation="left" style={{ borderColor: '#1890ff' }}>
				布局
			</Divider>
			<Form
				form={form}
				onValuesChange={valueChange}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 14 }}
			>
				{curComponent &&
					componentConfig[curComponent.name].layoutSetter?.map((setter) => {
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
export default LayoutForm;
