import {
	ComponentConfig,
	useComponentConfigStore,
} from '@/editor/store/compoentsConfig';
import useComponentsStore from '@/editor/store/components';
import debounce from '@/utils/debounce';
import renderFormElement from '@/utils/renderFormElement';
import { Divider, Form, Input } from 'antd';
import { useEffect } from 'react';
import RadioGroupsFormList from './RadioGropsFormList';

const AttrForm = () => {
	const [form] = Form.useForm();
	const { curComponent, curComponentId, updateCompoentsProps } =
		useComponentsStore();
	const { componentConfig } = useComponentConfigStore();

	useEffect(() => {
		form.resetFields();
		const data = form.getFieldsValue();
		form.setFieldsValue({ ...data, ...curComponent?.props });
	}, [curComponent, form]);

	const valueChange = debounce((changeValues: ComponentConfig) => {
		if (curComponentId) updateCompoentsProps(curComponentId, changeValues);
	}, 200);
	if (!curComponent || !curComponent) return null;
	return (
		<div>
			<Divider orientation="left" style={{ borderColor: '#1890ff' }}>
				属性
			</Divider>
			<Form
				form={form}
				onValuesChange={valueChange}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 14 }}
			>
				<Form.Item label="组件ID">
					<Input value={curComponent?.id} disabled />
				</Form.Item>
				<Form.Item label="组件名称">
					<Input value={curComponent?.name} disabled />
				</Form.Item>
				<Form.Item label="组件描述">
					<Input value={curComponent?.desc} disabled />
				</Form.Item>
				{curComponent &&
					componentConfig[curComponent.name].setter?.map((setter) => (
						<Form.Item
							key={setter.name}
							name={setter.name}
							label={setter.label}
						>
							{renderFormElement(setter)}
						</Form.Item>
					))}
				{curComponent.name === 'FormItem' ? <RadioGroupsFormList /> : null}
			</Form>
		</div>
	);
};

export default AttrForm;
