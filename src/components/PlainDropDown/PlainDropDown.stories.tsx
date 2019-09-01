import { storiesOf } from "@storybook/react";
import { boolean, object } from "@storybook/addon-knobs";
import React, { useState} from "react";
import { PlainDropDown, MenuItem } from "../";
import { dashboard, inventory } from '../../assets';

const topContent = <div style={{height: '40px', display: 'flex', alignItems: 'center'}}></div>;

const  bottomContent = () => {
	const [isActive, setIsActive] = useState(false);
	return (<MenuItem style={{'padding': '0 35px'}} isChild isActive={isActive} onItemClicked={() => setIsActive( prev => !prev)} isIconUp={isActive} menuItemIcon={inventory} menuItemText="Inventory" />);
};

const topContentTwo = () => {
	const [isActive, setIsActive] = useState(false);
	return (<MenuItem  showRightIcon isActive={isActive} onItemClicked={() => setIsActive( prev => !prev)} isIconUp={isActive} menuItemIcon={dashboard} menuItemText="Dashboard" />);
};

storiesOf("PlainDropDown", module)
	.add("No content", () => {
		return(<PlainDropDown
			showContent={boolean("showContent", false)}
			updateShowContent={()=> {}}
			topContent={topContent}
			isSplitted={boolean("isSplitted", false)}
			style={ object('style', { background: '#4996ae' })}/>);
		})
	.add("With Menu Item", () =>
			<PlainDropDown
			showContent={boolean("showContent", false)}
			updateShowContent={()=> {}}
			topContent={topContentTwo()}
			isSplitted={boolean("isSplitted", false)}
			style={ object('style', { background: '#4996ae' })}>
				<div style={{display: 'flex', justifyContent: 'center'}}>
				{bottomContent()}
				</div>
			</PlainDropDown>
		);
