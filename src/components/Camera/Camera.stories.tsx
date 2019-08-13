import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';
import * as React from 'react';
import Camera from './Camera';

storiesOf('Camera', module)
	.add('default', () =>
		React.createElement(() => {
			const [imageCaptured, setImageCaptured] = React.useState('');

			return (
				<div>
					<Camera
						onTakingPhoto={(image: any) => { setImageCaptured(image); }}
						takePhoto={boolean('takePhoto', false)}
						height={number('height', 300)}
						width={number('width', 500)}
						closeCamera={boolean('closeCamera', false)}
						onCameraAccessSuccess={() => { console.log('Camera accessed') }}
						onCameraAccessFail={() => { console.log('Camera access failed') }}
						sendFile={(image: any) => { console.log(image, "+____+++______") }}
						allowButton
					// showPhotoTaken
					/>
					{!!imageCaptured && <img src={imageCaptured} alt="" className="random-image" />}
				</div>
			);
		})
	);
