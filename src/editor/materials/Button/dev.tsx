import useMaterialDrag from '@/editor/hooks/useMaterialDrag';
import { CommonComponentProps } from '@/editor/interface';
import { Button as AntdButton } from 'antd';
import { ButtonType } from 'antd/es/button';

export interface ButtonProps {
	type: ButtonType;
	text: string;
}
const ButtonDev = ({
	id,
	type,
	text,
	name,
	style,
}: CommonComponentProps & ButtonProps) => {
	const [, drag] = useMaterialDrag(name, {
		type: name,
		dragType: 'move',
		id,
	});
	return (
		<AntdButton ref={drag} style={style} data-component-id={id} type={type}>
			{text}
		</AntdButton>
	);
};

export default ButtonDev;
