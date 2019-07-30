import React from 'react';
import Modal, { EasyModalHeader } from 'easy-modal-react';

import styles from './DialogModal.scss';
import Button from '../../Button/Button';


const DialogModal = (props) => {
	const {
		blueButtonClick, modalTitle, isBlueButtoDisabled,
		blueButtonText, whiteButtonText, children,
		whiteButtonClick, modalIsVisible, closeModal,
		footer
	} = props;

	return (
		<Modal
			open={modalIsVisible}
			onClose={closeModal}
			header={<EasyModalHeader onClose={closeModal} />}

			footer={footer ?
				<div styleName="button-group">
					{ blueButtonText &&
					<div styleName={`save-button-container ${isBlueButtoDisabled ? 'save-button-container--disabled' : ''}`}>
						<Button
							onClick={blueButtonClick}
							disabled={isBlueButtoDisabled}
						>{blueButtonText}
						</Button>
					</div>
					}
					{whiteButtonText &&
					<div styleName="cancel-button-container">
						<button onClick={whiteButtonClick}>
							{whiteButtonText}
						</button>
					</div>}
				</div> : null}
		>
			<div styleName="title">{modalTitle}</div>
			{children}
		</Modal>

	);
};

DialogModal.propTypes = {
	blueButtonClick: PropTypes.func,
	whiteButtonClick: PropTypes.func,
	modalIsVisible: PropTypes.bool,
	closeModal: PropTypes.func.isRequired,
	modalTitle: PropTypes.string.isRequired,
	whiteButtonText: PropTypes.string,
	blueButtonText: PropTypes.string,
	children: PropTypes.node,
	isBlueButtoDisabled: PropTypes.bool,
	footer: PropTypes.bool
};


DialogModal.defaultProps = {
	modalIsVisible: false,
	children: null,
	isBlueButtoDisabled: false,
	footer: true,
	blueButtonClick: () => {},
	whiteButtonClick: () => {},
	whiteButtonText: '',
	blueButtonText: '',
};

export default CSSModules(DialogModal, styles, { allowMultiple: true });
