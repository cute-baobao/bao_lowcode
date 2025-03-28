import useMaterialDrag from '@/editor/hooks/useMaterialDrag';
import useMaterialDrop from '@/editor/hooks/useMaterialDrop';
import { CommonComponentProps } from '@/editor/interface';
import { Divider, Form, Input } from 'antd';
import React, { useEffect, useMemo, useRef } from 'react';
import style from './index.module.scss';

const FormDev = ({
	id,
	name,
	onFinish,
	children,
	title,
	style: propsStyle,
}: CommonComponentProps) => {
	const [form] = Form.useForm();
	const divRef = useRef<HTMLDivElement>(null);
	const [{ canDrop }, drop] = useMaterialDrop(['FormItem'], id);
	const [, drag] = useMaterialDrag(name, {
		type: name,
		dragType: 'move',
		id,
	});
	useEffect(() => {
		drop(divRef);
		drag(divRef);
	}, []);

	const formItems = useMemo(() => {
		return React.Children.map(children, (item: any) => {
			return {
				label: item.props?.label,
				name: item.props?.name,
				type: item.props?.type,
				id: item.props?.id,
				style: item.props?.style,
			};
		});
	}, [children]);

	return (
		<div
			className={style.form_wrapper}
			style={{
				border: canDrop ? `2px solid blue` : '1px solid #ccc',
			}}
			data-component-id={id}
			ref={divRef}
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
				labelCol={{ span: 4 }}
				wrapperCol={{ flex: 'auto' }}
				onFinish={(values) => {
					if (onFinish) {
						onFinish(values);
					}
				}}
				style={{ ...propsStyle }}
			>
				{formItems.map((item: any) => {
					return (
						<Form.Item
							key={item.id}
							data-component-id={item.id}
							name={item.name}
							label={item.label}
							style={{ ...item.style }}
						>
							<Input style={{ pointerEvents: 'none' }} />
						</Form.Item>
					);
				})}
			</Form>
		</div>
	);
};

export default FormDev;
