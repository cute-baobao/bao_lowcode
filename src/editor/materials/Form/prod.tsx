import { CommonComponentProps } from '@/editor/interface';
import { DatePicker, Divider, Form, Input } from 'antd';
import React, {
	forwardRef,
	ForwardRefRenderFunction,
	useImperativeHandle,
	useMemo,
} from 'react';
import style from './index.module.scss';
import dayjs from 'dayjs';

interface FormRef {
	submit: () => void;
}

const FormProd: ForwardRefRenderFunction<
	FormRef,
	Omit<CommonComponentProps, 'ref'>
> = ({ onFinish, children, title, style: propsStyle }, ref) => {
	const [form] = Form.useForm();

	const formItems = useMemo(() => {
		return React.Children.map(children, (item: any) => {
			return {
				label: item.props?.label,
				name: item.props?.name,
				type: item.props?.type,
				id: item.props?.id,
				rules: item.props?.rules,
				style: item.props?.style,
			};
		});
	}, [children]);

	useImperativeHandle(
		ref,
		() => {
			return {
				submit: () => {
					form.submit();
				},
			};
		},
		[form]
	);

	const save = async (values: any) => {
		Object.keys(values).forEach((key) => {
			if (dayjs.isDayjs(values[key])) {
				values[key] = values[key].format('YYYY-MM-DD');
			}
		});
		onFinish(values);
	};

	return (
		<div
			className={style.prod_form_wrapper}
			style={{
				backgroundColor:
					propsStyle && 'backgroundColor' in propsStyle
						? propsStyle.backgroundColor
						: '',
			}}
		>
			<Divider
				style={{
					color:
						propsStyle && 'color' in propsStyle
							? propsStyle.color
							: 'rgba(0,0,0,0.85)',
				}}
				orientation="left"
			>
				{title}
			</Divider>
			<Form
				form={form}
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 18 }}
				onFinish={save}
				style={{ ...propsStyle }}
			>
				{formItems.map((item: any) => {
					return (
						<Form.Item
							key={item.id}
							name={item.name}
							label={item.label}
							rules={
								item.rules === 'required'
									? [{ required: true, message: `${item.label}不能为空` }]
									: []
							}
							style={{ ...item.style }}
						>
							{item.type === 'input' ? (
								<Input />
							) : item.type === 'date' ? (
								<DatePicker />
							) : null}
						</Form.Item>
					);
				})}
			</Form>
		</div>
	);
};

export default forwardRef(FormProd);
