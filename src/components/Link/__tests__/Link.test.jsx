import Link from '../Link';

describe('Link', () => {
	it('allows an external link to be rendered', () => {
		const subject = shallow(<Link to="/" external>Hello world!</Link>);
		expect(subject.props().href).toBe('/');
	});
	it('contains the correct text', () => {
		const subject = shallow(<Link to="/">Hello world!</Link>);
		expect(subject.props().children).toEqual('Hello world!');
	});
	it('accepts a "to" property with uri', () => {
		const subject = shallow(<Link to="/test">Hello world!</Link>);
		expect(subject.props().to).toEqual('/test');
	});
});
