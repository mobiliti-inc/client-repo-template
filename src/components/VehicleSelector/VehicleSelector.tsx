import styles from './VehicleSelector.scss';

const VehicleSelector = ({ vehicleName, vehicleImageUrl, isActive, onVehicleSelected, }) => (
	<div
		role="presentation"
		onClick={onVehicleSelected}
		styleName={`vehicle-selector ${isActive ? 'vehicle-selector--active' : ''}`}
	>
		<div styleName="vehicle-selector__image">
			<img src={vehicleImageUrl} alt="vehicle-selector" />
		</div>
		<div styleName="vehicle-selector__name">
			{vehicleName}
		</div>

		<span
			styleName={`vehicle-selector__selected-indicator ${isActive ? 'vehicle-selector__selected-indicator--active' : ''}`}
		>
                &nbsp;
		</span>
	</div>
);

VehicleSelector.propTypes = {
	vehicleName: PropTypes.string.isRequired,
	vehicleImageUrl: PropTypes.string.isRequired,
	isActive: PropTypes.bool,
	onVehicleSelected: PropTypes.func.isRequired,
};

VehicleSelector.defaultProps = {
	isActive: false,
};
export default CSSModules(VehicleSelector, styles, { allowMultiple: true });
