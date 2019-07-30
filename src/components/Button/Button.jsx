import classNames from 'classnames';

import styles from './Button.scss';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export const BUTTON_TYPES = {
	STANDARD: 'standard',
	WARNING: 'warning',
	DANGER: 'danger',
	WHITE: 'white',
	PLAIN: 'plain'
};

class Button extends React.PureComponent {
	static propTypes = {
		buttonType: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
		children: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
		className: PropTypes.string,
		customStyles: PropTypes.string,
		showLoader: PropTypes.bool,
		disabled: PropTypes.bool,
		icon: PropTypes.node,
		ripple: PropTypes.bool,
		bordered: PropTypes.bool,
		inverted: PropTypes.bool,
	}

	static defaultProps = {
		buttonType: BUTTON_TYPES.STANDARD,
		showLoader: false,
		disabled: false,
		className: '',
		customStyles: '',
		icon: null,
		ripple: false,
		bordered: false,
		inverted: false,
	}
	getButtonTypeName = () => {
		const { buttonType } = this.props;
		return Object.values(BUTTON_TYPES).indexOf(buttonType) > -1 ? `button--${buttonType}` : 'button---standard';
	}


	getClasses = () => {
		const { className, showLoader, ripple, bordered, disabled, inverted, } = this.props;
		const buttonTypeName = this.getButtonTypeName();
		const classes = [buttonTypeName, className];
		return classNames({ 'button--disabled': showLoader || disabled, ripple, bordered, inverted, }, classes);
	}

	renderButtonText = () => (
		this.props.showLoader ?
			<LoadingSpinner show />
			:
			this.props.children
	)

	render() {
		const {
			disabled,
			onClick,
			icon,
			customStyles,
			className,
		} = this.props;

		const classes = this.getClasses();

		return (
			<button
				styleName={classes}
				className={classNames(customStyles, className)}
				onClick={onClick}
				disabled={disabled}
			>
				{icon && icon}
				{this.renderButtonText()}
			</button>
		);
	}
}

export default CSSModules(Button, styles, { allowMultiple: true });
