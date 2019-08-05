import React from 'react';
import Camera from '../Camera/Camera';
import DialogModal from '../Modal/DialogModal/DialogModal';

type AddPhotoModalProps = {
	visible: boolean,
	title: string,
	closeModal: (...args: any[]) => any,
	onBack: (...args: any[]) => any,
	onUsePhoto: (...args: any[]) => any,
	closeCamera: boolean,
	onCameraAccessFail: (...args: any[]) => any
};

type AddPhotoModalState = {
	takePhoto: boolean,
	photoTaken: boolean,
	image: null,
	cameraAccessGranted: boolean
};

class AddPhotoModal extends React.PureComponent<
	AddPhotoModalProps,
	AddPhotoModalState
	> {
	state = {
		takePhoto: false,
		photoTaken: false,
		image: null,
		cameraAccessGranted: false
	};

	onBack = () => {
		if (this.state.photoTaken) {
			this.setState({
				takePhoto: true,
				photoTaken: false
			});
		} else {
			this.props.onBack();
		}
	}

	onCloseModal = () => {
		this.setState({
			takePhoto: false,
			image: null,
			photoTaken: false
		});
		this.props.closeModal();
	}

	onCameraAccessSuccess = () => {
		this.setState({
			cameraAccessGranted: true
		});
	}

	onCameraAccessFail = () => {
		if (this.state.cameraAccessGranted) {
			this.setState({
				cameraAccessGranted: false
			});
		}
		this.props.onCameraAccessFail();
	}

	takePhoto = () => {
		if (this.state.photoTaken) {
			this.setState({
				image: null,
				photoTaken: false
			});
			this.props.onUsePhoto(this.state.image);
		} else {
			// reset in case taking of photo is cancelled
			const { takePhoto } = this.state;
			if (takePhoto) {
				this.setState({
					takePhoto: false
				});
			} else {
				this.setState({
					takePhoto: true
				});
			}
		}
	}

	captureImage = image => {
		this.setState({
			photoTaken: true,
			takePhoto: false,
			image
		});
	}

	render() {
		return (
			<DialogModal
				isBlueButtoDisabled={!this.state.cameraAccessGranted}
				modalIsVisible={this.props.visible}
				modalTitle={this.props.title}
				blueButtonText={this.state.photoTaken ? 'Use Photo' : 'Take Photo'}
				whiteButtonText={this.state.photoTaken ? 'Retake' : 'Back'}
				blueButtonClick={this.takePhoto}
				whiteButtonClick={this.onBack}
				closeModal={this.onCloseModal}
				className="modal-body-class"
			>
				<Camera
					onTakingPhoto={this.captureImage}
					takePhoto={this.state.takePhoto}
					height={300}
					width={500}
					closeCamera={this.props.closeCamera}
					onCameraAccessSuccess={this.onCameraAccessSuccess}
					onCameraAccessFail={this.onCameraAccessFail}
				/>
			</DialogModal>
		);
	}
}
export default CSSModules(AddPhotoModal);
