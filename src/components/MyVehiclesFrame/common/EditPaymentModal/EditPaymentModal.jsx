import Modal from '../../../Modal/Modal';
import Link from '../../../Link/Link';
import styles from './EditPaymentModal.scss';

const EditPaymentModal = ({
	modalVisible,
	scrolling,
	closeModal,
	editSubscriptionRoute,
	onSelectSwap,
	onSelectReturnVehicle
}) => (
	<Modal
		plain
		visible={modalVisible}
		overlay="gray"
		scrolling={scrolling}
		onIconClose={closeModal}
	>
		<p styleName="modal-title">Edit Payment</p>
		<div styleName="modal-ctn">
			<Link to={editSubscriptionRoute}>
				<div styleName="modal-content">
					<p>Edit Subscription</p>
					<p>Change your mileage options or payment methods today.</p>
				</div>
			</Link>

			<div styleName="modal-content" role="presentation" onClick={onSelectReturnVehicle}>
				<p>Return Vehicle</p>
				<p>Don&#39;t need your vehicle anymore? Return it hassle free.</p>
			</div>

			<div styleName="modal-content" id="swap" onClick={onSelectSwap} role="presentation">
				<p>Swap Vehicles</p>
				<p>Ready for something new? We can help you get into a new vehicle.</p>
			</div>
		</div>
	</Modal>
);

EditPaymentModal.propTypes = {
	modalVisible: PropTypes.bool.isRequired,
	scrolling: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
	editSubscriptionRoute: PropTypes.string.isRequired,
	onSelectSwap: PropTypes.func.isRequired,
	onSelectReturnVehicle: PropTypes.func.isRequired,
};

export default CSSModules(EditPaymentModal, styles, { allowMultiple: true });
