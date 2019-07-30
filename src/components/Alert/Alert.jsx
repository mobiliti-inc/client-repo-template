import React from 'react';
import classNames from 'classnames';

import { iconClose } from '../../assets/icons';

import styles from './Alert.scss';

const Alert = ({
	show,
	title,
	subTitle,
	children,
	closable,
	onClose,
}) => (
	<div styleName={classNames('container', { 'container--hide': !show, 'container--closable': closable })}>
		{closable && <div styleName="icon" onClick={onClose} role="presentation"><img styleName="icon--close" src={iconClose} alt="Close" /></div>}
		{title && <span styleName="title">{title}</span>}
		{subTitle && <span styleName="sub-title">{subTitle}</span>}
		{children && children}
	</div>
);


Alert.propTypes = {
	show: PropTypes.bool.isRequired,
	title: PropTypes.string,
	subTitle: PropTypes.string,
	children: PropTypes.node,
	closable: PropTypes.bool,
	onClose: PropTypes.func,
};

Alert.defaultProps = {
	title: '',
	subTitle: '',
	children: null,
	closable: true,
	onClose: () => {},
};

export default CSSModules(Alert, styles, { allowMultiple: true });
