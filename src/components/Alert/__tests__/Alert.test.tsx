import Alert from '../Alert';

describe('Alert', () => {
	it('renders', () => {
		const subject = <Alert show scrolling />;
		expect(subject).toMatchSnapshot();
	});
});
