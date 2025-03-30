import { useMemo } from 'react';
import style from './index.module.scss';
import { useComponentConfigStore } from '@/editor/store/compoentsConfig';
import { CommonComponentProps } from '@/editor/interface';
import useMaterialDrop from '@/editor/hooks/useMaterialDrop';

function PageDev({ id, children, style: propsStyle }: CommonComponentProps) {
	const { componentConfig } = useComponentConfigStore();
	const accepts = useMemo(
		() => Object.values(componentConfig).map((item) => item.name),
		[componentConfig]
	);
	const [{ canDrop }, drop] = useMaterialDrop(accepts, id);
	return (
		<div
			data-component-id={id}
			ref={drop}
			style={{ border: canDrop ? '2px solid blue' : 'none', ...propsStyle }}
			className={style.page}
		>
			{children}
		</div>
	);
}

export default PageDev;
