import * as React from 'react';
// import cx from 'classnames';
const { useState, useRef, useEffect } = React;
import * as styles from './Camera.scss';
import { Button } from '../';
import { CameraIcon } from '../../assets';

interface CameraProps {
	takePhoto: boolean;
	height: number;
	width: number;
	onTakingPhoto: (...args: any[]) => any;
	closeCamera: boolean;
	onCameraAccessFail(error: any): void;
	onCameraAccessSuccess(): void;
	sendFile(image: any): void;
	showPhotoTaken?: boolean;
	allowButton?: boolean;
}

const Camera: React.FC<CameraProps> = (props) => {
	const { closeCamera, takePhoto, onCameraAccessSuccess, onCameraAccessFail,
		allowButton
	} = props;

	let videoStream: any = useRef(null);
	// let canvas: any = useRef(null);

	const constraints = {
		video: true
	};

	// let timer: any = () => { };

	const [photoTaken, setPhotoTaken] = useState(false);
	const [localStream, setLocalStream] = useState<any>(null);
	// const [wait, setWait] = useState(false);
	// const [capturedImage, setCapturedImage] = useState<string | null>(null);

	const handleError = (error: any) => {
		onCameraAccessFail(error);
	};

	console.log(videoStream.current, "|||||||||||||");

	const gotStream = (stream: any) => {
		if (videoStream.current) {
			videoStream.current.srcObject = stream;
			setLocalStream(stream);
			onCameraAccessSuccess();
		}
		// timer = setTimeout(() => setWait(true), 100);
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

	// const captureImage = () => {
	// 	setPhotoTaken(true);
	// 	const context = canvas.current.getContext('2d');
	// 	context.imageSmoothingEnabled = false;
	// 	context.height = height;
	// 	context.width = width;
	// 	context.drawImage(videoStream.current, 0, 0, 680, 360);
	// 	const image = canvas.current.toDataURL('image/jpeg', 0.5);
	// 	canvas.current.toBlob(sendFile);
	// 	stopTracks();
	// 	setCapturedImage(image);
	// 	return onTakingPhoto(image);
	// };

	const retake = () => {
		setPhotoTaken(false);
		// setWait(false);
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
		// if (!photoTaken || !takePhoto) {
		// 	captureImage();
		// }
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

	// This is supposed to be equivalent to componentWillUnmount
	// useEffect(() => {
	// 	clearTimeout(timer);
	// 	stopTracks();
	// });

	// const renderMarkers = () => {
	// 	if (videoStream.current) {
	// 		return (
	// 			<div className={photoTaken ? styles.hide : styles['markers-ctn']}>
	// 				<div className={styles.top}>
	// 					<div className={cx(styles.markers, styles['top-left'])} />
	// 					<div className={cx(styles.markers, styles['top-right'])} />
	// 				</div>
	// 				<div className={styles.bottom}>
	// 					<div className={cx(styles.markers, styles['bottom-left'])} />
	// 					<div className={cx(styles.markers, styles['bottom-right'])} />
	// 				</div>
	// 			</div>
	// 		);
	// 	}
	// 	return <div />;
	// };

	// console.log("capturedImage", capturedImage);

	return (
		<>
			{/* <canvas
				ref={canvas}
				className={photoTaken ? styles.canvas : styles.hide}
				width={width}
				height={height}
			/> */}
			<video
				ref={videoStream}
				autoPlay
				width="680"
				height="360"
				className={styles.video}
			/>
			{allowButton && <Button shape="round" className={styles.button}><img src={CameraIcon} alt="" /></Button>}
			{/* <track kind="captions" /> */}
			{/* </video> */}
			{/* {wait && renderMarkers()} */}
			{/* {showPhotoTaken && !!capturedImage && <img src={capturedImage} alt="" />} */}
		</>
	);
};

export default Camera;
