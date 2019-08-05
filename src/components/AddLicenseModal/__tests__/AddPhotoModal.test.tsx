import AddPhotoModal from '../AddPhotoModal';

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
