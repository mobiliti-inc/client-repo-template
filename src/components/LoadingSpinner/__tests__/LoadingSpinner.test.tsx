import React from 'react';

import LoadingSpinner from '../LoadingSpinner';

describe('Button', () => {
	it('renders', () => {
		const subject = shallow(<LoadingSpinner show />);

		expect(subject.html()).toEqual('<div class="loading-spinner  loading-ring"><div></div><div></div><div></div></div>');
	});
	it('is hideable when "show" set to false', () => {
		const subject = shallow(<LoadingSpinner show />);
		expect(subject.html()).toEqual('<div class="loading-spinner  loading-ring"><div></div><div></div><div></div></div>');
		subject.setProps({ show: false });
		expect(subject.html()).toEqual('');
	});
});
