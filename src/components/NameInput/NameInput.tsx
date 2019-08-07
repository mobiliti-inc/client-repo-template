import React from 'react';
import TextInput, { INPUT_TYPES } from '../TextInput/TextInput';
import styles from './NameInput.scss';

type NameInputProps = {
	onChange: (...args: any[]) => any,
	customType?: string
};

type NameInputState = {
	value: string,
	error: string
};

class NameInput extends React.Component<NameInputProps, NameInputState> {
	state = {
		value: '',
		error: ''
	};

	inputChange = event => {
		const { value } = event.target;
		const error = this.validateInput(value);
		this.setState({
			value,
			error
		});
		this.props.onChange({ name: value, nameError: error });
	};

	validateInput = value => {
		const { customType } = this.props;
		let error;
		if (!value.length) {
			error = `Please enter your ${customType}`;
		} else if (value.length < 2) {
			error = `Please enter a ${customType} with two or more letters`;
		} else if (!/^(?![\s.]+$)[a-zA-Z\s.@~!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/i.test(value)) {
			error = `Please enter a valid ${customType}`;
		} else {
			error = '';
		}
		return error;
	};

	render() {
		const { value, error } = this.state;
		return (
			<div>
				<TextInput
					{...this.props}
					type={INPUT_TYPES.TEXT}
					isValid={!error.length}
					onChange={this.inputChange}
					value={value}
				/>
				{error.length > 0 && (
					<label styleName="input-validation-message-label">{error}</label>
				)}
			</div>
		);
	}
}

// NameInput.defaultProps = {
// 	customType: 'name'
// };

export default CSSModules(NameInput, styles, { allowMultiple: true });
