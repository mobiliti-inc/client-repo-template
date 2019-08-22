import React from 'react';

import Badge from '../Badge';
import { shallow } from 'enzyme';

import { matchSnapshot } from '../../../../testUtils/matchSnapshot';

describe('Badge', () => {
	it('renders', () => {
		const subject = shallow(<Badge />);
		matchSnapshot(subject);
	});
});
