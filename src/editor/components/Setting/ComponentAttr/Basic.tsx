import { Button, Divider, Flex } from 'antd';
import style from './index.module.scss';
import useComponentsStore from '@/editor/store/components';
const Basic = () => {
	const { curComponentId, deleteComponents } = useComponentsStore();
	const deleteHandle = () => {
		deleteComponents(curComponentId!);
	};
	if (!curComponentId) return null;
	return (
		<div>
			<Divider orientation="left" style={{ borderColor: '#1890ff' }}>
				基础
			</Divider>
			<div className={style.basic_wrapper}>
				<Flex align="center" justify="start" gap={10}>
					<Button
						disabled={curComponentId === 1 || curComponentId === 0}
						type="dashed"
						variant="filled"
						color="red"
						onClick={deleteHandle}
					>
						删除组件
					</Button>
				</Flex>
			</div>
		</div>
	);
};

export default Basic;
