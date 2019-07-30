import { MyVehiclesFrame } from '../MyVehiclesFrame';
import dealerOpenDays from '../../../actions/sampleData/sampleDealerOpenDays';
import vehicles from '../../../actions/sampleData/sampleVehicles';

describe('MyVehiclesFrame', () => {
	const props = {
		children: <div />,
		location: {
			data: {
				latitude: 2344,
				longitude: -3455
			},
			geolocationUnavailable: false,
		},
		scroll: jest.fn(),
		scrolling: false,
		isLoggedIn: false,
		logOut: jest.fn(),
		requiresAuth: false,
		accessToken: '',
		refreshToken: '',
		refreshAccessToken: jest.fn(),
		history: {
			push: jest.fn(),
			goBack: jest.fn(),
			location: {
				pathname: '/',
			}
		},
		subscriptionsData: [
			{
				subscription_id: 68,
				subscription_details: {
					subscription_start_date: '6/21/2018',
					subscription_end_date: '9/30/2018',
					monthly_miles: 500,
					monthly_price: 837.48,
					starting_miles: 7314,
					over_mileage_charge: 0.35,
					garage_state_code: 'TX',
					garage_state_name: 'Texas',
					subscription_agreement_document: 'https://s3.amazon.com/abc123.pdf'
				},
				vehicle_details: {
					vehicle_id: '91',
					vehicle_title: '2017 Subaru Crosstrek Sedan',
					vehicle_image_url: 'https://s3.amazon.com/Vehicle.png',
					vehicle_status: 'Picked Up',
					roadside_assistance_number: '111 111'
				},
				return_details: {
					return_time: '11',
					return_date: ''
				}
			},
		],
		isSubscriptionsDataFetched: true,
		addSelectedVehicle: jest.fn(),
		selectedVehicleId: 68,
		vehicle: {
			fetched: false,
			fetching: false,
			data: vehicles[0]
		},
		getUserLocation: jest.fn(),
		fetchVehicleDetails: jest.fn(),
		getSubscriptions: jest.fn(),
		enterSwapMode: jest.fn(),
		selectVehicleMile: jest.fn(),
		addSelectedPaymentCard: jest.fn(),
		filteredsubscriptionsData: {
			subscription_id: '88',
			vehicle_details: {
				vehicle_id: '2'
			},
			subscription_details: {
				subscription_start_date: '6/21/2018',
				subscription_end_date: '9/30/2018',
				monthly_miles: 500,
				monthly_price: 837.48,
				starting_miles: 7314,
				over_mileage_charge: 0.35,
				garage_state_code: 'TX',
				garage_state_name: 'Texas',
				subscription_agreement_document: 'https://s3.amazon.com/abc123.pdf'
			},
		},
		getMilesChangePreview: jest.fn(),
		milesChangePreviewData: {
			isFetching: false,
			isFetched: false,
			subscription_id: '0',
			monthly_miles: 0,
			subscription_cost: 0,
			over_mileage_charge: 0,
			excess_mile_charge: 0,
			tax: 0,
			monthly_subscription_price: 0,
			charge_date: '00/00/000'
		},
		updateSubscriptionMiles: jest.fn(),
		updateSubscriptionPaymentCard: jest.fn(),
		monthlyMiles: {
			data: {
				mile: {
					miles: 0
				}
			}
		},
		getDealerOpenDays: jest.fn(),
		scheduleReturn: jest.fn(),
		dealerOpenDays,
		selectedDropOffTime: '',
		selectedDropOffDay: '',
		selectDropOffDay: jest.fn(),
		selectDropOffTime: jest.fn(),
		isReturnScheduleLoading: false,
		isReturnScheduleSet: false,
	};
	const component = <MyVehiclesFrame {...props} />;
	it('renders', () => {
		const subject = shallow(component);
		expect(subject).toMatchSnapshot();
	});

	it('displays the modal on clicking the edit icon', () => {
		const subject = shallow(component);
		subject.instance().onEditPayment();
		expect(subject.instance().state.editPaymentModalVisible).toBe(true);
	});

	it('closes the modal on clicking the close icon on the modal', () => {
		const subject = shallow(component);
		subject.instance().closeModal();
		expect(subject.instance().state.editPaymentModalVisible).toBe(false);
	});

	it('selectVehicleMile function should be called when handleSelectVehicleMile method is called', () => {
		const subject = shallow(component);
		subject.instance().handleSelectVehicleMile();
		expect(subject.instance().props.selectVehicleMile).toBeCalled();
	});

	it('addSelectedPaymentCard function should be called when handleSelectPaymentCard method is called', () => {
		const subject = shallow(component);
		subject.instance().handleSelectPaymentCard();
		expect(subject.instance().props.addSelectedPaymentCard).toBeCalled();
	});

	it('addSelectedPaymentCard function should be called when handleSelectPaymentCard method is called', () => {
		const subject = shallow(component);
		subject.setProps({
			filteredsubscriptionsData: {
				subscription_id: '89',
				vehicle_details: {
					vehicle_id: '1'
				},
				subscription_details: {
					subscription_start_date: '6/21/2018',
					subscription_end_date: '9/30/2018',
					monthly_miles: 500,
					monthly_price: 837.48,
					starting_miles: 7314,
					over_mileage_charge: 0.35,
					garage_state_code: 'TX',
					garage_state_name: 'Texas',
					subscription_agreement_document: 'https://s3.amazon.com/abc123.pdf'
				},
			}
		});
		expect(subject.instance().state.isMileSelected).toBeFalsy();
	});

	it('updates isOrderSummaryModalVisible value correctly when handleOrderSummaryModalVisiblity method is called', () => {
		const subject = shallow(component);
		expect(subject.instance().state.isOrderSummaryModalVisible).toBe(false);
		subject.instance().handleOrderSummaryModalVisiblity(true);
		expect(subject.instance().state.isOrderSummaryModalVisible).toBe(true);
	});


	it('handleOrderSummaryModalVisiblity method should be called when handleConfirmSubscriptionMileChanges method is called', () => {
		const subject = shallow(component);
		subject.instance().handleOrderSummaryModalVisiblity = jest.fn();
		subject.instance().handleConfirmSubscriptionMileChanges();
		expect(subject.instance().handleOrderSummaryModalVisiblity).toBeCalled();
	});

	it('handleGetMilesChangePreview method should be called when handleConfirmSubscriptionMileChanges method is called', () => {
		const subject = shallow(component);
		subject.instance().handleGetMilesChangePreview = jest.fn();
		subject.instance().handleUpdateSubscriptionMiles({ updateSubscriptionMilesData: 'fake data' });
		expect(subject.instance().handleGetMilesChangePreview).toBeCalled();
	});


	it('handleOrderSummaryModalVisiblity function should be called when milesChangePreviewData props changes', () => {
		const subject = shallow(component);
		subject.instance().handleOrderSummaryModalVisiblity = jest.fn();
		subject.instance().handleUpdateSubscriptionPaymetMethod();
		subject.instance().handleGetMilesChangePreview();
		subject.setProps({
			milesChangePreviewData: {
				...props.milesChangePreviewData,
				isFetched: true,
				errorMessage: '',
			}
		});
		expect(subject.instance().handleOrderSummaryModalVisiblity).toBeCalled();
	});
});
