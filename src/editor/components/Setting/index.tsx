import style from './index.module.scss';
import { Segmented } from 'antd';
import { useState } from 'react';
import ComponentAtrr from './ComponentAttr';
import ComponentStyle from './CompoentStyle';
import ComponentEvent from './ComponentEvent';
const Setting = () => {
	const [key, setKey] = useState('属性');

	return (
		<div className={style.json_page}>
			<Segmented
				value={key}
				onChange={setKey}
				block
				options={['属性', '样式', '事件']}
			/>
			<div className={style.option_wrapper}>
				{key === '属性' ? (
					<ComponentAtrr />
				) : key === '样式' ? (
					<ComponentStyle />
				) : (
					<ComponentEvent />
				)}
			</div>
		</div>
	);
};

export default Setting;
