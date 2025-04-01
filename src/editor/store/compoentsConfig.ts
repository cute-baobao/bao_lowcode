import { create } from 'zustand';
import { ButtonDev, ButtonProd } from '../materials/Button';
import { PageProd, PageDev } from '../materials/Page';
import { ContainerProd, ContainerDev } from '../materials/Container';
import { FormDev, FormProd } from '../materials/Form';
import { FormItemDev, FormItemProd } from '../materials/FormItem';
import { ModalDev, ModalProd } from '../materials/Modal';
import { TableDev, TableProd } from '../materials/Table';
import { TableColumnDev, TableColumnProd } from '../materials/TableColumn';
import { TextDev, TextProd } from '../materials/Text';
import { DividerDev, DividerProd } from '../materials/Divider';
import { ImgDev, ImgProd } from '../materials/Img';

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

export interface ComponentMethod {
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
	methods?: ComponentMethod[];
	dev: any;
	prod: any;
}

interface State {
	componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
	registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

const commonBoxStyleSetter: ComponentSetter[] = [
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
];

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
		name: 'backgroundColor',
		label: '背景颜色',
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
const commonFontSetter: ComponentSetter[] = [
	{
		name: 'color',
		label: '字体颜色',
		type: 'colorPicker',
	},
	{
		name: 'fontSize',
		label: '字体大小',
		type: 'inputNumber',
	},
	{
		name: 'lineHeight',
		label: '行高',
		type: 'input',
	},
	{
		name: 'fontWeight',
		label: '字体粗细',
		type: 'select',
		options: [
			{ label: '浅色', value: '400' },
			{ label: '普通', value: '500' },
			{ label: '加粗', value: '600' },
		],
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
			styleSetter: [...commonCompoentStyleSetter, ...commonBoxStyleSetter],
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
			styleSetter: [...commonCompoentStyleSetter, ...commonBoxStyleSetter],
			layoutSetter: [...commonLayoutStyleSetter],
			dev: PageDev,
			prod: PageProd,
		},
		Form: {
			name: 'Form',
			defaultProps: {},
			desc: '表单',
			setter: [{ name: 'title', label: '标题', type: 'input' }],
			events: [{ name: 'onFinish', label: '提交事件' }],
			methods: [{ label: '提交', name: 'submit' }],
			styleSetter: [
				...commonCompoentStyleSetter,
				...commonFontSetter,
				...commonBoxStyleSetter,
			],
			layoutSetter: [...commonLayoutStyleSetter],
			dev: FormDev,
			prod: FormProd,
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
						{
							label: '上传图片',
							value: 'upload',
						},
						{
							label: '单选框',
							value: 'radio',
						},
						{
							label: '多选框',
							value: 'checkBox',
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
			styleSetter: [...commonCompoentStyleSetter, ...commonBoxStyleSetter],
			dev: FormItemDev,
			prod: FormItemProd,
		},
		Modal: {
			name: 'Modal',
			desc: '弹窗',
			defaultProps: {
				title: '我是一个弹窗',
			},
			setter: [
				{
					name: 'title',
					label: '标题',
					type: 'input',
				},
			],
			events: [
				{
					name: 'onOk',
					label: '确认事件',
				},
				{
					name: 'onCancel',
					label: '取消事件',
				},
			],
			methods: [
				{
					name: 'open',
					label: '打开弹窗',
				},
				{ name: 'close', label: '关闭弹窗' },
			],
			styleSetter: [...commonCompoentStyleSetter, ...commonBoxStyleSetter],
			layoutSetter: [...commonLayoutStyleSetter],
			dev: ModalDev,
			prod: ModalProd,
		},
		Table: {
			name: 'Table',
			desc: '表格',
			defaultProps: {},
			setter: [
				{
					name: 'url',
					label: 'url',
					type: 'input',
				},
			],
			styleSetter: [...commonCompoentStyleSetter, ...commonBoxStyleSetter],
			layoutSetter: [...commonLayoutStyleSetter],
			dev: TableDev,
			prod: TableProd,
		},
		TableColumn: {
			name: 'TableColumn',
			desc: '表格列',
			defaultProps: {
				dataIndex: `col_${new Date().getTime()}`,
				title: '列名',
			},
			setter: [
				{
					name: 'type',
					label: '类型',
					type: 'select',
					options: [
						{
							label: '文本',
							value: 'text',
						},
						{
							label: '日期',
							value: 'date',
						},
					],
				},
				{
					name: 'title',
					label: '标题',
					type: 'input',
				},
				{
					name: 'dataIndex',
					label: '字段',
					type: 'input',
				},
			],
			dev: TableColumnDev,
			prod: TableColumnProd,
		},
		Text: {
			name: 'Text',
			desc: '文本',
			defaultProps: {
				text: '输入文本',
			},
			setter: [
				{
					name: 'text',
					label: '文本',
					type: 'input',
				},
			],
			styleSetter: [...commonCompoentStyleSetter, ...commonFontSetter],
			dev: TextDev,
			prod: TextProd,
		},
		Divider: {
			name: 'Divider',
			desc: '分割线',
			defaultProps: {
				text: '分割线',
			},
			setter: [{ label: '标题', name: 'text', type: 'input' }],
			styleSetter: [...commonFontSetter],
			dev: DividerDev,
			prod: DividerProd,
		},
		Img: {
			name: 'Img',
			desc: '图片',
			defaultProps: {},
			setter: [{ name: 'src', label: '图片链接', type: 'input' }],
			styleSetter: [
				...commonCompoentStyleSetter,
				...commonBoxStyleSetter,
				{
					name: 'objectFit',
					label: 'objectFit',
					type: 'select',
					options: [
						{ label: 'cover', value: 'cover' },
						{ label: 'fill', value: 'fill' },
						{ label: 'contain', value: 'contain' },
					],
				},
			],
			dev: ImgDev,
			prod: ImgProd,
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
