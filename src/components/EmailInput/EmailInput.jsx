import React from 'react';

import TextInput, { INPUT_TYPES } from '../TextInput/TextInput';
import styles from './EmailInput.scss';

class EmailInput extends React.Component {
	state = {
		value: '',
		error: '',
	};

	static getDerivedStateFromProps(props, state) {
		if (props.value && state.value !== props.value) {
			return {
				value: props.value,
			};
		}
		return null;
	}

	inputChange = (event) => {
		const { value } = event.target;
		const error = this.validateInput(value);
		this.setState({
			value,
			error,
		});
		this.props.onChange({ email: value, emailError: error });
	}

	validateInput = (value) => {
		let error;
		if (!value.length) {
			error = 'Please enter your email';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
			error = 'Please enter a valid email';
		} else {
			error = '';
		}
		return error;
	}

	render() {
		const { value, error } = this.state;
		const { shouldShowCheckMark } = this.props;
		return (
			<div>
				<TextInput
					{...this.props}
					type={INPUT_TYPES.EMAIL}
					isValid={!error.length}
					onChange={this.inputChange}
					value={value}
					inputDidChange={shouldShowCheckMark}
				/>
				{ error.length > 0 &&
				<label styleName="input-validation-message-label">
					{error}
				</label>
				}
			</div>);
	}
}

EmailInput.defaultProps = {
	shouldShowCheckMark: false
};

EmailInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	shouldShowCheckMark: PropTypes.bool
};
export default CSSModules(EmailInput, styles, { allowMultiple: true });
