import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import * as React from 'react';
import { DialogModal } from '../../';

storiesOf('DialogModal', module)
	.add('default', () =>
		<DialogModal
			blueButtonClick={() => { }}
			blueButtonText={text('blueButtonText', "Continue")}
			closeModal={() => { }}
			footer={boolean('footer', true)}
			isBlueButtonDisabled={boolean('isBlueButtonDisabled', false)}
			modalIsVisible={boolean('modalIsVisible', true)}
			modalTitle={text('modalTitle', "Modal title")}
			whiteButtonClick={() => { }}
			whiteButtonText={text('whiteButtonText', "Back")}
		>
			<h2>Modal Body</h2>
		</DialogModal>
	);
