import React from 'react';
import AddLicensePhotoModal from './';

type AddFrontLicensePhotoProps = {
	modalIsVisible: boolean,
	closeModal: (...args: any[]) => any,
	onFrontLicensePhotoModalBack: (...args: any[]) => any,
	onUsePhoto: (...args: any[]) => any,
	closeCamera: boolean
};

class AddFrontLicensePhoto extends React.PureComponent<
	AddFrontLicensePhotoProps,
	{}
	> {
	render() {
		return (
			<AddLicensePhotoModal
				visible={this.props.modalIsVisible}
				title="Front of license"
				closeModal={this.props.closeModal}
				onBack={this.props.onFrontLicensePhotoModalBack}
				onUsePhoto={this.props.onUsePhoto}
				closeCamera={this.props.closeCamera}
				onCameraAccessFail={this.props.onCameraAccessFail}
			/>
		);
	}
}

export default CSSModules(AddFrontLicensePhoto);
