import { Checkbox } from 'antd';

interface CheckBoxGroupFormItemProps {
	options: ChekcBoxItem[];
	value?: string[];
	onChange?: (value: string[]) => void;
}

interface ChekcBoxItem {
	label: string;
	value: string;
}
const CheckBoxGroupFormItem: React.FC<CheckBoxGroupFormItemProps> = ({
	options,
	value,
	onChange,
}) => {
	const handleValueChange = (checkedValue: string[]) => {
		onChange?.(checkedValue);
	};

	return (
		<Checkbox.Group
			options={options}
			onChange={handleValueChange}
			value={value}
		/>
	);
};
export default CheckBoxGroupFormItem;
