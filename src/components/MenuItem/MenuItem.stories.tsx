import { storiesOf } from "@storybook/react";
import { boolean, object } from "@storybook/addon-knobs";
import React, { useState} from "react";
import { MenuItem } from "../";
import { dashboard, inventory } from '../../assets';

const  bottomContent = () => {
	const [isActive, setIsActive] = useState(false);
	return (<MenuItem style={{'padding': '0 35px'}} isChild isActive={isActive} onItemClicked={() => setIsActive( prev => !prev)} isIconUp={isActive} menuItemIcon={inventory} menuItemText="Inventory" />);
};

const DefaultMenuItem = () => {
	const [isActive, setIsActive] = useState(false);
	return (
		<MenuItem
			showRightIcon={boolean("showRightIcon", true)}
			isActive={boolean("isActive", isActive)}
			onItemClicked={() => setIsActive( prev => !prev)}
			isIconUp={isActive} menuItemIcon={dashboard}
			menuItemText="Dashboard"
			style={ object('style', { background: '#4996ae' })}
			isChild={boolean("isChild", false)}
		/>);
};

storiesOf("MenuItem", module)
	.add("Default", () => <DefaultMenuItem />);
