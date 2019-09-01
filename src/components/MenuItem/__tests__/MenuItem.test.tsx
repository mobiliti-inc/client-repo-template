import React from 'react';

import MenuItem from '../MenuItem';

describe('MenuItem', () => {
	const defaultProps = {
		style: {},
		menuItemIcon: 'chevron.png',
		menuItemText: 'DashBoard',
		showRightIcon: false,
		isIconUp: false,
		onItemClicked: jest.fn(),
		isActive: false,
		isChild: false
	};
	it('renders', () => {
		const subject = shallow(<MenuItem  {...defaultProps} />);
		expect(subject).toMatchSnapshot();
	});

	it('renders with right icon', () => {
		const newProps = {...defaultProps, showRightIcon: true};
		const subject = shallow(<MenuItem  {...newProps}/>);
		expect(subject).toMatchSnapshot();
		expect(subject.find('.menu-item__right')).toHaveLength(1);
	});

	it('renders with up icon shown', () => {
		const newProps = {...defaultProps, showRightIcon: true, isIconUp: true};
		const subject = shallow(<MenuItem  {...newProps}/>);
		expect(subject).toMatchSnapshot();
		expect(subject.find('.upIcon')).toHaveLength(1);
	});
});
