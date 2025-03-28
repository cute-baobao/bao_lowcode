import { useDrop } from 'react-dnd';
import { useComponentConfigStore } from '../store/compoentsConfig';
import useComponentsStore, { getComponentById } from '../store/components';
import { message } from 'antd';

export interface ItemType {
	type: string;
	dragType: 'move' | 'add';
	id?: number;
}
const useMaterialDrop = (accepts: string[], id: number) => {
	const { addComponent, components, deleteComponents } = useComponentsStore();
	const { componentConfig } = useComponentConfigStore();

	const res = useDrop({
		accept: accepts,
		drop(item: ItemType, monitor) {
			// 如果已经被处理过了，直接return
			if (monitor.didDrop()) return;
			const { desc, defaultProps } = componentConfig[item.type];
			if (item.dragType === 'add') {
				addComponent(
					{
						id: new Date().getTime(),
						name: item.type,
						props: defaultProps,
						desc,
					},
					id
				);
			} else if (item.dragType === 'move' && item.id) {
				const component = getComponentById(item.id, components);
				if (!component) {
					message.error('修改失败');
					return;
				}
				deleteComponents(item.id);
				addComponent(component, id);
			}
			message.success('drop successful');
		},
		collect(monitor) {
			return {
				canDrop: monitor.canDrop(),
			};
		},
	});
	return res;
};

export default useMaterialDrop;
