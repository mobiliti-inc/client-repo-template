import * as React from 'react';
import cx from 'classnames';

import './TextInput.scss';

export const INPUT_TYPES = {
	PASSWORD: 'password',
	NUMBER: 'number',
	EMAIL: 'email',
	IMAGE: 'image',
	TEXT: 'text',
	FILE: 'file',
	DATE: 'date',
	PHONE: 'tel',
	URL: 'url'
};

interface TextInputProps {
	type: string;
	onChange: (...args: any[]) => any;
	value: string;
	id: string;
	placeholder?: string;
	disabled?: boolean;
	isValid: boolean;
	inputDidChange?: boolean;
	onBlur?: (...args: any[]) => any;
	label?: string;
	name?: string;
	dark?: boolean;
	className?: string;
	errorMessage?: React.ReactNode | string;
	shouldShowVisibility?: boolean;
	changePasswordVisibilityStatus?: (...args: any[]) => any;
}

const TextInput: React.FC<TextInputProps> = (props) => {
	const {
		placeholder,
		type,
		onChange,
		disabled,
		label,
		value,
		name,
		id,
		isValid,
		dark,
		className,
		inputDidChange,
		onBlur,
		errorMessage
	} = props;

	const [inputValue, setInputValue] = React.useState('');

	React.useEffect(() => {
		setInputValue(value);
	}, [value]);

	const baseStyles = cx(`input-${type}`, {
		error: !isValid
	});

	const styleName = cx(baseStyles, { dark }, className);

	// TODO: We really shouldn't use any here 😓 but rather React.FormEvent<HTMLInputElement>, value was kinda nagging us
	const handleChange = (event: any) => {
		setInputValue(event.target.value);
		onChange(event);
	};

	return (
		<React.Fragment>
			<div styleName="input-group">
				<input
					placeholder={placeholder}
					styleName={styleName}
					className={className}
					disabled={disabled}
					onChange={(event) => handleChange(event)}
					type={type}
					value={inputValue}
					name={name}
					id={id}
					onBlur={onBlur}
				/>
				{label && (
					<label styleName="input-label" htmlFor={id}>
						{label}
					</label>
				)}
				{isValid && inputDidChange && value && value.length > 0 && <label styleName="checkmark-label" />}
				{!isValid && errorMessage && <span styleName="error-message">{errorMessage}</span>}
			</div>
		</React.Fragment>
	);
};

export default TextInput;
