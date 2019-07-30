import DialogModal from '../DialogModal';
import PhotoRecBox from '../../../PhotoRecBox/PhotoRecBox';

describe('DialogModal', () => {
	it('renders', () => {
		const tree = shallow(
			<DialogModal
				modalTitle="test headline"
				blueButtonClick={() => {}}
				whiteButtonClick={() => {}}
				modalIsVisible
				closeModal={() => {}}
				whiteButtonText="test"
				blueButtonText="message test"
				isBlueButtoDisabled
			/>
		);
		matchSnapshot(tree);
	});

	it('renders with children', () => {
		const tree = shallow(
			<DialogModal
				modalTitle="test headline"
				blueButtonClick={() => {}}
				whiteButtonClick={() => {}}
				modalIsVisible
				closeModal={() => {}}
				whiteButtonText="test"
				blueButtonText="message test"
				isBlueButtoDisabled={false}
			>
				<PhotoRecBox boxIcon="test icon" onBoxClick={() => {}} />
			</DialogModal>
		);
		matchSnapshot(tree);
	});
});
