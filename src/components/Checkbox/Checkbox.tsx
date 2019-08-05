import classNames from "classnames";
import styles from "./Checkbox.scss";
type CheckboxProps = {
	onChange: (...args: any[]) => any,
	checked: boolean,
	validationLabel?: string,
	componentLabel?: React.ReactNode,
	label?: string,
	valid?: boolean
};
class Checkbox extends React.PureComponent<{}, {}> {
	render() {
		const checkboxClasses = classNames("container", { error: !this.props.valid });
		return (
			<label styleName={checkboxClasses}>
				{this.props.componentLabel || this.props.label}
				<input
					type="checkbox"
					checked={this.props.checked}
					onChange={this.props.onChange}
				/>
				<div styleName="validation-label">{this.props.validationLabel}</div>
				<span styleName="fakebox" />
			</label>
		);
	}
}
export default CSSModules(Checkbox, styles, { allowMultiple: true });
