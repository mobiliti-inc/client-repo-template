import * as React from 'react';
import CSSModules from 'react-css-modules';
import { card } from 'creditcards';

import { cardExpiryDateFormatter } from '../../utils';
import { Button, TextInput } from '..';

import * as styles from './AddPaymentMethodForm.scss';

interface PaymentMethodFormProps {
	onFormValidCheck: (...args: any[]) => any;
	addPaymentCard: (...args: any[]) => any;
	cancelForm: (...args: any[]) => any;
	displayCancelButton?: boolean;
	isPaymentCardAdded?: boolean;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = (props) => {
	const [formFields, setFormFields] = React.useState({
		cardNumber: '',
		cardExpirationDate: '',
		cvv: '',
		zip: '',
		error: ''
	});

	const [formIsValid, setFormIsValid] = React.useState<boolean>(false);
	const [showLoader, setShowLoader] = React.useState<boolean>(false);

	const { isPaymentCardAdded, onFormValidCheck, displayCancelButton, cancelForm } = props;

	const isFormValid = () => {
		const { zip, cvv, cardNumber, cardExpirationDate } = formFields;
		const formIsValid = !!(zip.length && cvv.length && cardNumber.length && cardExpirationDate.length === 5);
		setFormIsValid(formIsValid);
		onFormValidCheck({ cardNumber, formIsValid });
		return formIsValid;
	};

	React.useEffect(() => {
		isFormValid();
		setFormFields({
			...formFields,
			cardNumber: '',
			cardExpirationDate: '',
			cvv: '',
			zip: ''
		});
	}, [isPaymentCardAdded]);

	const fields: any = {
		cardNumber: { maxLength: 16, formatter: (value: any) => card.format(value) },
		zip: { maxLength: 6, formatter: (value: any) => value },
		cvv: { maxLength: 3, formatter: (value: any) => value },
		cardExpirationDate: { maxLength: 5, formatter: (value: any) => cardExpiryDateFormatter(value) }
	};

	const { zip, cvv, cardNumber, cardExpirationDate, error } = formFields;

	const handleInputChange = (event: any) => {
		const { name, value } = event.target;
		if (fields[name].maxLength < value.replace(/ /g, '').length) {
			return null;
		}
		if (value.length && name !== 'cardExpirationDate' && !/^\d+$/.test(value.replace(/ /g, ''))) {
			return null;
		}
		return setFormFields({
			...formFields,
			[name]: fields[name].formatter(value.replace(/ /g, '')),
			error: ''
		});
	};

	const formatCardDetail = (key: string, value: any) => {
		setFormFields({ ...formFields, [key]: fields[key].formatter(value.replace(/ /g, '')) });
	};

	const handleSavePaymentCard = () => {
		setShowLoader(true);
		// TODO: This stripe request will need to be added to perform the actual request
		// const { zip, cvv, cardNumber, cardExpirationDate } = formFields;
		// stripeService.createToken(
		// 	{
		// 		number: Number(cardNumber.replace(/ /g, '')),
		// 		cvc: Number(cvv.replace(/ /g, '')),
		// 		exp_month: Number(cardExpirationDate.slice(0, 2)),
		// 		exp_year: Number(cardExpirationDate.slice(-2)),
		// 		address_zip: Number(zip)
		// 	},
		// 	(status: number, data: any) => {
		// 		if (status === 200) {
		// 			setShowLoader(false);
		// 			return addPaymentCard(data.id);
		// 		}
		// 		setShowLoader(false);
		// 		setFormFields({
		// 			...formFields,
		// 			error: data.error.message
		// 		});
		// 	}
		// );
	};

	const buttonDisabledClass = !formIsValid ? 'btn-disabled' : '';
	return (
		<div styleName="form-container">
			<TextInput
				placeholder="Card Number"
				label="Card Number"
				onChange={handleInputChange}
				type='text'
				value={cardNumber}
				name="cardNumber"
				id="cardNumber"
				isValid
				onBlur={() => formatCardDetail('cardNumber', cardNumber)}
			/>
			<div styleName="column-2">
				<TextInput
					placeholder="Expiration"
					label="Expiration"
					onChange={handleInputChange}
					type='text'
					value={cardExpirationDate}
					name="cardExpirationDate"
					id="cardExpirationDate"
					isValid
					onBlur={() => formatCardDetail('cardExpirationDate', cardExpirationDate)}
				/>

				<TextInput
					placeholder="Zip"
					label="Zip"
					onChange={handleInputChange}
					type='text'
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
					onChange={handleInputChange}
					type='text'
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
						showLoader={showLoader}
						onClick={() => handleSavePaymentCard()}
						disabled={!formIsValid}
						bordered
					>
						Save
					</Button>
				</div>
				{displayCancelButton && (
					<Button disabled={false} onClick={cancelForm} bordered>
						Cancel
					</Button>
				)}
			</div>
		</div>
	);
};

export default CSSModules(PaymentMethodForm, styles, { allowMultiple: true });
