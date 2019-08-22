import * as React from 'react';

import cx from 'classnames';

import { LoadingSpinner } from '../';

import './Button.scss';

export const BUTTON_TYPES = {
	STANDARD: 'standard',
	WARNING: 'warning',
	DANGER: 'danger',
	WHITE: 'white',
	PLAIN: 'plain'
};

type ButtonTypes = 'standard' | 'warning' | 'danger' | 'white' | 'plain';

type ButtonShapes = 'round' | 'square';

interface Props {
	buttonType?: ButtonTypes;
	onClick?: React.MouseEventHandler<HTMLElement>;
	className?: string;
	customStyles?: string;
	showLoader?: boolean;
	disabled?: boolean;
	icon?: React.ReactNode;
	ripple?: boolean;
	bordered?: boolean;
	inverted?: boolean;
	children?: React.ReactNode;
	buttonText?: string;
	shape?: ButtonShapes;
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
		children,
		inverted,
		buttonText,
		shape
	} = props;

	const buttonTypeName = !!buttonType ? `button--${buttonType}` : 'button--standard';
	const buttonShape = !!shape ? `button--${shape}` : 'button--square';
	const renderButtonContent = () => showLoader ? <LoadingSpinner show /> : (React.Children.count(children) > 0 ? children : buttonText);

	return (
		<button
			styleName={cx(className, buttonTypeName, buttonShape, { 'button--disabled': showLoader || disabled, ripple, bordered, inverted })}
			onClick={(event) => onClick && onClick(event)}
			disabled={disabled}
		>
			{icon && icon}
			{renderButtonContent()}
		</button>
	);
};

export default Button;