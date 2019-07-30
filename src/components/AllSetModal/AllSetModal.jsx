import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { iconCloseWhite } from '../../assets/icons';

import styles from './AllSetModal.scss';

const AllSetModal = (props) => {
	const {
		modalIsVisible,
		headerText,
		bodyText,
		buttonText,
		customButton,
		buttonTo,
		customStyles,
		showCloseModal,
		bordered,
		onClose,
		showButton
	} = props;
	const modalVisibilityClass = modalIsVisible ? 'visible' : 'hide';

	return (
		<div styleName={`modal modal-${modalVisibilityClass}`}>
			<div styleName="modal-box">
				<div
					styleName={classNames('modal-container', { 'modal-container--bordered': bordered })}
					className={customStyles}
				>
					{showCloseModal && <img src={iconCloseWhite} alt="Close" role="presentation" styleName="modal-icon-close" onClick={onClose} />}
					<div styleName="modal-main-content">
						<h2 styleName="content-header">
							{headerText || 'One Last Step!'}
						</h2>

						<p styleName="content-description">
							{bodyText || ''}
						</p>
						{
							showButton && (customButton || (
								<Link styleName="browse-button" to={buttonTo || '/vehicles'}>
									{buttonText || 'Browse Vehicles'}
								</Link>
							))
						}
					</div>
				</div>
			</div>
		</div >);
};


AllSetModal.propTypes = {
	modalIsVisible: PropTypes.bool,
	headerText: PropTypes.string,
	bodyText: PropTypes.string,
	buttonText: PropTypes.string,
	customButton: PropTypes.node,
	buttonTo: PropTypes.string,
	showCloseModal: PropTypes.bool,
	bordered: PropTypes.bool,
	customStyles: PropTypes.string,
	onClose: PropTypes.func,
	showButton: PropTypes.bool
};

AllSetModal.defaultProps = {
	modalIsVisible: false,
	headerText: '',
	bodyText: '',
	buttonText: '',
	customButton: null,
	buttonTo: '',
	showCloseModal: false,
	bordered: false,
	customStyles: '',
	onClose: () => {},
	showButton: true
};

export default CSSModules(AllSetModal, styles, { allowMultiple: true });
