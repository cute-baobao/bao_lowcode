import useComponentsStore from '@/editor/store/components';

const Source = () => {
	const { components } = useComponentsStore();
	return (
		<div>
			<pre>{JSON.stringify(components, null, 2)}</pre>
		</div>
	);
};
export default Source;
