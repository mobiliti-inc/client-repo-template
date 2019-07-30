import React from 'react';
import zxcvbn from 'zxcvbn';

import TextInput, { INPUT_TYPES } from '../TextInput/TextInput';
import styles from './PasswordInput.scss';

export const PASSWORD_STRENGTH_TYPE = {
	WEAK: 'weak',
	MEDIUM: 'medium',
	STRONG: 'strong'
};

export const ERROR_MESSAGES = {
	EMPTY_PASSWORD: 'Please enter a password.',
	PASSWORD_LESS_THAN_8: 'Please enter at least 8 characters.'
};

class PasswordInput extends React.Component {
	state = {
		value: '',
		passwordError: '',
		passwordStrength: PASSWORD_STRENGTH_TYPE.WEAK,
		isPasswordTextVisible: false,
	};

	inputChange = (event) => {
		const { value } = event.target;
		// Prevent empty value
		if (value !== value.trim()) {
			return event.preventDefault();
		}
		const passwordError = this.validatePassword(value);
		const passwordStrength = this.calculatePasswordStrength(value);

		this.setState({
			value,
			passwordError,
			passwordStrength
		});

		this.props.onChange({ password: value, passwordError, passwordStrength });
	}

	validatePassword = (value) => {
		if (!value.length) {
			return ERROR_MESSAGES.EMPTY_PASSWORD;
		} else if (value.length < 8) {
			return ERROR_MESSAGES.PASSWORD_LESS_THAN_8;
		}
		return '';
	}

	calculatePasswordStrength = (value) => {
		const results = zxcvbn(value);
		if (results.score <= 1) {
			return PASSWORD_STRENGTH_TYPE.WEAK;
		} else if (results.score === 2) {
			return PASSWORD_STRENGTH_TYPE.MEDIUM;
		}
		return PASSWORD_STRENGTH_TYPE.STRONG;
	}

	changePasswordVisibilityStatus = () => {
		this.setState(currentState => ({
			...currentState,
			isPasswordTextVisible: !currentState.isPasswordTextVisible
		}));
	}

	renderError = (error) => <label styleName="input-validation-message-label">{error}</label>

	render() {
		const { value, passwordError, isPasswordTextVisible, passwordStrength } = this.state;
		const { showPasswordStrength, id, inputError, placeholder, label, name } = this.props;
		return (
			<div>
				<TextInput
					{...this.props}
					type={isPasswordTextVisible ? INPUT_TYPES.TEXT : INPUT_TYPES.PASSWORD}
					id={id}
					placeholder={placeholder || 'Password'}
					label={label || 'password'}
					name={name || 'password'}
					isValid={!passwordError.length}
					onChange={this.inputChange}
					value={value}
					shouldShowVisibility
					changePasswordVisibilityStatus={this.changePasswordVisibilityStatus}
				/>

				{shouldShowVisibility &&
						value &&
						<button
							onClick={changePasswordVisibilityStatus}
							styleName="password-visibility-indicator"
						>
							{INPUT_TYPES.PASSWORD === type ?
								'Show' :
								'Hide'}
						</button>
				}

				{ passwordError.length > 0 && this.renderError(passwordError)}

				{ inputError && inputError.length > 0 && this.renderError(inputError)}

				{
					inputError.length === 0 &&
					passwordError.length === 0 &&
					value.length > 0 &&
					showPasswordStrength &&
					<label styleName="password-strength-label">
						Strength:<span styleName={`password-${passwordStrength}`}>{passwordStrength}</span>
					</label>
				}
			</div>);
	}
}

PasswordInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	showPasswordStrength: PropTypes.bool,
	id: PropTypes.string,
	inputError: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string,
};

PasswordInput.defaultProps = {
	showPasswordStrength: true,
	id: 'password',
	inputError: '',
	label: null,
	placeholder: null,
	name: null,
};

export default CSSModules(PasswordInput, styles, { allowMultiple: true });
