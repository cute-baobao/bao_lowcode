import { useComponentConfigStore } from '@/editor/store/compoentsConfig';
import style from './index.module.scss';
import { CommonComponentProps } from '@/editor/interface';
import { useEffect, useMemo, useRef } from 'react';
import useMaterialDrop from '@/editor/hooks/useMaterialDrop';
import useMaterialDrag from '@/editor/hooks/useMaterialDrag';

const ContainerDev = (props: CommonComponentProps) => {
	const { id, children, style: propsStyle, name } = props;
	const { componentConfig } = useComponentConfigStore();
	const divRef = useRef<HTMLDivElement>(null);
	const accepts = useMemo(
		() => Object.values(componentConfig).map((item) => item.name),
		[componentConfig]
	);
	const [{ canDrop }, drop] = useMaterialDrop(accepts, id);
	const [, drag] = useMaterialDrag(name, {
		type: name,
		dragType: 'move',
		id,
	});
	useEffect(() => {
		drop(divRef);
		drag(divRef);
	}, []);
	return (
		<div
			data-component-id={id}
			ref={divRef}
			style={{
				border: canDrop ? `2px solid blue` : '1px solid #ccc',
				...propsStyle,
			}}
			className={style.container}
		>
			{children}
		</div>
	);
};

export default ContainerDev;
