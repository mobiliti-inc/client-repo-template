import OrderSummaryModal from '../OrderSummaryModal';

describe('OrderSummaryModal', () => {
	const props = {
		confirmSubscriptionMileChanges: jest.fn(),
		isFetching: false,
		subscription_id: '0',
		monthly_miles: 0,
		subscription_cost: 0,
		over_mileage_charge: 0,
		excess_mile_charge: 0,
		tax: 0,
		monthly_subscription_price: 0,
		charge_date: '00/00/000',
		closeOrderSummaryModal: jest.fn(),
		isOrderSummaryModalVisible: true,
	};
	const component = <OrderSummaryModal {...props} />;
	it('renders', () => {
		const subject = shallow(component);
		expect(subject).toMatchSnapshot();
	});
});
