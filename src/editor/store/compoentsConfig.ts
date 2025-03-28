import { create } from 'zustand';
import { ButtonDev, ButtonProd } from '../materials/Button';
import { PageProd, PageDev } from '../materials/Page';
import { ContainerProd, ContainerDev } from '../materials/Container';
import { FormDev, FormProd } from '../materials/Form';
import { FormItemDev, FormItemProd } from '../materials/FormItem';

export interface ComponentSetter {
	name: string; // key
	label: string; // 文字描述
	type: 'input' | 'inputNumber' | 'select' | 'colorPicker'; // 标签类型
	options?: { label: string; value: string }[];
	[key: string]: any;
}

export interface ComponentEvent {
	name: string;
	label: string;
}

export interface ComponentConfig {
	name: string;
	desc: string;
	defaultProps: Record<string, any>;
	setter?: ComponentSetter[];
	styleSetter?: ComponentSetter[];
	events?: ComponentEvent[];
	layoutSetter?: ComponentSetter[];
	dev: any;
	prod: any;
}

interface State {
	componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
	registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

const commonCompoentStyleSetter: ComponentSetter[] = [
	{
		name: 'width',
		label: '宽度',
		type: 'inputNumber',
	},
	{
		name: 'height',
		label: '高度',
		type: 'inputNumber',
	},
	{
		name: 'margin',
		label: 'margin',
		type: 'input',
	},
	{
		name: 'padding',
		label: 'padding',
		type: 'input',
	},
	{
		name: 'border',
		label: 'border',
		type: 'input',
	},
	{
		name: 'borderRadius',
		label: 'borderRadius',
		type: 'inputNumber',
	},
	{
		name: 'backgroundColor',
		label: '背景颜色',
		type: 'colorPicker',
	},
	{
		name: 'color',
		label: '字体颜色',
		type: 'colorPicker',
	},
];
const commonLayoutStyleSetter: ComponentSetter[] = [
	{
		name: 'display',
		label: '布局',
		type: 'select',
		options: [
			{ label: '默认', value: 'block' },
			{ label: 'flex', value: 'flex' },
		],
	},
	{
		name: 'flexDirection',
		label: 'flex-direction',
		type: 'select',
		options: [
			{ label: 'col', value: 'column' },
			{ label: 'col-reverse', value: 'column-reverse' },
			{ label: 'row', value: 'row' },
			{ label: 'row-reverse', value: 'row-reverse' },
		],
	},
	{
		name: 'alignItems',
		label: 'align',
		type: 'select',
		options: [
			{ label: 'center', value: 'center' },
			{ label: 'start', value: 'start' },
			{ label: 'end', value: 'end' },
			{ label: 'revert', value: 'revert' },
			{ label: 'flex-start', value: 'flex-start' },
			{ label: 'flex-end', value: 'flex-end' },
		],
	},
	{
		name: 'justifyContent',
		label: 'justify',
		type: 'select',
		options: [
			{ label: 'center', value: 'center' },
			{ label: 'flex-start', value: 'flex-start' },
			{ label: 'flex-end', value: 'flex-end' },
			{ label: 'space-around', value: 'space-around' },
			{ label: 'space-between', value: 'space-between' },
			{ label: 'space-evenly', value: 'space-evenly' },
		],
	},
	{
		name: 'gap',
		label: '间隔',
		type: 'inputNumber',
	},
];
export const useComponentConfigStore = create<State & Action>((set) => ({
	componentConfig: {
		Container: {
			name: 'Container',
			desc: '容器',
			defaultProps: {},
			dev: ContainerDev,
			prod: ContainerProd,
			styleSetter: [...commonCompoentStyleSetter],
			layoutSetter: [...commonLayoutStyleSetter],
		},
		Button: {
			name: 'Button',
			desc: '按钮',
			defaultProps: {
				type: 'primary',
				text: '按钮',
			},
			setter: [
				{
					name: 'type',
					label: '按钮类型',
					type: 'select',
					options: [
						{ label: '主按钮', value: 'primary' },
						{ label: '次按钮', value: 'default' },
					],
				},
				{
					name: 'text',
					label: '文本',
					type: 'input',
				},
			],
			events: [
				{
					name: 'onClick',
					label: '点击事件',
				},
				{
					name: 'onDoubleClick',
					label: '双击事件',
				},
			],
			styleSetter: [...commonCompoentStyleSetter],
			dev: ButtonDev,
			prod: ButtonProd,
		},
		Page: {
			name: 'Page',
			desc: '页面',
			defaultProps: {},
			dev: PageDev,
			prod: PageProd,
		},
		Form: {
			name: 'Form',
			defaultProps: {},
			desc: '表单',
			setter: [{ name: 'title', label: '标题', type: 'input' }],
			events: [{ name: 'onFinish', label: '提交事件' }],
			dev: FormDev,
			prod: FormProd,
			styleSetter: [...commonCompoentStyleSetter],
			layoutSetter: [...commonLayoutStyleSetter],
		},
		FormItem: {
			name: 'FormItem',
			desc: '表单项',
			defaultProps: {
				name: new Date().getTime(),
				label: '表单项',
			},
			setter: [
				{
					name: 'type',
					label: '类型',
					type: 'select',
					options: [
						{
							label: '文本',
							value: 'input',
						},
						{
							label: '日期',
							value: 'date',
						},
					],
				},
				{
					name: 'label',
					label: '标题',
					type: 'input',
				},
				{
					name: 'name',
					label: '字段',
					type: 'input',
				},
				{
					name: 'rules',
					label: '校验',
					type: 'select',
					options: [
						{
							label: '必填',
							value: 'required',
						},
					],
				},
			],
			styleSetter: [...commonCompoentStyleSetter],
			dev: FormItemDev,
			prod: FormItemProd,
		},
	},
	registerComponent: (name, componentConfig) =>
		set((state) => {
			return {
				...state,
				componentConfig: {
					...state.componentConfig,
					[name]: componentConfig,
				},
			};
		}),
}));
