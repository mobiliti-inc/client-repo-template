import * as React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from "@fortawesome/pro-light-svg-icons";

import { Button } from '../';
import './Camera.scss';

const { useState, useRef, useEffect } = React;

interface CameraProps {
	takePhoto: boolean;
	height: number;
	width: number;
	onTakingPhoto?: (...args: any[]) => any;
	closeCamera: boolean;
	onCameraAccessFail(error: any): void;
	onCameraAccessSuccess(): void;
	allowButton?: boolean;
	showMarkers?: boolean;
}

const Camera: React.FC<CameraProps> = (props) => {
	const {
		closeCamera,
		takePhoto,
		onCameraAccessSuccess,
		onCameraAccessFail,
		allowButton,
		onTakingPhoto,
		showMarkers,
		width,
		height
	} = props;

	let videoStream: any = useRef(null);
	let canvas: any = useRef(null);

	const constraints = {
		video: true
	};

	const [photoTaken, setPhotoTaken] = useState(false);
	const [localStream, setLocalStream] = useState<any>(null);

	const handleError = (error: any) => {
		onCameraAccessFail(error);
	};

	const gotStream = (stream: any) => {
		if (videoStream.current) {
			videoStream.current.srcObject = stream;
			setLocalStream(stream);
			onCameraAccessSuccess();
		}
	};

	const initiateStream = () => {
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(stream => gotStream(stream))
			.catch(handleError);
	};

	const hasGetUserMedia = () =>
		!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

	const stopTracks = () => {
		if (localStream) {
			const tracks = localStream.getTracks();
			videoStream.current.srcObject = null;
			tracks.forEach((track: any) => {
				track.stop();
			});
		}
	};

	const captureImage = () => {
		setPhotoTaken(true);
		const context = canvas.current.getContext('2d');
		context.imageSmoothingEnabled = false;
		context.height = height;
		context.width = width;
		context.drawImage(videoStream.current, 0, 0, 300, 150);
		const image = canvas.current.toDataURL('image/jpeg', 0.5);
		stopTracks();
		return onTakingPhoto && onTakingPhoto(image);
	};

	const retake = () => {
		setPhotoTaken(false);
		initiateStream();
	};

	useEffect(() => {
		if (photoTaken) {
			stopTracks();
		}
		if (takePhoto) {
			if (photoTaken && !closeCamera) {
				retake();
			}
		}
	}, [closeCamera, takePhoto]);

	useEffect(() => {
		if (hasGetUserMedia()) {
			initiateStream();
		} else {
			const error = {
				error: 'Unable to access user media'
			};
			onCameraAccessFail(error);
		}
	}, []);

	const renderMarkers = () => {
		if (videoStream.current) {
			return (
				<div styleName={photoTaken ? 'hide' : 'markers-ctn'}>
					<div styleName={'top'}>
						<div styleName={cx('markers', 'top-left')} />
						<div styleName={cx('markers', 'top-right')} />
					</div>
					<div styleName={'bottom'}>
						<div styleName={cx('markers', 'bottom-left')} />
						<div styleName={cx('markers', 'bottom-right')} />
					</div>
				</div>
			);
		}
		return <div />;
	};

	return (
		<div styleName="container">
			<canvas
				ref={canvas}
				styleName={photoTaken ? 'canvas' : 'hide'}
				style={{ width: `${width}px`, height: `${height}px` }}
			/>
			<video
				ref={videoStream}
				autoPlay
				styleName='video'
				style={{ width: `${width}px`, height: `${height}px` }}
			/>
			{allowButton && !photoTaken && (
				<div styleName="button">
					<FontAwesomeIcon icon={faCamera} />
					<Button shape="round" ripple onClick={() => captureImage()}>[]</Button>
				</div>
			)}
			{showMarkers && renderMarkers()}
		</div>
	);
};

export default Camera;

// TODO: Adjust camera markers to fit on camera
// TODO: Support picture retaking