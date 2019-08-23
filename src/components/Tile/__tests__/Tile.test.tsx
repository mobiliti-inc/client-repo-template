
import React from 'react';
import { shallow } from 'enzyme';

import Tile from '../Tile';

describe('Tile', () => {
	it('renders', () => {
		const subject = shallow(<Tile><div /></Tile>);

		expect(subject.html()).toEqual('<div class="bare-tile"><div></div></div>');
	});
	it('correctly renders children', () => {
		const subject = shallow(<Tile>Test</Tile>);

		expect(subject.text()).toEqual('Test');
	});
});
