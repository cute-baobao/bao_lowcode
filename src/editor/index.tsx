import style from './index.module.scss';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Header from './components/Header';
import EditorArea from './components/EditorArea';
import Setting from './components/Setting';
import MaterailWrapper from './components/MaterialWrapper';
import useComponentsStore from './store/components';
import Preview from './components/Preview';
const LowCodeEditor = () => {
	const { mode } = useComponentsStore();
	return (
		<div className={style.container}>
			<div className={style.header}>
				<Header />
			</div>
			{mode === 'edit' ? (
				<Allotment>
					<Allotment.Pane preferredSize={240} minSize={200} maxSize={300}>
						<MaterailWrapper />
					</Allotment.Pane>
					<Allotment.Pane>
						<EditorArea />
					</Allotment.Pane>
					<Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
						<Setting />
					</Allotment.Pane>
				</Allotment>
			) : (
				<Preview />
			)}
		</div>
	);
};

export default LowCodeEditor;
