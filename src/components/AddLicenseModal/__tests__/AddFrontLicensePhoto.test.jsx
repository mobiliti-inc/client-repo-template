import AddFrontLicensePhoto from '../AddFrontLicensePhoto';

describe('AddFrontLicensePhoto', () => {
	it('renders', () => {
		const subject = shallow(
			<AddFrontLicensePhoto
				modalIsVisible
				closeModal={() => { }}
				onFrontLicensePhotoModalBack={() => { }}
				onUsePhoto={() => { }}
				closeCamera
				onCameraAccessFail={() => { }}
			/>);
		matchSnapshot(subject);
	});
});
