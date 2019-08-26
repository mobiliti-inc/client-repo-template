import * as React from 'react';

import { StatusMessages } from '../../utils';
import './Badge.scss';

interface BadgeProps {
	status: number;
}

const Badge: React.FC<BadgeProps> = (props) => {
	const { status } = props;

	const renderStatusMessage = (status: any) => {
		const message = StatusMessages[status];
		return message;
	};

	if (typeof status !== 'number') return null;
	const styleName = status === 1 ? 'available' : 'unavailable';
	const comingSoon = status === 3 ? 'coming-soon' : '';
	return (
		<div styleName={`${styleName} ${comingSoon}`}>{renderStatusMessage(status)}</div>
	);
};

export default Badge;
