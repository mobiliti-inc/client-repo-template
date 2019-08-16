import * as React from 'react';
import CSSModules from 'react-css-modules';

import AddLicensePhotoModal from './AddPhotoModal';

interface AddBackLicensePhotoProps {
	modalIsVisible: boolean;
	closeModal: (...args: any[]) => any;
	onBackLicensePhotoModalBack: (...args: any[]) => any;
	onUsePhoto: (...args: any[]) => any;
	closeCamera: boolean;
}

const AddBackLicensePhoto: React.FC<AddBackLicensePhotoProps> = (props) => {
	const { modalIsVisible, closeModal, onBackLicensePhotoModalBack, onUsePhoto, closeCamera } = props;

	return (
		<AddLicensePhotoModal
			visible={modalIsVisible}
			title="Back of license"
			closeModal={closeModal}
			onBack={onBackLicensePhotoModalBack}
			onUsePhoto={onUsePhoto}
			closeCamera={closeCamera}
			onCameraAccessFail={() => { }}
		/>);
};

export default CSSModules(AddBackLicensePhoto);
