import useComponentsStore, {
	getComponentById,
} from '@/editor/store/components';
import { Tree, TreeProps } from 'antd';

const Outline = () => {
	const {
		components,
		setCurComponent,
		curComponentId,
		deleteComponents,
		addComponent,
	} = useComponentsStore();

	const onDrop: TreeProps['onDrop'] = (info) => {
		const dragNodeKey = info.dragNode.key;
		const dropNodeKey = info.node.key;
		const component = getComponentById(dragNodeKey as number, components);
		const dropComponent = getComponentById(dropNodeKey as number, components);
		if (!component || !dropComponent) return;
		if (dropComponent.name === 'Container' || dropComponent.name === 'Page') {
			deleteComponents(dragNodeKey as number);
			addComponent(component, dropNodeKey as number);
		}
	};

	return (
		<Tree
			showLine
			defaultExpandAll
			draggable
			fieldNames={{ title: 'desc', key: 'id' }}
			treeData={components as any}
			selectedKeys={[curComponentId!]}
			onSelect={([selectedKey]) => {
				setCurComponent(selectedKey as number);
			}}
			onDrop={onDrop}
		/>
	);
};

export default Outline;
