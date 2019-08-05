/*
	eslint jsx-a11y/no-noninteractive-element-interactions: 0,
	jsx-a11y/click-events-have-key-events: 0,
	jsx-a11y/no-static-element-interactions: 0,
*/
import React from 'react';
import classNames from 'classnames';
import { isUndefined } from 'util';

import styles from './Dropdown.scss';
import { chevronUp, chevronDown } from '../../assets/icons';

class Dropdown extends React.PureComponent {
	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.string.isRequired,
			current: PropTypes.bool
		})).isRequired,
		onChange: PropTypes.func.isRequired,
		scrolling: PropTypes.bool.isRequired,
		modal: PropTypes.bool,
		header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		customOptionsList: PropTypes.node,
		dropdownSelectedClass: PropTypes.string,
		dropdownParentClass: PropTypes.string,
		dropDownMenuTitleClass: PropTypes.string,
		customSelected: PropTypes.node,
	};

	static defaultProps = {
		modal: false,
		header: null,
		customOptionsList: null,
		dropdownSelectedClass: '',
		dropdownParentClass: '',
		dropDownMenuTitleClass: '',
		customSelected: null
	}

	constructor(props) {
		super(props);
		this.node = React.createRef();
	}

	state = {
		dropdown: false
	};

	componentDidMount = () => {
		document.addEventListener('mousedown', this.handleClick, false);
	};

	componentWillUnmount = () => {
		document.removeEventListener('mousedown', this.handleClick, false);
	};

	getSelectedValue = locations => {
		const { customOptionsList, customSelected } = this.props;
		let selectedItem = false;
		if ((customOptionsList && customSelected) || customSelected) {
			selectedItem = { value: customSelected };
		} else {
			selectedItem = locations.find(loc => loc.current);
		}

		return selectedItem;
	}

	handleClick = e => {
		if (this.node.current.contains(e.target)) {
			return;
		}
		this.setState({
			dropdown: false
		});
	};

	showDropdown = () => {
		this.setState({
			dropdown: !this.state.dropdown
		});
	};

	hideDropdown = e => {
		e.preventDefault();
		this.setState({
			dropdown: false
		});
	};

	handleChange = e => {
		const value = e.target.getAttribute('value');
		this.props.onChange(value);
	};

	renderItems = options =>
		options.map(
			option => {
				const { modal, dropdownOptionsClass } = this.props;
				const modalDropdownClass = classNames('dropdown-option', { 'modal-option': modal });
				const defaultModalClass = option.current
					? 'dropdown-option selected'
					: 'dropdown-option';

				return (
					<li
						styleName={defaultModalClass}
						className={`${defaultModalClass}${dropdownOptionsClass}`}
						key={option.value}
						onClick={this.handleChange}
						onKeyDown={this.handleChange}
						value={option.value}
					>
						{option.value}
					</li>
				);
			}
		);

	render() {
		const {
			data,
			header,
			modal,
			dropdownSelectedClass,
			dropdownParentClass,
			customOptionsList,
			dropDownMenuTitleClass,
			customSelected
		} = this.props;
		const selectedValue = this.getSelectedValue(data);
		if (isUndefined(selectedValue)) { return null; }
		const dropdownClass = classNames('dropdown-menu', { visible: this.state.dropdown, modal });
		const modalDropdownClass = modal ? 'modal-dropdown-list' : '';
		return (
			<div
				styleName={`dropdown ${this.props.scrolling ? 'scroll' : ''}`}
				ref={this.node}
			>
				<p
					styleName="dropdown-selected"
					className={`dropdown-selected ${dropdownSelectedClass}`}
					onClick={this.showDropdown}
					onKeyDown={this.showDropdown}
				>
					{selectedValue.value}&nbsp;&nbsp;<img
						styleName={classNames('chevron-down', { 'modal-chevron-down': modal })}
						src={chevronDown}
						alt="chevron-down"
					/>
				</p>
				<div
					styleName={dropdownClass}
					onClick={this.hideDropdown}
					className={`${dropdownClass} ${dropdownParentClass}`}
				>
					<h3 styleName="dropdown-menu-title" className={`dropdown-menu-title ${dropDownMenuTitleClass}`}>
						<span >{header}</span>
						<img src={chevronUp} alt="chevron-up" />
					</h3>
					{customOptionsList ?
						<div key={customSelected} styleName={!this.state.dropdown ? 'hide' : modalDropdownClass}>{customOptionsList}</div>
						:
						<ul styleName={!this.state.dropdown ? 'hide' : modalDropdownClass}>
							{this.renderItems(data)}
						</ul>
					}
				</div>
			</div>
		);
	}
}

export default CSSModules(Dropdown, styles, { allowMultiple: true });
