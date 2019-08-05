import { AuthFrameComponent } from '../AuthFrame';

describe('AuthFrame', () => {
	const initialProps = {
		history: {
			goBack: jest.fn(),
		},
		userIsLoggedIn: false,
	};
	it('renders', () => {
		const subject = shallow(
			<AuthFrameComponent
				{...initialProps}
			>Hello world!
			</AuthFrameComponent>);
		matchSnapshot(subject);
	});

	it('renders the back button by default', () => {
		const subject = shallow(
			<AuthFrameComponent
				{...initialProps}
			>Hello world!
			</AuthFrameComponent>);
		expect(subject.find('.back-arrow-container')).toHaveLength(1);
	});

	it('does not renders the back button when showBackButton is false', () => {
		const subject = shallow(
			<AuthFrameComponent {...initialProps} showBackButton={false}>Hello world!</AuthFrameComponent>
		);

		expect(subject.find('.back-arrow-container')).toHaveLength(0);
	});
});
