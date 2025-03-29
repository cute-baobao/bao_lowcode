import useComponentsStore from '@/editor/store/components';
import { Button, Flex } from 'antd';
import style from './index.module.scss';
import { Icon } from '@iconify/react/dist/iconify.js';
const ChangeModeButton = () => {
	const { mode, setMode } = useComponentsStore();
	return (
		<Button type="primary" onClick={setMode}>
			{mode === 'edit' ? '预览' : '编辑'}
		</Button>
	);
};
const Header = () => {
	return (
		<div className={style.header}>
			<Flex align="center" justify="space-between">
				<div className={style.header_title}>
					<Icon icon="icon-park-twotone:baokemeng" width="32" height="32" />
					BAO
				</div>
				<ChangeModeButton />
			</Flex>
		</div>
	);
};

export default Header;
