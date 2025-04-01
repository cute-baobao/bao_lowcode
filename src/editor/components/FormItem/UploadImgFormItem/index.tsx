import { GetProp, Upload, UploadProps } from 'antd';
import { useState } from 'react';

interface UploadImgProps {
	value?: string;
	onChange?: (value: string) => void;
}

const UploadImgFormItem: React.FC<UploadImgProps> = ({ value, onChange }) => {
	console.log(value);
	const [imageUrl, setImageUrl] = useState<string>();
	type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
	const getBase64 = (img: FileType, callback: (url: string) => void) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result as string));
		reader.readAsDataURL(img);
	};

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			+<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);

	return (
		<Upload
			name="avatar"
			listType="picture-card"
			showUploadList={false}
			beforeUpload={(file) => {
				getBase64(file, (url) => {
					setImageUrl(url);
					onChange?.(new Date().getTime().toString());
				});
				return false;
			}}
		>
			{imageUrl ? (
				<img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
			) : (
				uploadButton
			)}
		</Upload>
	);
};

export default UploadImgFormItem;
