import React from 'react';

import ProgressEllipsis from '../ProgressEllipsis';
import { matchSnapshot } from '../../../../testUtils/matchSnapshot';

describe('ProgressEllipsis', () => {
	it('renders name step correctly', () => {
		const subject = shallow(<ProgressEllipsis step="name" />);
		matchSnapshot(subject);
	});

	it('renders email step correctly', () => {
		const subject = shallow(<ProgressEllipsis step="email" />);
		matchSnapshot(subject);
	});

	it('renders password step correctly', () => {
		const subject = shallow(<ProgressEllipsis step="password" />);
		matchSnapshot(subject);
	});
});
