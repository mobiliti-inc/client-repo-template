import React from 'react';
import { shallow } from 'enzyme';

import { Button } from '../../';

describe('Button', () => {
	it('contains the correct text', () => {
		const subject = shallow(<Button onClick={() => { }}>Hello world!</Button>);
		expect(subject.text()).toEqual('Hello world!');
	});
	it('emits correct action upon click', () => {
		let pass = false;
		const subject = shallow(<Button onClick={() => { pass = true; }}>Hello world!</Button>);
		subject.find('button').simulate('click');
		expect(pass).toEqual(true);
	});
});
