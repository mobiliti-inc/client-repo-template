import React from 'react';
import AddLicensePhotoModal from './AddPhotoModal';

class AddBackLicensePhoto extends React.PureComponent {
	static propTypes = {
		modalIsVisible: PropTypes.bool.isRequired,
		closeModal: PropTypes.func.isRequired,
		onBackLicensePhotoModalBack: PropTypes.func.isRequired,
		onUsePhoto: PropTypes.func.isRequired,
		closeCamera: PropTypes.bool.isRequired
	}
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
