import React, { MouseEventHandler, useState } from 'react';
import useComponentsStore, { Component } from '../../store/components';
import { useComponentConfigStore } from '../../store/compoentsConfig';
import style from './index.module.scss';
import HoverMask from '../HoverMask';
import SelectedMask from '../SelectMask';

const EditorArea = () => {
	const { componentConfig } = useComponentConfigStore();
	const { components, setCurComponent, curComponentId } = useComponentsStore();

	const [hoverComponentId, setHoverComponentId] = useState<number>(0);

	const renderComponents = (compoents: Component[]): React.ReactNode => {
		return compoents.map((component) => {
			const config = componentConfig?.[component.name];
			if (!config?.dev) return null;
			return React.createElement(
				config.dev,
				{
					key: component.id,
					id: component.id,
					name: component.name,
					style: component.styles,
					...config.defaultProps,
					...component.props,
				},
				renderComponents(component.children || [])
			);
		});
	};

	const handleMouseOver: MouseEventHandler = (e) => {
		const path = e.nativeEvent.composedPath();
		for (let i = 0; i < path.length; i++) {
			const el = path[i] as HTMLElement;
			const componentId = el.dataset?.componentId;
			if (componentId) {
				setHoverComponentId(Number(componentId));
				return;
			}
		}
	};

	const handleClick: MouseEventHandler = (e) => {
		const path = e.nativeEvent.composedPath();
		for (let i = 0; i < path.length; i++) {
			const el = path[i] as HTMLElement;
			const componentId = el.dataset?.componentId;
			if (componentId) {
				setCurComponent(Number(componentId));
				return;
			}
		}
	};

	return (
		<div
			className={style.edit_area}
			onClick={handleClick}
			onMouseOver={handleMouseOver}
			onMouseLeave={() => setHoverComponentId(0)}
		>
			{renderComponents(components)}

			{hoverComponentId > 0 && hoverComponentId !== curComponentId && (
				<HoverMask
					componentId={hoverComponentId}
					containerClassName={style.edit_area}
				/>
			)}
			{curComponentId !== null && curComponentId > 0 && (
				<SelectedMask
					componentId={curComponentId}
					containerClassName={style.edit_area}
				/>
			)}
		</div>
	);
};

export default EditorArea;
