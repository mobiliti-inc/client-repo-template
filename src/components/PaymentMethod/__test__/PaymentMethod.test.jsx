import PaymentMethodCard from '../PaymentMethod';


describe('PaymentMethodCard', () => {
	const initialProps = {
		addPaymentCard: jest.fn(),
		paymentCardData: [],
		onCardSelected: jest.fn(),
		newPaymentCardId: '',
		isPaymentCardAdded: false,
		selectedPaymentCardId: '',
		paymentTitle: 'Payment Method',
	};
	it('renders', () => {
		const tree = shallow(<PaymentMethodCard {...initialProps} />);
		matchSnapshot(tree);
	});
});
