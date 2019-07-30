import BottomBorderedCard from '../BottomBorderedCard';

describe('BottomBorderedCard test', () => {
	const defaultProps = {
		leftText: 'left text',
		rightText: 'right text'
	};
	it('renders', () => {
		const tree = shallow(<BottomBorderedCard {...defaultProps} />);
		matchSnapshot(tree);
	});
});
