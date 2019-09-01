import React, { FC, ReactNode } from "react";
import classNames from 'classnames';

import "./MenuItem.scss";
import { chevronDown, chevronUp } from '../../assets';

type customStyle = {
	background?: string;
	color?: string;
	height?: string;
	width?: string;
	padding?: string;
};

interface IProps {
	style?: customStyle;
	menuItemIcon?: string;
	menuItemText: ReactNode;
	showRightIcon?: boolean;
	isIconUp?: boolean;
	onItemClicked: () => void;
	isActive?: boolean;
	isChild?: boolean;
}

const MenuItem: FC<IProps> = ({ style, menuItemIcon, menuItemText, showRightIcon, isIconUp, onItemClicked, isActive, isChild }) => (
		<div
		style={style}
		styleName={classNames("menu-item", { "menu-item--active": isActive})}
		onClick={onItemClicked}
		role="presentation"
		>
			<div styleName="menu-item__left">
				<img src={menuItemIcon} alt="Menu Item Icon" />
				<span styleName="menu-item__left__text">{menuItemText}</span>
			</div>
			{
				showRightIcon &&
				<div styleName="menu-item__right">
					{isIconUp && <img className="upIcon" src={chevronUp} alt="Icon up" />}
					{!isIconUp && <img className="downIcon" src={chevronDown} alt="Icon down" />}
				</div>
			}
			<span styleName={classNames({nested: isChild})}/>
		</div>
	);

export default MenuItem;
