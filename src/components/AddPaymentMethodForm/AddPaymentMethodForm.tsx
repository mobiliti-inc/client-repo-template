import React, { PureComponent } from 'react';
import { card } from 'creditcards';
import styles from './AddPaymentMethodForm.scss';
import TextInput, { INPUT_TYPES } from '../TextInput/TextInput';
import cardExpiryDateFormatter from '../../utils/cardExpiryDateFormatter';
import Button, { BUTTON_TYPES } from '../Button/Button';
import stripeService from '../../services/stripeService';
type AddPaymentMethodFormProps = {
	onFormValidCheck?: (...args: any[]) => any,
	addPaymentCard: (...args: any[]) => any,
	cancelForm: (...args: any[]) => any,
	displayCancelButton?: boolean,
	isPaymentCardAdded?: boolean
};
type AddPaymentMethodFormState = {
	cardNumber: string,
	cardExpirationDate: string,
	cvv: string,
	zip: string,
	formIsValid: boolean,
	error: string,
	showLoader: boolean
};
type AddPaymentMethodFormState = {
	cardNumber: string,
	cardExpirationDate: string,
	cvv: string,
	zip: string,
	formIsValid: boolean,
	error: string,
	showLoader: boolean
};
class AddPaymentMethodForm extends PureComponent<{}, AddPaymentMethodFormState> {
	state = {
		cardNumber: '',
		cardExpirationDate: '',
		cvv: '',
		zip: '',
		formIsValid: false,
		error: '',
		showLoader: false
	};
	componentDidUpdate = prevProps => {
		const { isPaymentCardAdded } = this.props;
		this.isFormValid();
		if (prevProps.isPaymentCardAdded !== isPaymentCardAdded) {
			this.setState({
				cardNumber: '',
				cardExpirationDate: '',
				cvv: '',
				zip: ''
			});
		}
	};
	fields = {
		cardNumber: { maxLength: 16, formatter: value => card.format(value) },
		zip: { maxLength: 6, formatter: value => value },
		cvv: { maxLength: 3, formatter: value => value },
		cardExpirationDate: { maxLength: 5, formatter: value => cardExpiryDateFormatter(value) }
	};
	handleInputChange = event => {
		const { name, value } = event.target;
		if (this.fields[name].maxLength < value.replace(/ /g, '').length) {
			return null;
		}
		if (value.length && name !== 'cardExpirationDate' && !/^\d+$/.test(value.replace(/ /g, ''))) {
			return null;
		}
		this.setState({
			[name]: this.fields[name].formatter(value.replace(/ /g, '')),
			error: ''
		});
	};
	formatCardDetail = (key, value) => {
		this.setState({
			[key]: this.fields[key].formatter(value.replace(/ /g, ''))
		});
	};
	isFormValid = () => {
		const { zip, cvv, cardNumber, cardExpirationDate } = this.state;
		const formIsValid = !!(zip.length && cvv.length && cardNumber.length && cardExpirationDate.length === 5);
		this.setState({
			formIsValid
		});
		this.props.onFormValidCheck({ cardNumber, formIsValid });
		return formIsValid;
	};
	handleSavePaymentCard = () => {
		this.setState({
			showLoader: true
		});
		const { zip, cvv, cardNumber, cardExpirationDate } = this.state;
		stripeService.createToken(
			{
				number: Number(cardNumber.replace(/ /g, '')),
				cvc: Number(cvv.replace(/ /g, '')),
				exp_month: Number(cardExpirationDate.slice(0, 2)),
				exp_year: Number(cardExpirationDate.slice(-2)),
				address_zip: Number(zip)
			},
			(status, data) => {
				if (status === 200) {
					this.setState({
						showLoader: false
					});
					return this.props.addPaymentCard(data.id);
				}
				this.setState({
					error: data.error.message,
					showLoader: false
				});
			}
		);
	};
	render() {
		const { zip, cvv, cardNumber, cardExpirationDate, formIsValid, showLoader, error } = this.state;
		const { displayCancelButton } = this.props;
		const buttonDisabledClass = !formIsValid ? 'btn-disabled' : '';
		return (
			<div styleName="form-container">
				<TextInput
					placeholder="Card Number"
					label="Card Number"
					onChange={this.handleInputChange}
					type={INPUT_TYPES.TEXT}
					value={cardNumber}
					name="cardNumber"
					id="cardNumber"
					isValid
					onBlur={() => this.formatCardDetail('cardNumber', cardNumber)}
				/>
				<div styleName="column-2">
					<TextInput
						placeholder="Expiration"
						label="Expiration"
						onChange={this.handleInputChange}
						type={INPUT_TYPES.TEXT}
						value={cardExpirationDate}
						name="cardExpirationDate"
						id="cardExpirationDate"
						isValid
						onBlur={() => this.formatCardDetail('cardExpirationDate', cardExpirationDate)}
					/>

					<TextInput
						placeholder="Zip"
						label="Zip"
						onChange={this.handleInputChange}
						type={INPUT_TYPES.TEXT}
						value={zip}
						name="zip"
						id="zip"
						isValid
					/>
				</div>
				<div styleName="column-2">
					<TextInput
						placeholder="CVV"
						label="CVV"
						onChange={this.handleInputChange}
						type={INPUT_TYPES.TEXT}
						value={cvv}
						name="cvv"
						id="cvv"
						isValid
					/>
				</div>
				<div>{error.length > 0 && <label styleName="input-validation-message-label">{error}</label>}</div>
				<div styleName="column-2 btn-container">
					<div styleName={`${buttonDisabledClass}`}>
						<Button
							type={BUTTON_TYPES.STANDARD}
							showLoader={showLoader}
							onClick={() => this.handleSavePaymentCard()}
							disabled={!formIsValid}
							bordered
						>
							Save
						</Button>
					</div>
					{displayCancelButton && (
						<Button type={BUTTON_TYPES.STANDARD} disabled={false} onClick={this.props.cancelForm} bordered>
							Cancel
						</Button>
					)}
				</div>
			</div>
		);
	}
}
AddPaymentMethodForm.defaultProps = {
	onFormValidCheck: value => value,
	displayCancelButton: false,
	isPaymentCardAdded: false
};
export default CSSModules(AddPaymentMethodForm, styles, { allowMultiple: true });
