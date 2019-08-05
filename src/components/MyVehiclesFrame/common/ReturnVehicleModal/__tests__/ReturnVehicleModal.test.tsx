import ReturnVehicleModal from '../ReturnVehicleModal';

describe('ReturnVehicleModal', () => {
	const props = {
		isReturnScheduleLoading: false,
		onSelectDropOffDay: jest.fn(),
		onSelectDropOffTime: jest.fn(),
		onScheduleVehicleReturn: jest.fn(),
		selectedDropOffDay: '03/03/2019',
		selectedDropOffTime: '11:00AM - 1:00PM',
		subscriptionID: '45',
		closeModal: jest.fn(),
		scrolling: false,
		subscriptionEndDate: '02/28/2019',
		modalVisible: true,
		dealerOpenDays: [
			{
				open_day: '2/23/2019',
				hours: [
					'10:00 AM - 12:00 PM',
					'12:00 PM - 2:00 PM',
					'2:00 PM - 4:00 PM',
					'4:00 PM - 6:00 PM',
					'6:00 PM - 7:00 PM'
				]
			}
		],
	};

	const component = <ReturnVehicleModal {...props} />;
	it('renders', () => {
		const tree = shallow(component);
		expect(tree).toMatchSnapshot();
	});
});
