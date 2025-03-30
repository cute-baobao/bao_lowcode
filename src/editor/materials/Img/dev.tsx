import useMaterialDrag from '@/editor/hooks/useMaterialDrag';
import { CommonComponentProps } from '@/editor/interface';
import style from './index.module.scss';

const ImgDev = ({ id, name, src, style: propsStyle }: CommonComponentProps) => {
	const [, drag] = useMaterialDrag(name, {
		type: name,
		dragType: 'move',
		id,
	});
	return (
		<div
			className={style.img_wrapper}
			data-component-id={id}
			ref={drag}
			style={{ ...propsStyle }}
		>
			<img className={style.img} src={src} alt="图片" />
		</div>
	);
};
export default ImgDev;
