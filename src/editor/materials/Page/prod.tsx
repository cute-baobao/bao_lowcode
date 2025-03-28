import style from './index.module.scss';
import { CommonComponentProps } from '@/editor/interface';

function PageProd({ id, children }: CommonComponentProps) {
	return (
		<div data-component-id={id} className={style.prod_page}>
			{children}
		</div>
	);
}

export default PageProd;
