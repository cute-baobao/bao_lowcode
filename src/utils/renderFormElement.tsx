import { ComponentSetter } from '@/editor/store/compoentsConfig';
import { Input, Select, InputNumber, ColorPicker } from 'antd';

const renderFormElement = (setter: ComponentSetter) => {
	const { type, options } = setter;

	if (setter.type === 'input') return <Input />;
	else if (type === 'select') return <Select options={options} />;
	else if (type === 'inputNumber') return <InputNumber />;
	else if (type === 'colorPicker') return <ColorPicker format="rgb" showText />;
};

export default renderFormElement;
