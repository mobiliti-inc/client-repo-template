import VehicleSelector from '../VehicleSelector';

describe('VehicleSelector', () => {
	const defaultProps = {
		vehicleName: 'Vehicle name',
		vehicleImageUrl: 'Vehicle image url',
		isActive: false,
		onVehicleSelected: jest.fn(),
	};
	it('renders with isActive set to false', () => {
		const subject = shallow(<VehicleSelector
			{...defaultProps}
		/>);
		matchSnapshot(subject);
	});

	it('renders with isActive set to true', () => {
		const subject = shallow(<VehicleSelector
			{...defaultProps}
			isActive
		/>);
		matchSnapshot(subject);
	});
});
