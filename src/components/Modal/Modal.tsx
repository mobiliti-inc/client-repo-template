import React from 'react';
import classNames from 'classnames';
import Button from '../Button/Button';
import styles from './Modal.scss';
import { iconClose } from '../../assets/icons';

export const MODAL_OVERLAYS = {
	GRAY: 'gray',
	WHITE: 'white',
	DARK_GRAY: 'dark-gray'
};

type ModalProps = {
	title?: string,
	subTitle?: string,
	buttonText?: string,
	buttonClassName?: string,
	visible: boolean,
	onButtonClick?: (...args: any[]) => any,
	icon?: React.ReactNode,
	scrolling: boolean,
	plain?: boolean,
	overlay?: string,
	freezeOverlay?: boolean,
	noIcon?: boolean,
	showCloseIcon?: boolean,
	showButtonLoader?: boolean,
	onIconClose?: (...args: any[]) => any,
	headerClassName?: string,
	bodyClassName?: string,
	footerClassName?: string,
	plainHeader?: boolean,
	modalParentClass?: string,
	noPointer?: boolean
};

type ModalState = {
	modalVisible: any
};

class Modal extends React.PureComponent<ModalProps, ModalState> {
	constructor(props) {
		super(props);
		const { visible } = this.props;
		this.state = {
			modalVisible: visible
		};
	}
	componentDidUpdate(prevProps) {
		const { visible } = this.props;
		if (prevProps.visible !== visible) {
			this.updateModalVisibility(visible);
		}
	}
	onDialogClick = event => {
		event.stopPropagation();
	};
	getModalBackgroundName = () => {
		const { overlay } = this.props;
		return Object.values(MODAL_OVERLAYS).indexOf(overlay) > -1 ? `modal--${overlay}` : 'modal--white';
	};
	getClasses = () => {
		const { modalVisible } = this.state;
		const { noPointer } = this.props;
		const modalBackgroundName = this.getModalBackgroundName();
		const modalClass = modalVisible ? 'visible' : 'hide';
		const classes = [modalBackgroundName, modalClass, { 'no-pointer': noPointer }];
		return classNames(classes);
	};
	updateModalVisibility = visible => this.setState({ modalVisible: visible });
	overlayClose = event => {
		const { freezeOverlay, onIconClose } = this.props;
		if (onIconClose()) {
			return onIconClose();
		}
		if (freezeOverlay) {
			event.stopPropagation();
		} else {
			this.close();
		}
	};
	close = () => {
		const { onIconClose } = this.props;
		onIconClose();
		this.setState({
			modalVisible: false
		});
	};
	render() {
		const classes = this.getClasses();
		const {
			title,
			subTitle,
			children,
			buttonText,
			buttonClassName,
			onButtonClick,
			icon,
			scrolling,
			plain,
			noIcon,
			showCloseIcon,
			showButtonLoader,
			headerClassName,
			bodyClassName,
			footerClassName,
			plainHeader,
			modalParentClass
		} = this.props;
		const modalContentClass = classNames('modal-content', { scroll: scrolling, 'modal-plain': plain });
		return (
			<div styleName={classes} role="presentation" onClick={event => this.overlayClose(event)}>
				<div styleName={modalContentClass} className={modalParentClass} role="presentation" onClick={event => this.onDialogClick(event)}>
					<div styleName="modal-container" role="presentation">
						{plain ? (
							<React.Fragment>
								{!plainHeader && (
									<div styleName="plain-modal-header" role="presentation" onClick={event => this.close(event)}>
										<img styleName="modal-icon-close" src={iconClose} alt="Close" />
									</div>
								)}
								{this.props.children}
							</React.Fragment>
						) : (
								<React.Fragment>
									<div styleName={classNames('header', { 'header-no-icon': noIcon })} className={headerClassName}>
										{showCloseIcon && (
											<div styleName="plain-modal-header" role="presentation" onClick={event => this.close(event)}>
												<img src={iconClose} alt="Close" />
											</div>
										)}
										{!noIcon && (
											<div styleName="modal-icon">
												<img src={icon} alt="Close" />
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
	}
}

export default CSSModules(Modal, styles, { allowMultiple: true });
