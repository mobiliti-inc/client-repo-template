import Icon, { ICON_TYPES } from '../Icon';

describe('Icon', () => {
	it('renders', () => {
		const subject = shallow(<Icon type={ICON_TYPES.email} />);
		expect(subject.text()).toEqual('<SvgLoader />');
	});
});
