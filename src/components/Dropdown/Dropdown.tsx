import React from 'react';
import classNames from 'classnames';
import { isUndefined } from 'util';
import styles from './Dropdown.scss';
import { chevronUp, chevronDown } from '../../assets';

type DropdownProps = {
	data: {
		value: string,
		current?: boolean
	}[],
	onChange: (...args: any[]) => any,
	scrolling: boolean,
	modal?: boolean,
	header?: string | React.ReactNode,
	customOptionsList?: React.ReactNode,
	dropdownSelectedClass?: string,
	dropdownParentClass?: string,
	dropDownMenuTitleClass?: string,
	customSelected?: React.ReactNode
};

type DropdownState = {
	dropdown: boolean
};

class Dropdown extends React.PureComponent<DropdownProps, DropdownState> {
	constructor(props) {
		super(props);
		this.node = React.createRef();
	}

	state = {
		dropdown: false
	};

	componentDidMount = () => {
		document.addEventListener('mousedown', this.handleClick, false);
	}

	componentWillUnmount = () => {
		document.removeEventListener('mousedown', this.handleClick, false);
	}

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
	}

	showDropdown = () => {
		this.setState({
			dropdown: !this.state.dropdown
		});
	}

	hideDropdown = e => {
		e.preventDefault();
		this.setState({
			dropdown: false
		});
	}

	handleChange = e => {
		const value = e.target.getAttribute('value');
		this.props.onChange(value);
	}

	renderItems = options =>
		options.map(option => {
			const { modal, dropdownOptionsClass } = this.props;
			const modalDropdownClass = classNames('dropdown-option', { 'modal-option': modal });
			const defaultModalClass = option.current ? 'dropdown-option selected' : 'dropdown-option';
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
		})

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

		if (isUndefined(selectedValue)) {
			return null;
		}

		const dropdownClass = classNames('dropdown-menu', { visible: this.state.dropdown, modal });

		const modalDropdownClass = modal ? 'modal-dropdown-list' : '';

		return (
			<div styleName={`dropdown ${this.props.scrolling ? 'scroll' : ''}`} ref={this.node}>
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
				<div styleName={dropdownClass} onClick={this.hideDropdown} className={`${dropdownClass} ${dropdownParentClass}`}>
					<h3 styleName="dropdown-menu-title" className={`dropdown-menu-title ${dropDownMenuTitleClass}`}>
						<span>{header}</span>
						<img src={chevronUp} alt="chevron-up" />
					</h3>
					{customOptionsList ? (
						<div key={customSelected} styleName={!this.state.dropdown ? 'hide' : modalDropdownClass}>
							{customOptionsList}
						</div>
					) : (
							<ul styleName={!this.state.dropdown ? 'hide' : modalDropdownClass}>{this.renderItems(data)}</ul>
						)}
				</div>
			</div>
		);
	}
}

export default CSSModules(Dropdown, styles, { allowMultiple: true });
