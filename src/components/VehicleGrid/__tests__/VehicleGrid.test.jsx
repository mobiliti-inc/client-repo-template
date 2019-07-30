import { MemoryRouter } from 'react-router';
import VehicleGrid from '../VehicleGrid';
import sampleVehicles from '../../../actions/sampleData/sampleVehicles';

describe('VehicleGrid', () => {
	it('renders', () => {
		const text = '';
		const subject = shallow(
			<MemoryRouter>
				<VehicleGrid
					vehicles={sampleVehicles}
					faded
				/>
			</MemoryRouter>
		);
		expect(subject.text()).toContain(text);
	});
});
