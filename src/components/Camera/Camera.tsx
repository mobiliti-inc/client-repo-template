import React from 'react';
import styles from './Camera.scss';

class Camera extends React.PureComponent {
	static propTypes = {
		takePhoto: PropTypes.bool.isRequired,
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
		onTakingPhoto: PropTypes.func.isRequired,
		closeCamera: PropTypes.bool.isRequired,
		onCameraAccessFail: PropTypes.func,
		onCameraAccessSuccess: PropTypes.func,

	}

	static defaultProps = {
		onCameraAccessSuccess: () => {},
		onCameraAccessFail: () => {}
	};

	constructor(props) {
		super(props);
		this.videoStream = React.createRef();
		this.canvas = React.createRef();
		this.state = {
			photoTaken: false,
			localStream: null,
			wait: false
		};

		this.constraints = {
			video: true
		};
		this.timer = () => {};
	}
	componentWillMount() {
		if (this.hasGetUserMedia()) {
			this.initiateStream();
		} else {
			const error = {
				error: 'Unable to access user media'
			};
			this.props.onCameraAccessFail(error);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.closeCamera !== prevProps.closeCamera && !this.state.photoTaken) {
			this.stopTracks();
		}
		if (this.props.takePhoto !== prevProps.takePhoto && this.props.takePhoto) {
			if (this.state.photoTaken && !this.props.closeCamera) {
				this.retake();
			}
		}

		if ((this.props.takePhoto !== prevProps.takePhoto) &&
		(!this.state.photoTaken || !this.props.takePhoto)) {
			this.captureImage();
		}
	}

	componentWillUnmount = () => {
		clearTimeout(this.timer);
		this.stopTracks();
	}

	gotStream = (stream) => {
		if (this.videoStream.current) {
			this.videoStream.current.srcObject = stream;
			this.setState({
				localStream: stream
			});
			this.props.onCameraAccessSuccess();
		}
		this.timer = setTimeout(() => this.setState({ wait: true }), 100);
	}

	initiateStream = () => {
		navigator.mediaDevices.getUserMedia(this.constraints)
			.then((stream) => this.gotStream(stream)).catch(this.handleError);
	}

	hasGetUserMedia = () => !!(navigator.mediaDevices &&
		navigator.mediaDevices.getUserMedia);

	handleError = (error) => {
		this.props.onCameraAccessFail(error);
	}

	captureImage = () => {
		this.setState({
			photoTaken: true
		});
		const context = this.canvas.current.getContext('2d');
		context.imageSmoothingEnabled = false;
		context.height = this.props.height;
		context.width = this.props.width;
		context.drawImage(this.videoStream.current, 0, 0, this.props.width, this.props.height);
		const image = this.canvas.current.toDataURL('image/jpeg', 0.5);
		this.stopTracks();
		return this.props.onTakingPhoto(image);
	}

	stopTracks = () => {
		const { localStream } = this.state;
		if (localStream) {
			const tracks = this.state.localStream.getTracks();
			this.videoStream.current.srcObject = null;
			tracks.forEach((track) => {
				track.stop();
			});
		}
	}

	retake = () => {
		this.setState({
			photoTaken: false,
			wait: false
		});
		this.initiateStream();
	}

	renderMarkers = () => {
		if (this.videoStream.current) {
			return (
				<div styleName={this.state.photoTaken ? 'hide' : 'markers-ctn'}>
					<div styleName="top">
						<div styleName="markers top-left" />
						<div styleName="markers top-right" />
					</div>
					<div styleName="bottom">
						<div styleName="markers bottom-left" />
						<div styleName="markers bottom-right" />
					</div>
				</div>
			);
		}
		return <div />;
	}

	render() {
		return (
			<React.Fragment>
				<canvas
					ref={this.canvas}
					styleName={this.state.photoTaken ? 'canvas' : 'hide'}
					width={this.props.width}
					height={this.props.height}
				/>
				<video
					ref={this.videoStream}
					autoPlay
					styleName={this.state.photoTaken ? 'hide' : 'video'}
				>
					<track kind="captions" />
				</video>
				{this.state.wait && this.renderMarkers()}
			</React.Fragment>
		);
	}
}

export default CSSModules(Camera, styles, { allowMultiple: true });
