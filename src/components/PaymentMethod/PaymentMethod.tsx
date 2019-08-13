/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-did-update-set-state */
import styles from './PaymentMethod.scss';
import AddPaymentMethodForm from '../AddPaymentMethodForm/AddPaymentMethodForm';
import Tile from '../Tile/Tile';
import RadioSelector from '../RadioSelector/RadioSelector';
import { iconAdd } from '../../assets';
import handleAuthRequiredApiCall from '../../utils/handleAuthRequiredApiCall';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Button, { BUTTON_TYPES } from '../Button/Button';

type PaymentMethodProps = {
	newPaymentCardId: string,
	isPaymentCardAdded: boolean,
	selectedPaymentCardId: string,
	paymentTitle: string,
	updateSubscriptionPaymetMethod?: (...args: any[]) => any,
	allowUpdateSubscriptionPaymetMethod?: boolean,
	disableUpdateSubscriptionPaymetMethodButton?: boolean,
	subscriptionPaymentMethodUpdateMessage?: string,
	shouldShowLoader?: boolean
};

type PaymentMethodState = {
	paymentCardData: any,
	displayPaymentForm: boolean,
	displayPaymentForm: boolean,
	paymentCardData: any
};

class PaymentMethod extends React.PureComponent<PaymentMethodProps, PaymentMethodState> {
	constructor(props) {
		super(props);
		this.state = {
			displayPaymentForm: !props.paymentCards.length,
			paymentCardData: this.formatPaymentCardData()
		};
	}
	componentWillMount() {
		const { paymentCards } = this.props;
		return !paymentCards.length ? this.handleFetchPaymentCards() : null;
	}
	componentDidUpdate(prevProps) {
		const { newPaymentCardId, paymentCards } = this.props;
		if (newPaymentCardId !== prevProps.newPaymentCardId) {
			this.handleFetchPaymentCards();
		}
		if (paymentCards.length !== prevProps.paymentCards.length) {
			this.setState({
				paymentCardData: this.formatPaymentCardData(),
				displayPaymentForm: false
			});
		}
	}
	handleFetchPaymentCards = () => {
		const { accessToken, refreshToken, history, fetchPaymentCards, refreshAccessToken } = this.props;
		handleAuthRequiredApiCall(accessToken, refreshToken, history, fetchPaymentCards, refreshAccessToken);
	};
	handleAddPaymentCard = subscriberStripeId => {
		const { accessToken, refreshToken, history, addPaymentCard, refreshAccessToken } = this.props;
		handleAuthRequiredApiCall(accessToken, refreshToken, history, addPaymentCard, refreshAccessToken, subscriberStripeId);
	};
	formatPaymentCardData = () => {
		const { paymentCards } = this.props;
		let formatedPaymentCards = {};
		return paymentCards.map(cardData => {
			const { icon_url, last_four, card_id } = cardData;
			formatedPaymentCards = {
				...{
					key: card_id,
					imageUrl: icon_url,
					optionalText: <p styleName="card-number">(......{last_four})</p>,
					current: true
				}
			};
			return formatedPaymentCards;
		});
	};
	handleSelectPaymentCard = (data, selectedCardIndex) => this.props.addSelectedPaymentCard(data.key, selectedCardIndex);
	handlePayformVisibility = visibilityStatus => {
		this.setState({
			displayPaymentForm: visibilityStatus
		});
	};
	render() {
		const {
			isPaymentCardAdded,
			selectedPaymentCardId,
			paymentTitle,
			updateSubscriptionPaymetMethod,
			allowUpdateSubscriptionPaymetMethod,
			disableUpdateSubscriptionPaymetMethodButton,
			subscriptionPaymentMethodUpdateMessage,
			shouldShowLoader
		} = this.props;
		const { displayPaymentForm, paymentCardData } = this.state;
		const displayPaymentFormClass = displayPaymentForm ? 'display' : 'hide';
		const displayPaymentListClass = !displayPaymentForm ? 'display' : 'hide';
		if (!this.props.isPaymentCardFetched && !this.state.paymentCardData.length) {
			return (
				<Tile>
					<LoadingSpinner show blue parentClass={styles.loader} />
				</Tile>
			);
		}
		return (
			<Tile>
				<div styleName="payment-card-container">
					<div styleName="text-container">
						<h2 styleName="payment-title">{paymentTitle}</h2>
					</div>
					<div
						styleName={`side-padding add-payment-container add-payment-container-${displayPaymentListClass}`}
						role="presentation"
						onClick={() => this.handlePayformVisibility(true)}
					>
						<img src={iconAdd} alt="icon add" />
						<p styleName="add-payment-text">Add Payment Method</p>
					</div>
					<div styleName={`payment-list payment-list-${displayPaymentListClass}`}>
						<RadioSelector onSelectOption={this.handleSelectPaymentCard} keyIsVisible={false} options={paymentCardData} selectedItem={selectedPaymentCardId} />
						{subscriptionPaymentMethodUpdateMessage && <div styleName="subscription-card-update-text side-padding">{subscriptionPaymentMethodUpdateMessage}</div>}

						{allowUpdateSubscriptionPaymetMethod && (
							<div styleName="update-payment-card-btn side-padding">
								<Button
									type={BUTTON_TYPES.STANDARD}
									disabled={disableUpdateSubscriptionPaymetMethodButton}
									onClick={updateSubscriptionPaymetMethod}
									bordered
									showLoader={shouldShowLoader}
								>
									Save
								</Button>
							</div>
						)}
					</div>
					<div styleName={`side-padding payment-form payment-form-${displayPaymentFormClass}`}>
						<AddPaymentMethodForm
							displayCancelButton={paymentCardData.length !== 0}
							cancelForm={() => this.handlePayformVisibility(false)}
							addPaymentCard={this.handleAddPaymentCard}
							isPaymentCardAdded={isPaymentCardAdded}
						/>
					</div>
				</div>
			</Tile>
		);
	}
}

// PaymentMethod.defaultProps = {
// 	updateSubscriptionPaymetMethod: () => {},
// 	allowUpdateSubscriptionPaymetMethod: false,
// 	disableUpdateSubscriptionPaymetMethodButton: false,
// 	subscriptionPaymentMethodUpdateMessage: '',
// 	shouldShowLoader: false
// };

export default CSSModules(PaymentMethod, styles, { allowMultiple: true });
