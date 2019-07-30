import Rating from '../Rating';


describe('Rating', () => {
	it('renders', () => {
		const subject = shallow(<Rating stars={3} />);
		expect(subject.html()).toEqual('<div><img src="test-file-stub" alt="star"/><img src="test-file-stub" alt="star"/><img src="test-file-stub" alt="star"/><img src="test-file-stub" alt="star"/><img src="test-file-stub" alt="star"/></div>');
	});
});
