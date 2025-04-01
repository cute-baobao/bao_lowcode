import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Form, Input, Space } from 'antd';
import style from './index.module.scss';

const RadioGroupsFormList = () => {
	return (
		<div className={style.from_list}>
			<Form.List name="radioGroups">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, ...restField }, index) => (
							<Space
								key={key}
								style={{
									display: 'flex',
								}}
								align="baseline"
							>
								<Form.Item
									{...restField}
									label={`选项${index + 1}: `}
									name={[name, 'label']}
									rules={[{ required: true, message: 'label不能为空' }]}
								>
									<Input placeholder="label" />
								</Form.Item>
								<Form.Item
									{...restField}
									name={[name, 'value']}
									rules={[{ required: true, message: 'value不能为空' }]}
								>
									<Input placeholder="value" />
								</Form.Item>
								<Icon
									width={20}
									height={20}
									style={{ color: 'black' }}
									icon="mdi:delete"
									onClick={() => remove(name)}
								/>
							</Space>
						))}
						<Form.Item>
							<Button
								type="dashed"
								onClick={() => add()}
								block
								icon={<Icon icon="mdi:plus" />}
							>
								添加一个选项
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
		</div>
	);
};

export default RadioGroupsFormList;
