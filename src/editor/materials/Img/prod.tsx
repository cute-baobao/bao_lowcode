import { CommonComponentProps } from '@/editor/interface';
import style from './index.module.scss';

const ImgProd = ({ src, style: propsStyle }: CommonComponentProps) => {
	return (
		<div className={style.img_wrapper} style={{ ...propsStyle }}>
			<img className={style.img} src={src} alt="图片" />
		</div>
	);
};
export default ImgProd;
