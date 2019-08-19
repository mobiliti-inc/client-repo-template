import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Tile } from '../';

storiesOf('Tile', module)
	.add('default', () =>
		<Tile
		>
			<h2>Tile Content</h2>
		</Tile>
	);
