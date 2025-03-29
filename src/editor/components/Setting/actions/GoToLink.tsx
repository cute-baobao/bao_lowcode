import { Input } from 'antd';
import style from './index.module.scss';
import useComponentsStore from '@/editor/store/components';
import { useEffect, useState } from 'react';

export interface GoToLinkConfig {
	type: 'goToLink';
	url: string;
}

interface GoToLinkProps {
	value?: string;
	defaultValue?: string;
	onChange: (config: GoToLinkConfig) => void;
}

const GoToLink = (props: GoToLinkProps) => {
	const { defaultValue, value, onChange } = props;
	const { curComponent, curComponentId } = useComponentsStore();
	const [url, setUrl] = useState<string>(defaultValue || '');

	useEffect(() => {
		if (value) setUrl(value);
	}, [value]);

	if (!curComponent) return null;
	const urlChangeHandle = (value: string) => {
		if (!curComponentId) return;
		setUrl(value);
		onChange({
			type: 'goToLink',
			url: value,
		});
	};

	return (
		<div>
			<div className={style.event_form}>
				<div>链接: </div>
				<Input
					value={url}
					onChange={(e) => {
						urlChangeHandle(e.target.value);
					}}
					className={style.event_form_input}
					placeholder="输入url链接"
				/>
			</div>
		</div>
	);
};

export default GoToLink;
