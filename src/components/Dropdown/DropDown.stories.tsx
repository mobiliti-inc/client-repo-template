import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import * as React from 'react';
import { DropDown } from '..';

let ages = [
	{
		value: '21',
		current: false
	},
	{
		value: '22',
		current: false
	},
	{
		value: '23',
		current: false
	},
	{
		value: '24',
		current: false
	},
	{
		value: '25+',
		current: true
	}
];

storiesOf('DropDown', module)
	.add('default', () =>
	<DropDown modal={boolean('modal', false)} data={ages} onChange={() => {}} scrolling={boolean('scrolling', true)} />
	);
