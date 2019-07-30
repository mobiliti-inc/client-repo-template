import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import CustomDatePicker from '../CustomDatePicker';

describe('CustomDatePicker', () => {
	const tree = shallow(<CustomDatePicker onDatePicked={() => {}} />);

	it('renders', () => {
		matchSnapshot(tree);
	});

	it('has a datepicker component', () => {
		expect(tree.find(SingleDatePicker)).toHaveLength(1);
	});

	it('should be able to pick a different date', () => {
		const dateToSet = moment('1999-09-09');
		tree.instance().onDateChange(dateToSet);
		expect(tree.state().date).toEqual(dateToSet);
	});
});
