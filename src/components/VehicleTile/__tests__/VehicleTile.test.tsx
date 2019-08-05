import VehicleTile from '../VehicleTile';
import sampleVehicless from '../../../actions/sampleData/sampleVehicles';

describe('VehicleTile', () => {
	it('renders', () => {
		const category = sampleVehicless[0];
		const subject = shallow(<VehicleTile
			onClick={() => { }}
			vehicle={category}
		/>);
		matchSnapshot(subject);
	});
});
