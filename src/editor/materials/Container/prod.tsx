import style from './index.module.scss';
import { CommonComponentProps } from '@/editor/interface';

const ContainerProd = (props: CommonComponentProps) => {
	const { children } = props;
	return (
		<div style={{ ...props.style }} className={style.prod_container}>
			{children}
		</div>
	);
};

export default ContainerProd;
