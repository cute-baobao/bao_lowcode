import { useComponentConfigStore } from '@/editor/store/compoentsConfig';
import useComponentsStore from '@/editor/store/components';
import { Collapse, CollapseProps, Select } from 'antd';
import style from './index.module.scss';
import GoToLink from './actions/GoToLink';
import ShowMessage from './actions/ShowMessage';

const ComponentEvent = () => {
	const { componentConfig } = useComponentConfigStore();
	const { curComponent, curComponentId, updateCompoentsProps } =
		useComponentsStore();

	if (!curComponent) return null;
	const selectAction = (key: string, value: string) => {
		if (!curComponentId) return;
		updateCompoentsProps(curComponentId, { [key]: { type: value } });
	};

	const events: CollapseProps['items'] = (
		componentConfig[curComponent.name].events || []
	).map((event) => {
		return {
			key: event.name,
			label: event.label,
			children: (
				<div>
					<div className={style.event_wrapper}>
						<div>动作：</div>
						<Select
							className={style.event_wrapper_select}
							options={[
								{ label: '显示提示', value: 'showMessage' },
								{ label: '跳转链接', value: 'goToLink' },
							]}
							value={curComponent?.props?.[event.name]?.type}
							onChange={(value) => selectAction(event.name, value)}
						/>
					</div>
					{curComponent?.props?.[event.name]?.type === 'goToLink' && (
						<GoToLink event={event} />
					)}
					{curComponent?.props?.[event.name]?.type === 'showMessage' && (
						<ShowMessage event={event} />
					)}
				</div>
			),
		};
	});

	return (
		<div>
			<Collapse items={events} />
		</div>
	);
};

export default ComponentEvent;
