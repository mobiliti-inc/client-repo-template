import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import * as React from 'react';
import { Checkbox } from '../';

storiesOf('Checkbox', module)
	.add('default', () =>
		<Checkbox
			onChange={() => { }}
			checked={boolean('checked', false)}
			label={text('label', "Hello World")}
		/>
	);
