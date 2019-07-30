
import React, { Component } from 'react';
import moment from 'moment';
// // Import React Script Library to load the Google object
import Script from 'react-load-script';

import TextInput, { INPUT_TYPES } from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';

import { KEYS } from '../../../api';

import styles from './DriverLicenseForm.scss';

const defaultTextValue = {
	valid: true,
	error: '',
	value: ''
};

class DriverLicenseForm extends Component {
	static propTypes = {
		submitManualLicenseInfo: PropTypes.func.isRequired,
		showLoader: PropTypes.bool,
		subscriber: PropTypes.shape({
			fetched: PropTypes.bool,
			fetching: PropTypes.bool,
			address: PropTypes.shape({
				address1: PropTypes.string,
				address2: PropTypes.string,
				city: PropTypes.string,
				state: PropTypes.string,
				country: PropTypes.string,
				zip_code: PropTypes.string,
			}),
			driver_license_info: PropTypes.shape({
				driver_license_no: PropTypes.string,
				driver_license_expiry_date: PropTypes.string,
				driver_license_front_photo: PropTypes.string,
			}),
		}),
		buttonName: PropTypes.string,
		disabled: PropTypes.bool,
		validity: PropTypes.func,
		alertHandler: PropTypes.node,
	}

	static defaultProps = {
		showLoader: false,
		subscriber: null,
		buttonName: '',
		disabled: false,
		validity: () => {},
		alertHandler: null,
	}

	state = {
		fields: {
			address: defaultTextValue,
			city: defaultTextValue,
			state: defaultTextValue,
			zipCode: defaultTextValue,
			dateOfBirth: defaultTextValue,
			driverLicenseNumber: defaultTextValue,
			driverLicenseExpiryDate: defaultTextValue
		},
		inputChanged: false,
	}

