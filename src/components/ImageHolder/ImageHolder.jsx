import React, { Fragment, PureComponent } from 'react';
import classNames from 'classnames';

import styles from './ImageHolder.scss';
import { iconEdit } from '../../assets/icons/';

class ImageHolder extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
		};
		this.image = React.createRef();
	}

	componentDidMount() {
		const img = this.image.current;
		if (img && img.complete) {
			this.handleImageLoaded();
		}
	}

	handleImageLoaded = () => {
		if (!this.state.loaded) {
			this.setState({ loaded: true });
		}
	}

	renderImageInput = () => (
		<input
			styleName="input-upload-image"
			type="file"
			id={this.props.id || 'upload-image'}
			accept="image/jpeg"
			onChange={this.props.onUploadImageInputChange}
		/>
	);

	render() {
		const {
			onUploadImageClick,
			imagefile,
			squared,
			placeholder,
			imagePlaceholder,
		} = this.props;
		if (!imagefile && placeholder) {
			return (
				<Fragment>
					{this.renderImageInput()}
					{placeholder}
				</Fragment>
			);
		}
		return (
			<div styleName={classNames('image-container', { 'image-container--squared': squared })}>
				{imagefile && <img src={imagefile} ref={this.image} alt="Holder" onLoad={this.handleImageLoaded} styleName="image" />}
				{!this.state.loaded && imagePlaceholder && <img src={imagePlaceholder} alt="Placeholder" styleName="image-placeholder" />}
				<span
					role="presentation"
					styleName="edit-icon"
					onClick={onUploadImageClick}
				>
					<img src={iconEdit} alt="edit icon" />
					{this.renderImageInput(...this.props)}
				</span>
			</div>
		);
	}
}

ImageHolder.propTypes = {
	onUploadImageClick: PropTypes.func.isRequired,
	onUploadImageInputChange: PropTypes.func.isRequired,
	imagefile: PropTypes.string,
	placeholder: PropTypes.node,
	squared: PropTypes.bool,
	id: PropTypes.string,
	imagePlaceholder: PropTypes.string,
};

ImageHolder.defaultProps = {
	squared: false,
	placeholder: null,
	imagefile: null,
	id: '',
	imagePlaceholder: '',
};

export default CSSModules(ImageHolder, styles, { allowMultiple: true });
