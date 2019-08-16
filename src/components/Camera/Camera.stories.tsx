import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';
import * as React from 'react';
import Camera from './Camera';

storiesOf('Camera', module)
	.add('default', () => (
		<Camera
			takePhoto={boolean('takePhoto', false)}
			height={number('height', 300)}
			width={number('width', 500)}
			closeCamera={boolean('closeCamera', false)}
			onCameraAccessSuccess={() => { console.log('Camera accessed'); }}
			onCameraAccessFail={() => { console.log('Camera access failed'); }}
			allowButton={boolean('allowButton', true)}
			showMarkers={boolean('showMarkers', false)}
		/>
	)
	);
