import React from 'react';
import AddPhotoModal from './AddPhotoModal';

type TakePhotoModalProps = {
	modalIsVisible: boolean,
	closeModal: (...args: any[]) => any,
	onBack: (...args: any[]) => any,
	onUsePhoto: (...args: any[]) => any,
	closeCamera: boolean,
	title: string,
	onCameraAccessFail: (...args: any[]) => any
};

class TakePhotoModal extends React.PureComponent<TakePhotoModalProps, {}> {
	render() {
		const {
			closeModal,
			modalIsVisible,
			onUsePhoto,
			onCameraAccessFail,
			onBack,
			closeCamera,
			title
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
