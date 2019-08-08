
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import * as React from 'react';

import cx from 'classnames';

// import styles from './Button.scss';

type ButtonTypes = 'standard' | 'warning' | 'danger' | 'white' | 'plain';

// const renderButtonText = () => showLoader ? <LoadingSpinner show /> : children;

interface Props {
	buttonType: ButtonTypes;
	onClick(): void;
	className?: string;
	customStyles?: string;
	showLoader?: boolean;
	disabled?: boolean;
	icon?: React.ReactNode;
	ripple?: boolean;
	bordered?: boolean;
	inverted?: boolean;
	children?: React.ReactNode | string;
	buttonText?: string;
}

const Button: React.FC<Props> = (props) => {
	const {
		disabled,
		onClick,
		icon,
		buttonType,
		className,
		showLoader,
		ripple,
		bordered,
		inverted,
		buttonText
		// children,
	} = props;

	const buttonTypeName = !!buttonType ? `button--${buttonType}` : 'button---standard';

	return (
		<button
			// styleName={getClasses()}
			className={cx(className, buttonTypeName, { 'button--disabled': showLoader || disabled, ripple, bordered, inverted })}
			onClick={onClick}
			disabled={disabled}
		>
			{icon && icon}
			{/* {renderButtonText()} */}
			{buttonText && buttonText}
		</button>
	);
};

export default Button;