import EmailInput from '../EmailInput';

describe('EmailInput', () => {
	const initialProps = {
		id: 'email',
		name: 'email'
	};
	it('renders', () => {
		const tree = shallow(
			<EmailInput
				onChange={jest.fn()}
				{...initialProps}
			/>
		);

		matchSnapshot(tree);
	});

	it('sets the correct value when inputChange method is called', () => {
		const subject = shallow(
			<EmailInput
				{...initialProps}
				onChange={jest.fn()}
			/>
		);

		const event = {
			target: {
				value: 'test@mobiliti.com'
			}
		};
		expect(subject.instance().state.value).toEqual('');
		subject.instance().inputChange(event);
		expect(subject.instance().state.value).toEqual('test@mobiliti.com');
	});

	it('renders with empty value and no error', () => {
		const tree = shallow(
			<EmailInput
				{...initialProps}
				onChange={jest.fn()}
			/>
		);

		expect(tree.instance().state.value).toEqual('');
		expect(tree.instance().state.error).toEqual('');
	});

	it('sets appropiate error message to Please enter your email when inputChange is called with an empty value', () => {
		const tree = shallow(
			<EmailInput
				{...initialProps}
				onChange={jest.fn()}
			/>
		);

		expect(tree.instance().state.error).toEqual('');
		tree.instance().inputChange({ target: { value: '' } });
		expect(tree.instance().state.error).toEqual('Please enter your email');
	});

	it('sets appropiate error message to be Please enter a valid email when inputChange is called with an empty value', () => {
		const tree = shallow(
			<EmailInput
				{...initialProps}
				onChange={jest.fn()}
			/>
		);

		expect(tree.instance().state.error).toEqual('');
		tree.instance().inputChange({ target: { value: 'aa #' } });
		expect(tree.instance().state.error).toEqual('Please enter a valid email');
	});
});
