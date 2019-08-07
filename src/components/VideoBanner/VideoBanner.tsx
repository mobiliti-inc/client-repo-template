/* eslint jsx-a11y/media-has-caption: 0 */
import styles from "./VideoBanner.scss";

export default CSSModules(
	() => (
		<div styleName="video-banner">
			<div className="fullscreen-bg">
				<video
					className="fullscreen-bg-video js_fullscreen-bg-video"
					loop
					muted
					autoPlay
					poster="https://s3-us-west-2.amazonaws.com/subscriber-ui-assets/images/poster.jpg"
					preload="auto"
				>
					<source
						src="https://s3-us-west-2.amazonaws.com/subscriber-ui-assets/video/mobiliti-header-black-final.mp4"
						type="video/mp4"
					/>
				</video>
			</div>
		</div>
	),
	styles
);
