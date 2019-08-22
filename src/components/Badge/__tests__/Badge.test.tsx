import React from 'react';

import Badge from '../Badge';

import { matchSnapshot } from 'testUtils/matchSnapshot';

describe('Badge', () => {
	it('renders', () => {
		const subject = shallow(<Badge />);
		matchSnapshot(subject);
	});
});
