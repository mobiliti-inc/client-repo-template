import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ItemList from "../ItemList/ItemList";
import styles from "./SwapInstructionsModal.scss";

type SwapInstructionsModalProps = {
	modalVisible: boolean,
	scrolling: boolean,
	onCancel: (...args: any[]) => any,
	onContinue: (...args: any[]) => any,
	freezeOverlay: boolean
};

const SwapInstructionsModal: React.SFC<SwapInstructionsModalProps> = ({ modalVisible, scrolling, onContinue, onCancel, freezeOverlay }) => (
	<Modal
		plain
		plainHeader
		visible={modalVisible}
		overlay="gray"
		scrolling={scrolling}
		modalParentClass={styles.modal}
		freezeOverlay={freezeOverlay}
		noPointer
	>
		<p styleName="modal-title">Swap Vehicles</p>
		<div styleName="modal-ctn">
			<ItemList header="Find your new vehicle" subHeader="Browse Mobiliti’s large selection of vehicles from local dealerships." number="1" />
			<ItemList header="Schedule your return" subHeader="Schedule your return for your current vehicle prior to picking up your new ride!" number="2" />
			<ItemList header="Reserve your new vehicle" subHeader="Reserve your new vehicle and set your pick up date. Enjoy the adventure!" number="3" />
		</div>
		<div styleName="button-container">
			<Button onClick={onContinue} ripple>
				Continue
			</Button>
			<Button onClick={onCancel} inverted>
				Cancel
			</Button>
		</div>
	</Modal>
);

export default CSSModules(SwapInstructionsModal, styles, { allowMultiple: true });
