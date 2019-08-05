import SwapInstructionsModal from '../SwapInstructionsModal';
import Modal from '../../../components/Modal/Modal';

describe('SwapInstructionsModal', () => {
	const props = {
		modalVisible: true,
		scrolling: true,
		onContinue: jest.fn(),
		onCancel: jest.fn(),
		freezeOverlay: false,
	};
	const component = (<SwapInstructionsModal {...props} />);

	it('renders', () => {
		expect(component).toMatchSnapshot();
	});

	it('should be a `Modal`', () => {
		const tree = shallow(component);
		expect(tree.find(Modal)).toHaveLength(1);
	});
});
