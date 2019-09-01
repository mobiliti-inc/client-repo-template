import React from 'react';
import { act } from 'react-dom/test-utils';

import PlainDropDown from '../PlainDropDown';

describe('PlainDropDown', () => {
	it('renders with content not shown', () => {
		const subject = shallow(<PlainDropDown showContent={false} updateShowContent={jest.fn()} />);
		expect(subject).toMatchSnapshot();
	});

	it('renders with content shown', () => {
		const subject = shallow(<PlainDropDown showContent updateShowContent={jest.fn()} />);
		expect(subject).toMatchSnapshot();
	});

	it('renders with horizontal line between top and bottom content', () => {
		const subject = shallow(<PlainDropDown isSplitted showContent updateShowContent={jest.fn()} />);
		expect(subject).toMatchSnapshot();
	});

	it('drops down when clicked', () => {
		const subject = mount(<PlainDropDown isSplitted showContent={false} updateShowContent={jest.fn()} />);
		const PlainDropDownTopDiv =subject.find('.dropdown-menu__top');
		expect(PlainDropDownTopDiv).toHaveLength(1);
		expect(subject.find('.dropdown-menu__top-open')).toHaveLength(0);

		act(() => {
			PlainDropDownTopDiv.simulate('click');
		});
		subject.update();
		expect(subject).toMatchSnapshot();
		expect(subject.find('.dropdown-menu__top-open')).toHaveLength(1);
	});
});
