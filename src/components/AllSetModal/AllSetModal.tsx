import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { iconCloseWhite } from '../../assets/icons';
import styles from './AllSetModal.scss';

type AllSetModalProps = {
	modalIsVisible?: boolean,
	headerText?: string,
	bodyText?: string,
	buttonText?: string,
	customButton?: React.ReactNode,
	buttonTo?: string,
	showCloseModal?: boolean,
	bordered?: boolean,
	customStyles?: string,
	onClose?: (...args: any[]) => any,
	showButton?: boolean
};

const AllSetModal: React.SFC<AllSetModalProps> = props => {
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
				<div styleName={classNames('modal-container', { 'modal-container--bordered': bordered })} className={customStyles}>
					{showCloseModal && <img src={iconCloseWhite} alt="Close" role="presentation" styleName="modal-icon-close" onClick={onClose} />}
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

// AllSetModal.defaultProps = {
// 	modalIsVisible: false,
// 	headerText: '',
// 	bodyText: '',
// 	buttonText: '',
// 	customButton: null,
// 	buttonTo: '',
// 	showCloseModal: false,
// 	bordered: false,
// 	customStyles: '',
// 	onClose: () => {},
// 	showButton: true
// };

export default CSSModules(AllSetModal, styles, { allowMultiple: true });
