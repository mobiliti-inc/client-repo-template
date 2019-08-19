import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import * as React from 'react';
import { Badge } from '../';

storiesOf('Badge', module)
	.add('default', () =>
		<Badge status={number('status', 1)} />, {
			notes: 'status can be 1, 2 or 3'
		}
	);
