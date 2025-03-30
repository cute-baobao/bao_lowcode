import useComponentsStore from '@/editor/store/components';
import { useEffect, useState } from 'react';

interface SelectedMaskProps {
	containerClassName: string;
	componentId: number;
}

function SelectedMask({ containerClassName, componentId }: SelectedMaskProps) {
	const [position, setPosition] = useState({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		labelTop: 0,
		labelLeft: 0,
	});

	const { components } = useComponentsStore();

	useEffect(() => {
		updatePosition();
	}, [componentId, components]);

	function updatePosition() {
		if (!componentId) return;

		const container = document.querySelector(`.${containerClassName}`);
		if (!container) return;

		const node = document.querySelector(`[data-component-id="${componentId}"]`);
		if (!node) return;

		const { top, left, width, height } = node.getBoundingClientRect();
		const { top: containerTop, left: containerLeft } =
			container.getBoundingClientRect();

		let labelTop = top - containerTop + container.scrollTop;
		let labelLeft = left - containerLeft + width;

		if (labelTop <= 0) {
			labelTop -= -20;
		}
		setPosition({
			top: top - containerTop,
			left: left - containerLeft + container.scrollLeft,
			width,
			height,
			labelTop,
			labelLeft,
		});
	}

	const resizeHandle = () => {
		updatePosition();
	};

	useEffect(() => {
		// 窗口大小监视器
		const el = document.querySelector(`.${containerClassName}`);
		const el1 = document.querySelector(`[data-component-id="${componentId}"]`);
		if (!el || !el1) return;
		const resizeObserver = new ResizeObserver(resizeHandle);
		resizeObserver.observe(el);
		resizeObserver.observe(el1);
		return () => resizeObserver.disconnect();
	}, []);

	useEffect(() => {
		const container = document.querySelector(`.${containerClassName}`);
		console.log(container);
		container?.addEventListener('scroll', resizeHandle);
		return () => container?.removeEventListener('scroll', resizeHandle);
	}, []);

	return (
		<>
			<div
				style={{
					position: 'absolute',
					left: position.left,
					top: position.top,
					backgroundColor: 'rgba(100, 100, 255, 0.1)',
					border: '1px dashed blue',
					pointerEvents: 'none',
					width: position.width,
					height: position.height,
					zIndex: 12,
					borderRadius: 4,
					boxSizing: 'border-box',
				}}
			/>
		</>
	);
}

export default SelectedMask;
