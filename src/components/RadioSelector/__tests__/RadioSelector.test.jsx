import RadioSelector from '../RadioSelector';
import { matchSnapshot } from '../../../../testUtils/matchSnapshot';

describe('RadioSelector', () => {
	const options = [
		{
			miles: 2000,
			status: 1,
			price: 1633,
			mobiliti_fee: null,
			rights: 0,
			key: '2000 Miles',
			value: '$1633',
			current: false
		},
		{
			miles: 2000,
			status: 1,
			price: 1633,
			mobiliti_fee: null,
			rights: 0,
			key: '200 Miles',
			value: '$633',
			current: false
		}
	];
	it('renders', () => {
		const subject = shallow(<RadioSelector
			options={options}
			onSelectOption={jest.fn()}
			selectedItem=" "
		/>);
		matchSnapshot(subject);
	});

	it('sets the correct value when onSelect method is called', () => {
		const subject = shallow(
			<RadioSelector
				options={options}
				onSelectOption={jest.fn()}
				selectedItem=" "
			/>
		);

		const data = {
			miles: 2000,
			status: 1,
			price: 1633,
			mobiliti_fee: null,
			rights: 0,
			key: '200 Miles',
			value: '$633',
			current: false
		};

		const event = {
			stopPropagation: jest.fn()
		};

		expect(subject.instance().state.selectedIndex).toEqual(null);
		subject.instance().onSelect(event, data, 1);
		expect(subject.instance().state.selectedIndex).toEqual(1);
		expect(subject.instance().state.data).toEqual(data);
	});
});
