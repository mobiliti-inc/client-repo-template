import Script from 'react-load-script';

import DriverLicenseForm from '../DriverLicenseForm';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import TextInput from '../../../components/TextInput/TextInput';

import userModel from '../../../actions/sampleData/sampleUser';

describe('DriverLicenseForm', () => {
	const license = {
		frontImage: { image: '' },
		backImage: { image: '' },
	};

	const props = {
		submitManualLicenseInfo: jest.fn(),
		userData: {
			isLoading: false,
			auth: {
				accessToken: '',
				refreshToken: '',
			},
		},
		license,
		validity: jest.fn(),
		subscriber: {
			fetched: false,
			fetching: false,
			...userModel
		},
	};

	const fields = {
		address: {
			valid: true,
			error: [],
			value: 'Lorem'
		},
		city: {
			valid: true,
			error: [],
			value: 'Lorem'
		},
		state: {
			valid: true,
			error: [],
			value: 'Lorem'
		},
		zipCode: {
			valid: true,
			error: [],
			value: 'Lorem'
		},
		dateOfBirth: {
			valid: true,
			error: [],
			value: '01/01/1990',
		},
		driverLicenseNumber: {
			valid: true,
			error: [],
			value: '1234'
		},
		driverLicenseExpiryDate: {
			valid: true,
			error: [],
			value: '01/01/1990',
		}
	};

	jest.mock('moment', () => () => ({ format: () => '2018–01–30T12:34:56+00:00' }));

	const component = <DriverLicenseForm {...props} />;

	const tree = shallow(component);

	it('renders correctly', () => {
		matchSnapshot(tree);
	});

	it('should have two datepicker input', () => {
		expect(tree.find(CustomDatePicker)).toHaveLength(2);
	});

	it('should have all inputs', () => {
		expect(tree.find(CustomDatePicker)).toHaveLength(2);
		expect(tree.find(TextInput)).toHaveLength(5);
	});

	it('should render a google map script', () => {
		const mapScript = tree.find(Script);
		expect(mapScript).toHaveLength(1);
		expect(mapScript.props().url).toMatch('https://maps.googleapis.com/maps/api/js');
	});

	it('should have a function to check invalid fields', () => {
		const toValidate = { value: 'Lorem', stateName: 'textField' };
		const checkInvalidity = tree.instance().checkInvalidFields(toValidate);
		expect(checkInvalidity).toBeTruthy();
		expect(tree.state().fields.textField.valid).toBeTruthy();
	});

	it('should flag invalid fields, special chars and emptyness', () => {
		const subject = shallow(component);
		const specialCharInvalidField = { value: '@#$@%%@%$#', stateName: 'name' };
		const emptyField = { value: '', stateName: 'email' };
		const { checkInvalidFields } = subject.instance();
		expect(checkInvalidFields(specialCharInvalidField)).toBeFalsy();
		expect(subject.state('fields').name.valid).toBeFalsy();
		expect(subject.state('fields').name.error).toMatch('invalid characters');
		expect(checkInvalidFields(emptyField)).toBeFalsy();
		expect(subject.state('fields').email.valid).toBeFalsy();
		expect(subject.state('fields').email.error).toMatch('can not be empty');
	});

	it('should check invalid date fields', () => {
		const subject = shallow(component);
		const momentDate1 = '01/01/1990';
		const momentDate2 = '01/01/2020';
		const validDates = [
			{ value: momentDate1, stateName: 'date1' },
			{ value: momentDate2, stateName: 'date2' }
		];
		expect(subject.instance().checkDateFieldsValidity(validDates)).toBeTruthy();
	});

	it('should flag values less than 2 characters', () => {
		const twoCharsField = { stateName: 'twoChars', value: '1' };
		expect(tree.instance().checkInvalidFields(twoCharsField)).toBeFalsy();
		expect(tree.state().fields.twoChars.error).toMatch('This field can not be less than 2 characters');
	});

	it('should be able to validate objects of fields', () => {
		const objectToValidate = [
			{ stateName: 'lorem', value: 'Lorem' },
			{ stateName: 'ipsum', value: 'Ipsum' }
		];
		expect(tree.instance().checkInvalidFields(objectToValidate)).toBeTruthy();
	});

	it('should be able to submit license info', () => {
		const subject = shallow(component);
		subject.setState({ fields });
		subject.find('Button').simulate('click');
		expect(props.submitManualLicenseInfo).toHaveBeenCalledWith(subject.instance().getUserData());
	});

	it('should check validity on subscriber details missing', () => {
		const subject = shallow(<DriverLicenseForm {...props} />);
		expect(subject.state('inputChanged')).toBeFalsy();
		subject.setState({ inputChanged: true });
		expect(subject.instance().props.validity).toBeCalled();
	});

	it('should detect changes in field edit', () => {
		const subject = shallow(<DriverLicenseForm {...props} />);
		subject.setState({ fields });
		subject.setState({ fields: { ...fields, city: { value: 'Rome', valid: true, error: '' } } });
		expect(subject.instance().props.validity).toBeCalled();
	});

	it('should handle input changes', () => {
		const subject = shallow(<DriverLicenseForm {...props} />);
		subject.find('#city-input').simulate('change', { target: { value: 'Rome', name: 'city', placeholder: 'City' } });
		expect(subject.state('fields').city.valid).toBeTruthy();
		expect(subject.state('fields').city.value).toEqual('Rome');
	});
});
