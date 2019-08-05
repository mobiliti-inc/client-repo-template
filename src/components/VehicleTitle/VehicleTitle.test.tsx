import VehicleTitle from './VehicleTitle';


describe('VehicleTitle', () => {
	it('renders', () => {
		const subject = shallow(<VehicleTitle />);
		expect(subject.html()).toEqual('<div></div>');
	});
});
