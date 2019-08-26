import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/pro-light-svg-icons";

import './Alert.scss';

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
					<div styleName="icon--close"><FontAwesomeIcon icon={faTimes} /></div>
				</div>
			)}
			{title && <span styleName="title">{title}</span>}
			{subTitle && <span styleName="sub-title">{subTitle}</span>}
			{children && children}
		</div>
	);
};

export default Alert;
