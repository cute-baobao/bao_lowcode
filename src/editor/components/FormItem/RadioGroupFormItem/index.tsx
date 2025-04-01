import { Radio, RadioChangeEvent } from 'antd';
import { useMemo } from 'react';

interface RadioGroupFormItemProps {
	options: string;
	value?: string;
	onChange?: (value: string) => void;
}

interface Radio {
	label: string;
	value: string;
}
const RadioGroupFormItem: React.FC<RadioGroupFormItemProps> = ({
	options,
	value,
	onChange,
}) => {
	const radios = useMemo<Radio[]>(() => {
		try {
			// 尝试解析字符串为对象数组
			const parsedOptions = JSON.parse(options);

			// 验证解析后的数据是否为数组，并且每个元素符合 Radio 类型
			if (
				Array.isArray(parsedOptions) &&
				parsedOptions.every(
					(item) =>
						typeof item.label === 'string' && typeof item.value === 'string'
				)
			) {
				return parsedOptions as Radio[];
			} else {
				throw new Error('单选框的输入内容需要是一个有效的 Radio[] 数组');
			}
		} catch (err) {
			console.error('解析单选框选项失败:', err);
			return []; // 返回空数组以避免组件崩溃
		}
	}, [options]);

	const handleValueChange = (e: RadioChangeEvent) => {
		onChange?.(e.target.value);
	};

	return (
		<Radio.Group options={radios} onChange={handleValueChange} value={value} />
	);
};
export default RadioGroupFormItem;
