import NameInput from '../NameInput';

describe('NameInput', () => {
	const initialProps = {
		id: 'name',
		name: 'name'
	};
	it('renders', () => {
		const tree = shallow(
			<NameInput
				onChange={jest.fn()}
				{...initialProps}
			/>
		);

		matchSnapshot(tree);
	});

	it('sets the correct value when inputChange method is called', () => {
		const subject = shallow(
			<NameInput
				{...initialProps}
				onChange={jest.fn()}
			/>
		);

		const event = {
			target: {
				value: 'test'
			}
		};
		expect(subject.instance().state.value).toEqual('');
		subject.instance().inputChange(event);
		expect(subject.instance().state.value).toEqual('test');
	});

	it('renders with empty value and no error', () => {
		const tree = shallow(
			<NameInput
				{...initialProps}
				onChange={jest.fn()}
			/>
		);

		expect(tree.instance().state.value).toEqual('');
		expect(tree.instance().state.error).toEqual('');
	});

	it('sets appropiate error message to Please enter your name when inputChange is called with an empty value', () => {
		const tree = shallow(
			<NameInput
				{...initialProps}
				onChange={jest.fn()}
			/>
		);

		expect(tree.instance().state.error).toEqual('');
		tree.instance().inputChange({ target: { value: '' } });
		expect(tree.instance().state.error).toEqual('Please enter your name');
	});

	it('sets appropiate error message to Please enter a name with two or more letters when inputChange is called with an empty value', () => {
		const tree = shallow(
			<NameInput
				{...initialProps}
				onChange={jest.fn()}
			/>
		);

		expect(tree.instance().state.error).toEqual('');
		tree.instance().inputChange({ target: { value: 'a' } });
		expect(tree.instance().state.error).toEqual('Please enter a name with two or more letters');
	});

	it('sets appropiate error message to be Please enter a valid name when inputChange is called with an empty value', () => {
		const tree = shallow(
			<NameInput
				{...initialProps}
				onChange={jest.fn()}
			/>
		);

		expect(tree.instance().state.error).toEqual('');
		tree.instance().inputChange({ target: { value: 'aa 1234' } });
		expect(tree.instance().state.error).toEqual('Please enter a valid name');
	});
});
