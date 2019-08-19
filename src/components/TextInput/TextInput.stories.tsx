import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import * as React from 'react';
import { TextInput } from '../';

storiesOf('TextInput', module)
	.add('default', () => (<div style={{ width: "300px" }}><TextInput type={text('type', 'text')}
		onChange={() => { }}
		id="text"
		value={text('value', '')}
		placeholder={text('value', '')}
		disabled={boolean('disabled', false)}
		isValid={boolean('isValid', false)}
		dark={boolean('dark', false)} /></div>
	)
	);