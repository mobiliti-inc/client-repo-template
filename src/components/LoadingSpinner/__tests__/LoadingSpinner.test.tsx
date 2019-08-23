import React from 'react';
import { shallow } from 'enzyme';

import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
	it('renders', () => {
		const subject = shallow(<LoadingSpinner show />);

		expect(subject.html()).toEqual('<div class="loading-ring"><div></div><div></div><div></div></div>');
	});
	it('is hidable when "show" set to false', () => {
		const subject = shallow(<LoadingSpinner show />);
		expect(subject.html()).toEqual('<div class="loading-ring"><div></div><div></div><div></div></div>');
		subject.setProps({ show: false });
		expect(subject.html()).toEqual('');
	});
});
