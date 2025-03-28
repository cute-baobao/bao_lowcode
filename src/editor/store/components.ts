import { CSSProperties } from 'react';
import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
export interface Component {
	id: number;
	name: string;
	props: any;
	desc?: string;
	styles?: CSSProperties;
	children?: Component[];
	parentId?: number;
}

interface State {
	components: Component[];
	curComponent: Component | null;
	curComponentId: number | null;
	mode: 'edit' | 'preview';
}

interface Actions {
	addComponent: (component: Component, parentId: number) => void;
	deleteComponents: (componentId: number) => void;
	updateCompoentsProps: (componentId: number, props: any) => void;
	setCurComponent: (componentId: number) => void;
	updateComponentStyle: (componentId: number, styles: CSSProperties) => void;
	setMode: () => void;
}

const creator: StateCreator<State & Actions> = (set, get) => ({
	components: [
		{
			id: 1,
			name: 'Page',
			props: {},
			desc: '页面',
		},
	],
	curComponent: null,
	curComponentId: 0,
	mode: 'edit',
	addComponent: (compoent, parentId) => {
		set((state) => {
			if (parentId) {
				const parent = getComponentById(parentId, state.components);
				if (parent) {
					if (parent.children) parent.children.push(compoent);
					else parent.children = [compoent];
				}
				compoent.parentId = parentId;
				return { components: [...state.components] };
			}
			return { components: [...state.components, compoent] };
		});
	},
	updateCompoentsProps: (componentId, props) => {
		if (!componentId) return;
		const component = getComponentById(componentId, get().components);
		if (component) {
			component.props = { ...component.props, ...props };
			set({ components: [...get().components] });
		}
	},
	deleteComponents: (componentId) => {
		if (!componentId) return;
		const compoent = getComponentById(componentId, get().components);
		if (compoent?.parentId) {
			const parent = getComponentById(compoent.parentId, get().components);
			if (parent) {
				parent.children = parent.children?.filter(
					(item) => item.id !== componentId
				);
				set({ components: [...get().components] });
			}
		}
		if (componentId === get().curComponentId) get().setCurComponent(0);
	},
	setCurComponent: (componentId) => {
		set((state) => ({
			curComponentId: componentId,
			curComponent: getComponentById(componentId, state.components),
		}));
	},
	updateComponentStyle: (componentId, styles) => {
		if (!componentId) return;
		set((state) => {
			const component = getComponentById(componentId, state.components);
			if (!component) return { components: [...state.components] };
			component.styles = { ...component.styles, ...styles };
			return { components: [...state.components] };
		});
	},
	setMode: () => {
		set((state) => {
			const mode = state.mode;
			return { mode: mode === 'edit' ? 'preview' : 'edit' };
		});
	},
});

export const getComponentById = (
	id: number,
	components: Component[]
): Component | null => {
	if (!id) return null;
	// 深度优先
	for (const compoent of components) {
		if (compoent.id === id) return compoent;
		if (compoent.children && compoent.children.length > 0) {
			const result = getComponentById(id, compoent.children);
			if (result) return result;
		}
	}
	return null;
};

const useComponentsStore = create<State & Actions>()(
	persist(creator, {
		name: 'components',
	})
);

export default useComponentsStore;
