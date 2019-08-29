import { storiesOf } from "@storybook/react";
import { text, object } from "@storybook/addon-knobs";
import React from "react";
import { BrandLogo } from "../";

storiesOf("BrandLogo", module)
	.add("Default", () =>
	<BrandLogo
		brandName={text('brandName', "")}
		style={ object('style', { background: 'rgba(73, 150, 174, 0.8)' })}
		logo={text('logo', "")}
	/>);
