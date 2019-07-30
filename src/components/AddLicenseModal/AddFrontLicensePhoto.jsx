import React from 'react';
import AddLicensePhotoModal from './AddPhotoModal';

class AddFrontLicensePhoto extends React.PureComponent {
	static propTypes = {
		modalIsVisible: PropTypes.bool.isRequired,
		closeModal: PropTypes.func.isRequired,
		onFrontLicensePhotoModalBack: PropTypes.func.isRequired,
		onUsePhoto: PropTypes.func.isRequired,
		closeCamera: PropTypes.bool.isRequired
	}
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
