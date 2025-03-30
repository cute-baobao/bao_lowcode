import style from './index.module.scss';
import { useComponentConfigStore } from '@/editor/store/compoentsConfig';
import { useMemo } from 'react';
import { Flex } from 'antd';
import { Icon } from '@iconify/react';
import useMaterialDrag from '@/editor/hooks/useMaterialDrag';

interface MaterailItemProps {
	name: string;
	desc: string;
}

const MaterailItem = (props: MaterailItemProps) => {
	const { name, desc } = props;
	const [, drag] = useMaterialDrag(name, {
		type: name,
		dragType: 'add',
	});
	return (
		<div
			onClick={() => console.log(1)}
			ref={drag}
			className={style.materailItem}
		>
			<Icon className={style.materailItem_text} icon="mdi:pac-man" />
			<span className={style.materailItem_text}>{desc}</span>
		</div>
	);
};

const Materail = () => {
	const { componentConfig } = useComponentConfigStore();
	const components = useMemo(() => {
		return Object.values(componentConfig);
	}, [componentConfig]);
	return (
		<div>
			{components ? (
				<Flex gap={10} wrap="wrap">
					{components.map((item, index) => (
						<MaterailItem
							name={item.name}
							desc={item.desc}
							key={`materailItem_${index}`}
						/>
					))}
				</Flex>
			) : null}
		</div>
	);
};

export default Materail;
