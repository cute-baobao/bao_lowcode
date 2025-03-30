import useMaterialDrag from '@/editor/hooks/useMaterialDrag';
import { CommonComponentProps } from '@/editor/interface';
import { Divider } from 'antd';

const DividerDev = ({ text, style, id, name }: CommonComponentProps) => {
	const [, drag] = useMaterialDrag(name, {
		type: name,
		dragType: 'move',
		id,
	});
	return (
		<div ref={drag}>
			<Divider data-component-id={id} style={{ ...style }} orientation="left">
				{text}
			</Divider>
		</div>
	);
};
export default DividerDev;
