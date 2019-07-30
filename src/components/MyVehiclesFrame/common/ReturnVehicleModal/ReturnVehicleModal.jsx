/* eslint-disable camelcase */// API returns lots of snake_case data
import moment from 'moment';

import Modal from '../../../Modal/Modal';
import CustomDatePicker from '../../../CustomDatePicker/CustomDatePicker';
import styles from './ReturnVehicleModal.scss';
import { iconCalendar, iconTime } from '../../../../assets/icons';
import Button from '../../../Button/Button';
import DropDown from '../../../Dropdown/Dropdown';

class ReturnVehicleModal extends React.PureComponent {
	static propTypes = {
		isReturnScheduleLoading: PropTypes.bool.isRequired,
		onSelectDropOffDay: PropTypes.func.isRequired,
		onSelectDropOffTime: PropTypes.func.isRequired,
		onScheduleVehicleReturn: PropTypes.func.isRequired,
		selectedDropOffTime: PropTypes.string.isRequired,
		selectedDropOffDay: PropTypes.string.isRequired,
		subscriptionID: PropTypes.string.isRequired,
		closeModal: PropTypes.func.isRequired,
		scrolling: PropTypes.bool.isRequired,
		subscriptionEndDate: PropTypes.string.isRequired,
		modalVisible: PropTypes.bool.isRequired,
		dealerOpenDays: PropTypes.arrayOf(PropTypes.shape({
			open_day: PropTypes.string,
			hours: PropTypes.arrayOf(PropTypes.string)
		})).isRequired
	}
	state = {
		hours: [''],
		daySelected: false
	}

	onDateChange = (date) => {
		const formattedDate = moment(date.value, 'MM/DD/YYYY').format('M/D/YYYY');
		const { dealerOpenDays } = this.props;
		return dealerOpenDays.forEach((day) => {
			const { open_day } = day;
			if (formattedDate === open_day) {
				this.props.onSelectDropOffDay(open_day);
				this.props.onSelectDropOffTime(day.hours[0]);
				this.setState({
					hours: day.hours,
					daySelected: true,
					vehicleID: this.props.vehicleID,
				});
			}
		});
	}

	onTimeChange = async time => {
		const selectedTime = await this.reverseFormatTime(time);
		if (selectedTime) {
			await this.props.onSelectDropOffTime(selectedTime);
			await this.formatHours(this.state.hours);
		}
	}

	formatHours = (hours) => hours.map((hour, index) => ({
		value: this.formatTime(hour),
		current: this.props.selectedDropOffTime ?
			hour === this.props.selectedDropOffTime : index === 0
	}));

	formatTime = (time) => time.replace(/:00/g, '');

	reverseFormatTime = async time => {
		let selectedHour;
		this.state.hours.forEach(hour => {
			if (time === this.formatTime(hour)) {
				selectedHour = hour;
			}
		});
		return selectedHour;
	};

	isDayBlocked = (day) => {
		const { dealerOpenDays } = this.props;
		const lastDay = dealerOpenDays.length - 1;
		return day.format('dddd') === 'Sunday' || day.isBefore(dealerOpenDays[0].open_day) ||
		day.isAfter(dealerOpenDays[lastDay].open_day);
	}

	scheduleReturn = () => {
		const { selectedDropOffTime, selectedDropOffDay, subscriptionID } = this.props;
		const data = {
			dateAndTime: {
				return_date: selectedDropOffDay,
				return_time: selectedDropOffTime
			},
			subscriptionID
		};
		this.props.onScheduleVehicleReturn(data);
	}

	disableButton = () => !this.props.selectedDropOffDay || !this.props.selectedDropOffTime ||
	!this.state.daySelected || this.state.vehicleID !== this.props.vehicleID;

	render() {
		const {
			modalVisible,
			scrolling,
			subscriptionEndDate,
			closeModal,
			selectedDropOffDay,
		} = this.props;

		return (
			<Modal
				plain
				visible={modalVisible}
				overlay="dark-gray"
				onIconClose={closeModal}
				scrolling={scrolling}
				modalParentClass={styles.modal}
			>
				<p styleName="title">Schedule Vehicle Return</p>
				<p styleName="sub-title">If you are returning your vehicle after one month of use you could receive a credit based
					on your vehicle usage for the current month.
				</p>
				<div styleName="subscription-end-date">
					<p>{moment(subscriptionEndDate, 'MM/DD/YYYY').format('dddd, MMMM Do')}</p>
					<p>Subscription End Date</p>
				</div>
				<p styleName="drop-off-date-title">Drop off Date/Time</p>
				<div styleName="date-selection-ctn">
					<div styleName="date-picker-ctn">
						<img src={iconCalendar} alt="calendar-icon" />
						<CustomDatePicker
							placeholder="Date"
							isOutsideRange={this.isDayBlocked}
							onDatePicked={this.onDateChange}
							numberOfYears={2}
						/>
					</div>
					{ selectedDropOffDay && this.state.daySelected &&
					<div styleName="time-drop-down-ctn">
						<img src={iconTime} alt="time-icon" />
						<DropDown
							header="Select a Time"
							data={this.formatHours(this.state.hours)}
							scrolling={scrolling}
							onChange={this.onTimeChange}
							dropdownSelectedClass={styles['selected-option']}
							dropdownOptionsClass={styles.text}
							dropdownParentClass={styles.dropdown}
						/>
					</div>
					}
				</div>


				<div styleName="modal-footer">
					<Button
						bordered
						showLoader={this.props.isReturnScheduleLoading}
						onClick={this.scheduleReturn}
						disabled={this.disableButton()}
					>
						Schedule Return
					</Button>
					<Button buttonType="plain" onClick={closeModal} inverted >Cancel</Button>
				</div>
			</Modal>
		);
	}
}

export default CSSModules(ReturnVehicleModal, styles);
