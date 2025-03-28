import { Input } from 'antd';
import style from './index.module.scss';
import useComponentsStore from '@/editor/store/components';
import { ComponentEvent } from '@/editor/store/compoentsConfig';

interface GoToLinkProps {
	event: ComponentEvent;
}

const GoToLink = (props: GoToLinkProps) => {
	const { event } = props;
	const { curComponent, curComponentId, updateCompoentsProps } =
		useComponentsStore();
	if (!curComponent) return null;
	const urlChangeHandle = (key: string, value: string) => {
		if (!curComponentId) return;
		updateCompoentsProps(curComponentId, {
			[key]: {
				...curComponent?.props?.[key],
				url: value,
			},
		});
	};

	return (
		<div>
			<div className={style.event_form}>
				<div>链接: </div>
				<Input
					value={curComponent.props[event.name].url}
					onChange={(e) => {
						urlChangeHandle(event.name, e.target.value);
					}}
					className={style.event_form_input}
					placeholder="输入url链接"
				/>
			</div>
		</div>
	);
};

export default GoToLink;
