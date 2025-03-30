import style from './index.module.scss';
import { useComponentConfigStore } from '@/editor/store/compoentsConfig';
import { useMemo } from 'react';
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
				<div className={style.materail_wrapper}>
					{components.map((item, index) => (
						<MaterailItem
							name={item.name}
							desc={item.desc}
							key={`materailItem_${index}`}
						/>
					))}
				</div>
			) : null}
		</div>
	);
};

export default Materail;
