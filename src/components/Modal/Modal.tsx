import * as React from 'react';
import cx from 'classnames';
import CSSModules from 'react-css-modules';
import Button from '../Button/Button';
import * as styles from './Modal.scss';
// We'll replace this with FontAwesome icons
// import { iconClose } from '../../assets';

export const MODAL_OVERLAYS = {
	GRAY: 'gray',
	WHITE: 'white',
	DARK_GRAY: 'dark-gray'
};

interface ModalProps {
	title?: string;
	subTitle?: string;
	buttonText?: string;
	buttonClassName?: string;
	visible: boolean;
	onButtonClick?: (...args: any[]) => any;
	icon?: React.ReactNode;
	scrolling: boolean;
	plain?: boolean;
	overlay?: string;
	freezeOverlay?: boolean;
	noIcon?: boolean;
	showCloseIcon?: boolean;
	showButtonLoader?: boolean;
	onIconClose: (...args: any[]) => any;
	headerClassName?: string;
	bodyClassName?: string;
	footerClassName?: string;
	plainHeader?: boolean;
	modalParentClass?: string;
	noPointer?: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
	const {
		title,
		subTitle,
		children,
		buttonText,
		buttonClassName,
		onButtonClick,
		icon,
		scrolling,
		visible,
		plain,
		noIcon,
		overlay,
		showCloseIcon,
		freezeOverlay,
		onIconClose,
		showButtonLoader,
		headerClassName,
		bodyClassName,
		noPointer,
		footerClassName,
		plainHeader,
		modalParentClass
	} = props;

	const [modalVisible, setModalVisible] = React.useState<boolean>(false);

	React.useEffect(() => {
		setModalVisible(visible);
	}, []);

	const updateModalVisibility = (visible: boolean) => setModalVisible(visible);

	React.useEffect(() => {
		updateModalVisibility(visible);
	}, [visible]);

	const onDialogClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
	};

	const getModalBackgroundName = () => {
		return overlay && Object.values(MODAL_OVERLAYS).indexOf(overlay) > -1 ? `modal--${overlay}` : 'modal--white';
	};

	const getClasses = () => {
		const modalBackgroundName = getModalBackgroundName();
		const modalClass = modalVisible ? 'visible' : 'hide';
		const classes = [modalBackgroundName, modalClass, { 'no-pointer': noPointer }];
		return cx(classes);
	};

	const close = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		onIconClose();
		setModalVisible(false);
	};

	const overlayClose = (event: React.MouseEvent<HTMLElement>) => {
		if (onIconClose()) {
			return onIconClose();
		}

		if (freezeOverlay) {
			event.stopPropagation();
		} else {
			close(event);
		}
	};

	const classes = getClasses();

	const modalContentClass = cx('modal-content', { scroll: scrolling, 'modal-plain': plain });
	return (
		<div styleName={classes} role="presentation" onClick={event => overlayClose(event)}>
			<div styleName={modalContentClass} className={modalParentClass} role="presentation" onClick={event => onDialogClick(event)}>
				<div styleName="modal-container" role="presentation">
					{plain ? (
						<React.Fragment>
							{!plainHeader && (
								<div styleName="plain-modal-header" role="presentation" onClick={event => close(event)}>
									{/* <img styleName="modal-icon-close" src={iconClose} alt="Close" /> */}
									X
								</div>
							)}
							{children}
						</React.Fragment>
					) : (
							<React.Fragment>
								<div styleName={cx('header', { 'header-no-icon': noIcon })} className={headerClassName}>
									{showCloseIcon && (
										<div styleName="plain-modal-header" role="presentation" onClick={event => close(event)}>
											{/* <img src={iconClose} alt="Close" /> */}
											X
										</div>
									)}
									{!noIcon && (
										<div styleName="modal-icon">
											{icon && icon}
										</div>
									)}
									<p styleName="modal-title">{title}</p>
									<p styleName="modal-sub-title">{subTitle}</p>
								</div>
								<div styleName="modal-body" className={bodyClassName}>
									{children}
								</div>
								<div styleName="modal-footer" className={footerClassName}>
									<Button customStyles={buttonClassName} onClick={onButtonClick} showLoader={showButtonLoader}>
										{buttonText}
									</Button>
								</div>
							</React.Fragment>
						)}
				</div>
			</div>
		</div>
	);
};

export default CSSModules(Modal, styles, { allowMultiple: true });
