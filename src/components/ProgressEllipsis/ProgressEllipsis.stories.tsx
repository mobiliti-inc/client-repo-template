import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import * as React from 'react';
import { ProgressEllipsis } from '../';

storiesOf('ProgressEllipsis', module)
	.add('default', () =>
		<div style={{ background: '#fff', width: "100px" }}><ProgressEllipsis step={text('step', 'password')} /></div>
	);
