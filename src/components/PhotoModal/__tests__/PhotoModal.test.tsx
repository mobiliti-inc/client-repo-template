import React from 'react';

import { matchSnapshot } from '../../../../testUtils/matchSnapshot';
import { shallow } from 'enzyme';

import AddPhotoModal from '../PhotoModal';

describe('AddPhotoModal', () => {
	it('renders', () => {
		const subject = shallow(
			<AddPhotoModal
				visible
				title="Front of license"
				closeModal={() => { }}
				onBack={() => { }}
				onUsePhoto={() => { }}
				closeCamera={false}
				onCameraAccessFail={() => { }}
			/>);
		matchSnapshot(subject);
	});
});
