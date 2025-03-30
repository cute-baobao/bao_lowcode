import { CommonComponentProps } from '@/editor/interface';

const TextProd = ({ text, style: propsStyle }: CommonComponentProps) => {
	return <div style={{ ...propsStyle }}>{text}</div>;
};
export default TextProd;
