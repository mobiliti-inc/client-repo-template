import React from 'react';


import { Dropdown } from '../../';

describe('Dropdown', () => {
	it('renders', () => {
		const locations = [
			{ value: 'Austin, TX', current: true },
			{ value: 'Philadelphia, PA', current: false }
		];

		const subject = shallow(<Dropdown
			scrolling
			data={locations}
			onChange={() => { }}
			header="Select a Location"
		/>);
		expect(subject.text()).toContain('Philadelphia, PA');
		expect(subject.text()).toContain('Austin, TX');
	});
});
