import React, { ReactNode, FC } from 'react';
import CSSModules from 'react-css-modules';

import cx from 'classnames';

import styles from './Button.scss';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export const BUTTON_TYPES = {
	STANDARD: 'standard',
	WARNING: 'warning',
	DANGER: 'danger',
	WHITE: 'white',
	PLAIN: 'plain'
};

type ButtonTypes = 'standard' | 'warning' | 'danger' | 'white' | 'plain';

interface Props {
	buttonType: ButtonTypes;
	children: string | ReactNode;
	onClick(): void;
	className: string;
	customStyles: string;
	showLoader: boolean;
	disabled: boolean;
	icon: ReactNode;
	ripple: boolean;
	bordered: boolean;
	inverted: boolean;
}

const Button: FC<Props> = (props) => {
	// static defaultProps = {
	// 	buttonType: BUTTON_TYPES.STANDARD,
	// 	showLoader: false,
	// 	disabled: false,
	// 	className: '',
	// 	customStyles: '',
	// 	icon: null,
	// 	ripple: false,
	// 	bordered: false,
	// 	inverted: false,
	// }
	const {
		disabled,
		onClick,
		icon,
		customStyles,
		buttonType,
		className,
		showLoader,
		ripple,
		bordered,
		inverted,
		children
	} = props;

	const getButtonTypeName = () => Object.values(BUTTON_TYPES).indexOf(buttonType) > -1 ? `button--${buttonType}` : 'button---standard';

	const getClasses = () => {
		const buttonTypeName = getButtonTypeName();
		const classes = [buttonTypeName, className];
		return cx({ 'button--disabled': showLoader || disabled, ripple, bordered, inverted }, classes);
	};

	const renderButtonText = () => showLoader ? <LoadingSpinner show /> : children;

	return (
		<button
			styleName={getClasses()}
			className={cx(customStyles, className)}
			onClick={onClick}
			disabled={disabled}
		>
			{icon && icon}
			{renderButtonText()}
		</button>
	);

};

export default CSSModules(Button, styles, { allowMultiple: true });
