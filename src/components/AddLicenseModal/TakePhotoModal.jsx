import React from 'react';
import AddPhotoModal from './AddPhotoModal';

class TakePhotoModal extends React.PureComponent {
	static propTypes = {
		modalIsVisible: PropTypes.bool.isRequired,
		closeModal: PropTypes.func.isRequired,
		onBack: PropTypes.func.isRequired,
		onUsePhoto: PropTypes.func.isRequired,
		closeCamera: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
		onCameraAccessFail: PropTypes.func.isRequired,
	}
	render() {
		const {
			closeModal,
			modalIsVisible,
			onUsePhoto,
			onCameraAccessFail,
			onBack,
			closeCamera,
			title,
		} = this.props;
		return (
			<AddPhotoModal
				visible={modalIsVisible}
				title={title}
				closeModal={closeModal}
				onBack={onBack}
				onUsePhoto={onUsePhoto}
				closeCamera={closeCamera}
				onCameraAccessFail={onCameraAccessFail}
			/>
		);
	}
}


export default CSSModules(TakePhotoModal);
