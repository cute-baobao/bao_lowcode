import useComponentsStore, {
	getComponentById,
} from '@/editor/store/components';
import { CSSProperties, useEffect, useMemo, useState } from 'react';
import style from './index.module.scss';

interface HoverMaskProps {
	componentId: number;
	containerClassName: string;
}
const HoverMask = (props: HoverMaskProps) => {
	const { componentId, containerClassName } = props;
	const { components } = useComponentsStore();
	const [position, setPosition] = useState({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		labelTop: 0,
		labelLeft: 0,
	});

	useEffect(() => {
		updatePosition();
	}, [componentId]);

	useEffect(() => {
		updatePosition();
	}, [components]);

	const curComponent = useMemo(() => {
		const component = getComponentById(componentId, components);
		return component;
	}, [componentId]);

	const updatePosition = () => {
		if (!componentId) return;
		const container = document.querySelector(`.${containerClassName}`);
		if (!container) return;
		const node = document.querySelector(`[data-component-id="${componentId}"]`);
		if (!node) return;
		const { top, left, width, height } = node.getBoundingClientRect();
		const { top: containerTop, left: containerLeft } =
			container.getBoundingClientRect();
		let labelTop = top - containerTop + container.scrollTop;
		const labelLeft = left - containerLeft + width;
		if (labelTop <= 0) labelTop -= -20;
		setPosition({
			top: top - containerTop + container.scrollTop,
			left: left - containerLeft + container.scrollLeft,
			width,
			height,
			labelTop,
			labelLeft,
		});
	};

	const hoverMaskStyle: CSSProperties = {
		position: 'absolute',
		left: position.left,
		top: position.top,
		width: position.width,
		height: position.height,
		pointerEvents: 'none',
		border: '1px dashed blue',
		background: 'rgba(64, 169, 255,0.2)',
		borderRadius: '0.5em',
	};

	const labelStyle: CSSProperties = {
		position: 'absolute',
		top: position.labelTop,
		left: position.labelLeft,
		display: !position.width || position.width < 10 ? 'none' : 'inline',
		zIndex: 12,
		width: 'fit-content',
		height: 'fit-content',
		transform: 'translate(-100%,-100%)',
	};

	return (
		<>
			<div style={hoverMaskStyle}></div>
			<div style={labelStyle}>
				<div className={style.label}>{curComponent?.desc}</div>
			</div>
		</>
	);
};

export default HoverMask;
