import React from 'react';
import CSSModules from 'react-css-modules';
// @ts-ignore
import Modal, { EasyModalHeader } from 'easy-modal-react';

import { Button } from '../../';

import * as styles from './DialogModal.scss';

interface DialogModalProps {
	blueButtonClick?: (...args: any[]) => any;
	whiteButtonClick?: (...args: any[]) => any;
	modalIsVisible?: boolean;
	closeModal: (...args: any[]) => any;
	modalTitle: string;
	whiteButtonText?: string;
	blueButtonText?: string;
	isBlueButtonDisabled?: boolean;
	className?: string;
	footer?: boolean;
}

const DialogModal: React.FC<DialogModalProps> = props => {
	const {
		blueButtonClick,
		modalTitle,
		isBlueButtonDisabled,
		blueButtonText,
		whiteButtonText,
		children,
		whiteButtonClick,
		modalIsVisible,
		closeModal,
		footer
	} = props;

	return (
		<Modal
			open={modalIsVisible}
			onClose={closeModal}
			header={<EasyModalHeader onClose={closeModal} />}
			footer={
				footer ? (
					<div styleName="button-group">
						{blueButtonText && (
							<div
								styleName={`save-button-container ${isBlueButtonDisabled ? 'save-button-container--disabled' : ''}`}
							>
								<Button onClick={blueButtonClick} disabled={isBlueButtonDisabled}>
									{blueButtonText}
								</Button>
							</div>
						)}
						{whiteButtonText && (
							<div styleName="cancel-button-container">
								<button onClick={whiteButtonClick}>{whiteButtonText}</button>
							</div>
						)}
					</div>
				) : null
			}
		>
			<div styleName="title">{modalTitle}</div>
			{children}
		</Modal>
	);
};

export default CSSModules(DialogModal, styles, { allowMultiple: true });
