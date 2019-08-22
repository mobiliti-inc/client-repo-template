import React from 'react';

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
				isBlueButtoDisabled
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
				isBlueButtoDisabled={false}
			>
				<div />
			</DialogModal>
		);
		matchSnapshot(tree);
	});
});
