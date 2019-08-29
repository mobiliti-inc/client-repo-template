import React from 'react';

import SideMenu from '../SideMenu';

describe('BrandLogo', () => {
	it('renders', () => {
		const subject = shallow(<SideMenu />);
		expect(subject).toMatchSnapshot();
	});

	it('renders with children', () => {
		const subject = shallow(<SideMenu>text</SideMenu>);
		expect(subject).toMatchSnapshot();
		const sideMenuDiv =subject.find('.side-menu');
		expect(sideMenuDiv).toHaveLength(1);
		expect(sideMenuDiv.props().children).toEqual('text');
	});

	it('renders with visible', () => {
		const subject = shallow(<SideMenu visible={true} />);
		expect(subject).toMatchSnapshot();

		const sideMenuDiv =subject.find('.visible');
		expect(sideMenuDiv).toHaveLength(1);
	});

	it('renders with style', () => {
		const customStyle = {'background': 'red'};
		const subject = shallow(<SideMenu style={customStyle} />);
		expect(subject).toMatchSnapshot();
		const sideMenuDiv =subject.find('.side-menu');
		expect(sideMenuDiv).toHaveLength(1);
		expect(sideMenuDiv.props().style.background).toEqual(customStyle.background);
	});
});
