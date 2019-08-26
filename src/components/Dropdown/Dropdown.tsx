import * as React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from "@fortawesome/pro-light-svg-icons";

import { isUndefined } from 'util';
import './Dropdown.scss';

type Data = {
	value: string,
	current?: boolean
};

interface DropdownProps {
	data: any;
	onChange: (...args: any[]) => any;
	scrolling: boolean;
	modal?: boolean;
	header?: string | React.ReactNode;
	customOptionsList?: React.ReactNode;
	dropdownSelectedClass?: string;
	dropdownParentClass?: string;
	dropDownMenuTitleClass?: string;
	dropdownOptionsClass?: string;
	customSelected?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
	let node: any = React.useRef(null);

	const [dropdown, setDropdown] = React.useState<boolean>(false);

	const {
		onChange,
		dropdownOptionsClass,
		data,
		header,
		modal,
		dropdownSelectedClass,
		dropdownParentClass,
		customOptionsList,
		dropDownMenuTitleClass,
		customSelected,
		scrolling
	} = props;

	const handleClick = (e: any) => {
		if (node.current.contains(e.target)) {
			return;
		}
		setDropdown(false);
	};

	React.useEffect(() => {
		document.addEventListener('mousedown', handleClick, false);
	}, []);

	// TODO: Replace with a hooks implementation
	// componentWillUnmount = () => {
	// 	document.removeEventListener('mousedown', this.handleClick, false);
	// }

	const getSelectedValue = (locations: [Data]) => {
		let selectedItem: any = false;
		if ((customOptionsList && customSelected) || customSelected) {
			selectedItem = { value: customSelected };
		} else {
			selectedItem = locations.find((loc: Data) => loc.current);
		}
		return selectedItem;
	};

	const showDropdown = () => {
		setDropdown(!dropdown);
	};

	const hideDropdown = (event: any) => {
		event.preventDefault();
		setDropdown(false);
	};

	const handleChange = (event: any) => {
		const value = event.target.getAttribute('value');
		onChange(value);
	};

	const renderItems = (options: [Data]) =>
		options.map((option: Data) => {
			// const modalDropdownClass = cx('dropdown-option', { 'modal-option': modal });
			const defaultModalClass = option.current ? 'dropdown-option selected' : 'dropdown-option';
			return (
				<li
					styleName={defaultModalClass}
					className={`${defaultModalClass}${dropdownOptionsClass}`}
					key={option.value}
					onClick={(event: any) => handleChange(event)}
					onKeyDown={handleChange}
					value={option.value}
				>
					{option.value}
				</li>
			);
		});

	const selectedValue = getSelectedValue(data);

	if (isUndefined(selectedValue)) {
		return null;
	}

	const dropdownClass = cx('dropdown-menu', { visible: dropdown, modal });

	const modalDropdownClass = modal ? 'modal-dropdown-list' : '';

	return (
		<div styleName={`dropdown ${scrolling ? 'scroll' : ''}`} ref={node}>
			<p
				styleName="dropdown-selected"
				className={`dropdown-selected ${dropdownSelectedClass}`}
				onClick={showDropdown}
				onKeyDown={showDropdown}
			>
				{selectedValue.value}&nbsp;&nbsp;
				<span styleName={cx('chevron-down', { 'modal-chevron-down': modal })}><FontAwesomeIcon icon={faChevronDown} /></span>
			</p>
			<div styleName={dropdownClass} onClick={(event: any) => hideDropdown(event)} className={`${dropdownClass} ${dropdownParentClass}`}>
				<h3 styleName="dropdown-menu-title" className={`dropdown-menu-title ${dropDownMenuTitleClass}`}>
					<span>{header}</span>
					<FontAwesomeIcon icon={faChevronUp} />
				</h3>
				{customOptionsList ? (
					<div styleName={!dropdown ? 'hide' : modalDropdownClass}>
						{customOptionsList}
					</div>
				) : (
						<ul styleName={!dropdown ? 'hide' : modalDropdownClass}>{renderItems(data)}</ul>
					)}
			</div>
		</div>
	);
};

export default Dropdown;
