import React from 'react';

import BrandLogo from '../BrandLogo';

describe('BrandLogo', () => {
	it('renders', () => {
		const subject = shallow(<BrandLogo />);
		expect(subject).toMatchSnapshot();
	});

	it('renders with brand Name', () => {
		const brandNameText = "Mobiliti.com";
		const subject = shallow(<BrandLogo brandName={brandNameText} />);
		expect(subject).toMatchSnapshot();

		const brandNameSpan =subject.find('.brand__name');
		expect(brandNameSpan).toHaveLength(1);
		expect(brandNameSpan.props().children).toEqual(brandNameText);
	});

	it('renders with style', () => {
		const customStyle = {'background': 'red'};
		const subject = shallow(<BrandLogo style={customStyle} />);
		expect(subject).toMatchSnapshot();
		const brandDiv =subject.find('.brand');
		expect(brandDiv).toHaveLength(1);
		expect(brandDiv.props().style.background).toEqual(customStyle.background);
	});

	it('renders with logo', () => {
		const subject = shallow(<BrandLogo logo='logo.png' />);
		expect(subject).toMatchSnapshot();
		const brandImg =subject.find('img');
		expect(brandImg).toHaveLength(1);
		expect(brandImg.props().src).toEqual('logo.png');
	});
});
