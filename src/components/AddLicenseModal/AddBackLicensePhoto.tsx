import React, { PureComponent } from 'react';
import AddLicensePhotoModal from './AddPhotoModal';

type AddBackLicensePhotoProps = {
	modalIsVisible: boolean,
	closeModal: (...args: any[]) => any,
	onBackLicensePhotoModalBack: (...args: any[]) => any,
	onUsePhoto: (...args: any[]) => any,
	closeCamera: boolean
};

class AddBackLicensePhoto extends PureComponent<
	AddBackLicensePhotoProps,
	{}
	> {
	render() {
		return (
			<AddLicensePhotoModal
				visible={this.props.modalIsVisible}
				title="Back of license"
				closeModal={this.props.closeModal}
				onBack={this.props.onBackLicensePhotoModalBack}
				onUsePhoto={this.props.onUsePhoto}
				closeCamera={this.props.closeCamera}
				onCameraAccessFail={() => { }}
			/>
		);
	}
}

export default CSSModules(AddBackLicensePhoto);
