import { CommonComponentProps } from '@/editor/interface';
import { Modal } from 'antd';
import {
	forwardRef,
	ForwardRefRenderFunction,
	useImperativeHandle,
	useState,
} from 'react';

export interface ModalRef {
	open: () => void;
	close: () => void;
}

const ModalProd: ForwardRefRenderFunction<
	ModalRef,
	Omit<CommonComponentProps, 'ref'>
> = ({ children, title, onOk, onCancel, style }, ref) => {
	const [open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return {
			open: () => {
				setOpen(true);
			},
			close: () => {
				setOpen(false);
			},
		};
	});

	return (
		<Modal
			open={open}
			style={style}
			title={title}
			onCancel={() => {
				if (onCancel) onCancel();
				setOpen(false);
			}}
			onOk={() => {
				if (onOk) onOk();
			}}
		>
			{children}
		</Modal>
	);
};

export default forwardRef(ModalProd);
