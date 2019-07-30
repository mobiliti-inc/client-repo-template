import { ReserveCheckoutFrame } from '../ReserveCheckoutFrame';
import vehicles from '../../../actions/sampleData/sampleVehicles';

describe('ReserveFrame', () => {
	const vehicle = vehicles[0];
	const props = {
		vehicle,
		history: {
			goBack: jest.fn()
		},
		location: {
			data: {
				latitude: 2344,
				longitude: -3455
			},
		},
		geolocationUnavailable: false,
		getUserLocation: jest.fn(),
		pageTitle: 'Reserve',
		children: <div>Yes</div>
	};
	it('renders', () => {
		const subject = shallow(<ReserveCheckoutFrame {...props} />);
		matchSnapshot(subject);
	});
});
