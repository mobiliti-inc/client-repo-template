import styles from './VehicleSelector.scss';

type VehicleSelectorProps = {
	vehicleName: string,
	vehicleImageUrl: string,
	isActive?: boolean,
	onVehicleSelected: (...args: any[]) => any
};

const VehicleSelector: React.SFC<VehicleSelectorProps> = ({
	vehicleName,
	vehicleImageUrl,
	isActive,
	onVehicleSelected
}) => (
		<div
			role="presentation"
			onClick={onVehicleSelected}
			styleName={`vehicle-selector ${isActive ? 'vehicle-selector--active' : ''}`}
		>
			<div styleName="vehicle-selector__image">
				<img src={vehicleImageUrl} alt="vehicle-selector" />
			</div>
			<div styleName="vehicle-selector__name">{vehicleName}</div>

			<span
				styleName={`vehicle-selector__selected-indicator ${isActive ? 'vehicle-selector__selected-indicator--active' : ''}`}
			>
				&nbsp;
		</span>
		</div>
	);

// VehicleSelector.defaultProps = {
// 	isActive: false
// };

export default CSSModules(VehicleSelector, styles, { allowMultiple: true });
