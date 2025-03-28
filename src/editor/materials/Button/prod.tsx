import { CommonComponentProps } from '@/editor/interface';
import { Button as AntdButton } from 'antd';
import { ButtonType } from 'antd/es/button';

export interface ButtonProps {
	type: ButtonType;
	text: string;
}
const ButtonProd = ({
	id,
	type,
	text,
	style,
	...props
}: CommonComponentProps & ButtonProps) => {
	return (
		<AntdButton style={style} data-component-id={id} type={type} {...props}>
			{text}
		</AntdButton>
	);
};

export default ButtonProd;
