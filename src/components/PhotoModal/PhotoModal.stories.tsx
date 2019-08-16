import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

import { AddPhotoModal } from '..';

storiesOf('AddPhotoModal', module)
	.add('default', () =>
		<AddPhotoModal
			visible={boolean('visible', true)}
			title={text('title', "Front of license")}
			closeModal={() => { }}
			onBack={() => { }}
			onUsePhoto={() => { }}
			closeCamera={boolean('closeCamera', false)}
			onCameraAccessFail={() => { }}
		/>
	);
