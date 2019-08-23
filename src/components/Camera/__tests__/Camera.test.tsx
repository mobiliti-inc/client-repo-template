import React from 'react';
import { shallow } from 'enzyme';

import { matchSnapshot } from '../../../../testUtils/matchSnapshot';

import Camera from '../Camera';

describe('Camera', () => {
	it('renders', () => {
		const tree = shallow(
			<Camera
				onTakingPhoto={() => { }}
				takePhoto
				height={300}
				width={500}
				closeCamera={false}
			/>);
		matchSnapshot(tree);
	});

	it('renders video element so one can take photo ', () => {
		const subject = shallow(
			<Camera
				onTakingPhoto={() => { }}
				takePhoto
				height={300}
				width={500}
				closeCamera={false}
			/>);
		matchSnapshot(subject);
		expect(subject.html()).toContain(
			'<div class="container"><canvas style="width:500px;height:300px" class="hide"></canvas><video autoplay="" class="video" style="width:500px;height:300px"></video></div>');
	});
});
