import moment from 'moment';


import DialogModal from '../../../../components/Modal/DialogModal/DialogModal';
import numberToUsCurrencyformatter from '../../../../utils/numberToUsCurrencyformatter';
import styles from './OrderSummaryModal.scss';

const OrderSummaryModal = (props) => (
	<DialogModal
		blueButtonClick={props.confirmSubscriptionMileChanges}
		whiteButtonClick={props.closeOrderSummaryModal}
		modalIsVisible={props.isOrderSummaryModalVisible}
		closeModal={props.closeOrderSummaryModal}
		modalTitle=""
		whiteButtonText="Cancel"
		blueButtonText="Confirm Change"
		isBlueButtoDisabled={false}
		footer
	>
		<div styleName="order-summary-container">
			<h2>Order Summary</h2>
			<p styleName="order-summary-info">
						Below are the changes for your upcoming subscription.
						You will be able to make edits to your subscription at
						anytime prior to your billing date.
			</p>
			<div styleName="order-summary-details">
				<span>New Charge Date </span>
				<span>{moment(props.charge_date, 'MM/DD/YYYY').format('ddd, MMM. Do')}</span>
			</div>
			<div styleName="order-summary-details">
				<span>Base Subscription Fee</span>
				<span>{`${numberToUsCurrencyformatter(2, 2).format(props.subscription_cost)}`}</span>
			</div>
			<div styleName="order-summary-details">
				<span>{`${props.monthly_miles} Miles Per Month`}</span>
				<span>{`+${numberToUsCurrencyformatter(2, 2).format(props.over_mileage_charge)}`}</span>
			</div>
			<div styleName="order-summary-details">
				<span>Taxes</span>
				<span>{`${numberToUsCurrencyformatter(2, 2).format(props.tax)}`}</span>
			</div>
			<div styleName="order-summary-details">
				<span>New Recurring Subscription Fee</span>
				<span>{`${numberToUsCurrencyformatter(2, 2).format(props.monthly_subscription_price)}`}</span>
			</div>
			<p styleName="exceed-miles-info">
				{`If you exceed your monthly miles you will be charged ${numberToUsCurrencyformatter(2, 2).format(props.excess_mile_charge)}
						per mile. Please refer to our FAQs for more information
						on how we charge for exceeding your monthly miles and exceeding
						your vehicle available miles`}
			</p>
		</div>
	</DialogModal>
);

OrderSummaryModal.propTypes = {
	closeOrderSummaryModal: PropTypes.func.isRequired,
	isOrderSummaryModalVisible: PropTypes.bool.isRequired,
	charge_date: PropTypes.string.isRequired,
	subscription_cost: PropTypes.number.isRequired,
	monthly_miles: PropTypes.number.isRequired,
	over_mileage_charge: PropTypes.number.isRequired,
	tax: PropTypes.number.isRequired,
	monthly_subscription_price: PropTypes.number.isRequired,
	excess_mile_charge: PropTypes.number.isRequired,
	confirmSubscriptionMileChanges: PropTypes.func.isRequired,
};

export default CSSModules(OrderSummaryModal, styles, { allowMultiple: true });
