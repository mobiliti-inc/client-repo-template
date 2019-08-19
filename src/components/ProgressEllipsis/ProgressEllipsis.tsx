import * as React from "react";
import CSSModules from "react-css-modules"

import * as styles from "./ProgressEllipsis.scss";

interface ProgressEllipsisProps {
	step: string;
}

const ProgressEllipsis: React.FC<ProgressEllipsisProps> = (props) => {
	const { step } = props;

	switch (step) {
		case "name":
			return (
				<div styleName="container">
					<div styleName="dot--dark" />
					<div styleName="dot" />
					<div styleName="dot" />
				</div>
			);
		case "email":
			return (
				<div styleName="container">
					<div styleName="dot" />
					<div styleName="dot--dark" />
					<div styleName="dot" />
				</div>
			);
		case "password":
			return (
				<div styleName="container">
					<div styleName="dot" />
					<div styleName="dot" />
					<div styleName="dot--dark" />
				</div>
			);
		default:
			return null;
	}
};

export default CSSModules(ProgressEllipsis, styles);
