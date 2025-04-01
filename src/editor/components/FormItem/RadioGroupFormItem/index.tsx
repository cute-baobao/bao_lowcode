import { Radio, RadioChangeEvent } from 'antd';

interface RadioGroupFormItemProps {
	options: RadioItem[];
	value?: string;
	onChange?: (value: string) => void;
}

interface RadioItem {
	label: string;
	value: string;
}
const RadioGroupFormItem: React.FC<RadioGroupFormItemProps> = ({
	options,
	value,
	onChange,
}) => {
	const handleValueChange = (e: RadioChangeEvent) => {
		onChange?.(e.target.value);
	};

	return (
		<Radio.Group options={options} onChange={handleValueChange} value={value} />
	);
};
export default RadioGroupFormItem;
