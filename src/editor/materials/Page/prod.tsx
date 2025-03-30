import style from './index.module.scss';
import { CommonComponentProps } from '@/editor/interface';

function PageProd({ children, style: propsStyle }: CommonComponentProps) {
	return (
		<div style={{ ...propsStyle }} className={style.prod_page}>
			{children}
		</div>
	);
}

export default PageProd;
