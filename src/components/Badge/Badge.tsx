import React from 'react';
import styles from './Badge.scss';
import StatusMessages from '../../constants/vehicleStatusCodes';

type BadgeProps = {
	status: number
};

class Badge extends React.PureComponent<BadgeProps, {}> {
	renderStatusMessage = status => {
		const message = StatusMessages[status];
		return message;
	};

	render() {
		const { status } = this.props;
		if (typeof status !== 'number') return null;
		const styleName = status === 1 ? 'available' : 'unavailable';
		const comingSoon = status === 3 ? 'coming-soon' : '';
		return (
			<div styleName={`${styleName} ${comingSoon}`}>{this.renderStatusMessage(status)}</div>
		);
	}
}

export default CSSModules(Badge, styles, { allowMultiple: true });
