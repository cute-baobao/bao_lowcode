import { CommonComponentProps } from '@/editor/interface';
import { Table } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';

const TableProd = ({ url, children }: CommonComponentProps) => {
	const [data, setData] = useState<Array<Record<string, any>>>([]);
	const [loading, setLoading] = useState(false);

	const getData = async () => {
		if (url) {
			setLoading(true);
			const res = await fetch(url).then((res) => res.json());
			setData(res);
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const columns = useMemo(() => {
		return React.Children.map(children, (item: any) => {
			if (item.props?.type === 'data') {
				return {
					title: item.props?.title,
					dataIndex: item.props?.dataIndex,
					render: (value: any) =>
						value ? dayjs(value).format('YYYY-MM-DD') : null,
				};
			} else if (item.props?.type === 'text') {
				return {
					title: item.props?.title,
					dataIndex: item.props?.dataIndex,
				};
			}
		});
	}, [children]);

	return (
		<Table
			columns={columns}
			dataSource={data}
			pagination={false}
			rowKey="id"
			loading={loading}
		/>
	);
};

export default TableProd;
