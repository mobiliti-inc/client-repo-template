import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import * as React from 'react';
import { Modal } from '../';

storiesOf('Modal', module)
	.add('default', () =>
		<Modal
			title={text('title', 'Example Title')}
			subTitle={text('subTitle', 'Example Subtitle')}
			buttonText={text('buttonText', 'Continue')}
			visible={boolean('visible', true)}
			onButtonClick={() => { }}
			scrolling={boolean('scrolling', true)}
			plain={boolean('plain', false)}
			overlay={text('overlay', 'white')}
			freezeOverlay={boolean('freezeOverlay', false)}
			noIcon={boolean('noIcon', false)}
			showCloseIcon={boolean("showCloseIcon", false)}
			showButtonLoader={boolean('showButtonLoader', false)}
			onIconClose={() => { }}
			plainHeader={boolean('plainHeader', false)}
			noPointer={boolean('noPointer', false)}
		>
			<h2>Modal Body</h2>
		</Modal >, {
			notes: 'Overlay can be gray, white or dark-gray'
		}
	);
