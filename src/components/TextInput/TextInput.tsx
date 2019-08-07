import classNames from 'classnames';
import styles from './TextInput.scss';

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

type TextInputProps = {
	type: any,
	onChange: (...args: any[]) => any,
	value: string,
	id: string,
	placeholder?: string,
	disabled?: boolean,
	isValid: boolean,
	inputDidChange?: boolean,
	onBlur?: (...args: any[]) => any,
	label?: string,
	name?: string,
	dark?: boolean,
	className?: string,
	errorMessage?: React.ReactNode | string,
	shouldShowVisibility?: boolean,
	changePasswordVisibilityStatus?: (...args: any[]) => any
};

class TextInput extends React.PureComponent<TextInputProps, {}> {
	render() {
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
			errorMessage,
			shouldShowVisibility,
			changePasswordVisibilityStatus
		} = this.props;
		const baseStyles = classNames(`input-${type}`, {
			error: !this.props.isValid
		});
		const styleName = classNames(baseStyles, { dark }, className);
		return (
			<React.Fragment>
				<div styleName="input-group">
					<input
						placeholder={placeholder}
						styleName={styleName}
						className={className}
						disabled={disabled}
						onChange={onChange}
						type={type}
						value={value}
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
	}
}

export default CSSModules(TextInput, styles, { allowMultiple: true });
