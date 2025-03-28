import { Segmented } from 'antd';
import { useState } from 'react';
import Materail from '../Materail';
import Outline from '../Outline';
import Source from '../Source';
import style from './index.module.scss';

const MaterailWrapper = () => {
	const options = ['物料', '大纲', '源码'];
	const [key, setKey] = useState('物料');
	return (
		<div>
			<Segmented onChange={setKey} block options={options} value={key} />
			<div className={style.option_wrapper}>
				{key === '物料' ? (
					<Materail />
				) : key === '大纲' ? (
					<Outline />
				) : key === '源码' ? (
					<Source />
				) : null}
			</div>
		</div>
	);
};
export default MaterailWrapper;
