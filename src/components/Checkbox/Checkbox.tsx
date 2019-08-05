import classNames from 'classnames';

import styles from './Checkbox.scss';

class Checkbox extends React.PureComponent {
	static propTypes = {
		onChange: PropTypes.func.isRequired,
		checked: PropTypes.bool.isRequired,
		validationLabel: PropTypes.string,
		componentLabel: PropTypes.node,
		label: PropTypes.string,
		valid: PropTypes.bool,
	}

	static defaultProps = {
		validationLabel: null,
		componentLabel: null,
		valid: false,
		label: null,
	}

	render() {
		const checkboxClasses = classNames('container', { error: !this.props.valid });
		return (
			<label styleName={checkboxClasses}>{this.props.componentLabel || this.props.label}
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
