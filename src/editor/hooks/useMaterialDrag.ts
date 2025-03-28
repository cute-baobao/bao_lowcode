import { useDrag } from 'react-dnd';
import { ItemType } from './useMaterialDrop';

const useMaterialDrag = (type: string, item: ItemType) => {
	const result = useDrag({
		type,
		item,
	});
	return result;
};
export default useMaterialDrag;
