import EditPaymentForm from '../EditPaymentForm';

const defaultProps = {
	name: 'fake text',
	state: 'fake text',
	city: 'fake text',
	zipCode: 'fake text',
	isFormValid: true,
	handleInputChange: jest.fn(),
	updatePaymentMethod: jest.fn(),
	deletePaymentMethod: jest.fn(),
	imageUrl: 'fake text',
	lastFour: 'fake text',
	street: 'fake text',
	closeEditPaymentMethod: jest.fn(),
	isCardUpdating: false,
	error: 'fake error',
};

describe('EditPaymentForm component', () => {
	it('should render', () => {
		const tree = shallow(<EditPaymentForm {...defaultProps} />);
		matchSnapshot(tree);
	});
});
