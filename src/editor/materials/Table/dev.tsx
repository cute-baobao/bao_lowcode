import useMaterialDrag from '@/editor/hooks/useMaterialDrag';
import useMaterialDrop from '@/editor/hooks/useMaterialDrop';
import { CommonComponentProps } from '@/editor/interface';
import { useEffect, useMemo, useRef } from 'react';
import style from './index.module.scss';
import { Table } from 'antd';
import React from 'react';
const TableDev = ({
	id,
	name,
	children,
	style: propsStyle,
}: CommonComponentProps) => {
	const [{ canDrop }, drop] = useMaterialDrop(['TableColumn'], id);
	const [, drag] = useMaterialDrag(name, {
		type: name,
		dragType: 'move',
		id: id,
	});
	const divRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		drag(divRef);
		drop(divRef);
	}, [drop, drag]);

	const columns = useMemo(() => {
		return React.Children.map(children, (item: any) => {
			return {
				title: (
					<div data-component-id={item.props?.id}>{item.props?.title}</div>
				),
				dataIndex: item.props?.dataIndex,
				key: item,
			};
		});
	}, [children]);

	return (
		<div
			data-component-id={id}
			ref={divRef}
			style={{
				border: canDrop ? `2px solid blue` : '1px solid #ccc',
				...propsStyle,
			}}
			className={style.from_container}
		>
			<Table columns={columns} dataSource={[]} pagination={false} />
		</div>
	);
};

export default TableDev;
