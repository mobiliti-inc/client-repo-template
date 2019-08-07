import React from 'react';
import TextInput, { INPUT_TYPES } from '../TextInput/TextInput';
import styles from './ZipCodeInput.scss';

type ZipCodeInputProps = {
	value: string,
	valid: boolean,
	onChange: (...args: any[]) => any
};

class ZipCodeInput extends React.PureComponent<ZipCodeInputProps, {}> {
	validate = ({ target: { value } }) => {
		let valid = true;
		if (!/^\d{5}(?:[-\s]\d{4})?$/.test(value)) valid = false;
		const zipCode = {
			value,
			valid
		};
		this.props.onChange(zipCode);
	};
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
			/>
		);
	}
}

export default CSSModules(ZipCodeInput, styles, { allowMultiple: true });
