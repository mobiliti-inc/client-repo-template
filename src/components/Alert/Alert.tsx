import React from 'react';
import cx from 'classnames';
import CSSModules from 'react-css-modules';
// import { iconClose } from '../../assets';
import styles from './Alert.scss';

interface AlertProps {
	show: boolean;
	title?: string;
	subTitle?: string;
	closable?: boolean;
	onClose?: (...args: any[]) => any;
}

const Alert: React.FC<AlertProps> = (props) => {
	const { show, title, subTitle, children, closable, onClose } = props;
	return (
		<div styleName={cx('container', { 'container--hide': !show, 'container--closable': closable })}>
			{closable && (
				<div styleName="icon" onClick={onClose} role="presentation">
					{/* <img styleName="icon--close" src={iconClose} alt="Close" /> */}
				</div>
			)}
			{title && <span styleName="title">{title}</span>}
			{subTitle && <span styleName="sub-title">{subTitle}</span>}
			{children && children}
		</div>
	);
};

// Alert.defaultProps = {
// 	title: '',
// 	subTitle: '',
// 	children: null,
// 	closable: true,
// 	onClose: () => {}
// };

export default CSSModules(Alert, styles, { allowMultiple: true });
