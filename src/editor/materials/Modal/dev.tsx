import useMaterialDrop from '@/editor/hooks/useMaterialDrop';
import { CommonComponentProps } from '@/editor/interface';
import style from './index.module.scss';
const ModalDev = ({
	id,
	children,
	title,
	style: propsStyle,
}: CommonComponentProps) => {
	const [{ canDrop }, drop] = useMaterialDrop(
		['Button', 'Container', 'Table', 'Form'],
		id
	);
	return (
		<div
			data-component-id={id}
			ref={drop}
			style={{
				border: canDrop ? `2px solid blue` : '1px solid #ccc',
				...propsStyle,
			}}
			className={style.modal_wrapper}
		>
			<h4>{title}</h4>
			{children}
		</div>
	);
};

export default ModalDev;
