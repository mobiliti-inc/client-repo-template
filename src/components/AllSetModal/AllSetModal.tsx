import * as React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/pro-light-svg-icons";

import './AllSetModal.scss';

interface AllSetModalProps {
	modalIsVisible?: boolean;
	headerText?: string;
	bodyText?: string;
	buttonText?: string;
	customButton?: React.ReactNode;
	buttonTo?: string;
	showCloseModal?: boolean;
	bordered?: boolean;
	customStyles?: string;
	onClose?: (...args: any[]) => any;
	showButton?: boolean;
}

const AllSetModal: React.FC<AllSetModalProps> = (props) => {
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
				<div styleName={cx('modal-container', { 'modal-container--bordered': bordered })} className={customStyles}>
					{showCloseModal && <div styleName="modal-icon-close" onClick={onClose}><FontAwesomeIcon icon={faTimes} /></div>}
					<div styleName="modal-main-content">
						<h2 styleName="content-header">{headerText || 'One Last Step!'}</h2>

						{bodyText && <p styleName="content-description">{bodyText}</p>}
						{showButton &&
							(customButton || (
								<Link styleName="browse-button" to={buttonTo || '/vehicles'}>
									{buttonText || 'Browse Vehicles'}
								</Link>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllSetModal;