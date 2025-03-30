import useComponentsStore from '@/editor/store/components';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
export interface CustomJSConfig {
	type: 'customJS';
	code: string;
}

export interface CustomJSProps {
	defaultValue?: string;
	value?: string;
	onChange?: (config: CustomJSConfig) => void;
}

const CustomJs = (props: CustomJSProps) => {
	const { defaultValue, value, onChange } = props;
	const { curComponent } = useComponentsStore();

	const [code, setCode] = useState<string>(defaultValue || '');

	useEffect(() => {
		if (value) setCode(value);
	}, [value]);

	const handleEditorMount: OnMount = (editor, monaco) => {
		editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
			editor.getAction('editor.action.formatDocument')?.run();
		});
	};

	const codeChange = (value?: string) => {
		if (!curComponent) return;
		if (value) {
			setCode(value);
			onChange?.({
				type: 'customJS',
				code: value,
			});
		}
	};

	return (
		<div>
			<div>
				<MonacoEditor
					height={'200px'}
					path="action.js"
					language="javascript"
					onMount={handleEditorMount}
					onChange={codeChange}
					value={code}
					options={{
						fontSize: 14,
						scrollBeyondLastLine: false,
						minimap: {
							enabled: false,
						},
						scrollbar: {
							verticalScrollbarSize: 6,
							horizontalScrollbarSize: 6,
						},
					}}
				></MonacoEditor>
			</div>
		</div>
	);
};

export default CustomJs;
