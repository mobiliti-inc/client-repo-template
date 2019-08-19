import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import * as React from "react";
import { Alert } from "../";

storiesOf("Alert", module).add("default", () => (
	<Alert show={boolean('show', true)} title={text('title', "Default title")} subTitle={text('subTitle', "Default subtitle")} closable={boolean("closable", true)} />
));
