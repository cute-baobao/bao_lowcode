import { Input, Select } from 'antd';
import style from './index.module.scss';
import useComponentsStore from '@/editor/store/components';
import { useEffect, useState } from 'react';
export interface ShowMessageConfig {
	type: 'showMessage';
	config: {
		type: 'success' | 'error';
		text: string;
	};
}

interface ShowMessageProps {
	value?: ShowMessageConfig['config'];
	defaultValue?: ShowMessageConfig['config'];
	onChange: (config: ShowMessageConfig) => void;
}
const ShowMessage = (props: ShowMessageProps) => {
	const { defaultValue, value, onChange } = props;
	const { curComponent, curComponentId } = useComponentsStore();

	const [type, setType] = useState<'success' | 'error'>(
		defaultValue?.type || 'success'
	);
	const [text, setText] = useState<string>(defaultValue?.text || '');

	useEffect(() => {
		if (value) {
			setType(value.type);
			setText(value.text);
		}
	}, [value]);

	if (!curComponentId || !curComponent) return null;

	const messageTypeHandle = (value: 'success' | 'error') => {
		setType(value);
		onChange({
			type: 'showMessage',
			config: {
				type: value,
				text,
			},
		});
	};
	const messageTextHandle = (value: string) => {
		setText(value);
		onChange({
			type: 'showMessage',
			config: {
				type,
				text: value,
			},
		});
	};
	return (
		<div>
			<div className={style.event_form}>
				<div>类型: </div>
				<Select
					className={style.event_form_select}
					value={type}
					onChange={(value) => {
						messageTypeHandle(value);
					}}
					options={[
						{ label: '成功', value: 'success' },
						{ label: '失败', value: 'error' },
					]}
				/>
			</div>
			<div className={style.event_form}>
				<div>文本: </div>
				<Input
					onChange={(e) => {
						messageTextHandle(e.target.value);
					}}
					value={text}
					className={style.event_form_input}
					placeholder="输入消息文本"
				/>
			</div>
		</div>
	);
};

export default ShowMessage;
