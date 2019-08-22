import React from 'react';
import { matchSnapshot } from '../../../../testUtils/matchSnapshot';
import { shallow } from 'enzyme';

import AllSetModal from '../AllSetModal';

describe('AllSetModal', () => {
	it('renders', () => {
		const tree = shallow(
			<AllSetModal />);
		matchSnapshot(tree);
	});

	it('should render custom header', () => {
		const tree = shallow(<AllSetModal headerText="Lol" />);
		expect(tree.find('h2').text()).toBe('Lol');
	});

	// it('should render close button just in case needed', () => {
	// 	const tree = shallow(<AllSetModal />);
	// 	expect(tree.find('img')).toHaveLength(0);
	// 	tree.setProps({ showCloseModal: true });
	// 	expect(tree.find('img')).toHaveLength(1);
	// });

	// it('should be able to be hidden and show(toggled)', () => {
	// 	const tree = shallow(<AllSetModal />);
	// 	console.log(tree, "________________");
	// 	expect(tree.find('.modal-hide')).toHaveLength(1);
	// 	expect(tree.find('.modal-visible')).toHaveLength(0);
	// 	tree.setProps({ modalIsVisible: true });
	// 	expect(tree.find('.modal-hide')).toHaveLength(0);
	// 	expect(tree.find('.modal-visible')).toHaveLength(1);
	// });

	// it('should be able to be bordered', () => {
	// 	const tree = shallow(<AllSetModal />);
	// 	expect(tree.find('.modal-container--bordered')).toHaveLength(0);
	// 	tree.setProps({ bordered: true });
	// 	expect(tree.find('.modal-container--bordered')).toHaveLength(1);
	// });
});
