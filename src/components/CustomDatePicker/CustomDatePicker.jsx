/* eslint no-underscore-dangle: 0 */

import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';
import styles from './CustomDatePicker.scss';

import { directionArrow } from '../../assets/icons';

class CustomDatePicker extends React.PureComponent {
	static propTypes = {
		placeholder: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onDatePicked: PropTypes.func.isRequired,
		openToDate: PropTypes.string,
		license: PropTypes.bool,
		selectedDate: PropTypes.string,
		label: PropTypes.string,
		id: PropTypes.string,
		numberOfYears: PropTypes.number,
		isDayBlocked: PropTypes.func,
		isOutsideRange: PropTypes.func,
		negative: PropTypes.bool
	};

	static defaultProps = {
		placeholder: null,
		isValid: true,
		errorMessage: null,
		openToDate: null,
		license: false,
		selectedDate: null,
		label: '',
		id: '',
		numberOfYears: 99,
		isOutsideRange: () => false,
		isDayBlocked: () => false,
		negative: false
	}

	state = {
		date: null,
		valid: true,
		error: '',
		focused: false
	}

	componentDidMount() {
		const { selectedDate } = this.props;

		if (selectedDate && selectedDate._isValid) this.setDate(selectedDate);
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { openToDate, selectedDate } = this.props;
		const { focused, date } = this.state;

		if (focused && prevState.focused !== focused && openToDate
			&& this.formatDate(openToDate)._isValid && !date) {
			this.setDate(openToDate);
		}

		if (selectedDate && prevProps.selectedDate !== selectedDate
			&& this.formatDate(selectedDate)._isValid) {
			this.setDate(selectedDate);
		}
	}

	onDateChange = date => {
		const { onDatePicked } = this.props;

		if (date && date._isValid) {
			onDatePicked({ value: moment(date).format('MM/DD/YYYY'), error: '', valid: true });
			this.setState({ date, valid: true, error: '' });
		} else {
			onDatePicked();
			this.setState({ valid: false, error: 'Please enter a valid date' });
		}
	}

	setDate = (date) => this.setState({ date: this.formatDate(date), valid: true, error: '' });

	// Combine classes
	getClasses = () => classNames('container', { 'error-border': !this.state.valid || !this.props.isValid });

	formatDate = (date) => moment(date, 'MM/DD/YYYY');

	renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => (
		<div className={styles.calendar}>
			<div>
				<select
					value={month.month()}
					onChange={e => onMonthSelect(month, e.target.value)}
					className={styles.select}
				>
					{moment.months().map((label, value) => (
						<option value={value} key={label}>{label}</option>
					))}
				</select>
			</div>
			<div>
				<select
					value={month.year()}
					onChange={e => onYearSelect(month, e.target.value)}
					className={styles.select}
				>
					{[...Array(this.props.numberOfYears)].map((value, index) => {
						const indexValue = (moment().year() + index) - (this.props.negative ? this.props.numberOfYears : 0);
						return (
							<option value={indexValue} key={indexValue}>
								{indexValue}
							</option>
						);
					})}
					{this.props.license && [...Array(10)].map((value, index) => {
						const indexValue = moment().year() + index;
						return (
							<option value={indexValue} key={indexValue}>
								{indexValue}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);

	renderErrorBox = () => {
		const { error, valid } = this.state;
		const { errorMessage, isValid } = this.props;
		if (!valid || !isValid) {
			if (errorMessage && errorMessage.length > 0) {
				return <span styleName="error"> {errorMessage} </span>;
			}
			return <span styleName="error"> {error} </span>;
		}
		return null;
	}

	render() {
		const { placeholder, label, id, errorMessage, } = this.props;
		const { date, error, } = this.state;
		const navPrevIcon = <img src={directionArrow} alt="" styleName="icon prev" />;
		const navNextIcon = <img src={directionArrow} alt="" styleName="icon next" />;
		return (
			<div styleName={this.getClasses()} >
				<SingleDatePicker
					id={id}
					date={date}
					numberOfMonths={1}
					daySize={35}
					onDateChange={this.onDateChange}
					focused={this.state.focused}
					navPrev={navPrevIcon}
					navNext={navNextIcon}
					noBorder
					block
					isOutsideRange={this.props.isOutsideRange}
					hideKeyboardShortcutsPanel
					placeholder={placeholder}
					horizontalMonthPadding={5}
					onFocusChange={({ focused }) => this.setState({ focused })}
					renderMonthElement={this.renderMonthElement}
					isDayBlocked={this.props.isDayBlocked}
				/>
				{this.renderErrorBox()}
				{label && (
					<label styleName={classNames('input-label', { 'input-label--focused': this.state.focused || !date || error || errorMessage })} htmlFor={id}>
						{label}
					</label>
				)}
			</div>
		);
	}
}

export default CSSModules(CustomDatePicker, styles, { allowMultiple: true });