	componentDidMount() {
		const { subscriber } = this.props;
		if (subscriber && subscriber.fetched) {
			this.populateFieldsWithInfo();
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { validity, } = this.props;
		const { inputChanged, fields } = this.state;
		if (inputChanged && prevState.inputChanged !== inputChanged) {
			validity(this.validity());
		}

		if (JSON.stringify(prevState.fields) !== JSON.stringify(fields) && inputChanged) {
			validity(this.validity());
		}
	}

	getUserData = () => {
		const {
			address,
			city,
			state,
			zipCode,
			driverLicenseNumber,
			driverLicenseExpiryDate,
			dateOfBirth
		} = this.state.fields;
		return {
			dateOfBirth: dateOfBirth.value,
			city: city.value,
			state: state.value,
			zipCode: zipCode.value,
			address: address.value,
			driverLicenseNumber: driverLicenseNumber.value,
			driverLicenseExpiryDate: driverLicenseExpiryDate.value,
		};
	}

	populateFieldsWithInfo = () => {
		const { subscriber } = this.props;
		this.setState(state => ({
			fields: {
				...state.fields,
				address: {
					valid: true,
					error: '',
					value: subscriber.address.address1 || '',
				},
				city: {
					valid: true,
					error: '',
					value: subscriber.address.city || '',
				},
				state: {
					valid: true,
					error: '',
					value: subscriber.address.state || '',
				},
				zipCode: {
					valid: true,
					error: '',
					value: subscriber.address.zip_code || '',
				},
				driverLicenseNumber: {
					valid: true,
					error: '',
					value: subscriber.driver_license_info.driver_license_no || '',
				},
				driverLicenseExpiryDate: {
					valid: true,
					error: '',
					value: subscriber.driver_license_info.driver_license_expiry_date || '',
				},
				dateOfBirth: {
					valid: true,
					error: '',
					value: subscriber.user.dob || '',
				}
			},
		}));
	}

	handleScriptLoad = () => {
		// Declare Options For Autocomplete
		const options = { types: ['geocode'] };

		// Initialize Google Autocomplete
		this.autocomplete = new window.google.maps.places.Autocomplete(
			document.getElementById('address-input'),
			options);
		// Fire event when a suggested name is selected
		this.autocomplete.addListener('place_changed',
			this.handlePlaceSelect);
	}

	handlePlaceSelect = () => {
		// Extract Values From Address Object
		const addressObject = this.autocomplete.getPlace();
		const address = addressObject.address_components;

		// Check if address is valid
		if (address) {
			// Set State
			this.setState(state => ({
				fields: {
					...state.fields,
					address: {
						valid: true,
						error: '',
						value: `${address[0] ? address[0].long_name : ''} ${address[1] ? address[1].long_name : ''}`
					},
					city: {
						valid: true,
						error: '',
						value: address[3] ? address[3].long_name : ''
					},
					state: {
						valid: true,
						error: '',
						value: address[5] ? address[5].long_name : ''
					},
					zipCode: {
						valid: true,
						error: '',
						value: address[7] ? address[7].long_name : ''
					},
				}
			}));
		}
	}

	checkDateFieldsValidity = (datesToValidate) => {
		/* eslint no-underscore-dangle: 0 */
		const isObjectValid = [];
		datesToValidate.map((date) => {
			const allFields = this.state.fields;
			if (date.value && moment(date.value, 'MM/DD/YYYY')._isValid) {
				allFields[date.stateName] = {
					value: date.value,
					error: '',
					valid: true,
				};
				isObjectValid.push(true);
			} else {
				allFields[date.stateName] = {
					value: date.value,
					error: 'Please enter a valid date',
					valid: false,
				};
				isObjectValid.push(false);
			}
			this.setState({ fields: allFields });
		});
		return isObjectValid.every((values) => values === true);
	}

	fieldValidator = (toValidate) => {
		const validatorRegex = /^[\w\d\s-.,]+$/;
		const { value } = toValidate;
		if (value === '') {
			return {
				value,
				valid: false,
				error: 'This field can not be empty'
			};
		} else if (!validatorRegex.test(value)) {
			return {
				value,
				valid: false,
				error: 'This field contains invalid characters'
			};
		} else if (value && value.length < 2) {
			return {
				value,
				valid: false,
				error: 'This field can not be less than 2 characters'
			};
		}
		return {
			value,
			error: '',
			valid: true
		};
	};

	validity = () => {
		const {
			address,
			city,
			state,
			zipCode,
			driverLicenseNumber,
			driverLicenseExpiryDate,
			dateOfBirth,
		} = this.state.fields;

		const validTextFields = this.checkInvalidFields([
			{ value: address.value, stateName: 'address' },
			{ value: city.value, stateName: 'city' },
			{ value: state.value, stateName: 'state' },
			{ value: zipCode.value, stateName: 'zipCode' },
			{ value: driverLicenseNumber.value, stateName: 'driverLicenseNumber' }
		]);
		const dateFieldsValid = this.checkDateFieldsValidity([
			{ value: dateOfBirth.value, stateName: 'dateOfBirth' },
			{ value: driverLicenseExpiryDate.value, stateName: 'driverLicenseExpiryDate' }
		]);

		return validTextFields && dateFieldsValid;
	}

	submitLisenseInfo = () => {
		if (this.validity()) this.props.submitManualLicenseInfo(this.getUserData());
	}

	checkInvalidFields = (toValidate) => {
		const isObjectValid = [];

		if (toValidate instanceof Array) {
			toValidate.map((valueToValidate) => {
				const handleObjectValidation = this.fieldValidator(valueToValidate);
				const allFields = this.state.fields;
				allFields[valueToValidate.stateName] = handleObjectValidation;
				this.setState({ fields: allFields });
				isObjectValid.push(handleObjectValidation.valid);
			});
			return isObjectValid.every((values) => values === true);
		}
		const { value, stateName } = toValidate;
		const handleValidation = this.fieldValidator(toValidate);
		this.setState({
			fields: {
				...this.state.fields,
				[stateName]: handleValidation
			}
		});
		return handleValidation.valid;
	}

	handleInputChange = ({ target: { name, value } }) => {
		this.setState(state => ({
			fields: {
				...state.fields,
				[name]: {
					valid: true,
					error: '',
					value
				}
			},
			inputChanged: true,
		}));
	}

	handleDatePicked = (date, state) => {
		if (date) {
			return this.setState({
				fields: {
					...this.state.fields,
					[state]: { ...date }
				},
				inputChanged: true,
			});
		}
		return null;
	}

	renderGooglePlacesScript = () => <Script url={`https://maps.googleapis.com/maps/api/js?key=${KEYS.GOOGLE_PLACES}&libraries=places`} onLoad={this.handleScriptLoad} />;

	render() {
		const {
			address,
			city,
			state,
			zipCode,
			dateOfBirth,
			driverLicenseNumber,
			driverLicenseExpiryDate,
		} = this.state.fields;

		const { showLoader, buttonName, disabled, alertHandler, } = this.props;
		return (
			<div styleName="container">
				{this.renderGooglePlacesScript()}
				<div styleName="home">
					<TextInput
						type={INPUT_TYPES.TEXT}
						onChange={this.handleInputChange}
						value={address.value}
						isValid={address.valid}
						name="address"
						label="Address"
						id="address-input"
						placeholder="Home Address"
						errorMessage={!address.valid ? address.error : null}
					/>
				</div>
				<div styleName="address">
					<div styleName="city">
						<TextInput
							type={INPUT_TYPES.TEXT}
							onChange={this.handleInputChange}
							value={city.value}
							isValid={city.valid}
							name="city"
							label="City"
							id="city-input"
							placeholder="City"
							errorMessage={!city.valid ? city.error : null}
						/>
					</div>
					<div styleName="state">
						<TextInput
							type={INPUT_TYPES.TEXT}
							onChange={this.handleInputChange}
							value={state.value}
							isValid={state.valid}
							name="state"
							label="State"
							id="state-input"
							placeholder="State"
							errorMessage={!state.valid ? state.error : null}
						/>
					</div>
					<div styleName="zip">
						<TextInput
							type={INPUT_TYPES.TEXT}
							onChange={this.handleInputChange}
							value={zipCode.value}
							isValid={zipCode.valid}
							name="zipCode"
							label="Zip"
							id="zip-input"
							placeholder="Zip"
							errorMessage={!zipCode.valid ? zipCode.error : null}
						/>
					</div>
					<div styleName="dob">
						<CustomDatePicker
							placeholder="Date of Birth"
							openToDate="1990/01/01"
							isValid={dateOfBirth.valid}
							errorMessage={!dateOfBirth.valid ? dateOfBirth.error : null}
							onDatePicked={(date) => this.handleDatePicked(date, 'dateOfBirth')}
							selectedDate={dateOfBirth.value}
							id="dob"
							label="Date of Birth"
							negative
						/>
					</div>
				</div>
				<div styleName="license">
					<TextInput
						type={INPUT_TYPES.TEXT}
						onChange={this.handleInputChange}
						value={driverLicenseNumber.value}
						isValid={driverLicenseNumber.valid}
						name="driverLicenseNumber"
						id="license-input"
						label="Driver's License Number"
						placeholder="Driver’s License Number"
						errorMessage={!driverLicenseNumber.valid ? driverLicenseNumber.error : null}
					/>
				</div>
				<div styleName="expiration">
					<CustomDatePicker
						placeholder="Expiration"
						openToDate="2020/01/01"
						isValid={driverLicenseExpiryDate.valid}
						errorMessage={!driverLicenseExpiryDate.valid ? driverLicenseExpiryDate.error : null}
						onDatePicked={(date) => this.handleDatePicked(date, 'driverLicenseExpiryDate')}
						selectedDate={driverLicenseExpiryDate.value}
						license
						id="expiration"
						label="Expiration Date"
					/>
				</div>
				{alertHandler}
				<div styleName="button">
					<Button
						showLoader={showLoader}
						onClick={this.submitLisenseInfo}
						customStyles={styles.button}
						ripple
						disabled={disabled}
					>
						{buttonName || 'Continue'}
					</Button>
				</div>
			</div>
		);
	}
}

export default CSSModules(DriverLicenseForm, styles, { allowMultiple: true });
