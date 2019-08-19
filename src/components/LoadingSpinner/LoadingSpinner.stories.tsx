import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import * as React from 'react';
import { LoadingSpinner } from '../';

storiesOf('LoadingSpinner', module)
	.add('default', () =>
		<LoadingSpinner show={boolean('show', true)} blue={boolean('blue', true)} black={boolean('black', true)} />
	);
