import {
	ComponentEvent as Event,
	useComponentConfigStore,
} from '@/editor/store/compoentsConfig';
import useComponentsStore from '@/editor/store/components';
import { Button, Collapse, CollapseProps, message } from 'antd';
import style from './index.module.scss';
import { useState } from 'react';
import ActionModal, { EventConfig } from './ActionModal';
import { Icon } from '@iconify/react/dist/iconify.js';

const ComponentEvent = () => {
	const { componentConfig } = useComponentConfigStore();
	const { curComponent, curComponentId, updateCompoentsProps } =
		useComponentsStore();
	const [actionModalOpen, setActionModalOpen] = useState(false);
	const [curEvent, setCurEvent] = useState<Event>();
	const [curAciton, setCurAction] = useState<EventConfig>();
	const [curAcitonIndex, setCurActionIndex] = useState<number>();

	if (!curComponent) return null;

	const deleteAction = (event: Event, index: number) => {
		if (!curComponent) {
			return;
		}

		const actions = curComponent.props[event.name]?.actions;

		actions.splice(index, 1);

		updateCompoentsProps(curComponent.id, {
			[event.name]: {
				actions: actions,
			},
		});
	};

	const editorAction = (item: EventConfig, index: number, event: Event) => {
		if (!curComponent) return;
		setCurEvent(event);
		setCurAction(item);
		setCurActionIndex(index);
		setActionModalOpen(true);
	};

	const events: CollapseProps['items'] = (
		componentConfig[curComponent.name].events || []
	).map((event) => {
		return {
			key: event.name,
			label: (
				<div className={style.event_wrapper}>
					{event.label}
					<Button
						type="primary"
						onClick={(e) => {
							e.stopPropagation();
							setCurAction(undefined);
							setActionModalOpen(true);
						}}
					>
						添加动作
					</Button>
				</div>
			),
			children: (
				<div>
					{(curComponent.props[event.name]?.actions || []).map(
						(item: EventConfig, index: number) => {
							return (
								<div
									className={style.event_action_wrapper}
									key={`${item.type}_${index}`}
								>
									{item.type === 'goToLink' && (
										<div className={style.event_action_item}>
											<div className={style.event_action_item_title}>
												跳转链接
											</div>
											<div>url:{item.url}</div>
											<div className={style.event_action_editArea}>
												<Icon
													className={style.event_action_editArea_button}
													onClick={() => editorAction(item, index, event)}
													icon="mdi:file-edit-outline"
												/>
												<Icon
													className={style.event_action_editArea_button}
													onClick={() => deleteAction(event, index)}
													icon="mdi:delete"
												/>
											</div>
										</div>
									)}
									{item.type === 'showMessage' && (
										<div className={style.event_action_item}>
											<div className={style.event_action_item_title}>
												消息弹窗
											</div>
											<div>类型:{item.config.type}</div>
											<div>文本:{item.config.text}</div>
											<div className={style.event_action_editArea}>
												<Icon
													className={style.event_action_editArea_button}
													onClick={() => editorAction(item, index, event)}
													icon="mdi:file-edit-outline"
												/>
												<Icon
													className={style.event_action_editArea_button}
													onClick={() => deleteAction(event, index)}
													icon="mdi:delete"
												/>
											</div>
										</div>
									)}
									{item.type === 'customJS' && (
										<div className={style.event_action_item}>
											<div className={style.event_action_item_title}>
												自定义JS
											</div>
											<div className={style.event_action_editArea}>
												<Icon
													className={style.event_action_editArea_button}
													onClick={() => editorAction(item, index, event)}
													icon="mdi:file-edit-outline"
												/>
												<Icon
													className={style.event_action_editArea_button}
													onClick={() => deleteAction(event, index)}
													icon="mdi:delete"
												/>
											</div>
										</div>
									)}
								</div>
							);
						}
					)}
				</div>
			),
		};
	});

	const handleModelOk = (config?: EventConfig) => {
		if (!config || !curComponent || !curEvent || !curComponentId) {
			console.log(config, curComponent, curEvent, curComponentId);
			return message.error('添加事件失败');
		}
		if (curAciton) {
			updateCompoentsProps(curComponentId, {
				[curEvent.name]: {
					actions: curComponent.props[curEvent.name]?.actions.map(
						(item: EventConfig, index: number) => {
							return index === curAcitonIndex ? config : item;
						}
					),
				},
			});
		} else {
			updateCompoentsProps(curComponentId, {
				[curEvent.name]: {
					actions: [
						...(curComponent.props[curEvent.name]?.actions || []),
						config,
					],
				},
			});
		}
		setCurAction(undefined);
		setActionModalOpen(false);
	};

	return (
		<div>
			<Collapse
				items={events}
				defaultActiveKey={componentConfig[curComponent.name].events?.map(
					(item) => item.name
				)}
			/>
			<ActionModal
				action={curAciton}
				visible={actionModalOpen}
				handleOk={handleModelOk}
				handleCancel={() => {
					setCurAction(undefined);
					setCurActionIndex(undefined);
					setActionModalOpen(false);
				}}
			/>
		</div>
	);
};

export default ComponentEvent;
