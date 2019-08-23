import React from 'react';
import { shallow } from 'enzyme';

import { matchSnapshot } from '../../../../../testUtils/matchSnapshot';

import DialogModal from '../DialogModal';

describe('DialogModal', () => {
	it('renders', () => {
		const tree = shallow(
			<DialogModal
				modalTitle="test headline"
				blueButtonClick={() => { }}
				whiteButtonClick={() => { }}
				modalIsVisible
				closeModal={() => { }}
				whiteButtonText="test"
				blueButtonText="message test"
				isBlueButtonDisabled
			/>
		);
		matchSnapshot(tree);
	});

	it('renders with children', () => {
		const tree = shallow(
			<DialogModal
				modalTitle="test headline"
				blueButtonClick={() => { }}
				whiteButtonClick={() => { }}
				modalIsVisible
				closeModal={() => { }}
				whiteButtonText="test"
				blueButtonText="message test"
				isBlueButtonDisabled={false}
			>
				<div />
			</DialogModal>
		);
		matchSnapshot(tree);
	});
});
