import { useComponentConfigStore } from '@/editor/store/compoentsConfig';
import useComponentsStore, { Component } from '@/editor/store/components';
import React, { useRef } from 'react';
import style from './index.module.scss';
import { message } from 'antd';
import { EventConfig } from '../Setting/ComponentEvent/ActionModal';

const Preview = () => {
	const { components } = useComponentsStore();
	const { componentConfig } = useComponentConfigStore();
	const componentRefs = useRef<Record<string, any>>({});

	const handleEvent = (component: Component) => {
		const props: Record<string, any> = {};
		componentConfig[component.name].events?.forEach((event) => {
			const eventConfig = component.props[event.name];
			if (eventConfig) {
				props[event.name] = (...args: any[]) => {
					eventConfig.actions?.forEach((item: EventConfig) => {
						if (item.type === 'goToLink' && item.url)
							window.location.href = item.url;
						else if (item.type === 'showMessage' && item.config) {
							if (item.config.type === 'success')
								message.success(item.config.text);
							else message.error(item.config.text);
						} else if (item.type === 'customJS') {
							const func = new Function('context', 'args', item.code);
							func(
								{
									name: component.name,
									props: component.props,
									showMessage(content: string) {
										message.success(content);
									},
								},
								args
							);
						} else if (item.type === 'componentMethod') {
							const method = componentRefs.current[item.config.componentId];
							if (method) method[item.config.method]?.(...args);
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
					ref:
						config.prod?.$$typeof === Symbol.for('react.forward_ref')
							? (ref: Record<string, any>) => {
									componentRefs.current[component.id] = ref;
							  }
							: undefined,
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
