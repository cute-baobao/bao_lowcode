import { useComponentConfigStore } from '@/editor/store/compoentsConfig';
import useComponentsStore, {
	Component,
	getComponentById,
} from '@/editor/store/components';
import { Select, TreeSelect } from 'antd';
import { useEffect, useState } from 'react';
import style from './index.module.scss';

export interface ComponentMethodConfig {
	type: 'componentMethod';
	config: {
		componentId: number;
		method: string;
	};
}
export interface ComponentMethodProps {
	value?: ComponentMethodConfig['config'];
	onChange?: (config: ComponentMethodConfig) => void;
}
const ComponentMethod = (props: ComponentMethodProps) => {
	const { value, onChange } = props;
	const { components, curComponentId } = useComponentsStore();
	const { componentConfig } = useComponentConfigStore();
	const [selectedComponent, setSelectedComponent] = useState<Component | null>(
		null
	);
	const [curId, setCurId] = useState<number>();
	const [curMethod, setCurMethod] = useState<string>();

	useEffect(() => {
		if (value) {
			setCurId(value.componentId);
			setCurMethod(value.method);
		}
	}, [value]);
	const componentChange = (value: number) => {
		if (!curComponentId) return;
		setCurId(value);
		setSelectedComponent(getComponentById(value, components));
	};

	const componentMethodChange = (value: string) => {
		if (!curComponentId || !selectedComponent) return;
		setCurMethod(value);
		onChange?.({
			type: 'componentMethod',
			config: {
				componentId: selectedComponent?.id,
				method: value,
			},
		});
	};

	return (
		<div>
			<div className={style.component_method_wrapper}>
				<div>组件: </div>

				<TreeSelect
					className={style.component_method_wrapper_input}
					value={curId}
					fieldNames={{ label: 'name', value: 'id' }}
					treeData={components}
					onChange={(value) => {
						componentChange(value);
					}}
				/>
			</div>
			{componentConfig[selectedComponent?.name || ''] && (
				<div className={style.component_method_wrapper}>
					<div>方法: </div>
					<Select
						value={curMethod}
						className={style.component_method_wrapper_input}
						options={componentConfig[
							selectedComponent?.name || ''
						].methods?.map((item) => {
							return {
								label: item.label,
								value: item.name,
							};
						})}
						onChange={(value) => {
							componentMethodChange(value);
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default ComponentMethod;
