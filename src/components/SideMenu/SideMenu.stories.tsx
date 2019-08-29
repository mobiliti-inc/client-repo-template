import { storiesOf } from "@storybook/react";
import { boolean, object } from "@storybook/addon-knobs";
import React from "react";
import { SideMenu, BrandLogo } from "../";

storiesOf("SideMenu", module)
	.add("No brand logo", () =>
		<SideMenu
			visible={boolean("visible", true)}
			style={ object('style', { })}/>
		)
	.add("With brand logo", () =>
		<SideMenu
			visible={boolean("visible", true)}
			style={ object('style', { })}>
			<BrandLogo />
		</SideMenu>);
