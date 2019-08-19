import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import * as React from 'react';
import { AllSetModal } from '../';

storiesOf('AllSetModal', module)
	.add('default', () =>
		<AllSetModal
			headerText={text('headerText', 'Example header text')}
			bodyText={text('bodyText', 'Body Text')}
			buttonText={text('buttonText', 'Continue')}
			modalIsVisible={boolean('modalIsVisible', true)}
			bordered={boolean('bordered', false)}
			showCloseModal={boolean("showCloseModal", false)}
			showButton={boolean('showButton', false)}
		/>, {
			notes: 'Overlay can be gray, white or dark-gray'
		}
	);
