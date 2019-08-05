import LocationSelectDropdown from '../LocationSelectDropdown';


describe('LocationSelectDropdown', () => {
	it('renders', () => {
		const markets = [
			{
				id: 1,
				market_name: 'Austin',
			}
		];
		const subject = shallow(<LocationSelectDropdown
			scrolling={false}
			number={42}
			markets={markets}
			currentLocation={{
				marketId: 1,
				marketName: 'Austin',
			}}
			selectUserLocation={() => {}}
			callback={() => {}}
		/>);
		expect(subject.text()).toContain('42');
		expect(subject.text()).toContain('Vehicles');
		expect(subject.text()).toContain('<Dropdown />');
	});
});
