import AddBackLicensePhoto from '../AddBackLicensePhoto';

describe('AddBackLicensePhoto', () => {
	it('renders', () => {
		const subject = shallow(
			<AddBackLicensePhoto
				modalIsVisible
				closeModal={() => { }}
				onBackLicensePhotoModalBack={() => { }}
				onUsePhoto={() => { }}
				closeCamera
				onCameraAccessFail={() => { }}
			/>);
		matchSnapshot(subject);
	});
});
