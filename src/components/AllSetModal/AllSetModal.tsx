import * as React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import CSSModules from 'react-css-modules';
// change based on fontawesome
// import { iconCloseWhite } from '../../assets';
import * as styles from './AllSetModal.scss';

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
};

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
					{/* {showCloseModal && <img src={iconCloseWhite} alt="Close" role="presentation" styleName="modal-icon-close" onClick={onClose} />} */}
					{showCloseModal && <span styleName="modal-icon-close" onClick={onClose}>X</span>}
					<div styleName="modal-main-content">
						<h2 styleName="content-header">{headerText || 'One Last Step!'}</h2>

						<p styleName="content-description">{bodyText || ''}</p>
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

export default CSSModules(AllSetModal, styles, { allowMultiple: true });
