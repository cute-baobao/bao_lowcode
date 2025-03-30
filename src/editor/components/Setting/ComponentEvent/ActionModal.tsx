import { Modal, Segmented } from 'antd';
import { useEffect, useState } from 'react';
import GoToLink, { GoToLinkConfig } from '../actions/GoToLink';
import ShowMessage, { ShowMessageConfig } from '../actions/ShowMessage';
import CustomJs, { CustomJSConfig } from '../actions/CustomJS';
import ComponentMethod, {
	ComponentMethodConfig,
} from '../actions/ComponentMethod';

export type EventConfig =
	| GoToLinkConfig
	| ShowMessageConfig
	| CustomJSConfig
	| ComponentMethodConfig;

interface ActionModalProps {
	visible: boolean;
	action?: EventConfig;
	handleOk: (config?: EventConfig) => void;
	handleCancel: () => void;
}

const map = {
	goToLink: '访问链接',
	showMessage: '消息提示',
	customJS: '自定义JS',
	componentMethod: '组件方法',
};

const ActionModal = (props: ActionModalProps) => {
	const { visible, action, handleOk, handleCancel } = props;
	const [key, setKey] = useState('访问链接');
	const [curConfig, setCurConfig] = useState<EventConfig>();

	useEffect(() => {
		if (action) setKey(map[action.type]);
	}, [action]);

	return (
		<Modal
			title="事件配置"
			onOk={() => handleOk(curConfig)}
			okText="添加"
			cancelText="取消"
			onCancel={handleCancel}
			open={visible}
		>
			<Segmented
				block
				value={key}
				onChange={setKey}
				options={['访问链接', '消息提示', '组件方法', '自定义JS']}
			/>
			{key === '访问链接' && (
				<GoToLink
					value={action?.type === 'goToLink' ? action.url : ''}
					onChange={(item) => {
						setCurConfig(item);
					}}
				/>
			)}
			{key === '消息提示' && (
				<ShowMessage
					value={action?.type === 'showMessage' ? action.config : undefined}
					onChange={(item) => {
						setCurConfig(item);
					}}
				/>
			)}
			{key === '组件方法' && (
				<ComponentMethod
					value={action?.type === 'componentMethod' ? action.config : undefined}
					onChange={(item) => {
						setCurConfig(item);
					}}
				/>
			)}
			{key === '自定义JS' && (
				<CustomJs
					value={action?.type === 'customJS' ? action.code : ''}
					onChange={(item) => {
						setCurConfig(item);
					}}
				/>
			)}
		</Modal>
	);
};

export default ActionModal;
