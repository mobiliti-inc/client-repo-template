import React from 'react';

import Alert from '../Alert';

describe('Alert', () => {
	it('renders', () => {
		const subject = <Alert show />;
		expect(subject).toMatchSnapshot();
	});
});
