/* eslint-disable react/no-did-update-set-state */
/* eslint-disable camelcase */
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { isUndefined } from 'util';
import moment from 'moment';

import {
	scroll,
	logOut,
	refreshAccessToken,
	uploadUserProfilePhoto,
	getSubscriptions,
	addSelectedVehicle,
	getMarkets,
	fetchVehicleDetails,
	getUserLocation,
	enterSwapMode,
	getPaymentCards,
	addSelectedPaymentCard,
	addPaymentCard,
	selectVehicleMile,
	updateSubscriptionMiles,
	updateSubscriptionPaymentCard,
	getMilesChangePreview,
	getDealerOpenDays,
	selectDropOffTime,
	selectDropOffDay,
	scheduleReturn,
} from '../../actions';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SwapInstructionsModal from '../SwapInstructionsModal/SwapInstructionsModal';

import styles from './MyVehiclesFrame.scss';
import { LocationModel, VehicleModel, } from '../../models';
import verifyToken from '../../utils/verifyToken';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import handleAuthRequiredApiCall from '../../utils/handleAuthRequiredApiCall';
import VehicleSelector from '../../components/VehicleSelector/VehicleSelector';
import EditIcon from '../../components/EditIcon/EditIcon';
import VehicleDealer from '../../pages/Vehicles/Detail/VehicleDealer/VehicleDealer';
import EditSubscriptionModal from './common/EditPaymentModal/EditPaymentModal';
import OrderSummaryModal from './common/OrderSummaryModal/OrderSummaryModal';
import ReturnVehicleModal from './common/ReturnVehicleModal/ReturnVehicleModal';
import AllSetModal from '../../components/AllSetModal/AllSetModal';

const NO_FOOTER_ROUTES = ['/'];

let lastScrollY = 0;


