import React from 'react';
import { shallow } from 'enzyme';

import { Checkbox } from '../../';

describe('Checkbox', () => {
	it('contains the correct text label', () => {
		const subject = shallow(
			<Checkbox
				onChange={() => { }}
				checked={false}
				label="Hello world!"
			/>);
		expect(subject.props().children[0]).toEqual('Hello world!');
	});
	it('changes checked variable to true upon click', () => {
		let checked = false;
		const subject = shallow(
			<Checkbox
				onChange={() => { checked = true; }}
				checked={checked}
				label="Hello world!"
			/>);
		subject.find('input[type="checkbox"]').simulate('change');
		expect(checked).toEqual(true);
	});
});
