import EditPaymentModal from '../EditPaymentModal';

describe('EditPaymentModal', () => {
	const props = {
		modalVisible: false,
		scrolling: false,
		closeModal: jest.fn(),
		editSubscriptionRoute: '/',
		onSelectSwap: jest.fn(),
		onSelectReturnVehicle: jest.fn(),
	};
	const component = <EditPaymentModal {...props} />;

	it('renders', () => {
		expect(component).toMatchSnapshot();
	});
});
