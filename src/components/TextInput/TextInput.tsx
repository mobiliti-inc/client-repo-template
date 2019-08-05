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
	URL: 'url',
};

class TextInput extends React.PureComponent {
	static propTypes = {
		type: PropTypes.oneOf(Object.values(INPUT_TYPES)).isRequired,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		disabled: PropTypes.bool,
		isValid: PropTypes.bool.isRequired,
		inputDidChange: PropTypes.bool,
		onBlur: PropTypes.func,
		label: PropTypes.string,
		name: PropTypes.string,
		dark: PropTypes.bool,
		className: PropTypes.string,
		errorMessage: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		shouldShowVisibility: PropTypes.bool,
		changePasswordVisibilityStatus: PropTypes.func
	};

	static defaultProps = {
		disabled: false,
		placeholder: '',
		label: '',
		name: '',
		dark: false,
		className: '',
		inputDidChange: false,
		onBlur: null,
		errorMessage: '',
		shouldShowVisibility: false,
		changePasswordVisibilityStatus: () => { }
	};

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
			error: !this.props.isValid,
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
					{!isValid &&
						errorMessage && (
						<span styleName="error-message">{errorMessage}</span>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default CSSModules(TextInput, styles, { allowMultiple: true });
