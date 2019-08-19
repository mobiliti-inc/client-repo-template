import * as React from 'react';
import CSSModules from 'react-css-modules'
import cx from "classnames";

import * as styles from "./Checkbox.scss";

interface CheckboxProps {
	onChange: (...args: any[]) => any;
	checked: boolean;
	validationLabel?: string;
	componentLabel?: React.ReactNode;
	label?: string;
	valid?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
	const { validationLabel, valid, label, componentLabel, checked, onChange } = props

	const checkboxClasses = cx("container", { error: !valid });

	return (
		<label styleName={checkboxClasses}>
			{componentLabel || label}
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
			/>
			<div styleName="validation-label">{validationLabel}</div>
			<span styleName="fakebox" />
		</label>
	);
}


export default CSSModules(Checkbox, styles, { allowMultiple: true });
