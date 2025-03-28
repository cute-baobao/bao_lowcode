import { useComponentConfigStore } from '@/editor/store/compoentsConfig';
import useComponentsStore, { Component } from '@/editor/store/components';
import React from 'react';
import style from './index.module.scss';
import { message } from 'antd';

const Preview = () => {
	const { components } = useComponentsStore();
	const { componentConfig } = useComponentConfigStore();

	const handleEvent = (compoent: Component) => {
		const props: Record<string, any> = {};
		componentConfig[compoent.name].events?.forEach((event) => {
			const eventConfig = compoent.props[event.name];
			if (!eventConfig) return;
			const { type, url, config } = eventConfig;
			props[event.name] = () => {
				console.log('我被出发了');
				if (type === 'goToLink' && url) window.location.href = url;
				else if (type === 'showMessage' && config)
					if (config.type === 'success') message.success(config.text);
					else message.error(config.text);
			};
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
