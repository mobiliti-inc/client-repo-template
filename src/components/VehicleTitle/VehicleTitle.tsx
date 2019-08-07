import React from 'react';
import styles from './VehicleTitle.scss';
import Badge from '../Badge/Badge';

type VehicleTitleProps = {
	yearOfMake?: string,
	vehicleModel?: string,
	vehicleMake?: string,
	vehicleStatus: number
};

class VehicleTitle extends React.PureComponent<VehicleTitleProps, {}> {
	render() {
		const { yearOfMake, vehicleMake, vehicleModel, vehicleStatus } = this.props;
		return (
			<div styleName="title-content">
				<small>{yearOfMake}</small>
				<h1>
					{vehicleMake} {vehicleModel}
				</h1>
				<Badge status={vehicleStatus} />
			</div>
		);
	}
}

export default CSSModules(VehicleTitle, styles, { allowMultiple: true });
