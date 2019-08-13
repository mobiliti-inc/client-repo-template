import React, { Component, Fragment } from 'react';
import DialogModal from '../../components/Modal/DialogModal/DialogModal';
import PhotoRecBox from '../../components/PhotoRecBox/PhotoRecBox';
import TakePhotoModal from '../../components/AddLicenseModal/TakePhotoModal';
import { iconCamera } from '../../assets';

type PhotoCaptureProps = {
	modalIsVisible: boolean,
	onCameraAccessFail: (...args: any[]) => any,
	handleCapturedPhoto: (...args: any[]) => any,
	handleModalVisibility: (...args: any[]) => any,
	holderId?: string
};

type PhotoCaptureState = {
	isPhotoModalVisible: boolean,
	isTakePhotoModalVisible: boolean
};

class PhotoCapture extends Component<PhotoCaptureProps, PhotoCaptureState> {
	state = {
		isPhotoModalVisible: false,
		isTakePhotoModalVisible: false
	};
	static getDerivedStateFromProps(props, state) {
		if (props.modalIsVisible !== state.isPhotoModalVisible) {
			return {
				isPhotoModalVisible: props.modalIsVisible
			};
		}
		return null;
	}
	onUsePhoto = image => {
		this.handleTakePhotoModalVisibility();
		this.props.handleCapturedPhoto(image);
	};
	handlePhotoDialogModalVisibility = (isPhotoModalVisible = false) => {
		this.props.handleModalVisibility(isPhotoModalVisible);
		this.setState({
			isPhotoModalVisible
		});
	};
	handleTakePhotoModalVisibility = (isTakePhotoModalVisible = false) => {
		this.handlePhotoDialogModalVisibility();
		this.setState({
			isTakePhotoModalVisible
		});
	};
	render() {
		const { isPhotoModalVisible, isTakePhotoModalVisible } = this.state;
		const elementId = this.props.holderId || 'upload-image';
		return (
			<Fragment>
				<DialogModal
					modalIsVisible={isPhotoModalVisible}
					closeModal={() => this.handlePhotoDialogModalVisibility()}
					modalTitle="Select an option below to change your profile photo."
				>
					<Fragment>
						<div>
							<PhotoRecBox
								isVertical={false}
								boxTitle="Upload Photo"
								boxIcon={iconCamera}
								boxImage=""
								onBoxClick={() => document.getElementById(elementId).click()}
								onUploadImageInputChange={() => { }}
							/>
						</div>

						<div>
							<PhotoRecBox
								isVertical={false}
								boxTitle="Take photo with camera"
								boxIcon={iconCamera}
								boxImage=""
								onBoxClick={() => this.handleTakePhotoModalVisibility(true)}
								onUploadImageInputChange={() => { }}
							/>
						</div>
					</Fragment>
				</DialogModal>

				<TakePhotoModal
					modalIsVisible={isTakePhotoModalVisible}
					closeModal={() => this.handleTakePhotoModalVisibility()}
					onBack={() => {
						this.handleTakePhotoModalVisibility(false);
						return this.handlePhotoDialogModalVisibility(true);
					}}
					onUsePhoto={this.onUsePhoto}
					closeCamera={!isTakePhotoModalVisible}
					onCameraAccessFail={this.props.onCameraAccessFail}
					title="Take photo"
				/>
			</Fragment>
		);
	}
}

// PhotoCapture.defaultProps = {
// 	holderId: ''
// };

export default PhotoCapture;
