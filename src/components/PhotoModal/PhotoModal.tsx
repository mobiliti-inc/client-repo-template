import * as React from 'react';

import { DialogModal, Camera } from '..';

interface PhotoModalProps {
	visible: boolean;
	title: string;
	closeModal: (...args: any[]) => any;
	onBack: (...args: any[]) => any;
	onUsePhoto: (...args: any[]) => any;
	closeCamera: boolean;
	onCameraAccessFail: (...args: any[]) => any;
}

const PhotoModal: React.FC<PhotoModalProps> = (props) => {
	const [takePhoto, setTakePhoto] = React.useState<boolean>(false);
	const [photoTaken, setPhotoTaken] = React.useState<boolean>(false);
	const [image, setImage] = React.useState<string>('');
	const [cameraAccessGranted, setCameraAccessGranted] = React.useState(false);

	const { onBack, visible, closeModal, onCameraAccessFail, onUsePhoto, title, closeCamera } = props;

	const handleBack = () => {
		if (photoTaken) {
			setTakePhoto(true);
			setPhotoTaken(true);
		} else {
			onBack();
		}
	};

	const onCloseModal = () => {
		setTakePhoto(false);
		setImage('');
		setPhotoTaken(false);
		closeModal();
	};

	const handleCameraAccessSuccess = () => {
		setCameraAccessGranted(true);
	};

	const handleCameraAccessFail = () => {
		if (cameraAccessGranted) {
			setCameraAccessGranted(false);
		}
		onCameraAccessFail();
	};

	const handleTakePhoto = () => {
		if (photoTaken) {
			setImage('');
			setPhotoTaken(false);
			onUsePhoto(image);
		} else {
			// reset in case taking of photo is cancelled
			if (takePhoto) {
				setTakePhoto(false);
			} else {
				setTakePhoto(true);
			}
		}
	};

	const captureImage = (image: string) => {
		setPhotoTaken(true);
		setTakePhoto(false);
		setImage(image);
	};

	return (
		<DialogModal
			isBlueButtonDisabled={!cameraAccessGranted}
			modalIsVisible={visible}
			modalTitle={title}
			blueButtonText={photoTaken ? 'Use Photo' : 'Take Photo'}
			whiteButtonText={photoTaken ? 'Retake' : 'Back'}
			blueButtonClick={handleTakePhoto}
			whiteButtonClick={handleBack}
			closeModal={onCloseModal}
			className="modal-body-class"
		>
			<Camera
				onTakingPhoto={captureImage}
				takePhoto={takePhoto}
				height={300}
				width={500}
				closeCamera={closeCamera}
				onCameraAccessSuccess={handleCameraAccessSuccess}
				onCameraAccessFail={handleCameraAccessFail}
			/>
		</DialogModal>
	);
};

export default PhotoModal;
