import AppFrame from '../AppFrame';

describe('AppFrame', () => {
	it('renders', () => {
		const subject = shallow(<AppFrame>Hello world!</AppFrame>);

		expect(subject.text()).toEqual('<Route />');
	});
});
