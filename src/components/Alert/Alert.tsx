import React from 'react';
import classNames from 'classnames';
import { iconClose } from '../../assets/icons';
import styles from './Alert.scss';

type AlertProps = {
	show: boolean,
	title?: string,
	subTitle?: string,
	closable?: boolean,
	onClose?: (...args: any[]) => any
};

const Alert: React.SFC<AlertProps> = ({ show, title, subTitle, children, closable, onClose }) => (
	<div styleName={classNames('container', { 'container--hide': !show, 'container--closable': closable })}>
		{closable && (
			<div styleName="icon" onClick={onClose} role="presentation">
				<img styleName="icon--close" src={iconClose} alt="Close" />
			</div>
		)}
		{title && <span styleName="title">{title}</span>}
		{subTitle && <span styleName="sub-title">{subTitle}</span>}
		{children && children}
	</div>
);

// Alert.defaultProps = {
// 	title: '',
// 	subTitle: '',
// 	children: null,
// 	closable: true,
// 	onClose: () => {}
// };

export default CSSModules(Alert, styles, { allowMultiple: true });
