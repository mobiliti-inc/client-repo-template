import React from 'react';
import TextInput, { INPUT_TYPES } from '../TextInput/TextInput';

import styles from './ZipCodeInput.scss';

class ZipCodeInput extends React.PureComponent {
	static propTypes = {
		value: PropTypes.string.isRequired,
		valid: PropTypes.bool.isRequired,
		onChange: PropTypes.func.isRequired,
	}

	validate = ({ target: { value } }) => {
		let valid = true;
		if (!/^\d{5}(?:[-\s]\d{4})?$/.test(value)) valid = false;
		const zipCode = {
			value,
			valid,
		};
		this.props.onChange(zipCode);
	}

	render() {
		return (
			<TextInput
				id="input-zip-code"
				type={INPUT_TYPES.TEXT}
				placeholder="Zip Code"
				value={this.props.value}
				isValid={this.props.valid}
				onChange={this.validate}
				dark
			/>);
	}
}

export default CSSModules(ZipCodeInput, styles, { allowMultiple: true });
