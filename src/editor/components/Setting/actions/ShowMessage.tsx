import { Input, Select } from 'antd';
import style from './index.module.scss';
import useComponentsStore from '@/editor/store/components';
import { ComponentEvent } from '@/editor/store/compoentsConfig';
interface ShowMessageProps {
	event: ComponentEvent;
}
const ShowMessage = (props: ShowMessageProps) => {
	const { event } = props;
	const { curComponent, curComponentId, updateCompoentsProps } =
		useComponentsStore();
	if (!curComponentId || !curComponent) return;
	const messageTypeHandle = (key: string, value: string) => {
		if (!curComponentId) return;
		updateCompoentsProps(curComponentId, {
			[key]: {
				...curComponent.props[key],
				config: {
					...curComponent.props[key].config,
					type: value,
				},
			},
		});
	};
	const messageTextHandle = (key: string, value: string) => {
		if (!curComponentId) return;
		updateCompoentsProps(curComponentId, {
			[key]: {
				...curComponent.props[key],
				config: {
					...curComponent.props[key].config,
					text: value,
				},
			},
		});
	};
	return (
		<div>
			<div className={style.event_form}>
				<div>类型: </div>
				<Select
					className={style.event_form_select}
					value={curComponent.props[event.name]?.config?.type}
					onChange={(value) => {
						messageTypeHandle(event.name, value);
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
						messageTextHandle(event.name, e.target.value);
					}}
					value={curComponent.props[event.name]?.config?.text}
					className={style.event_form_input}
					placeholder="输入消息文本"
				/>
			</div>
		</div>
	);
};

export default ShowMessage;
