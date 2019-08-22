import React from 'react';

import Modal from '../Modal';

describe('Modal', () => {
	it('renders', () => {
		const subject = shallow(
			<Modal
				icon={<span>></span>}
				visible
				title="Insurance is included in each car's monthly subscription price."
				subTitle="Enter your age so we can give you an accurate price."
				buttonText="Continue"
				onButtonClick={() => { }}
				scrolling
			>
				<h1>Hello there</h1>
			</Modal>);

		expect(subject.text()).toContain('Insurance is included in each car\'s monthly subscription price.');
		expect(subject.text()).toContain('Enter your age so we can give you an accurate price.');
		expect(subject.html()).toContain('<h1>Hello there</h1>');
	});
});
