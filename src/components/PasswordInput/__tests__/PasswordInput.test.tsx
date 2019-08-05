import PasswordInput, { PASSWORD_STRENGTH_TYPE, ERROR_MESSAGES } from '../PasswordInput';
import TextInput from '../../../components/TextInput/TextInput';

describe('PasswordInput', () => {
	const initialProps = {
		onChange: jest.fn()
	};
	it('renders', () => {
		const tree = shallow(
			<PasswordInput {...initialProps} />);
		matchSnapshot(tree);
	});
	it('renders one <TextInput /> components', () => {
		const tree = shallow(
			<PasswordInput {...initialProps} />);
		expect(tree.find(TextInput)).toHaveLength(1);
	});

	it('updates state correctly on input change', () => {
		const event = { target: { value: '1234test' } };
		const tree = shallow(
			<PasswordInput {...initialProps} />);
		tree.instance().inputChange(event);
		expect(tree.instance().state).toEqual({
			value: '1234test',
			passwordError: '',
			passwordStrength: PASSWORD_STRENGTH_TYPE.WEAK,
			isPasswordTextVisible: false,
		});
	});

	it('should not updates state on input change when value contains whitespace', () => {
		const event = { target: { value: '1234test ' }, preventDefault: () => { } };
		const tree = shallow(
			<PasswordInput {...initialProps} />);
		tree.instance().inputChange(event);
		expect(tree.instance().state.value).not.toEqual(event.target.value);
	});

	it('updates password visibility status correctly when changePasswordVisibilityStatus method is called', () => {
		const tree = shallow(
			<PasswordInput {...initialProps} />);
		expect(tree.instance().state.isPasswordTextVisible).toEqual(false);
		tree.instance().changePasswordVisibilityStatus();
		expect(tree.instance().state.isPasswordTextVisible).toEqual(true);
	});

	it('should return please enter a password if password value is empty', () => {
		const tree = shallow(
			<PasswordInput {...initialProps} />);
		expect(tree.instance().validatePassword('')).toEqual(ERROR_MESSAGES.EMPTY_PASSWORD);
	});

	it('should return Please enter at least 8 characters if password length is less than 8', () => {
		const tree = shallow(
			<PasswordInput {...initialProps} />);
		expect(tree.instance().validatePassword('1234')).toEqual(ERROR_MESSAGES.PASSWORD_LESS_THAN_8);
	});

	it('should return a weak password strength when calculatePasswordStrength method is called with a weak password value', () => {
		const tree = shallow(
			<PasswordInput {...initialProps} />);
		expect(tree.instance().calculatePasswordStrength('12345678')).toEqual(PASSWORD_STRENGTH_TYPE.WEAK);
	});

	it('should return a medium password strength when calculatePasswordStrength method is called with the given password below', () => {
		const tree = shallow(
			<PasswordInput {...initialProps} />);
		expect(tree.instance().calculatePasswordStrength('aaafcfjh')).toEqual(PASSWORD_STRENGTH_TYPE.MEDIUM);
	});

	it('should return strong password strength when calculatePasswordStrength method is called with the given password below', () => {
		const tree = shallow(
			<PasswordInput {...initialProps} />);
		expect(tree.instance().calculatePasswordStrength('aaaf%^&**Gcfjh')).toEqual(PASSWORD_STRENGTH_TYPE.STRONG);
	});
});
