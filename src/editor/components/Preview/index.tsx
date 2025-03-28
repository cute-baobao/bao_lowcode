import { useComponentConfigStore } from '@/editor/store/compoentsConfig';
import useComponentsStore, { Component } from '@/editor/store/components';
import React from 'react';
import style from './index.module.scss';
import { message } from 'antd';
import { EventConfig } from '../Setting/ComponentEvent/ActionModal';

const Preview = () => {
	const { components } = useComponentsStore();
	const { componentConfig } = useComponentConfigStore();

	const handleEvent = (component: Component) => {
		const props: Record<string, any> = {};
		componentConfig[component.name].events?.forEach((event) => {
			const eventConfig = component.props[event.name];
			if (eventConfig) {
				props[event.name] = () => {
					eventConfig.actions?.forEach((item: EventConfig) => {
						if (item.type === 'goToLink' && item.url)
							window.location.href = item.url;
						else if (item.type === 'showMessage' && item.config) {
							if (item.config.type === 'success')
								message.success(item.config.text);
							else message.error(item.config.text);
						} else if (item.type === 'customJS') {
							const func = new Function(item.code);
							func();
						}
					});
				};
			}
		});
		return props;
	};

	const renderComponents = (compoents: Component[]): React.ReactNode => {
		return compoents.map((component) => {
			const config = componentConfig?.[component.name];
			if (!config?.prod) return null;
			return React.createElement(
				config.prod,
				{
					key: component.id,
					id: component.id,
					name: component.name,
					style: component.styles,
					...config.defaultProps,
					...component.props,
					...handleEvent(component),
				},
				renderComponents(component.children || [])
			);
		});
	};
	return <div className={style.preview}>{renderComponents(components)}</div>;
};

export default Preview;
