/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */ // API returns lots of snake_case data
import React from 'react';
import styles from './VehicleGrid.scss';
import VehicleTile from '../VehicleTile/VehicleTile';
import { CategoryModel, VehicleModel } from '../../models';

type VehicleGridProps = {
	vehicles:
	| {
		categories?: any[]
	}
	| any[],
	onSelect?: (...args: any[]) => any,
	faded: boolean
};

class VehicleGrid extends React.PureComponent<VehicleGridProps, {}> {
	formartVehicles = () => {
		const { vehicles } = this.props;
		if (vehicles.categories) {
			return this.flattenVehicleLists();
		}
		return vehicles;
	};
	flattenVehicleLists = () => {
		const existing = {};
		const flatList = [];
		let vehicleLists = [];
		this.props.vehicles.categories.forEach(category => {
			vehicleLists = vehicleLists.concat(category.vehicle_lists);
		});
		vehicleLists.forEach(vehicleList => {
			if (!existing.hasOwnProperty(vehicleList.vehicle_list_id)) {
				flatList.push(vehicleList);
				existing[vehicleList.vehicle_list_id] = true;
			}
		});
		return flatList;
	};
	render() {
		if (this.props.vehicles.length < 1) return null;
		return (
			<div styleName={`grid-cover ${this.props.faded ? 'faded' : ''}`}>
				<div styleName="vehicle-grid">
					{this.props.vehicles.map(vehicle => (
						<VehicleTile
							key={vehicle.vehicle_list_id ? `${vehicle.vehicle_list_id}` : `${vehicle.vehicle_id}`}
							vehicle={vehicle}
							onClick={this.props.onSelect}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default CSSModules(VehicleGrid, styles, { allowMultiple: true });
