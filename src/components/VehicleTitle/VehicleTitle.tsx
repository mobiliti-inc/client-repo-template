import React from 'react';

import styles from './VehicleTitle.scss';
import Badge from '../Badge/Badge';

class VehicleTitle extends React.PureComponent {
	static propTypes = {
		yearOfMake: PropTypes.string,
		vehicleModel: PropTypes.string,
		vehicleMake: PropTypes.string,
		vehicleStatus: PropTypes.number.isRequired,
	}

	static defaultProps = {
		yearOfMake: '',
		vehicleModel: '',
		vehicleMake: '',
	}

	render() {
		const {
			yearOfMake,
			vehicleMake,
			vehicleModel,
			vehicleStatus,
		} = this.props;
		return (
			<div styleName="title-content">
				<small>{yearOfMake}</small>
				<h1>{vehicleMake} {vehicleModel}</h1>
				<Badge status={vehicleStatus} />
			</div>
		);
	}
}

export default CSSModules(VehicleTitle, styles, { allowMultiple: true });
