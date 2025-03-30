import useMaterialDrag from '@/editor/hooks/useMaterialDrag';
import { CommonComponentProps } from '@/editor/interface';

const TextDev = ({
	id,
	name,
	text,
	style: propsStyle,
}: CommonComponentProps) => {
	const [, drag] = useMaterialDrag(name, {
		type: name,
		dragType: 'move',
		id,
	});
	return (
		<div data-component-id={id} style={{ ...propsStyle }} ref={drag}>
			{text}
		</div>
	);
};
export default TextDev;