export class MyVehiclesFrame extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node.isRequired,
		location: LocationModel.isRequired,
		scroll: PropTypes.func.isRequired,
		scrolling: PropTypes.bool.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		logOut: PropTypes.func.isRequired,
		requiresAuth: PropTypes.bool,
		accessToken: PropTypes.string,
		refreshToken: PropTypes.string,
		refreshAccessToken: PropTypes.func.isRequired,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
			goBack: PropTypes.func.isRequired,
		}).isRequired,
		subscriptionsData: PropTypes.arrayOf(PropTypes.any).isRequired,
		isSubscriptionsDataFetched: PropTypes.bool.isRequired,
		addSelectedVehicle: PropTypes.func.isRequired,
		selectedVehicleId: PropTypes.number.isRequired,
		filteredsubscriptionsData: PropTypes.objectOf(PropTypes.any).isRequired,
		vehicle: PropTypes.shape({
			fetching: PropTypes.bool.isRequired,
			data: VehicleModel,
			fetched: PropTypes.bool.isRequired,
			error: PropTypes.object,
		}),
		getUserLocation: PropTypes.func.isRequired,
		fetchVehicleDetails: PropTypes.func.isRequired,
		getSubscriptions: PropTypes.func.isRequired,
		enterSwapMode: PropTypes.func.isRequired,
		selectVehicleMile: PropTypes.func.isRequired,
		addSelectedPaymentCard: PropTypes.func.isRequired,
		getMilesChangePreview: PropTypes.func.isRequired,
		milesChangePreviewData: PropTypes.objectOf(PropTypes.any).isRequired,
		getDealerOpenDays: PropTypes.func.isRequired,
		scheduleReturn: PropTypes.func.isRequired,
		dealerOpenDays: PropTypes.arrayOf(PropTypes.shape({
			open_day: PropTypes.string,
			hours: PropTypes.arrayOf(PropTypes.string)
		})).isRequired,
		selectedDropOffTime: PropTypes.string.isRequired,
		selectedDropOffDay: PropTypes.string.isRequired,
		selectDropOffDay: PropTypes.func.isRequired,
		selectDropOffTime: PropTypes.func.isRequired,
		isReturnScheduleLoading: PropTypes.bool.isRequired,
		isReturnScheduleSet: PropTypes.bool.isRequired
	};

	static defaultProps = {
		requiresAuth: false,
		accessToken: '',
		refreshToken: '',
		vehicle: {
			fetching: false,
			data: { test: true }
		},
	}

	state = {
		showSwapModal: false,
		isMileSelected: false,
		isPaymentCardSelected: false,
		isOrderSummaryModalVisible: false,
		updateSubscriptionMilesData: {},
		editPaymentModalVisible: false,
		returnVehicleModalVisible: false,
		allSetModalVisible: false
	}

	componentWillMount = async () => {
		this.handleVerifyToken();
	}

	componentDidMount() {
		this.handleGetSubscriptions();
		window.scrollTo({ top: 0, behavior: 'smooth' });
		window.addEventListener('scroll', this.handleScroll);
	}

	componentDidUpdate(prevProps) {
		const { filteredsubscriptionsData, milesChangePreviewData } = this.props;
		const { vehicle_details: { vehicle_id } } = filteredsubscriptionsData;
		if (!prevProps.isSubscriptionsDataFetched && this.props.isSubscriptionsDataFetched) {
			if (!this.props.subscriptionsData.length) this.props.history.goBack();
		}

		if (!isUndefined(vehicle_id) &&
			prevProps.filteredsubscriptionsData.vehicle_details.vehicle_id !== vehicle_id) {
			this.props.fetchVehicleDetails(vehicle_id);
			this.setState({
				isMileSelected: false,
				isPaymentCardSelected: false,
			});
		}

		const { isFetched, errorMessage } = milesChangePreviewData;
		if (isFetched === true && errorMessage === '' && prevProps.milesChangePreviewData.isFetched !== isFetched) {
			this.handleOrderSummaryModalVisiblity(true);
		}

		if (!prevProps.vehicle.fetched && this.props.vehicle.fetched) {
			this.getDealerOpenDays();
		}
		if (!prevProps.isReturnScheduleSet && this.props.isReturnScheduleSet) {
			this.checkAllSetModalVisibility();
		}
	}


	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	onEditPayment = () => this.setState({ editPaymentModalVisible: true })

	onSelectReturnVehicle = () => {
		this.setState({
			returnVehicleModalVisible: true,
			editPaymentModalVisible: false
		});
	}

	getDealerOpenDays = () => {
		const { dealer_id } = this.props.filteredsubscriptionsData.dealer_details;
		const { availability_term } = this.props.vehicle.data;
		const days = moment(availability_term, 'MM/DD/YYYY').diff(moment(), 'days') + 2;
		this.props.getDealerOpenDays(dealer_id, { end_days_from_now: days });
	};

	enterSwapVehicle = () => {
		const { history, vehicle } = this.props;
		this.props.enterSwapMode(vehicle.data);
		history.push('/swap-vehicle');
	}

	handleVerifyToken = () => {
		const { accessToken, refreshAccessToken, refreshToken, requiresAuth } = this.props;
		if ((!accessToken || !refreshAccessToken) && requiresAuth) {
			return this.props.history.push('/sign-in');
		}
		if (!verifyToken(accessToken) && requiresAuth) {
			refreshAccessToken(refreshToken, this.props.history);
		}
	}

	handleScroll = () => {
		lastScrollY = window.pageYOffset;
		const scrolling = lastScrollY > 0;
		this.props.scroll(scrolling);
	};


	handleGetSubscriptions = () => {
		const {
			accessToken,
			refreshToken,
			refreshAccessToken,
			getSubscriptions,
			history,
		} = this.props;
		handleAuthRequiredApiCall(
			accessToken,
			refreshToken,
			history,
			getSubscriptions,
			refreshAccessToken,
		);
	}

	handleSelectVehicleMile = (data, index) => {
		this.setState({
			isMileSelected: true
		});
		this.props.selectVehicleMile(data, index);
	}
	scheduleReturn = (scheduleData) => {
		const {
			accessToken,
			refreshToken,
			refreshAccessToken,
			history,
		} = this.props;
		return handleAuthRequiredApiCall(
			accessToken,
			refreshToken,
			history,
			this.props.scheduleReturn,
			refreshAccessToken,
			scheduleData
		);
	}

	handleSelectPaymentCard = (cardId, selectedCardIndex) => {
		this.setState({
			isPaymentCardSelected: true
		});
		this.props.addSelectedPaymentCard(cardId, selectedCardIndex);
	}

	handleUpdateSubscriptionMiles = (updateSubscriptionMilesData) => {
		this.setState({
			updateSubscriptionMilesData,
		});
		this.handleGetMilesChangePreview();
	}
	handleUpdateSubscriptionPaymetMethod = (updateSubscriptionCardData) => {
		const {
			accessToken,
			refreshToken,
			refreshAccessToken,
			updateSubscriptionPaymentCard,
			history,
		} = this.props;
		handleAuthRequiredApiCall(
			accessToken,
			refreshToken,
			history,
			updateSubscriptionPaymentCard,
			refreshAccessToken,
			updateSubscriptionCardData
		);
	}

	handleGetMilesChangePreview = () => {
		const {
			accessToken,
			refreshToken,
			refreshAccessToken,
			history,
			getMilesChangePreview,
			monthlyMiles,
			filteredsubscriptionsData,
		} = this.props;
		const { subscription_id } = filteredsubscriptionsData;
		const { data: { mile: { miles } } } = monthlyMiles;

		handleAuthRequiredApiCall(
			accessToken,
			refreshToken,
			history,
			getMilesChangePreview,
			refreshAccessToken,
			{ subscriptionId: subscription_id, monthlyMiles: miles }
		);
	}

	handleConfirmSubscriptionMileChanges = () => {
		const { updateSubscriptionMilesData } = this.state;
		const {
			accessToken,
			refreshToken,
			refreshAccessToken,
			updateSubscriptionMiles,
			history,
		} = this.props;
		handleAuthRequiredApiCall(
			accessToken,
			refreshToken,
			history,
			updateSubscriptionMiles,
			refreshAccessToken,
			updateSubscriptionMilesData
		);
		this.handleOrderSummaryModalVisiblity(false);
	}

	handleOrderSummaryModalVisiblity = (visibilityStatus) => {
		this.setState({
			isOrderSummaryModalVisible: visibilityStatus
		});
	}

	closeModal = () => this.setState({ editPaymentModalVisible: false, showSwapModal: false })

	closeReturnVehicleModal = () => this.setState({ returnVehicleModalVisible: false })

	checkAllSetModalVisibility = () => {
		const { isReturnScheduleSet } = this.props;
		this.setState({
			allSetModalVisible: isReturnScheduleSet,
			returnVehicleModalVisible: false
		});
	}

	closeAllSetModal = () => {
		this.setState({ allSetModalVisible: false });
		this.handleGetSubscriptions();
	}

	renderVehicleSelectorList = (selectedVehicleId, addSelectedVehicle) =>
		this.props.subscriptionsData.map((item, index) => {
			const { vehicle_title, vehicle_image_url, vehicle_id } = item.vehicle_details;
			return (<VehicleSelector
				key={vehicle_id}
				vehicleName={vehicle_title}
				vehicleImageUrl={vehicle_image_url}
				isActive={selectedVehicleId ? selectedVehicleId === vehicle_id : index === 0}
				onVehicleSelected={() => addSelectedVehicle(vehicle_id)}
			/>);
		});

	render() {
		const {
			location: { pathname },
			isLoggedIn,
			logOut,
			children,
			accessToken,
			requiresAuth,
			scrolling,
			isSubscriptionsDataFetched,
			addSelectedVehicle,
			selectedVehicleId,
			vehicle,
			enterSwapMode,
			milesChangePreviewData,
			filteredsubscriptionsData,
			subscriptionsData
		} = this.props;
		const {
			isMileSelected,
			isPaymentCardSelected,
			isOrderSummaryModalVisible,
			showSwapModal,
			editPaymentModalVisible
		} = this.state;

		const noFooter = NO_FOOTER_ROUTES.some(el => pathname === el);
		if ((!verifyToken(accessToken) && requiresAuth) || !isSubscriptionsDataFetched) {
			return (
				<div styleName="loader-container">
					<LoadingSpinner show blue parentClass={styles.loader} />
				</div>);
		}

		if (!subscriptionsData.length && isSubscriptionsDataFetched) return this.props.history.goBack();
		const { subscription_end_date } = filteredsubscriptionsData.subscription_details;
		const childrenWithProps = React.Children.map(children, child =>
			React.cloneElement(child,
				{
					...this.props,
					selectVehicleMile: this.handleSelectVehicleMile,
					isMileSelected,
					isPaymentCardSelected,
					updateSubscriptionMiles: this.handleUpdateSubscriptionMiles,
					addSelectedPaymentCard: this.handleSelectPaymentCard,
					updateSubscriptionPaymetMethod: this.handleUpdateSubscriptionPaymetMethod,
					enterSwapMode,
					vehicle,
				}));
		return (
			<div styleName="my-vehicles-frame">
				<Header
					logOut={logOut}
					isLoggedIn={isLoggedIn}
					scrolling={scrolling}
					styleName={scrolling ? 'my-vehicles-header--scrolled' : 'my-vehicles-header'}
				/>
				<div styleName="my-vehicles-container">
					<main styleName="content">
						<div styleName="upperSection">
							<p styleName="title">My Vehicles</p>
							<div styleName="upper-content">
								{this.renderVehicleSelectorList(selectedVehicleId, addSelectedVehicle)}
							</div>
							<div
								styleName="edit-container"
								onClick={this.onEditPayment}
								role="presentation"
							>
								<EditIcon />
							</div>
						</div>

						<div styleName="lowerSection">
							{childrenWithProps}
							<div styleName="dealer-info">
								<p styleName="my-dealership-heading">My Dealership</p>
								{
									<VehicleDealer
										vehicle={vehicle.data}
										location={this.props.location}
										getUserLocation={this.props.getUserLocation}
									/>}
							</div>
						</div>

						<EditSubscriptionModal
							modalVisible={editPaymentModalVisible}
							scrolling={this.props.scrolling}
							closeModal={this.closeModal}
							editSubscriptionRoute="/my-vehicles/edit-subscriptions"
							onSelectSwap={() => this.setState({ showSwapModal: true, editPaymentModalVisible: false, })}
							onSelectReturnVehicle={this.onSelectReturnVehicle}
						/>

						<SwapInstructionsModal
							modalVisible={showSwapModal}
							scrolling
							onCancel={() => this.setState({ showSwapModal: false })}
							onContinue={this.enterSwapVehicle}
							freezeOverlay
						/>

						<ReturnVehicleModal
							modalVisible={this.state.returnVehicleModalVisible}
							scrolling={this.props.scrolling}
							closeModal={this.closeReturnVehicleModal}
							subscriptionEndDate={subscription_end_date}
							dealerOpenDays={this.props.dealerOpenDays}
							onSelectDropOffDay={this.props.selectDropOffDay}
							onSelectDropOffTime={this.props.selectDropOffTime}
							selectedDropOffDay={this.props.selectedDropOffDay}
							selectedDropOffTime={this.props.selectedDropOffTime}
							onScheduleVehicleReturn={this.scheduleReturn}
							subscriptionID={filteredsubscriptionsData.subscription_id}
							isReturnScheduleLoading={this.props.isReturnScheduleLoading}
							vehicleID={this.props.vehicle.data.vehicle_id}
						/>

						{milesChangePreviewData.monthly_miles !== 0 && <OrderSummaryModal
							{...milesChangePreviewData.data}
							isOrderSummaryModalVisible={isOrderSummaryModalVisible}
							closeOrderSummaryModal={() => this.handleOrderSummaryModalVisiblity(false)}
							confirmSubscriptionMileChanges={() =>
								this.handleConfirmSubscriptionMileChanges(this.state.updateSubscriptionMilesData)}
						/>}
						<AllSetModal
							modalIsVisible={this.state.allSetModalVisible}
							headerText="You're all set!"
							bodyText="Thank you for  choosing Mobiliti. We hope you enjoyed your adventure!"
							showCloseModal
							onClose={this.closeAllSetModal}
							showButton={false}
						/>
					</main>
				</div>
				{
					!noFooter &&
					<Footer
						logOut={logOut}
						isLoggedIn={isLoggedIn}
					/>
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	scrolling: state.scrolling,
	isLoggedIn: state.auth.isLoggedIn,
	accessToken: state.auth.userData.accessToken,
	refreshToken: state.auth.userData.refreshToken,
	subscriptionsData: state.subscriptions.subscriptionsData,
	isSubscriptionsDataFetched: state.subscriptions.isFetched,
	selectedVehicleId: state.subscriptions.selectedVehicleId,
	filteredsubscriptionsData: state.subscriptions.filteredsubscriptionsData,
	vehicles: state.vehicles,
	location: state.location,
	vehicle: state.vehicle,
	paymentCards: state.payment.paymentCardData,
	selectedPaymentCardId: state.payment.selectedCard.cardId,
	newPaymentCardId: state.payment.newPaymentCardId,
	isPaymentCardFetched: state.payment.isFetched,
	isPaymentCardAdded: state.payment.isCardAdded,
	monthlyMiles: state.reserve.monthlyMiles,
	subscriptionMiles: state.subscriptions.subscriptionMiles,
	subscriptionPaymentMethod: state.subscriptions.subscriptionPaymentMethod,
	markets: state.markets.data,
	age: state.age,
	milesChangePreviewData: state.subscriptions.milesChangePreviewData,
	dealerOpenDays: state.dealer.openDays.data,
	selectedDropOffDay: state.dealer.selectedDropOffDay.data.day,
	selectedDropOffTime: state.dealer.selectedDropOffTime.data.time,
	isReturnScheduleLoading: state.subscriptions.scheduledReturnData.loading,
	isReturnScheduleSet: state.subscriptions.scheduledReturnData.scheduled,
});

export default withRouter(
	connect(
		mapStateToProps,
		{
			scroll,
			logOut,
			refreshAccessToken,
			uploadUserProfilePhoto,
			getSubscriptions,
			addSelectedVehicle,
			getUserLocation,
			fetchVehicleDetails,
			getMarkets,
			enterSwapMode,
			addSelectedPaymentCard,
			getPaymentCards,
			addPaymentCard,
			selectVehicleMile,
			updateSubscriptionMiles,
			updateSubscriptionPaymentCard,
			getMilesChangePreview,
			getDealerOpenDays,
			selectDropOffTime,
			selectDropOffDay,
			scheduleReturn,
		}
	)(CSSModules(MyVehiclesFrame, styles, { allowMultiple: true }))
);
