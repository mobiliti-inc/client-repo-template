import * as React from 'react';
import CSSModules from 'react-css-modules';

import { StatusMessages } from '../../utils';
import * as styles from './Badge.scss';

interface BadgeProps {
	status: number;
};

const Badge: React.FC<BadgeProps> = (props) => {
	const { status } = props;

	const renderStatusMessage = (status: number) => {
		const message = StatusMessages[status];
		return message;
	};

	if (typeof status !== 'number') return null;
	const styleName = status === 1 ? 'available' : 'unavailable';
	const comingSoon = status === 3 ? 'coming-soon' : '';
	return (
		<div styleName={`${styleName} ${comingSoon}`}>{renderStatusMessage(status)}</div>
	);
}

export default CSSModules(Badge, styles, { allowMultiple: true });
