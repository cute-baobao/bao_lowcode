import { CommonComponentProps } from '@/editor/interface';
import { Divider } from 'antd';

const DividerProd = ({ text, style }: CommonComponentProps) => {
	return (
		<Divider style={{ ...style }} orientation="left">
			{text}
		</Divider>
	);
};
export default DividerProd;
