
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import * as React from 'react';
import { PaymentMethodForm } from '../..';

storiesOf('PaymentMethodForm', module)
	.add('default', () =>
		<PaymentMethodForm
			displayCancelButton={boolean('displayCancelButton', false)}
			cancelForm={() => { }}
			addPaymentCard={() => { }}
			isPaymentCardAdded={boolean(('isPaymentCardAdded'), false)}
		/>
	);
