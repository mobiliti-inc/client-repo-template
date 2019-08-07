import styles from "./EditPaymentForm.scss";
import TextInput, { INPUT_TYPES } from "../TextInput/TextInput";
import Button, { BUTTON_TYPES } from "../Button/Button";

type EditPaymentFormProps = {
	name: string,
	state: string,
	city: string,
	zipCode: string,
	isFormValid: boolean,
	handleInputChange: (...args: any[]) => any,
	updatePaymentMethod: (...args: any[]) => any,
	deletePaymentMethod: (...args: any[]) => any,
	imageUrl: string,
	lastFour: string,
	street: string,
	closeEditPaymentMethod: (...args: any[]) => any,
	isCardUpdating: boolean,
	error: string
};

const EditPaymentForm: React.SFC<EditPaymentFormProps> = props => {
	const {
		name,
		state,
		city,
		zipCode,
		imageUrl,
		lastFour,
		street,
		handleInputChange,
		updatePaymentMethod,
		deletePaymentMethod,
		isFormValid,
		closeEditPaymentMethod,
		isCardUpdating,
		error
	} = props;

	return (
		<div>
			<div styleName="payment-card-holder">
				{imageUrl && <img styleName="payment-card-icon" src={imageUrl} alt="payment card icon" />}
				<p styleName="payment-card-number">(......{lastFour})</p>
			</div>
			<div styleName="edit-payment-form">
				<TextInput
					placeholder="Name"
					label="Name"
					onChange={handleInputChange}
					type={INPUT_TYPES.TEXT}
					value={name}
					name="name"
					id="name"
					isValid
				/>
				<TextInput
					placeholder="Street"
					label="Street"
					onChange={handleInputChange}
					type={INPUT_TYPES.TEXT}
					value={street}
					name="street"
					id="street"
					isValid
				/>
				<TextInput
					placeholder="City"
					label="City"
					onChange={handleInputChange}
					type={INPUT_TYPES.TEXT}
					value={city}
					name="city"
					id="city"
					isValid
				/>
				<div styleName="state-code-wrapper">
					<TextInput
						placeholder="State"
						label="State"
						onChange={handleInputChange}
						type={INPUT_TYPES.TEXT}
						value={state}
						name="state"
						id="state"
						isValid
					/>

					<TextInput
						placeholder="Zip Code"
						label="Zip Code"
						onChange={handleInputChange}
						type={INPUT_TYPES.TEXT}
						value={zipCode}
						name="zipCode"
						id="zipCode"
						isValid
					/>
				</div>

				{error.length > 0 && <label styleName="input-validation-message-label">{error}</label>}

				<div role="presentation" onClick={deletePaymentMethod} styleName="remove-card">
					Remove Card
				</div>

				<div styleName="btn-container">
					<Button
						type={BUTTON_TYPES.STANDARD}
						onClick={updatePaymentMethod}
						disabled={!isFormValid}
						bordered
						showLoader={isCardUpdating}
					>
						Save Changes
					</Button>

					<Button type={BUTTON_TYPES.STANDARD} onClick={closeEditPaymentMethod} bordered>
						Close
					</Button>
				</div>
			</div>
		</div>
	);
};

EditPaymentForm.defaultProps = {};

export default CSSModules(EditPaymentForm, styles, { allowMultiple: true });
