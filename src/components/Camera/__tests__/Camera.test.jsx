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
			'<canvas width="500" height="300" class="hide"></canvas><video autoplay="" class="video"><track kind="captions"/></video>');
	});
});
