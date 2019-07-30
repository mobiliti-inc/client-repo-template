import classNames from 'classnames';

import styles from './DropDownMenu.scss';
import { chevronUpDark, chevronDownGrey } from '../../assets/icons';

class DropDownMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDroppedDown: props.isDroppedDown,
			isContentCompleted: props.isContentCompleted,
		};
	}

	componentDidMount = () => {
		this.props.bindIsDroppedDownStateToParent({ isDroppedDown: this.state.isDroppedDown });
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { isDroppedDown, isContentCompleted } = this.props;
		if (prevProps.isDroppedDown !== isDroppedDown) {
			this.setState({
				isDroppedDown
			});
		}
		if (prevState.isContentCompleted !== isContentCompleted) {
			this.setState({
				isContentCompleted
			});
		}
	}

	handleClick = () => {
		this.setState((currentState) => {
			const { isDroppedDown } = currentState;
			this.props.bindIsDroppedDownStateToParent({ isDroppedDown: !isDroppedDown });
			return ({
				isDroppedDown: !isDroppedDown
			});
		});
	}

	handleDropDownClass = () => {
		const { isDroppedDown } = this.state;
		return isDroppedDown ? 'dropdown-menu-modal-open' : 'dropdown-menu-modal-close';
	}

	handleLeftContentcontainerClass = () => {
		const { leftContentIsSplitted } = this.props;
		const { isContentCompleted, isDroppedDown } = this.state;
		let leftContentcontainerClass = leftContentIsSplitted ? 'left-content-container-split' : 'left-content-container';
		leftContentcontainerClass += isContentCompleted || isDroppedDown ? ' left-content-container-selected' : '';
		return leftContentcontainerClass;
	}

	renderDropDownIcon = () => {
		const { isDroppedDown, } = this.state;
		return <img src={isDroppedDown ? chevronUpDark : chevronDownGrey} alt="drop icon" />;
	}

	render() {
		const {
			menuTitle,
			menuDescription,
			children,
			tile,
		} = this.props;
		return (
			<div styleName={classNames('dropdown-menu', { 'dropdown-menu-tile': tile })}>
				<div
					styleName={`dropdown-menu-modal ${this.handleDropDownClass()}`}
					onClick={this.handleClick}
					role="presentation"
				>
					<div styleName={this.handleLeftContentcontainerClass()}>
						<h2 styleName="dropdown-menu-title"> {menuTitle}</h2>
						<p styleName="dropdown-menu-description"> {menuDescription}</p>
					</div>

					<div styleName="right-content-container">
						{this.renderDropDownIcon()}
					</div>
				</div>
				<div styleName="dropdown-menu-content">
					{children}
				</div>
			</div>

		);
	}
}

DropDownMenu.defaultProps = {
	leftContentIsSplitted: false,
	isContentCompleted: false,
	menuTitle: '',
	menuDescription: '',
	children: null,
	isDroppedDown: false,
	tile: false,
	bindIsDroppedDownStateToParent: (value) => value,
};

DropDownMenu.propTypes = {
	leftContentIsSplitted: PropTypes.bool,
	isContentCompleted: PropTypes.bool,
	menuTitle: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	menuDescription: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	children: PropTypes.node,
	isDroppedDown: PropTypes.bool,
	tile: PropTypes.bool,
	bindIsDroppedDownStateToParent: PropTypes.func,
};

export default CSSModules(DropDownMenu, styles, { allowMultiple: true });
